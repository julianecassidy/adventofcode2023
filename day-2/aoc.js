"use strict"; 

const os = require("os");
const fs = require('fs/promises');

/* Problem: To get information, once a bag has been loaded with cubes, the Elf
will reach into the bag, grab a handful of random cubes, show them to you, and
then put them back in the bag. He'll do this a few times per game.

You play several games and record the information from each game (your puzzle
input). Each game is listed with its ID number (like the 11 in Game 11: ...)
followed by a semicolon-separated list of subsets of cubes that were revealed
from the bag (like 3 red, 5 green, 4 blue).

For example, the record of a few games might look like this:

Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green Game 2: 1 blue, 2 green;
3 green, 4 blue, 1 red; 1 green, 1 blue Game 3: 8 green, 6 blue, 20 red; 5 blue,
4 red, 13 green; 5 green, 1 red Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red;
3 green, 15 blue, 14 red Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green

In game 1, three sets of cubes are revealed from the bag (and then put back
again). The first set is 3 blue cubes and 4 red cubes; the second set is 1 red
cube, 2 green cubes, and 6 blue cubes; the third set is only 2 green cubes.

The Elf would first like to know which games would have been possible if the bag
contained only 12 red cubes, 13 green cubes, and 14 blue cubes?

In the example above, games 1, 2, and 5 would have been possible if the bag had
been loaded with that configuration. However, game 3 would have been impossible
because at one point the Elf showed you 20 red cubes at once; similarly, game 4
would also have been impossible because the Elf showed you 15 blue cubes at
once. If you add up the IDs of the games that would have been possible, you get
8.

Determine which games would have been possible if the bag had been loaded with
only 12 red cubes, 13 green cubes, and 14 blue cubes. What is the sum of the IDs
of those games?
*/

const MAX_CUBES = {
    red: 12,
    green: 13,
    blue: 14
};

/** sumCubePowers: given a file path of game data, open the file, parse the
 * data, and add together the powers of each game. */
async function sumCubePowers(filepath) {
    const file = await fs.readFile(filepath, "utf-8");
    const lines = getLinesFromString(file);

    let sum = 0;

    for(let i = 0; i < lines.length; i++) {
        sum += findPower(lines[i]);
    }

    return sum;

}

/** findPower: given a string of game details, return an integer representing
 * the power of a game which is the minimum number of each color cubes needed
 * for a given game multiplied */
function findPower(game) {
    const hands = parseLine(game);

    let red = 0;
    let green = 0;
    let blue = 0;

    for (let hand in hands) {
        console.log("hand", hands[hand]);
        const currHand = hands[hand]

        if (currHand.red > red) {
            red = currHand.red;
        }

        if (currHand.green > green) {
            green = currHand.green;
        }

        if (currHand.blue > blue) {
            blue = currHand.blue;
        }
    }

    return red * green * blue;


    // parse game into hands
    // initiate variables for different color maxes
    // iterate through hands
        // iterate through hand
            // determine max number for each color
}

/** sumPossibleGameIds: given a file path of game data, open the file, parse the
data, and add together the ids of any games that are possible.
 */
async function sumPossibleGameIds(filepath) {
    const file = await fs.readFile(filepath, "utf-8");
    const lines = getLinesFromString(file);

    let sum = 0;

    for(let i = 0; i < lines.length; i++) {
        if (isGamePossible(lines[i])) {
            sum = sum + i + 1;
        }
    }

    return sum;
}

/** isGamePossible: given a string of game details, returns a boolean for
 * whether the game is possible.
 */
function isGamePossible(game) {
    const hands = parseLine(game);

    for (let hand in hands) {
        if (!isHandPossible(hands[hand])) {
            return false;
        }
    }

    return true;

    // parse game line
    // loop through object and call isHandPossible on each nested hand
}

/** isHandPossible: given an object {red: 2, green: 2}, tests if the number of
 * cubes of each color is less than or equal to the corresponding amounts in
 * MAX_CUBES. Returns a boolean.
 */
function isHandPossible(hand) {
    for (let color in hand) {
        if (hand[color] > MAX_CUBES[color]) {
            return false;
        }
    }
    
    return true;
}

/** parseLine: given a string, return an object: {round: {color:number}} 
 *   ex. Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green -->
 *       {1: {red: 2, green: 2}, 2: {...}, ...}
 */
function parseLine(gameDetails) {
    const game = {};

    const colonIdx = gameDetails.indexOf(":");
    gameDetails = gameDetails.slice(colonIdx + 1);

    const hands = gameDetails.split(";");
    for (let i = 0; i < hands.length; i++) {
        game[i] = {};
        const colors = hands[i].split(",");

        for(let color of colors) {
            const trimmed = color.trim();
            const numAndColor = trimmed.split(" ");
            game[i][numAndColor[1]] = Number(numAndColor[0]);
        }
    }

    return game;

    // initiate a game object
    // find the colon and slice after it to remove the game label
    // split the string on the ; --> [" 3 blue, 4 red", ...]
    // iterate through that array
        // add a new round to object
        // split on the comma --> [" 3 blue", " 4 red"]
        // split on the space --> [" 3", " blue"]
        // convert this to a key value pair, strip out white space --> "blue": 3
        // add that pair to line object

}

/** getLinesFromString: Takes string input.
 * Returns an array containing each non-empty line of file as an element.
 */
function getLinesFromString(string) {
    // Using the EOL constant from the node os module // to identify the
    // correct end-of-line (EOL) character // that is specified by the
    // operating system it's running on // this ensures we always know how to
    // identify the end of a line // \n on Linux and macOS, \r\n on Windows.
    return (
      string
        .split(os.EOL)
        .filter(u => u !== "")
    );
  }


module.exports = { 
    sumPossibleGameIds, 
    parseLine, 
    isGamePossible, 
    isHandPossible,
    sumCubePowers,
    findPower, 
};


// parse file
// covert each line to a ...?
// could remove the text game for an object or just to index + 1 to get the game
// number
// iterate through each game
// on each game, make an object that is {round: {color:number}} 
    // ex. {1: {red: 2, green: 2}, 2: {...}, ...}
// iterate through the object
    // in each round, check that:
        // red <= 12, green <= 13, blue <= 14
    // return false if any of the above are falsey