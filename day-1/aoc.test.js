"use strict"; 

const { default: test } = require("node:test");
const { sumCalibrationValues, extractNum } = require("./aoc");
const test_file = "test-file.txt";

describe("sumCalibrationValues", function() {
    test("returns the correct sum", async function() {
        expect(await sumCalibrationValues(test_file)).toEqual(142);
    })
})

describe("extractNum", function() {
    test("returns correct 2 digit number for integers", function() {
        expect(extractNum("1abc2")).toEqual(12);
        expect(extractNum("pqr3stu8vwx")).toEqual(38);
        expect(extractNum("a1b2c3d4e5f")).toEqual(15);
        expect(extractNum("treb7uchet")).toEqual(77);
    })
})