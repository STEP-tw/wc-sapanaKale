const { findFirstIndexOf } = require("../util/array");
const { validateOptions } = require("./checkErrors");

const optionValue = { l: "line", w: "word", c: "byte" };

const isNotOption = function (userArg) {
  return !userArg.startsWith("-");
};

const extractOptions = function (options) {
  return options
    .join("")
    .split("")
    .filter(x => x != "-");
};

const getUniqueValidOptions = function (options) {
  return ["l", "w", "c"].filter(x => options.includes(x));
};

const getClassifiedArgs = function (options, files, error) {
  return { options, files, error };
};

const parse = function (userArgs) {
  let options = ["l", "w", "c"];
  let filesStartsFrom = findFirstIndexOf(userArgs, isNotOption);
  let files = userArgs.slice(filesStartsFrom);
  if (filesStartsFrom > 0) {
    options = extractOptions(userArgs.slice(0, filesStartsFrom));
  };
  let error = validateOptions(options)
  options = getUniqueValidOptions(options);
  options = options.map(option => optionValue[option]);
  return getClassifiedArgs(options, files, error);
};

module.exports = { parse };