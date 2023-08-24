const axios = require("axios");
const fs = require("fs");
const API = "https://api.quotable.io/quotes/random";

const getQuote = async () => {
  try {
    const { data } = await axios.get(API);

    console.log(data)

    const quote = data[0].content;
    const author = data[0].author;

    return {
      quote,
      author,
    };
  } catch (err) {
    console.error(err.message);
    return {};
  }
};

const generate = async () => {
  const { quote, author } = await getQuote();

  if (!quote) return;

  fs.writeFileSync("README.md", `_**${quote}**_\n\n${author}`);
};

generate();