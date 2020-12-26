const fs = require('fs');
const path = require('path');


const callback = (err, data) => {
    if (err) throw err;

    const input = data.split('\n');

    // console.log(findExpresion(input[0]));
    console.log(findExpresion(input[1]));
    console.log(findExpresion(input[2]));
    console.log(findExpresion(input[3]));
    console.log(findExpresion(input[4]));


}

const findExpresion = (str) => {
    const closing = str.indexOf(')');

    if (closing !== -1) {
        const toClosing = str.slice(0, closing);
        const opening = toClosing.lastIndexOf('(');
        const toReplace = str.slice(opening, closing + 1);
        const replaceMath = doTheMath(toReplace.slice(1, -1));
        str = str.replace(toReplace, replaceMath);
        return findExpresion(str);
    }

    return doTheMath(str);
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