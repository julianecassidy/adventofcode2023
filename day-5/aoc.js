"use strict";

const os = require("os");
const fs = require('fs/promises');


//   [
//     [ [ 79, 14, 55, 13 ] ],
//     [ [ 50, 98, 2 ], [ 52, 50, 48 ] ],
//     [ [ 0, 15, 37 ], [ 37, 52, 2 ], [ 39, 0, 15 ] ],
//     [ [ 49, 53, 8 ], [ 0, 11, 42 ], [ 42, 0, 7 ], [ 57, 7, 4 ] ],
//     [ [ 88, 18, 7 ], [ 18, 25, 70 ] ],
//     [ [ 45, 77, 23 ], [ 81, 45, 19 ], [ 68, 64, 13 ] ],
//     [ [ 0, 69, 1 ], [ 1, 0, 69 ] ],
//     [ [ 60, 56, 37 ], [ 56, 93, 4 ] ]
//   ]
let maps = [];

/** findClosestLocation: given a filepath, parse file data and return the integer
 * representing the closest location for planting the seeds in the file. 
 */
async function findClosestLocation(filepath){
    const file = await fs.readFile(filepath, "utf-8");

    // populate maps
    parseMaps(file);

    let locations = [];

    // map seed to location
    const seeds = maps[0][0];
    
    for (let seed of seeds) {
        let mapIdx = 1;
        let mapResult = seed;
        while (mapIdx < maps.length) {
            let source = mapResult;
            mapResult = mapSourceToDestination(maps[mapIdx], source)
            mapIdx++;
        }
        locations.push(mapResult);
    }

    return Math.min(...locations);
}

/** parseMaps: given a string of almanac info, parse file into separate map
 * objects and add each object to global maps
 */
function parseMaps(string) {
    const separate = string.split("\n\n");
    for (let map of separate){
        const newMap = [];

        // parse individual map into an object {name : {[range], [range],...}}
        map = map.split(":");
        let data = getLinesFromString(map[1]);

        // convert data to array, filter empty elements, convert strings to nums
        for (let d of data) {
            d = d.split(" ")
            d = d.filter(el => el !== "").map(num => Number(num));
            newMap.push(d);
        } 

        maps.push(newMap);
    }
}

/** mapSourceToDestination: given a map and a source, convert the source to a
 * destination. Return destination value. 
 */
function mapSourceToDestination(map, source) {

    for (let range of map) {
        const destinationStart = range[0];
        const sourceStart = range[1];
        const rangeLength = range[2];

        if (sourceStart <= source && source <= (sourceStart + rangeLength)) {
            return destinationStart + (source - sourceStart);
        }
    }

    return source;
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
    findClosestLocation,
    parseMaps,
    mapSourceToDestination,
};

// global variable for holding all map objects

// parse the file
// initialize a variable to track locations

// put all the maps into separate objects
// break lines into separate arrays
// break those arrays on spaces
// convert all array values to nums

// iterate through the seeds array

// takes source and map
// iterate through all the ranges in the map
// if the source is between the source start and source start + range length
    // the destination is the destination start + (source - source start)
// else the destination is source

// return the lowest location
