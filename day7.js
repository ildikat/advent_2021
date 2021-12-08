const CustomReader = require("./utils/fileReader");

function part_one(crabPos) {
    let minDistance = Number.MAX_SAFE_INTEGER;
    for (let i = 0; i < crabPos.length; i++) {
        let horizontalPos = i;
        let distance = 0;
        for (let crab of crabPos) {
            distance += Math.abs(crab - horizontalPos);
        }
        if (distance < minDistance) {
            minDistance = distance;
        }
    }
    return minDistance;
}

function part_two(crabPos) {
    let minDistance = Number.MAX_SAFE_INTEGER;

    for (let i = 0; i < crabPos.length; i++) {
        let horizontalPos = i;
        let distance = 0;
        for (let crab of crabPos) {
            let maxDistance = Math.abs(crab - horizontalPos);
            while (maxDistance > 0) {
                distance += maxDistance;
                maxDistance--;
            }
            // console.log(crab, ":", distance);
        }
        if (distance < minDistance) {
            minDistance = distance;
        }
    }
    return minDistance;
}

function main() {
    let reader = new CustomReader(__filename);
    let crabPos = reader.readNextIntArr();
    console.log("Part one result:", part_one(crabPos));
    console.log("Part two result:", part_two(crabPos));
}

main();