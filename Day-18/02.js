const fs = require('fs');
const path = require('path');


const callback = (err, data) => {
    if (err) throw err;

    const input = data.split('\n');

    // console.log(findExpresion(input[0]));
    // console.log(findExpresion(input[1]));
    // console.log(findExpresion(input[2]));
    // console.log(findExpresion(input[3]));
    // console.log(findExpresion(input[4]));
    // console.log(findExpresion(input[5]));

    const output = input
        .map((expresion) => {
            return findExpresion(expresion);
        })
        .reduce((acc, cur) => {
            return acc += cur
        }, 0)

    console.log(output);
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

    const afterAddition = doAdditionFirst(numbersAndOperation);

    const leftToRigth = afterAddition.reduce((acc, cur) => {
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

const doAdditionFirst = (arr) => {
    const plusIndex = arr.indexOf('+');

    if (plusIndex !== -1) {
        const cutStartIndex = plusIndex -1;
        const cutEndIndex = plusIndex + 1;
        const replaceMath = parseInt(arr[cutStartIndex], 10) + parseInt(arr[cutEndIndex], 10);
        arr.splice(cutStartIndex, 3, replaceMath);

        return doAdditionFirst(arr);
    }

    return arr;
}


fs.readFile(path.join(__dirname, 'input'), 'utf-8', callback);