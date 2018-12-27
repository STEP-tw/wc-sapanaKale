const { findFirstIndexOf, extractSet } = require("../util/array");

const validOptions = ["default", "l", "w", "c"];

const defaultOptions = ["lwc", "lcw", "wlc", "wcl", "cwl", "clw"];

const optionValue = { l: "line", w: "word", c: "byte", default: "default" };

const isNotOption = function (userArg) {
  return !userArg.startsWith("-");
};

const extractUniqueOptions = function (options) {
  options = options
    .join("")
    .split("")
    .filter(x => x != "-");
  return extractSet(options);
};

const isOptionDefault = function (options) {
  return options[0] == "default" || defaultOptions.includes(options.join(""));
};

const classifyArgs = function (userArgs) {
  let options = ["default"];
  let filesStartsFrom = findFirstIndexOf(userArgs, isNotOption);
  let optionsUpto = filesStartsFrom;
  let files = userArgs.slice(filesStartsFrom);
  if (optionsUpto > 0) {
    options = userArgs.slice(0, optionsUpto);
    options = extractUniqueOptions(options);
  }
  if (isOptionDefault(options)) {
    return { options: ["default"], files, error: "" };
  }
  return { options, files, error: "" };
};

const sortOptions = function(options) {
  if (options[0] == "byte" || options[1] == "line") {
    return [options[1], options[0]];
  }
  return options;
};

const isInvalidOption = function (option) {
  return !validOptions.includes(option);
};

const invalidOptionMsg = function (option) {
  return ["wc: illegal option -- ", option].join("");
};

const usageMsg = "usage: wc [-clmw] [file ...]";

const parse = function (userArgs) {
  let { options, files, error } = classifyArgs(userArgs);
  let pos = findFirstIndexOf(options, isInvalidOption);
  if (pos != -1) {
    error = [invalidOptionMsg(options[pos]), usageMsg].join("\n");
  } else {
    options = options.map(option => optionValue[option]);
    if(options.length > 1){
    options = sortOptions(options);
    };
  };
  return { options, files, error };
};

module.exports = { parse };
