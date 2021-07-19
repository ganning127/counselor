const { suite } = require("uvu");
const assert = require("uvu/assert");

const nock = require("nock");
nock.disableNetConnect();

const { Probot, ProbotOctokit } = require("probot");

// const app = require("/src/http/post-api-github-webhooks/app");

/** @type {import('probot').Probot */
let probot;
const test = suite("app");
test.before.each(() => {
  test.skip('skip', () => { });
});

test("recieves issues.opened event", async function () {
  console.log("TRUE");
  test.skip('skip', () => { });
});

test.run();