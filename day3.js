/*
power consumption = gamma rate* epsilon rate
gamma = most common bit in the corresponding position
*/

const CustomReader = require("./utils/fileReader");

function part_one(reportLines) {
    let digitLen = reportLines[0].length;
    let gamma = Array(digitLen).fill(0);
    for (let i = 0; i < reportLines.length; i++) {
        for (let j = 0; j < digitLen; j++) {
            if (reportLines[i][j] === "1") {
                gamma[j]++;
            } else {
                gamma[j]--;
            }
        }
    }
    gamma = gamma.map(element => element < 0 ? 0 : 1);
    let epsilon = gamma.map(element => 1 - element);
    return parseInt(gamma.join(""), 2) * parseInt(epsilon.join(""), 2);
}

function filterReports(reportLines, bitCriteria) {
    let filteredReportLines = reportLines;
    let j = 0;
    let counter = 0;
    while (filteredReportLines.length !== 1) {
        for (let i = 0; i < filteredReportLines.length; i++) {
            if (filteredReportLines[i][j] === "1") {
                counter++;
            } else {
                counter--;
            }
        }
        if (bitCriteria(counter)) {
            filteredReportLines = filteredReportLines.filter(element => element[j] === "1");
        } else {
            filteredReportLines = filteredReportLines.filter(element => element[j] === "0");
        }
        j++;
        counter = 0;
    }
    return parseInt(filteredReportLines.join(""), 2);
}

function part_two(reportLines) {
    let oxygenLines = filterReports(reportLines, (counter => counter >= 0));
    let co2Lines = filterReports(reportLines, (counter => counter < 0));
    return oxygenLines * co2Lines;
}

function main() {
    let reader = new CustomReader(__filename);
    let reportLines = reader.getLines();
    console.log("Result for part one:", part_one(reportLines));
    console.log("Result for part two:", part_two(reportLines));
}

main();