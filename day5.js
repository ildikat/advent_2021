const CustomReader = require("./utils/fileReader");

function part_one(lines, diagonal = false) {
    let multipleLineCounter = 0;

    let matrixValues = {};
    for (let [[x1, y1], [x2, y2]] of lines) {

        if (x1 === x2 || y1 === y2) {
            let x = x1 < x2 ? [x1, x2] : [x2, x1];
            let y = y1 < y2 ? [y1, y2] : [y2, y1];

            for (let i = x[0]; i <= x[1]; i++) {
                for (let j = y[0]; j <= y[1]; j++) {
                    const point = [i, j];
                    matrixValues[point] = (matrixValues[point] || 0) + 1;
                }
            }
        } else if (diagonal) {
            let x_add = x1 < x2 ? 1 : -1;
            let y_add = y1 < y2 ? 1 : -1;


            while (x1 !== x2 + x_add) {
                const point = [x1, y1];
                matrixValues[[x1, y1]] = (matrixValues[point] || 0) + 1;
                x1 = x1 + x_add;
                y1 = y1 + y_add;
            }
        }
    }

    for (let value of Object.values(matrixValues)) {
        if (value > 1) {
            multipleLineCounter++;
        }
    }
    return multipleLineCounter;
}

function main() {
    let reader = new CustomReader(__filename);
    let lines = reader.getLines().map(row => row.split(" -> ").map(position => position.split(",").map(Number)));
    console.log("Part one result:", part_one(lines));
    console.log("Part two result:", part_one(lines, true));

}

main();
