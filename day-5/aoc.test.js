"use strict"; 

const { findClosestLocation, parseMaps, mapSourceToDestination } = require("./aoc");
const test_file = "test-file.txt";

describe("findClosestLocation", function() {
    test("returs the correct location", async function() {
        expect(await findLowestLocation(test_file)).toEqual(35);
    })
})

describe("mapSourceToDestination", function() {
    test("returns correct destination for given source", function() {
        const seed_to_soil = [[50, 98, 2], [52, 50, 48]];

        expect(mapSourceToDestination(seed_to_soil, 79)).toEqual(81);
        expect(mapSourceToDestination(seed_to_soil, 14)).toEqual(14);
        expect(mapSourceToDestination(seed_to_soil, 55)).toEqual(57);
        expect(mapSourceToDestination(seed_to_soil, 13)).toEqual(13);

    })
})


