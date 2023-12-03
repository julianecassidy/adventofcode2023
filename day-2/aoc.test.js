"use strict"; 

const { sumPossibleGameIds, parseLine, isGamePossible, isHandPossible } = require("./aoc");
const test_file = "test-file.txt";

describe("sumPossibleGameIds", function() {
    test("returns the correct sum", async function() {
        expect(await sumPossibleGameIds(test_file)).toEqual(8);
    })
})

describe("isGamePossible", function() {
    test("returns true for possible game", function() {
        const game_1 = isGamePossible(
            "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green"
        );
        expect(game_1).toBe(true);

        const game_2 = isGamePossible(
            "Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue"
        );
        expect(game_2).toBe(true);

        const game_3 = isGamePossible(
            "Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green"
        );
        expect(game_3).toBe(true);
    })    

    test("returns false for impossible game", function() {
        const game_1 = isGamePossible(
            "Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red"
        );
        expect(game_1).toBe(false);

        const game_2 = isGamePossible(
            "Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red"
        );
        expect(game_2).toBe(false);
    })
})

describe("isHandPossible", function() {
    test("returns true for possible hand", function() {
        expect(isHandPossible({red: 2, green: 2})).toBe(true);
        expect(isHandPossible({red: 1, green: 2, blue: 6})).toBe(true);
        expect(isHandPossible({blue: 14, green: 8})).toBe(true);
        expect(isHandPossible({red: 12, green: 13})).toBe(true);
    })

    test("returns false for impossible hand", function() {
        expect(isHandPossible({green: 8, blue: 6, red: 20})).toBe(false);
        expect(isHandPossible({red: 1, green: 14})).toBe(false);
        expect(isHandPossible({green: 3, blue: 15, red: 14})).toBe(false);
    })
})

describe("parseLine", function() {
    test("returns correct object from game details", function() {
        const game_1 = parseLine(
            "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green"
        );
        expect(game_1).toMatchObject({
            0: {blue: 3, red: 4}, 
            1: {red: 1, green: 2, blue: 6}, 
            2: {green: 2}
        });

        const game_2 = parseLine(
            "Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue"
        );
        expect(game_2).toMatchObject({
            0: {blue: 1, green: 2}, 
            1: {green: 3, blue: 4, red: 1}, 
            2:{blue: 1, green: 1}
        });
    })
})