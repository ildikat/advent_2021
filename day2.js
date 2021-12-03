//forward x, increases horizontal pos
//down x, increases depth
// up x, decreases depth
// horizontal 0 +5+8+2
// depth 0+5-3+8

const CustomReader = require("./utils/fileReader");

function part_one(instructions) {
    let horizontal = 0;
    let depth = 0;
    for (let i = 0; i < instructions.length; i++) {
        switch (instructions[i][0]) {
            case "forward":
                horizontal += instructions[i][1];
                break;
            case "down":
                depth += instructions[i][1];
                break;
            case "up":
                depth -= instructions[i][1];
                break;
            default:
                break;
        }
    }
    return horizontal * depth;
}

/* aim =0;
down x  aim+=x
up x    aim -=x
forward x; horizontal +=x;
        depth += aim*x
 */
function part_two(instructions) {
    let horizontal = 0;
    let depth = 0;
    let aim = 0;
    for (let i = 0; i < instructions.length; i++) {
        switch (instructions[i][0]) {
            case "forward":
                horizontal += instructions[i][1];
                depth += aim* instructions[i][1]
                break;
            case "down":
                aim += instructions[i][1];
                break;
            case "up":
                aim -= instructions[i][1];
                break;
            default:
                break;
        }
    }
    return horizontal * depth;
}

function main() {
    let reader = new CustomReader(__filename);
    let instructions = reader.getLines().map(instruction => {
            let splitInstr = instruction.split(" ");
            splitInstr[1] = parseInt(splitInstr[1]);
            return splitInstr;
        }
    )

    console.log("Results of part one:", part_one(instructions));
    console.log("Results of part two:", part_two(instructions));
}

main();