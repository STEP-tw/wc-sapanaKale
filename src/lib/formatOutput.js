const { addLists } = require('../util/array');
const { alignRight } = require('../util/string');

const justifyCountsAndFilename = function (counts, filename) {
  let justifiedCounts = counts.map(count => alignRight(8, count)).join("");
  return [justifiedCounts, filename].join(" ");
};

const filterCountsList = function (filesCounts) {
  return filesCounts.map(function ({ counts }) {
    return counts;
  }).filter(x => x != undefined);
};

const getTotal = function (filesCounts) {
  let countsList = filterCountsList(filesCounts);
  let total = countsList.reduce(addLists);
  return justifyCountsAndFilename(total, "total");
};

const fileNotFoundMsg = function (filename) {
  return ["wc: ", filename, ": open: No such file or directory"].join("");
};

const getFormattedFileCountData = function ({ filename, isExists, counts }) {
  if (isExists == true) {
    return justifyCountsAndFilename(counts, filename);
  };
  return fileNotFoundMsg(filename);
};

const formatOutput = function (filesCounts) {
  let output = filesCounts.map(getFormattedFileCountData);
  if (filesCounts.length > 1) {
    let total = getTotal(filesCounts);
    output.push(total);
  };
  return output.join("\n");
};

module.exports = { formatOutput };