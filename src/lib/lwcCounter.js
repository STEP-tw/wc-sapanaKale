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

const getCounts = function (options, content) {
  return options.map(option => counter[option](content));
};

const counter = { line: countLines, word: countWords, byte: countBytes };

const getCountDetails = function (fs, options, filename) {
  if (!fs.existsSync(filename)) {
    return { filename: filename, isExists: false };
  };
  let content = fs.readFileSync(filename).toString();
  let counts = getCounts(options, content);
  return { filename: filename, isExists: true, counts: counts };
};

const generateCounts = function ({options, files}, fs) {
  return files.map(getCountDetails.bind(null, fs, options));
};

module.exports = { generateCounts };