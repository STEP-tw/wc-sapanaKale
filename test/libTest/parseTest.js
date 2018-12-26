const assert = require("assert");
const { parse } = require("../../src/lib/parse");

describe("parse", function() {
  it("should return option as default when option is not specified", function() {
    let actual = parse(["alphabates.txt"]);
    let expected = { option: "default", filename: "alphabates.txt" };
    assert.deepEqual(actual, expected);
  });

  it("should return given option and filename when option is specified", function() {
    let actual = parse(["-l", "alphabates.txt"]);
    let expected = { option: "line", filename: "alphabates.txt" };
    assert.deepEqual(actual, expected);
  });
});
