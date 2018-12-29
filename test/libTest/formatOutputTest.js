const assert = require("assert");
const { formatOutput } = require("../../src/lib/formatOutput");
const { NEWLINE } = require("../../src/util/constants");

describe("formatOutput", function() {
  it("should return output content in string for single file", function() {
    let actual = formatOutput([
      {
        filename: "alphabates.txt",
        isExists: true,
        counts: [3, 4, 7]
      }
    ]);
    let expected = "       3       4       7 alphabates.txt";
    assert.deepEqual(actual, expected);

    actual = formatOutput([
      {
        filename: "alphabates.txt",
        isExists: true,
        counts: [3]
      }
    ]);
    expected = "       3 alphabates.txt";
    assert.deepEqual(actual, expected);
  });

  it("should return output content with error when file not found", function() {
    let actual = formatOutput([
      {
        filename: "alphabates",
        isExists: false
      },
      {
        filename: "numbers.txt",
        isExists: true,
        counts: [4, 5, 9]
      }
    ]);
    let expected = [
      "wc: alphabates: open: No such file or directory",
      "       4       5       9 numbers.txt",
      "       4       5       9 total"
    ].join(NEWLINE);
    assert.deepEqual(actual, expected);
  });

  it("should return output content with total for multiple files", function() {
    let actual = formatOutput([
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
    ]);
    let expected = [
      "       3       4       7 alphabates.txt",
      "       4       5       9 numbers.txt",
      "       7       9      16 total"
    ].join(NEWLINE);
    assert.deepEqual(actual, expected);
  });
});
