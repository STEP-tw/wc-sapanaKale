const assert = require("assert");
const { generateCounts } = require("../../src/lib/lwcCounter");

const fileContents = {
	"alphabates.txt": "a\nb\nc\nd",
	"numbers.txt": "1\n2\n3\n4\n5"
};

const readFile = function (path, endcoding, callback) {
	let data = fileContents[path];
	let err = true;
	if(Object.keys(fileContents).includes(path)) {
		err = null;
	};
	return callback(err, data);
};

const fs = {
	readFile: readFile
};

const printer = x => x;	

describe("generateCounts", function() {
  it("should return all counts for single file when all options are specified", function() {
    let actual = generateCounts(
      { options: ["line", "word", "byte"], files: ["alphabates.txt"] },
			fs,
			printer
    );
    let expected = '       3       4       7 alphabates.txt';
    assert.deepEqual(actual, expected);
  });

  it("should return object contains count of specified option", function() {
    let actual = generateCounts(
      { options: ["line"], files: ["alphabates.txt"] },
			fs,
			printer
    );
    let expected = '       3 alphabates.txt';
    assert.deepEqual(actual, expected);
  });

  it("should return all counts for multiple files when all options are specified", function() {
    let actual = generateCounts(
      {
        options: ["line", "word", "byte"],
        files: ["alphabates.txt", "numbers.txt"]
      },
			fs,
			printer
    );
		let expected = ['       3       4       7 alphabates.txt',
										'       4       5       9 numbers.txt',
										'       7       9      16 total'].join("\n")
    assert.deepEqual(actual, expected);
  });

  it("should return counts of specified option when multiple options given combine", function() {
    let actual = generateCounts(
      { options: ["line", "word"], files: ["alphabates.txt"] },
			fs,
			printer
    );
    let expected = '       3       4 alphabates.txt';
    assert.deepEqual(actual, expected);

    actual = generateCounts(
      { options: ["line", "word"], files: ["alphabates.txt", "numbers.txt"] },
			fs,
			printer
    );
		expected = ['       3       4 alphabates.txt',
		            '       4       5 numbers.txt',
                '       7       9 total'].join("\n")
    assert.deepEqual(actual, expected);
  });

  it("should return isExists as false when given file not exists", function() {
    let actual = generateCounts(
      {
        options: ["line", "word", "byte"],
        files: ["alphabates", "numbers.txt"]
      },
			fs,
			printer
    );
		let expected = ['wc: alphabates: open: No such file or directory',
		                '       4       5       9 numbers.txt',
		                '       4       5       9 total'].join("\n")
    assert.deepEqual(actual, expected);
  });
});
