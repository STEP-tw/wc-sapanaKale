const { findFirstIndexOf } = require("../util/array");
const { validateOptions } = require("./checkErrors");
const { EMPTY_STRING, HYPHEN } = require("../util/constants");

const optionValue = { l: "line", w: "word", c: "byte" };

const isNotOption = function(userArg) {
  return !userArg.startsWith(HYPHEN);
};

const extractOptions = function(options) {
  return options
    .join(EMPTY_STRING)
    .split(EMPTY_STRING)
    .filter(x => x != HYPHEN);
};

const getUniqueValidOptions = function(options) {
  return ["l", "w", "c"].filter(x => options.includes(x));
};

const getClassifiedArgs = function(options, files, error) {
  return { options, files, error };
};

const parse = function(userArgs) {
  let options = ["l", "w", "c"];
  const filesStartsFrom = findFirstIndexOf(userArgs, isNotOption);
  const files = userArgs.slice(filesStartsFrom);
  if (filesStartsFrom > 0) {
    options = extractOptions(userArgs.slice(0, filesStartsFrom));
  }
  const error = validateOptions(options);
  options = getUniqueValidOptions(options);
  options = options.map(option => optionValue[option]);
  return getClassifiedArgs(options, files, error);
};

module.exports = { parse };
