const countLines = function(content) {
  return content.split("\n").length - 1;
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

const counter = { line: countLines, word: countWords, byte: countBytes };

const countLinesWordsBytes = function({ option, filename }, fs) {
  let content = fs.readFileSync(filename).toString();
  if (option == "default") {
    return [
      countLines(content),
      countWords(content),
      countBytes(content),
      filename
    ];
  }
  return [counter[option](content), filename];
};

module.exports = { countLinesWordsBytes };
