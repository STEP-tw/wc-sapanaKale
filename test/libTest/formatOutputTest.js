const assert = require("assert");
const { formatOutput } = require("../../src/lib/formatOutput");

describe("formatOutput", function () {
  it("should return output content in string for single files", function () {
    let actual = formatOutput([[3, 4, 7, "alphabates.txt"]]);
    let expected = "      3   4   7   alphabates.txt";
    assert.deepEqual(actual, expected);

    actual = formatOutput([[3, "alphabates.txt"]]);
    expected = "      3   alphabates.txt";
    assert.deepEqual(actual, expected);
  });

  it("should return output content with total for multiple files", function () {
    let actual = formatOutput([[3, 4, 7, "alphabates.txt"],
    [4, 5, 9, "numbers.txt"]]);
    let expected = ["      3   4   7   alphabates.txt",
      "      4   5   9   numbers.txt",
      "      7   9   16   total"].join("\n");
    assert.deepEqual(actual, expected);
  });
});