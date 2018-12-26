const classifyArgs = function(userArgs) {
  const firstArg = userArgs[0];
  const secondArg = userArgs[1];
  let option = "default";
  let filename = firstArg;
  if (firstArg.startsWith("-")) {
    option = firstArg[1];
    filename = secondArg;
  }
  return { option, filename };
};

const ValidOptions = ["l", "w", "c"];

const options = { l: "line", w: "word", c: "byte" };

const isValidOption = function(option) {
  return ValidOptions.includes(option);
};

const parse = function(userArgs) {
  let { option, filename } = classifyArgs(userArgs);
  if (isValidOption(option)) {
    option = options[option];
  }
  return { option, filename };
};

module.exports = { parse };
