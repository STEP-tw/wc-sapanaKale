const { findFirstIndexOf } = require("../util/array");
const { EMPTY_STRING, NEWLINE } = require("../util/constants");

const allValidOptions = ["l", "w", "c"];

const isInvalidOption = function(option) {
  return !allValidOptions.includes(option);
};

const invalidOptionMsg = function(option) {
  return ["wc: illegal option -- ", option].join(EMPTY_STRING);
};

const usageMsg = "usage: wc [-clmw] [file ...]";

const validateOptions = function(options) {
  const invalidOptionPos = findFirstIndexOf(options, isInvalidOption);
  if (invalidOptionPos != -1) {
    return [invalidOptionMsg(options[invalidOptionPos]), usageMsg].join(
      NEWLINE
    );
  }
  return "";
};

const fileNotFoundMsg = function(filename) {
  return ["wc: ", filename, ": open: No such file or directory"].join(
    EMPTY_STRING
  );
};

module.exports = { fileNotFoundMsg, validateOptions };
