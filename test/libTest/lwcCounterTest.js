const assert = require("assert");
const { countLinesWordsBytes } = require("../../src/lib/lwcCounter");

const fileContents = { "alphabates.txt": "a\nb\nc\nd",
"numbers.txt": "1\n2\n3\n4\n5" };

const fs = { readFileSync: x => fileContents[x] };

describe("countLines-Words-Bytes", function() {
  it("should return default list containing the line, word, byte count and filename", function() {
    let actual = countLinesWordsBytes(
      { option: "default", files: ["alphabates.txt"] },
      fs
    );
    let expected = [[3, 4, 7, "alphabates.txt"]];
    assert.deepEqual(actual, expected);
  });

  it("should return list contains specified option count and filename", function() {
    let actual = countLinesWordsBytes(
      { option: "line", files: ["alphabates.txt"] },
      fs
    );
    let expected = [[3, "alphabates.txt"]];
    assert.deepEqual(actual, expected);
  });

  it("should return array of default list for multiple files", function() {
    let actual = countLinesWordsBytes(
    { option: "default", files: ["alphabates.txt", "numbers.txt"] },
    fs
    );
    let expected = [[3,4,7,"alphabates.txt"],
    [4,5,9,"numbers.txt"]];
    assert.deepEqual(actual, expected);
  });
});
