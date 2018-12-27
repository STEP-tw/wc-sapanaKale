const repeatCharacter = function (times, character) {
  return new Array(times).fill(character).join('');
};

const alignRight = function (number) {
  let noOfSpaces = (8 - number.toString().length);
  return repeatCharacter(noOfSpaces, ' ') + number;
};

const addLists = function (list1, list2) {
  let result = [];
  for (let index = 0; index < list1.length; index++) {
    result.push(list1[index] + list2[index]);
  };
  return result;
};

const filterCountsList = function (filesCounts) {
  return filesCounts.map(function ({ counts }) {
    return counts;
  }).filter(x => x != undefined);
};

const getTotal = function (countsList) {
  let total = countsList.reduce(addLists);
  total = total.map(sum => alignRight(sum)).join('');
  return total + " total";
};

const formatCounts = function (counts, filename) {
  let alignedCounts = counts.map(count => alignRight(count));
  alignedCounts.push(" " + filename);
  return alignedCounts.join("");
};

const fileNotFoundMsg = function (filename) {
  return ["wc: ", filename, ": open: No such file or directory"].join("");
};

const formatOutput = function (filesCounts) {
  let formattedOutput = filesCounts.map(function ({ filename, isExists, counts }) {
    if (isExists == false) {
      return fileNotFoundMsg(filename);
    };
    return formatCounts(counts, filename);
  });
  if (filesCounts.length > 1) {
    let countsList = filterCountsList(filesCounts);
    let total = getTotal(countsList);
    formattedOutput.push(total);
  };
  return formattedOutput.join("\n");
};

module.exports = { formatOutput };