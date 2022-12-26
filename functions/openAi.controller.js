/**
 * @openAi
 * @controllers
 */
const makeOpenAi = require('../config/openAi')
const { OpenAiConfig } = require('../config/global.config')
/**
 * @param {*} queryPrompt input is type String
 * @param {*} models Input type `String` Models of type Request, see at `global.config.js`
 * @param {*} temp Input type `Number` extend as Temperature
 * @param {*} tokens Input type `Number` extends Max token of an Result
 * @param {*} freqPenalty Input type `Number` extends Frequency of Penalty Request
 * @param {*} prePenalty Input type `Number` extends Presence Penalty
 * @param {*} stop type `Array String` ['...query to stop']
 * @returns `Object` with `id` and Array
 */
const openAiCompletions = async (queryPrompt, models, temp, tokens, freqPenalty, prePenalty, stop) => {
  const Resolve = await makeOpenAi.createCompletion({
    model: models,
    prompt: queryPrompt,
    temperature: temp,
    max_tokens: tokens,
    top_p: 1,
    frequency_penalty: freqPenalty,
    presence_penalty: prePenalty,
    stop
  });
  return Resolve.data ? Resolve.data : 'Error\nCode: 400'
};

const openAiImageGenerations = async (Query) => {
  const Resolve = await makeOpenAi.createImage({
    prompt: Query,
    n: 1,
    size: "1024x1024",
  });
  return Resolve.data
};

const openAiCreateCompletion = async (queryPrompt) => {
  return await makeOpenAi.createCompletion(
    {
      model: OpenAiConfig.model.davinci,
      prompt: queryPrompt,
      temperature: 0.8,
      max_tokens: 2000,
      top_p: 1,
      frequency_penalty: 0.2,
      presence_penalty: 1
    }
  );
};

const QnA = async (queryPrompt) => {
  return await makeOpenAi.createCompletion(
    {
      model: OpenAiConfig.model.davinci,
      prompt: queryPrompt,
      temperature: 0,
      max_tokens: 100,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      stop: ['\n']
    }
  )
};

const GrammarCorection = async (queryPrompt) => {
  return await makeOpenAi.createCompletion(
    {
      model: OpenAiConfig.model.davinci,
      prompt: queryPrompt,
      temperature: 0,
      max_tokens: 60,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0
    }
  );
};

const Summarizer = async (queryPrompt) => {
  return await makeOpenAi.createCompletion(
    {
      model: OpenAiConfig.model.davinci,
      prompt: queryPrompt,
      temperature: 0.7,
      max_tokens: 64,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0
    }
  );
};

const TranslateProgrammingLang = async (queryPrompt) => {
  return await makeOpenAi.createCompletion(
    {
      model: 'code-davinci-002',
      prompt: queryPrompt,
      temperature: 0,
      max_tokens: 54,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      stop: ['###']
    }
  );
};

const Keywords = async (queryPrompt) => {
  return await makeOpenAi.createCompletion(
    {
      model: OpenAiConfig.model.davinci,
      prompt: queryPrompt,
      temperature: 0.5,
      max_tokens: 60,
      top_p: 1,
      frequency_penalty: 0.8,
      presence_penalty: 0
    }
  );
};

const Factual = async (queryPrompt) => {
  return await makeOpenAi.createCompletion(
    {
      model: OpenAiConfig.model.davinci,
      prompt: queryPrompt,
      temperature: 0,
      max_tokens: 60,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0
    }
  );
};

const FriendChat = async (queryPrompt) => {
  return await makeOpenAi.createCompletion(
    {
      model: OpenAiConfig.model.davinci,
      prompt: queryPrompt,
      temperature: 0.5,
      max_tokens: 60,
      top_p: 1,
      frequency_penalty: 0.5,
      presence_penalty: 0
    }
  );
};

const AnalogyMaker = async (queryPrompt) => {
  return await makeOpenAi.createCompletion(
    {
      model: OpenAiConfig.model.davinci,
      prompt: queryPrompt,
      temperature: 0.5,
      max_tokens: 60,
      top_p: 1.0,
      frequency_penalty: 0.5,
      presence_penalty: 0.0
    }
  );
};

const Chat = async (queryPrompt) => {
  return await makeOpenAi.createCompletion(
    {
      model: OpenAiConfig.model.davinci,
      prompt: queryPrompt,
      temperature: 0.9,
      max_tokens: 150,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.6,
      stop: ["Human:", "Ai"]
    }
  );
};

const Marv = async (queryPrompt) => {
  return await makeOpenAi.createCompletion(
    {
      model: OpenAiConfig.model.davinci,
      prompt: queryPrompt,
      temperature: 0.5,
      max_tokens: 60,
      top_p: 1.0,
      frequency_penalty: 0.5,
      presence_penalty: 0.0
    }
  );
};

const StudyNotes = async (queryPrompt) => {
  return await makeOpenAi.createCompletion(
    {
      model: OpenAiConfig.model.davinci,
      prompt: queryPrompt,
      temperature: 0.3,
      max_tokens: 150,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0
    }
  );
};

const OpenAi = {
  QnA, GrammarCorection, Summarizer, TranslateProgrammingLang, Keywords, Factual, FriendChat, AnalogyMaker, Chat, Marv, StudyNotes
};


module.exports = {
  OpenAi,
  openAiCompletions,
  openAiCreateCompletion,
  openAiImageGenerations
};
