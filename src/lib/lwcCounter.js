const countLines = function(content) {
  return content.split('\n').length - 1;
};

const countWords = function(content) {
  return content
    .split("\n")
    .join(" ")
    .split(" ")
    .filter(x => x != "").length;
};

const countBytes = function(content) {
  return content.split("").length;
};

const countLinesWordsBytes = function(filename, fs) {
  let content = fs.readFileSync(filename).toString();
  return {
    lines: countLines(content),
    words: countWords(content),
    bytes: countBytes(content),
    filename: filename
  };
};

const formatOutput = function({ lines, words, bytes, filename }) {
  let result = ["      ", lines, "    ", words, "    ", bytes, " ", filename].join("");
  return result;
};

module.exports = { countLinesWordsBytes, formatOutput };
