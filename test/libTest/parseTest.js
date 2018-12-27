const assert = require("assert");
const { parse } = require("../../src/lib/parse");

describe("parse", function() {
  it("should return option as default when option is not specified", function() {
    let actual = parse(["alphabates.txt"]);
    let expected = {
      options: ["default"],
      files: ["alphabates.txt"],
      error: ""
    };
    assert.deepEqual(actual, expected);
  });

  it("should return given option and filename when option is specified", function() {
    let actual = parse(["-l", "alphabates.txt"]);
    let expected = { options: ["line"], files: ["alphabates.txt"], error: "" };
    assert.deepEqual(actual, expected);
  });

  it("shold return list of files when multiple files are given", function() {
    let actual = parse(["file1", "file2"]);
    let expected = {
      options: ["default"],
      files: ["file1", "file2"],
      error: ""
    };
    assert.deepEqual(actual, expected);
  });

  it("should return option as default when specified option contains lwc", function() {
    let actual = parse(["-lwc", "file1", "file2"]);
    let expected = {
      options: ["default"],
      files: ["file1", "file2"],
      error: ""
    };
    assert.deepEqual(actual, expected);

    actual = parse(["-lc", "-lw", "file1", "file2"]);
    expected = { options: ["default"], files: ["file1", "file2"], error: "" };
    assert.deepEqual(actual, expected);
  });

  it("should return option list when multiple options are given", function() {
    let actual = parse(["-lw", "-wl", "file1"]);
    let expected = { options: ["line", "word"], files: ["file1"], error: "" };
    assert.deepEqual(actual, expected);
  });

  it("should return error when provided option is invalid", function() {
    let actual = parse(["-glw", "file1"]);
    let error = "wc: illegal option -- g\n";
    error += "usage: wc [-clmw] [file ...]";
    let expected = {
      options: ["g", "l", "w"],
      files: ["file1"],
      error: error
    };
    assert.deepEqual(actual, expected);

    actual = parse(["-ltw", "-lp", "file1"]);
    error = "wc: illegal option -- t\n";
    error += "usage: wc [-clmw] [file ...]";
    expected = {
      options: ["l", "t", "w", "p"],
      files: ["file1"],
      error: error
    };
    assert.deepEqual(actual, expected);
  });

  it("should return options sequence lwc when given options are not", function(){
    let actual = parse(["-wl", "file1"]);
    let expected = { options: ["line", "word"], files: ["file1"], error: "" };
    assert.deepEqual(actual, expected);
  });
});
