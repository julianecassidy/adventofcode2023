"use strict"; 

const os = require("os");
const fs = require('fs/promises');
const { DiffieHellman } = require("crypto");

const DIGIT_STRINGS = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9
} 

/* Problem: The newly-improved calibration document consists of lines of text;
each line originally contained a specific calibration value that the Elves now
need to recover. On each line, the calibration value can be found by combining
the first digit and the last digit (in that order) to form a single two-digit
number.

For example:

1abc2 
pqr3stu8vwx 
a1b2c3d4e5f 
treb7uchet

In this example, the calibration values of these four lines are 12, 38, 15, and
77. Adding these together produces 142.

Consider your entire calibration document. What is the sum of all of the
calibration values?
*/

/** sumCalibrationValues:  */
async function sumCalibrationValues(filepath) {
    const file = await fs.readFile(filepath, "utf-8");
    const fileLines = getLinesFromString(file);
    const calibrationValues = fileLines.map(line => {
        const trimmed = line.trim();
        return extractNum(trimmed)});
    return calibrationValues.reduce(
        (accumulator, currentValue) => accumulator + currentValue, 0,
    );
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

/** extractNum: in the inputted string, find the first occuring number and last
 * occuring number in in integer or sting format. These may be the same. Return
 * an integer with the first number in the tens place and the last number in the
 * ones place:
 * "1abc2" --> 12
 * "a1b2c3d4e5f" --> 15
 * "two1nine" --> 29
 * "abcone2threexyz" -> 13
 */
function extractNum(string) {
    let first;
    let last;

    // find first number from left
    firstNum:
    for (let i = 0; i < string.length; i++) {
        // check for number in number format
        if (!isNaN(Number(string[i])) ) {
            first = string[i];
            break firstNum;
        }

        // check for number in string format
        let currSubstring = string[i];

        for (let j = i + 1; j < string.length; j++) {
            if (currSubstring in DIGIT_STRINGS) {
                first = DIGIT_STRINGS[currSubstring];
                break firstNum;
            } else {
                currSubstring += string[j];
            }
        }
    }

    // find last number from left
    secondNum:
    for (let i = string.length - 1; i >= 0; i--) {
        // check for number in number format
        if (!isNaN(Number(string[i]))) {
            last = string[i];
            break secondNum;
        }

        // check for number in string format
        let currSubstring = string[i];

        for (let j = i - 1; j >= 0; j--) {
            if (currSubstring in DIGIT_STRINGS) {
                last = DIGIT_STRINGS[currSubstring];
                break secondNum;
            } else {
                currSubstring = string[j] + currSubstring;
            }
        }
    }

    return Number(`${first}${last}`);
}



/** extractNum: in the inputted string, find the first occuring number and last
 * occuring number. These may be the same. Return an integer with the first
 * number in the tens place and the last number in the ones place:
 * "1abc2" --> 12
 * "a1b2c3d4e5f" --> 15
 * "treb7uchet" --> 77
*/
// function extractNum(string) {
//     let first;
//     let last;

//     // find first number from left
//     let idx = 0;
//     while (first === undefined) {
//         if (!isNaN(Number(string[idx])) ) {
//             first = string[idx];
//         }
//         idx++;
//     }

//     // find last number from left
//     idx = string.length - 1;
//     while (last === undefined) {
//         if (!isNaN(Number(string[idx]))) {
//             last = string[idx];
//         }
//         idx--;
//     }
    
//     const num = Number(`${first}${last}`);
//     return num;
// }



module.exports = { sumCalibrationValues, extractNum };

// parse file
// on each line, pull out first and last digits
// sum up all digits
