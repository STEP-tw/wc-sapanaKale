const assert = require("assert");
const {
  countLinesWordsBytes,
  formatOutput
} = require("../../src/lib/lwcCounter");

const fileContents = { "alphabates.txt": "a\nb\nc\nd" };

const fs = { readFileSync: x => fileContents[x] };

describe("countLines-Words-Bytes", function() {
  it("should return object containing the line, word, byte count", function() {
    let actual = countLinesWordsBytes("alphabates.txt", fs);
    let expected = { lines: 3, words: 4, bytes: 7, filename: "alphabates.txt" };
    assert.deepEqual(actual, expected);
  });
});

describe("formatOutput", function() {
  it("should return the given output in string", function() {
    let actual = formatOutput({
      lines: 3,
      words: 4,
      bytes: 7,
      filename: "alphabates.txt"
    });
    let expected = "      3    4    7 alphabates.txt";
    assert.deepEqual(actual, expected);
  });
});
