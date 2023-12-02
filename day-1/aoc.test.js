"use strict"; 

const { sumCalibrationValues, extractNum } = require("./aoc");
const test_file = "test-file.txt";

describe("sumCalibrationValues", function() {
    test("returns the correct sum", async function() {
        expect(await sumCalibrationValues(test_file)).toEqual(314);
    })
})

describe("extractNum", function() {
    test("returns correct 2 digit number for integers", function() {
        expect(extractNum("1abc2")).toEqual(12);
        expect(extractNum("pqr3stu8vwx")).toEqual(38);
        expect(extractNum("a1b2c3d4e5f")).toEqual(15);
        expect(extractNum("treb7uchet")).toEqual(77);
    })

    test("returns correct 2 digits for spelled out number strings", function() {
        expect(extractNum("two1nine")).toEqual(29);
        expect(extractNum("eightwothree")).toEqual(83);
        expect(extractNum("abcone2threexyz")).toEqual(13);
        expect(extractNum("xtwone3four")).toEqual(24);
        expect(extractNum("4nineeightseven2")).toEqual(42);
        expect(extractNum("zoneight234")).toEqual(14);
        expect(extractNum("8fourfouroneightr")).toEqual(88);
    })
})