const { suite } = require("uvu");
const assert = require("uvu/assert");
const nock = require("nock");
nock.disableNetConnect();
const { Probot, ProbotOctokit } = require("probot");
const app = require("./src/http/post-api-github-webhooks/app");
/** @type {import('probot').Probot */
let probot;
const test = suite("app");
test.before.each(() => {
  probot = new Probot({
    // simple authentication as alternative to appId/privateKey
    githubToken: "test",
    // disable logs
    logLevel: "warn",
    // disable request throttling and retries
    Octokit: ProbotOctokit.defaults({
      throttle: { enabled: false },
      retry: { enabled: false },
    }),
  });
  probot.load(app);
});
test("recieves issues.opened event", async function () {
  const mock = nock("https://api.github.com")
    // create new check run
    .post(
      "/repos/ganning127/jest-test-repo/issues/1/comments",
      (requestBody) => {
        assert.equal(requestBody, { body: "Hello, World!" });
        return true;
      }
    )
    .reply(201, {});
  await probot.receive({
    name: "issues",
    id: "1",
    payload: {
      action: "opened",
      repository: {
        owner: {
          login: "emsesc",
        },
        name: "jest-test-repo",
      },
      issue: {
        number: 1,
      },
    },
  });
  assert.equal(mock.activeMocks(), []);
});
test.run();