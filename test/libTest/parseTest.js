const assert = require("assert");
const { parse } = require("../../src/lib/parse");

describe("parse", function() {
  it("should return option as default when option is not specified", function() {
    let actual = parse(["alphabates.txt"]);
    let expected = { options: ["default"], files: ["alphabates.txt"] };
    assert.deepEqual(actual, expected);
  });

  it("should return given option and filename when option is specified", function() {
    let actual = parse(["-l", "alphabates.txt"]);
    let expected = { options: ["line"], files: ["alphabates.txt"] };
    assert.deepEqual(actual, expected);
  });

  it("shold return list of files when multiple files are given", function(){
    let actual = parse(["file1", "file2"]);
    let expected = { options: ["default"], files: ["file1", "file2"]};
    assert.deepEqual(actual, expected);
  });

  it("should return option as default when specified option contains lwc", function() {
    let actual = parse(["-lwc","file1","file2"]);
    let expected = { options: ["default"], files: ["file1", "file2"]};
    assert.deepEqual(actual, expected);

    actual = parse(["-lc","-lw","file1","file2"]);
    expected = { options: ["default"], files: ["file1", "file2"]};
    assert.deepEqual(actual, expected);
  });

  it("should return option list when multiple options are given", function() {
    let actual = parse(["-lw","-wl","file1"]);
    let expected = {options: ["line","word"], files: ["file1"]};
    assert.deepEqual(actual, expected);
  });
});
