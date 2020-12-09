const fs = require('fs');
const path = require('path');

const callback = (err, data) => {
    dataArrNum = data.split('\n').map(val => parseInt(val, 10));
    let invalidNumber = 0;
    let range = [];

    for (let i = 0; i < dataArrNum.length - 25; i++) {
        const valid = sumOfPreamble(dataArrNum.slice(i, i + 25), dataArrNum[i + 25]);
        if (!valid) {
            invalidNumber = dataArrNum[i + 25];
            break;
        }
    }

    const invalidNumberIndex = dataArrNum.indexOf(invalidNumber);
    const dataArrToInvalid = dataArrNum.slice(0, invalidNumberIndex);

    for (let i = 0; i < dataArrToInvalid.length; i ++ ) {
        const check = sumAll(dataArrToInvalid.slice(i), invalidNumber);

        if (check[0]) {
            range = [i, check[1]];
            break;
        }
    }

    const responseRange = dataArrToInvalid.slice(range[0], range[0] + range[1] + 1);
    const rangeSum = responseRange.reduce((acc, cur) => {
        acc = acc + cur;
        return acc;
    }, 0);

    console.log(Math.min(...responseRange) + Math.max(...responseRange));
}

const sumOfPreamble = (arr, num) => {
    const numbersToCheck = arr.filter(val => val < num);

    const isSum = numbersToCheck.filter((val, idx, arr) => {
        return arr.indexOf(num - val) !== -1;
    });

    return isSum.length ? num : false;
}

const sumAll = (arr, num) => {
    let idx = 0;
    let sum = 0;
    let response = [false, idx];

    while(sum < num) {
        sum = sum + arr[idx];
        
        if ( sum === num) {
            response = [true, idx];
            break;
        }        
        idx++;        
    }

    return response;
}

fs.readFile(path.join(__dirname, 'input'), 'utf-8', callback);

