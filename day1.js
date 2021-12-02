const CustomFileReader = require("./utils/fileReader")
const readline = require("readline");
const fs = require("fs");

const fileName = __filename.slice(0, -3) + ".txt";
let rl = readline.createInterface(fs.createReadStream(fileName));

async function part_one_orig() {
    let report;
    let increased = 0;
    for await (let line of rl) {
        let newNumber = parseInt(line);
        if (report !== undefined) {
            if (newNumber > report) {
                increased++;
            }
        }
        report = newNumber;
    }
    return increased;
}

function part_one(reported_depths) {
    let increased = 0;
    let n = reported_depths.length;

    for (let i = 0; i < n; i++) {
        if (reported_depths[i] > reported_depths[i - 1]) {
            increased++;
        }
    }
    return increased;
}

function part_two(reported_depths) {
    let triples = [];

    for (let i = 0; i <= reported_depths.length - 3; i++) {
        let tripleSum = reported_depths.slice(i, i + 3).reduce((a, b) => a + b, 0);
        triples.push(tripleSum);
    }
    return part_one(triples);
}

function main() {
    let reader = new CustomFileReader(fileName)
    let lines = reader.lines.map(element => parseInt(element));
    part_one_orig().then(result => console.log("Part one async: ", result))

    console.log("Part one: ", part_one(lines));
    console.log("Part two: ", part_two(lines));
}

main();
