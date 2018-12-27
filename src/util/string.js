const repeatCharacter = function (times, character) {
  return new Array(times).fill(character).join('');
};

const alignRight = function (totalLength, text) {
  let noOfSpaces = (totalLength - text.toString().length);
  return repeatCharacter(noOfSpaces, ' ') + text;
};

module.exports = { alignRight };