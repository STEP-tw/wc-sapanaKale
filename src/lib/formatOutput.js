const formatOutput = function(output) {
  let result = "      " + output.join("   ");
  return result;
};

module.exports = { formatOutput };
