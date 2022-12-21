/**
 * @openAi
 * @controllers
 */
const makeOpenAi = require('../config/openAi')

/**
 * 
 * @param {*} queryPrompt input is type String
 * @param {*} models Input type `String` Models of type Request, see at `global.config.js`
 * @param {*} temp Input type `Number` extend as Temperature
 * @param {*} tokens Input type `Number` extends Max token of an Result
 * @param {*} freqPenalty Input type `Number` extends Frequency of Penalty Request
 * @param {*} prePenalty Input type `Number` extends Presence Penalty
 * @returns `Object` with `id` and Array
 */
const openAiCompletions = async (queryPrompt, models, temp, tokens, freqPenalty, prePenalty) => {
  const Resolve = await makeOpenAi.createCompletion({
    model: models,
    prompt: queryPrompt,
    temperature: temp,
    max_tokens: tokens,
    top_p: 1,
    frequency_penalty: freqPenalty,
    presence_penalty: prePenalty,
  });
  // .then(async Result => {
  //   let Data = Result.data
  //   console.log(Data)
  //   let Text = Data.choices[0].text
  //   console.log('Via Text : ', Text)
  // });
  return Resolve.data
};

const openAiImageGenerations = async (Query) => {
  const Resolve = await makeOpenAi.createImage({
    prompt: Query,
    n: 1,
    size: "1024x1024",
  });
  return Resolve.data
};

module.exports = {
  openAiCompletions,
  openAiImageGenerations
};

// (async () => {
//   let query = 'A big dog with white color'
//   let res = await openAiImageGenerations(query);
//   console.log(res.data[0].url)
// })();
