const classifyArgs = function(userArgs) {
  const firstArg = userArgs[0];
  let option = "default";
  let files = userArgs.slice(0);
  if (firstArg.startsWith("-")) {
    option = firstArg[1];
    files = userArgs.slice(1);
  }
  return { option, files };
};

const ValidOptions = ["l", "w", "c"];

const options = { l: "line", w: "word", c: "byte" };

const isValidOption = function(option) {
  return ValidOptions.includes(option);
};

const parse = function(userArgs) {
  let { option, files } = classifyArgs(userArgs);
  if (isValidOption(option)) {
    option = options[option];
  }
  return { option, files };
};

module.exports = { parse };
