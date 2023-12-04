"use strict"; 

const { sumPartNumbers, sumGearRatios } = require("./aoc");
const test_file = "test-file.txt";
const test_2 = "test-2.txt";
const test_3 = "test-3.txt";
const test_4 = "test-4.txt";

describe("sumGearRatios", function() {
    test("returs the correct sum of gear ratios", async function() {
        expect(await sumGearRatios(test_file)).toEqual(467835);
    })
})

describe("sumPartNumbers", function() {
    test("returns the correct sum of part numbers", async function() {
        expect(await sumPartNumbers(test_file)).toEqual(4361);
        expect(await sumPartNumbers(test_2)).toEqual(413);
        expect(await sumPartNumbers(test_3)).toEqual(925);
        expect(await sumPartNumbers(test_4)).toEqual(22);
    })
})

