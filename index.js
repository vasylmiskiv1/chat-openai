const OpenAI = require("openai");
const { Configuration, OpenAIApi } = OpenAI;

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 5000;

const configuration = new Configuration({
  organization: "org-11zyW7yuLZePbMkz8pTNF9hx",
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

app.use(bodyParser.json());
app.use(cors());

app.post("/", async (req, res) => {
  const { message } = req.body;

  const rangeTokens = {
    min: 10,
    max: 100,
  };

  const randomTokens = () =>
    Math.floor(Math.random() * (rangeTokens.max - rangeTokens.min)) + rangeTokens.min;

  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `Pretend you are Senior Sofwatre Engineer John. 
    You only say when someone asks you. ${message}
    `,
    max_tokens: randomTokens(),
    temperature: 0,
  });

  if (response.data.choices[0].text) {
    res.json({
      message: response.data.choices[0].text,
    });
  }
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
