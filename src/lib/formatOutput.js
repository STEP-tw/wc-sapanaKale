const { addLists } = require('../util/array');
const { alignRight } = require('../util/string');
const { fileNotFoundMsg } = require('./checkErrors');
const { SPACE, EMPTY_STRING, NEWLINE } = require('../util/constants');

const justifyCountsAndFilename = function (counts, filename) {
  const justifiedCounts = counts.map(count => alignRight(8, count)).join(EMPTY_STRING);
  return [justifiedCounts, filename].join(SPACE);
};

const filterCountsList = function (filesCounts) {
  return filesCounts.map(function ({ counts }) {
    return counts;
  }).filter(x => x != undefined);
};

const getTotal = function (filesCounts) {
  const countsList = filterCountsList(filesCounts);
  const total = countsList.reduce(addLists);
  return justifyCountsAndFilename(total, "total");
};

const getFormattedFileCountData = function ({ filename, isExists, counts }) {
  if (isExists == true) {
    return justifyCountsAndFilename(counts, filename);
  };
  return fileNotFoundMsg(filename);
};

const formatOutput = function (filesCounts) {
  const output = filesCounts.map(getFormattedFileCountData);
  if (filesCounts.length > 1) {
    const total = getTotal(filesCounts);
    output.push(total);
  };
  return output.join(NEWLINE);
};

module.exports = { formatOutput };