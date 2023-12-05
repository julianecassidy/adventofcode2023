"use strict";

const os = require("os");
const fs = require('fs/promises');

/* Problem: The Elf leads you over to the pile of colorful cards. There, you
discover dozens of scratchcards, all with their opaque covering already
scratched off. Picking one up, it looks like each card has two lists of numbers
separated by a vertical bar (|): a list of winning numbers and then a list of
numbers you have. You organize the information into a table (your puzzle input).

As far as the Elf has been able to figure out, you have to figure out which of
the numbers you have appear in the list of winning numbers. The first match
makes the card worth one point and each match after the first doubles the point
value of that card.

For example:

Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53 
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19 
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1 
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83 
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36 
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11

In the above example, card 1 has five winning numbers (41, 48, 83, 86, and 17)
and eight numbers you have (83, 86, 6, 31, 17, 9, 48, and 53). Of the numbers
you have, four of them (48, 83, 17, and 86) are winning numbers! That means card
1 is worth 8 points (1 for the first match, then doubled three times for each of
the three matches after the first).

    Card 2 has two winning numbers (32 and 61), so it is worth 2 points.
    Card 3 has two winning numbers (1 and 21), so it is worth 2 points.
    Card 4 has one winning number (84), so it is worth 1 point.
    Card 5 has no winning numbers, so it is worth no points.
    Card 6 has no winning numbers, so it is worth no points.

So, in this example, the Elf's pile of scratchcards is worth 13 points.

Take a seat in the large pile of colorful cards. How many points are they worth
in total?
*/

/** sumScratcherScores: given a path to a file of scratcher card info, parse the
file and return the sum of scores of every card. 
*/
async function sumScratcherScores(filepath) {
    const file = await fs.readFile(filepath, "utf-8");
    const lines = getLinesFromString(file);

    let sum = 0;

    for (let line of lines) {
        const [ winningNums, myNums ] = parseScratcher(line);
        sum += scoreScratcher(winningNums, myNums);
    }

    return sum;
}

/** parseScratcher: given a line of scratcher info, parse into two arrays: one
 * of winning nums and one of nums on the scratcher.
 * ex.  Card 1: 41 48 83 | 83 86  6 31 17  9 -> [41, 48, 83], [83, 6, 31, 14, 9]    
 */
function parseScratcher(scratcher) {
    // convert string to two arrays
    const scratcherNums = scratcher.slice(scratcher.indexOf(":") + 1);
    const winningAndMyNums = scratcherNums.split(" | ");
    let winningNums = winningAndMyNums[0].split(" ");
    let myNums = winningAndMyNums[1].split(" ");

    // parse arrays to remove empty elements
    winningNums = winningNums.filter(num => num).map(num => Number(num));
    myNums = myNums.filter(num => num).map(num => Number(num));

    return [winningNums, myNums];
}

/** scoreScratcher: given two arrays of nums, determines how many numbers in the
 * first array are present in the second array. Returns a score of 1 for the
 * first match and doubles that for every additional match.
 * ex. [41, 48, 83], [83, 6, 41, 14, 9] --> 2
 */
function scoreScratcher(winningNums, myNums) {
    let matchingNumCount = 0;

    for (let num of winningNums) {
        if (myNums.includes(num)) {
            matchingNumCount++;
        }
    }

    if (matchingNumCount) {
        return 2 ** (matchingNumCount - 1)
    } else {
        return 0;
    }   
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
    sumScratcherScores,
    parseScratcher,
    scoreScratcher,
};

// parse file
// initialize a sum variable
// iterate through lines

// remove card text
// split lines on " | "
// split both elements into arrays on spaces
// filter arrays to remove spaces
// convert elements to nums

// declare matchingNumCount to count nums
// for every number in first array, check if exists in second array
  // if yes, add to matchingNumCount
// if winning nums, return 1 * 2^(matchingNumCount - 1)
  // else return 0

// add to sum variable
