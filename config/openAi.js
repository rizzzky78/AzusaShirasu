/**
 * @openAi
 */
const { Configuration, OpenAIApi } = require("openai");
const { MyApikeys } = require("./global.config");

const configuration = new Configuration({
  apiKey: MyApikeys.OpenAi,
});

const makeOpenAi = new OpenAIApi(configuration);

module.exports = makeOpenAi;