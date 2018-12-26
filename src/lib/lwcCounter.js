const countLines = function (content) {
  return content.split("\n").length - 1;
};

const countWords = function (content) {
  return content
    .split("\n")
    .join(" ")
    .split(" ")
    .filter(x => x != "").length;
};

const countBytes = function (content) {
  return content.split("").length;
};

const counter = { line: countLines, word: countWords, byte: countBytes };

const countLinesWordsBytes = function ({ options, files }, fs) {
  return files.map(function (filename) {
    let content = fs.readFileSync(filename).toString();
    if (options[0] == "default") {
      return [
        countLines(content),
        countWords(content),
        countBytes(content),
        filename
      ];
    };
    if (options.length > 1){
    options = sortOptions(options);
    }
    let counts = options.map(function(option) {
      return counter[option](content);
    });
    counts.push(filename);
    return counts;
  });
};

const sortOptions = function (list) {
  if(list[0] == "byte" || list[1] == "line") {
    return [list[1],list[0]];
  };
  return list;
};

module.exports = { countLinesWordsBytes };
