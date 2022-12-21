const makeOpenAi = require('../config/openAi');

(async () => {
  // Set the prompt for the model
  const QueryPrompt = 'Tuliskan fakta unik tentang hewan kangguru';

  await makeOpenAi.createCompletion({
    model: "text-davinci-003",
    prompt: QueryPrompt,
    temperature: 0.5,
    max_tokens: 500,
    top_p: 1,
    frequency_penalty: 0.5,
    presence_penalty: 0.15,
  }).then(async Result => {
    let Data = Result.data
    console.log(Data)
    let Text = Data.choices[0].text
    console.log('Via Text : ', Text)
  })

  let query = args[0]
  let Res = openAiCompletions(query, AiModels, AiTemp, AiTokens, AiFpenalty, AiPpenalty);
  let Data = Res.choices[0].text
  let txt = `Query : ${query}\n\n`
      txt += `${Data}`
  reply(txt)
  
})();