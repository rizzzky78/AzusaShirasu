const openai = require('openai');

// Set your API key
openai.apiKey = "YOUR_API_KEY";

// Set the prompt for the model
const prompt = 'What is the capital of France?';

// Use the OpenAI API to generate a response
openai.completions.create({
  engine: "davinci",
  prompt: prompt,
  max_tokens: 20,
  n: 1,
  stop: "."
}, function(error, response) {
  if (error) {
    console.log(error);
  } else {
    console.log(response.choices[0].text);
  }
});
