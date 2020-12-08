const fs = require('fs');
const path = require('path');

const callback = (err, data) => {
    if (err) throw err;

    const dataArr = data.split('\n');
    const dataArrSize = dataArr.length;

    let output = 0;

    for (let i = 0; i < dataArr.length; i++) {
        let response = [];
        const tmpDataArr = [...dataArr];
        const [instruction, operation] = tmpDataArr[i].split(' ');

        if (instruction !== 'acc') {
            tmpDataArr[i] = instruction === 'nop' ? `jmp ${operation}` : `nop ${operation}`;
        } else {
            continue
        }

        response = (checkIfCorrect(tmpDataArr, dataArrSize));

        if (response[0]) {
            output = response[1];
        }
    }

    console.log(output);
}

function checkIfCorrect(arr, termination) {

    let accumulator = 0;
    let idx = 0;
    let processed = [];

    while (!processed[idx]) {
        if (idx === termination) {
            break;
        }
        processed[idx] = true;
        const [instruction, operation] = arr[idx].split(' ');
        if (instruction === 'acc') {
            accumulator += +operation;
            idx = idx + 1;
        } else if (instruction === 'jmp') {
            idx += +operation;
        } else if (instruction === 'nop') {
            idx = idx + 1;
        }
    }

    return [idx === termination, accumulator];
}


fs.readFile(path.join(__dirname, 'input'), 'utf-8', callback);