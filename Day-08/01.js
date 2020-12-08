const fs = require('fs');
const path = require('path');

const callback = (err, data) => {
    if (err) throw err;
    
    let accumulator = 0;
    let idx = 0;
    let processed = [];
    let changed = [];
    const dataArr = data.split('\n');


    while (!processed[idx]) {
        processed[idx] = true;
        const [instruction, operation] = dataArr[idx].split(' ');
        if (instruction === 'acc') {
            accumulator += +operation;
            idx = idx + 1;
        } else if (instruction === 'jmp') {
            idx += +operation;
        } else if (instruction === 'nop') {
            idx = idx + 1;
        }

        console.log(accumulator, idx, instruction, operation, processed);
    }
}



fs.readFile(path.join(__dirname, 'input'), 'utf-8', callback);