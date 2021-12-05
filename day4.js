const CustomReader = require("./utils/fileReader");
let row = 5;

function checkBingo(board) {
    for (let i = 0; i < row; i++) {
        let colCounter = 0;
        let rowCounter = 0;
        for (let j = 0; j < row; j++) {
            if (board[i][j] === true) {
                colCounter++;
            }

            if (board[j][i] === true) {
                rowCounter++;
            }
        }
        if (colCounter === row || rowCounter === row) {
            return true;
        }
        colCounter = 0;
        rowCounter = 0;
    }
    return false;
}

function markNumber(number, board) {
    for (let line of board) {
        for (let i = 0; i < row; i++) {
            if (line[i] === number) {
                line[i] = true;
                return;
            }
        }
    }
}

function calculateScore(board, calledNumber) {
    let sum = 0;
    for (let i = 0; i < row; i++) {
        for (let j = 0; j < row; j++) {
            if (board[i][j] !== true) {
                sum += board[i][j];
            }
        }
    }
    return sum * calledNumber;
}

function part_one(numbers, boards) {
    for (let number of numbers) {
        for (let b of boards) {
            markNumber(number, b);
            if (checkBingo(b)) {
                return calculateScore(b, number);
            }
        }
    }
}

function part_two(numbers, boards) {
    let boardNr = boards.length;
    let counter = 0;
    let finished = Array(boardNr).fill(false);
    for (let number of numbers) {
        for (let i = 0; i < boardNr; i++) {
            let b = boards[i];
            if (finished[i] === false) {
                //if the current board isn't already bingo'ed
                markNumber(number, b);
                if (checkBingo(b)) {
                    //if we have bingo then we note this board is finished. The value shows when it finished.
                    finished[i] = counter;
                    if (counter === boardNr - 1) {
                        //if we are at our last board
                        return  calculateScore(b, number);
                    }
                    counter++;
                }
            }
        }
    }
}

function main() {
    let reader = new CustomReader(__filename);
    let numbers = reader.readNextLine().split(",").map(el => parseInt(el));
    let boards = [];
    while (reader.hasNext()) {
        reader.readNextLine();
        let currentBingo = [];
        for (let i = 0; i < row; i++) {
            currentBingo.push(reader.readNextLine().split(" ").filter(element => element !== "").map(el => parseInt(el, 10)));
        }
        boards.push(currentBingo);
    }
    console.log("Part one result:", part_one(numbers, boards));
    console.log("Part two result:", part_two(numbers, boards));

}

main();