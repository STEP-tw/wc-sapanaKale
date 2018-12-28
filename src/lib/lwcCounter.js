const { SPACE, NEWLINE, EMPTY_STRING } = require('../util/constants');

const countLines = function (content) {
  return content.split(NEWLINE).length - 1;
};

const countWords = function (content) {
  return content
    .split(NEWLINE)
    .join(SPACE)
    .split(SPACE)
    .filter(x => x != EMPTY_STRING).length;
};

const countBytes = function (content) {
  return content.length;
};

const getCounts = function (options, content) {
  return options.map(option => counter[option](content));
};

const counter = { line: countLines, word: countWords, byte: countBytes };

const getCountDetails = function (fs, options, filename) {
  if (!fs.existsSync(filename)) {
    return { filename: filename, isExists: false };
  };
  const content = fs.readFileSync(filename).toString();
  const counts = getCounts(options, content);
  return { filename: filename, isExists: true, counts: counts };
};

const generateCounts = function ({options, files}, fs) {
  return files.map(getCountDetails.bind(null, fs, options));
};

module.exports = { generateCounts };