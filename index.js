const fs = require("fs");
const axios = require("axios");
const express = require("express");
const file = "README.md";
require("dotenv").config();

const PORT = process.env.PORT || 8081;
const URL = process.env.URL;

const getQuote = async () => {
  try {
    const { data } = await axios.get(URL);
    console.log(data);

    const quote = data[0]?.content;
    const author = data[0]?.author;

    return { quote, author };
  } catch (err) {
    console.error(err);
    return {};
  }
};

const generate = async (quote, author) => {
  const content = `_**${quote}**_\n\n${author}`;

  try {
    console.log(`File written successfully!`);
    await fs.promises.writeFile(file, content);
  } catch (err) {
    console.error(`Error to writing file: ${err}`);
  }
};

const setupExpress = (quote, author) => {
  const app = express();

  app.get(`/quotes/random`, (_req, res) => {
    res.json({ quote, author });
  });

  app.listen(PORT, () => {
    console.log(`App listening on port: ${PORT}!`);
  });
};

const main = async () => {
  const { quote, author } = await getQuote();
  if (quote) {
    await generate(quote, author);
    setupExpress(quote, author);
  }
};

main();