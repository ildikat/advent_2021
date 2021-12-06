const CustomReader = require("./utils/fileReader");
const NEW_FISH_AGE = 8;
const PREGNANT_FISH_AGE = 6;

function part_one(dayNr, fishTimer) {
    let newFishTimer = Array(...fishTimer);
    let i = 0;
    while (i < dayNr) {
        let fishNr = newFishTimer.length;
        for (let f = 0; f < fishNr; f++) {
            if (newFishTimer[f] === 0) {
                newFishTimer[f] = 6;
                newFishTimer.push(8);
            } else {
                newFishTimer[f]--;
            }
        }
        i++;
    }
    return newFishTimer.length;
}

function part_two(dayNr, fishTimer) {

    let fishDays = Array(NEW_FISH_AGE + 1).fill(0);
    for (let timer of fishTimer) {
        fishDays[timer]++;
    }

    let i = 0;
    while (i < dayNr) {
        let pregnant = fishDays.shift();
        fishDays.push(pregnant);
        fishDays[PREGNANT_FISH_AGE] += pregnant;
        i++;
    }

    return fishDays.reduce((a, b) => a + b, 0);
}

function main() {
    let reader = new CustomReader(__filename);
    let fishTimer = reader.readNextLine().split(",").map(Number);
   console.log("Part one result:", part_one(80, fishTimer));
    console.log("Part two result:", part_two(256, fishTimer));

}

main();