"use strict"; 

const os = require("os");
const fs = require('fs/promises');

/* Problem: The engine schematic (your puzzle input) consists of a visual
representation of the engine. There are lots of numbers and symbols you don't
really understand, but apparently any number adjacent to a symbol, even
diagonally, is a "part number" and should be included in your sum. (Periods (.)
do not count as a symbol.)

Here is an example engine schematic:

467..114..
...*......
..35..633.
......#...
617*...... 
.....+.58. 
..592..... 
......755.
...$.*....
.664.598..

In this schematic, two numbers are not part numbers because they are not
adjacent to a symbol: 114 (top right) and 58 (middle right). Every other number
is adjacent to a symbol and so is a part number; their sum is 4361.

Of course, the actual engine schematic is much larger. What is the sum of all of
the part numbers in the engine schematic?
*/

/** sumPartNumbers: given a file path of part data, parse file, deterimine which
numbers are parts, and return the sum of all parts.
 */
async function sumPartNumbers(filepath) {
    const file = await fs.readFile(filepath, "utf-8");
    const lines = getLinesFromString(file);

    let sum = 0;

    for (let i = 0; i < lines.length; i++) {
        console.log("sum", sum, "line", lines[i]);
        for (let j = 0; j < lines[i].length; j++) {
            let currLine = lines[i];
            
            if (currLine[j] !== "." && isNaN(Number(currLine[j]))) {
                console.log("curr char", currLine[j]);
                let left = "";
                let middle = "";
                let right = "";

                // check top left
                if(i !== 0 && !(isNaN(Number(lines[i - 1][j - 1])))) {
                    // find start of number
                    let idx = j - 1;
                    while(!(isNaN(Number(lines[i - 1][idx])))) {
                        idx--
                    }

                    while(!(isNaN(Number(lines[i - 1][idx + 1])))) {
                        left += lines[i - 1][idx + 1];
                        idx++
                    }
                    console.log("top left", left);
                }

                // check top middle
                if(i !== 0 && !(isNaN(Number(lines[i - 1][j]))) && !left) {

                    let idx = j;
                    while(!(isNaN(Number(lines[i - 1][idx])))) {
                        middle += lines[i - 1][idx];
                        idx++;
                    }
                    console.log("top middle", middle);
                }

                // check top right
                if(
                    i !== 0 
                    && !(isNaN(Number(lines[i - 1][j + 1]))) 
                    && !middle
                    && isNaN(Number(lines[i - 1][j]))
                ) {

                    let idx = j + 1;
                    while(!(isNaN(Number(lines[i - 1][idx])))) {
                        right += lines[i - 1][idx];
                        idx++;
                    }
                    console.log("top right", right);

                }

                sum = sum + Number(left) + Number(middle) + Number(right);
                left = "";
                middle = "";
                right = "";
                
                // check left
                if(!(isNaN(Number(lines[i][j - 1])))) {

                    // find start of number
                    let idx = j - 1;
                    while(!(isNaN(Number(lines[i][idx])))) {
                        idx--
                    }

                    while(!(isNaN(Number(lines[i][idx + 1])))) {
                        left += lines[i][idx + 1];
                        idx++
                    }
                    console.log("left", left);
                }                

                // check right
                if(!(isNaN(Number(lines[i][j + 1])))) {

                    let idx = j + 1;
                    while(!(isNaN(Number(lines[i][idx])))) {
                        right += lines[i][idx];
                        idx++;
                    }
                    console.log("right", right);
                }

                sum = sum + Number(left) + Number(right);
                left = "";
                right = "";

                // check bottom left
                if(i !== lines.length - 1 && !(isNaN(Number(lines[i + 1][j - 1])))) {

                    // find start of number
                    let idx = j - 1;
                    while(!(isNaN(Number(lines[i + 1][idx])))) {
                        idx--
                    }

                    while(!(isNaN(Number(lines[i + 1][idx + 1])))) {
                        left += lines[i + 1][idx + 1];
                        idx++
                    }
                    console.log("bottom left", left);
                }

                // check bottom middle
                if(i !== lines.length - 1 && !(isNaN(Number(lines[i + 1][j])))) {

                    let idx = j;
                    while(!(isNaN(Number(lines[i + 1][idx]))) && !left) {
                        middle += lines[i + 1][idx];
                        idx++;
                    }
                    console.log("bottom middle", middle);
                }

                // check bottom right
                if(
                    i !== lines.length - 1 
                    && !(isNaN(Number(lines[i + 1][j + 1]))) 
                    && !middle
                    && isNaN(Number(lines[i + 1][j]))
                ) {

                    let idx = j + 1;
                    while(!(isNaN(Number(lines[i + 1][idx])))) {
                        right += lines[i + 1][idx];
                        idx++;
                    }
                    console.log("bottom right", right);
                }

                sum = sum + Number(left) + Number(middle) + Number(right);
            }
        }
    }

    return sum;
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
    sumPartNumbers, 

};


// iterate through in nested for loops
    // in the second for loop, if the index has a symbol
        // test all 8 adjacent spots for a number
            // if number exists, go to left to find start of number
            // compile all digits into a number
            // add the number to the sum