"use strict"; 

const { sumScratcherScores, parseScratcher, scoreScratcher } = require("./aoc");
const test_file = "test-file.txt";

describe("sumScratcherScores", function() {
    test("returs the correct sum of scratcher scores", async function() {
        expect(await sumScratcherScores(test_file)).toEqual(13);
    })
})

describe("parseScratcher", function() {
    test("returns the correct arrays from a line of scratcher info", function() {
        const line_1 = "Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53";
        const line_2 = "Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1";
        const line_3 = "Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11";

        expect(parseScratcher(line_1))
          .toEqual([[41, 48, 83, 86, 17], [83, 86, 6, 31, 17, 9, 48, 53]])
        expect(parseScratcher(line_2))
          .toEqual([[1, 21, 53, 59, 44], [69, 82, 63, 72, 16, 21, 14, 1]])
        expect(parseScratcher(line_3))
          .toEqual([[31, 18, 13, 56, 72], [74, 77, 10, 23, 35, 67, 36, 11]])
    })
})

describe("scoreScratcher", function() {
    test("returns correct scratcher score", function() {
        const scratcher_1 = [[41, 48, 83, 86, 17], [83, 86, 6, 31, 17, 9, 48, 53]];
        const scratcher_2 = [[1, 21, 53, 59, 44], [69, 82, 63, 72, 16, 21, 14, 1]];
        const scratcher_3 = [[31, 18, 13, 56, 72], [74, 77, 10, 23, 35, 67, 36, 11]];

        expect(scoreScratcher(scratcher_1[0], scratcher_1[1])).toEqual(8);
        expect(scoreScratcher(scratcher_2[0], scratcher_2[1])).toEqual(2);
        expect(scoreScratcher(scratcher_3[0], scratcher_3[1])).toEqual(0);
    })
})



