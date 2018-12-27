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

const countAll = function (content) {
  return [
    countLines(content),
    countWords(content),
    countBytes(content)
  ];
};

const getCounts = function (options, content) {
  if (options[0] == "default") {
    return countAll(content);
  };
  return options.map(option => counter[option](content));
};

const counter = { line: countLines, word: countWords, byte: countBytes };

const generateCounts = function({ options, files }, fs) {
  return files.map(function(filename) {
    let countDetails = {filename: filename, isExists: true};
    if(!fs.existsSync(filename)){
      countDetails.isExists = false;
      return countDetails;
    };
    let content = fs.readFileSync(filename).toString();
    countDetails.counts = getCounts(options, content);
    return countDetails;
  });
};



module.exports = { generateCounts };
