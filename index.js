import { aiTemplates } from "./src/templates.js";

import { OpenAIApi, Configuration } from "openai";

import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

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

  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `${aiTemplates[0].order} ${message}`,
    max_tokens: 4000,
    temperature: 0.7,
    top_p: 1,
    n: 1,
    frequency_penalty: 0.5,
    presence_penalty: 0.6,
    stop: ["User:", "John Doe:"],
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
