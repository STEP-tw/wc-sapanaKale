const ValidOptions = ["l", "w", "c"];

const defaultOptions = ["default", "-lwc", "-lcw", "-wlc", "-wcl", "-cwl", "-clw"];

const optionValue = { l: "line", w: "word", c: "byte" };

const isOption = function (userArg) {
  return userArg.startsWith("-");
};

const isNotOption = function (userArg) {
  return !isOption(userArg);
};

const isValidOption = function (option) {
  return ValidOptions.includes(option);
};

const findFirstIndexOf = function (list, predicate) {
let allOccurences = list.filter(predicate);
  return list.indexOf(allOccurences[0]);
};

const intersection = function (list1, list2) {
  return list2.filter(x => list1.includes(x));
};

const isContainsDefaultOption = function (options) {
  return intersection(defaultOptions, options).length != 0;
};

const extractSet = function (list) {
  let result = [];
  list.forEach(x => {if(!result.includes(x)){ result.push(x) }});
  return result;
};

const isSame = function(list1,list2) {
  return list1.every(x => list2.includes(x));
}

const classifyArgs = function (userArgs) {
  let options = ["default"];
  let filesStartsFrom = findFirstIndexOf(userArgs, isNotOption);
  let optionsUpto = filesStartsFrom;
  let files = userArgs.slice(filesStartsFrom);
  if(optionsUpto > 0){
    options = userArgs.slice(0, optionsUpto);
  };
  if(isContainsDefaultOption(options)) {
    options = ["default"];
    return {options, files};
  };
  options = options.join("").split("").filter(x => x != '-');
  options = (extractSet(options));
  if(isSame(ValidOptions, options)) {
    return {options:["default"],files};
  };
  return { options, files };
};

const parse = function (userArgs) {
  let { options, files } = classifyArgs(userArgs);
  options = options.map(function(option){
    if (isValidOption(option)) {
      return optionValue[option];
    };
    return option;
  });
  return { options, files };
};

module.exports = { parse };