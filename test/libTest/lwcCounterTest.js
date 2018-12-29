const assert = require("assert");
const { generateCounts } = require("../../src/lib/lwcCounter");

const fileContents = {
  "alphabates.txt": "a\nb\nc\nd",
  "numbers.txt": "1\n2\n3\n4\n5"
};

const fs = {
  readFileSync: x => fileContents[x],
  existsSync: x => {
    if (fileContents[x] == undefined) {
      return false;
    }
    return true;
  }
};

describe("generateCounts", function() {
  it("should return all counts for single file when all options are specified", function() {
    let actual = generateCounts(
      { options: ["line", "word", "byte"], files: ["alphabates.txt"] },
      fs
    );
    let expected = [
      {
        filename: "alphabates.txt",
        isExists: true,
        counts: [3, 4, 7]
      }
    ];
    assert.deepEqual(actual, expected);
  });

  it("should return object contains count of specified option", function() {
    let actual = generateCounts(
      { options: ["line"], files: ["alphabates.txt"] },
      fs
    );
    let expected = [
      {
        filename: "alphabates.txt",
        isExists: true,
        counts: [3]
      }
    ];
    assert.deepEqual(actual, expected);
  });

  it("should return all counts for multiple files when all options are specified", function() {
    let actual = generateCounts(
      {
        options: ["line", "word", "byte"],
        files: ["alphabates.txt", "numbers.txt"]
      },
      fs
    );
    let expected = [
      {
        filename: "alphabates.txt",
        isExists: true,
        counts: [3, 4, 7]
      },
      {
        filename: "numbers.txt",
        isExists: true,
        counts: [4, 5, 9]
      }
    ];
    assert.deepEqual(actual, expected);
  });

  it("should return counts of specified option when multiple options given combine", function() {
    let actual = generateCounts(
      { options: ["line", "word"], files: ["alphabates.txt"] },
      fs
    );
    let expected = [
      {
        filename: "alphabates.txt",
        isExists: true,
        counts: [3, 4]
      }
    ];
    assert.deepEqual(actual, expected);

    actual = generateCounts(
      { options: ["line", "word"], files: ["alphabates.txt", "numbers.txt"] },
      fs
    );
    expected = [
      {
        filename: "alphabates.txt",
        isExists: true,
        counts: [3, 4]
      },
      {
        filename: "numbers.txt",
        isExists: true,
        counts: [4, 5]
      }
    ];
    assert.deepEqual(actual, expected);
  });

  it("should return isExists as false when given file not exists", function() {
    let actual = generateCounts(
      {
        options: ["line", "word", "byte"],
        files: ["alphabates", "numbers.txt"]
      },
      fs
    );
    let expected = [
      {
        filename: "alphabates",
        isExists: false
      },
      {
        filename: "numbers.txt",
        isExists: true,
        counts: [4, 5, 9]
      }
    ];
    assert.deepEqual(actual, expected);
  });
});
