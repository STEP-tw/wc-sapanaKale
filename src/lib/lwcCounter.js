const { SPACE, NEWLINE, EMPTY_STRING } = require("../util/constants");
const {formatOutput } = require('./formatOutput');

const countLines = function(content) {
  return content.split(NEWLINE).length - 1;
};

const countWords = function(content) {
  return content
    .split(NEWLINE)
    .join(SPACE)
    .split(SPACE)
    .filter(x => x != EMPTY_STRING).length;
};

const countBytes = function(content) {
  return content.length;
};

const getCounts = function(options, content) {
  return options.map(option => counter[option](content));
};

const counter = { line: countLines, word: countWords, byte: countBytes };

const createFileDetails = function (filename, pos) {
	return { filename: filename, pos: pos, isExists: false };
};

const sortCountList = function (countList) {
	let sortedCountList = [];
	for (let pos in countList) {
		sortedCountList[pos] = countList.filter(x => x["pos"] == pos)[0];
	}
	return sortedCountList;
};

const getCountDetails = function (fileDetails, err, content, printer) {
	let { filename, pos, options, noOfFiles, countList } = fileDetails;
	let result = createFileDetails(filename, pos);
	if (err == null) {
		result["isExists"] = true;
		result["counts"] = getCounts(options, content);
	}
	countList.push(result);
	if (countList.length == noOfFiles) {
		return printer(formatOutput(sortCountList(countList)));
	}
};

const generateCounts = function ({ options, files }, fs, printer) {
	let countList = [];
	let result;
	for (let pos in files) {
		let parameters = {
			filename: files[pos],
			pos,
			options,
			noOfFiles: files.length,
			countList,
		}
		 result = fs.readFile(files[pos], "utf8", (err, content) => getCountDetails(parameters,err, content, printer));
	}
	return result;
};

module.exports = { generateCounts };