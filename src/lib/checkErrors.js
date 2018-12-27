const { findFirstIndexOf } = require('../util/array');

const allValidOptions = ["l", "w", "c"];

const isInvalidOption = function (option) {
  return !allValidOptions.includes(option);
};

const invalidOptionMsg = function (option) {
  return ["wc: illegal option -- ", option].join("");
};

const usageMsg = "usage: wc [-clmw] [file ...]";

const validateOptions = function (options) {
  let invalidOptionPos = findFirstIndexOf(options, isInvalidOption);
  if (invalidOptionPos != -1) {
    return [invalidOptionMsg(options[invalidOptionPos]), usageMsg].join("\n");
  };
  return '';
};

const fileNotFoundMsg = function (filename) {
  return ["wc: ", filename, ": open: No such file or directory"].join("");
};

module.exports = { fileNotFoundMsg, validateOptions };