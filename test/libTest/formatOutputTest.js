const assert = require("assert");
const { formatOutput } = require("../../src/lib/formatOutput");

describe("formatOutput", function() {
  it("should return the given output in string", function() {
    let actual = formatOutput([3, 4, 7, "alphabates.txt"]);
    let expected = "      3   4   7   alphabates.txt";
    assert.deepEqual(actual, expected);
  });

  it("should return the given output in string", function() {
    let actual = formatOutput([3, "alphabates.txt"]);
    let expected = "      3   alphabates.txt";
    assert.deepEqual(actual, expected);
  });
});
