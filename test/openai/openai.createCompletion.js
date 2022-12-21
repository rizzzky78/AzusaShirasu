
const { MyApikeys } = require("../../config/global.config");
const openAi = require("../../config/openAi")

  (async () => {
    // Set the prompt for the model
    const QueryPrompt = 'Buatkan paragraf tentang metode peramalan';

    await openAi.createCompletion({
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
      let TextResults = Data.choices
      // console.log(TextResults)
    })

  })();