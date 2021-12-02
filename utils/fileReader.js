const fs = require("fs");
const path = require("path");

class CustomFileReader {
    constructor(fileName) {
        let splittedFileName = fileName.split(".");
        if(splittedFileName[1] !== "txt"){
            fileName = path.basename(fileName).split(".");
            fileName = fileName[0] + ".txt";
        }
        this.lines = fs.readFileSync(fileName, "utf8").split("\n");
        this.lineCount = 0;
    };

    readNextLine = () => {
        return this.lines[this.lineCount++];
    }

    hasNext = () =>{
        return this.lineCount < this.lines.length;
    }

    readNextInt = () => {
        return parseInt(this.readNextLine());
    }

    readNextArr = () =>{
        return this.lines[this.lineCount++].split(" ");
    }

    readNextIntArr = () =>{
        return this.readNextArr().map(element => parseInt(element));
    }

    getLines = () =>{
        return this.lines;
    }
}

module.exports = CustomFileReader;