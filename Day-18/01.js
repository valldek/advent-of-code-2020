const fs = require('fs');
const path = require('path');


const callback = (err, data) => {
    if (err) throw err;

    const input = data.split('\n')[0];

    console.log(doTheMath(input));

    console.log(input);

}

const doTheMath = (str) => {
    const numbersAndOperation = str.split(' ');

    const leftToRigth = numbersAndOperation.reduce((acc, cur) => {
        if (Number.isInteger(parseInt(cur, 10))) {
            if (acc.math) {
                if (acc.operation) {
                    if (acc.operation === '+') {
                        acc.math += parseInt(cur, 10);
                    } else {
                        acc.math *= parseInt(cur, 10);
                    }
                }
            } else {
                acc.math = parseInt(cur, 10);
                acc.operation = '';
            }
        } else {
            acc.operation = cur
        }
        return acc;
    }, {});

    return leftToRigth.math;
}


fs.readFile(path.join(__dirname, 'testInput'), 'utf-8', callback);