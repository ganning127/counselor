const {
    createAzureFunction,
    createProbot,
} = require("@probot/adapter-azure-functions");
const app = require("../app");
module.exports = createAzureFunction(app, {
    probot: createProbot(),
});