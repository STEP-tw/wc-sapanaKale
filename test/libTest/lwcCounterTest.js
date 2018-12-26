const assert = require("assert");
const { countLinesWordsBytes } = require("../../src/lib/lwcCounter");

const fileContents = { "alphabates.txt": "a\nb\nc\nd" };

const fs = { readFileSync: x => fileContents[x] };

describe("countLines-Words-Bytes", function() {
  it("should return object containing the line, word, byte count", function() {
    let actual = countLinesWordsBytes(
      { option: "default", filename: "alphabates.txt" },
      fs
    );
    let expected = [3, 4, 7, "alphabates.txt"];
    assert.deepEqual(actual, expected);
  });

  it("should return array of specified option count and filename", function() {
    let actual = countLinesWordsBytes(
      { option: "line", filename: "alphabates.txt" },
      fs
    );
    let expected = [3, "alphabates.txt"];
    assert.deepEqual(actual, expected);
  });
});
