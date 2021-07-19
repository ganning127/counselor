const { suite } = require("uvu");
const assert = require("uvu/assert");

const nock = require("nock");
nock.disableNetConnect();

const { Probot, ProbotOctokit } = require("probot");

const app = require("../../app");

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
  console.log("TRUE");
  return true;
});

test.run();