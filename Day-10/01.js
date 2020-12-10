const fs = require('fs');
const path = require('path');

const callback = (err, data) => {
    if (err) throw err;

    const output = {
        '3': 1
    };

    dataArrSorted = data.split('\n')
        .map(val => parseInt(val, 10))
        .sort((a, b) => a - b)
        .reduce((acc, cur) => {
            const diff = cur - acc;
            output[diff] ? output[diff] += 1 : output[diff] = 1;
    
            return cur;
        }, 0);

    console.log(output);
    console.log(output[1] * output[3]);
}

const task = fs.readFile(path.join(__dirname, 'input'), 'utf-8', callback);