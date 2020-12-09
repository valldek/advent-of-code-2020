const fs = require('fs');
const path = require('path');

const callback = (err, data) => {
    dataArrNum = data.split('\n').map(val => parseInt(val, 10));

    for (let i = 0; i < dataArrNum.length - 25; i++) {
        const valid = sumOfPreamble(dataArrNum.slice(i, i + 25), dataArrNum[i + 25]);
        if (!valid) {
            console.log(dataArrNum[i + 25]);
            break;
        }
    }
}

const sumOfPreamble = (arr, num) => {
    const numbersToCheck = arr.filter(val => val < num);

    const isSum = numbersToCheck.filter((val, idx, arr) => {
        return arr.indexOf(num - val) !== -1;
    });

    return isSum.length ? num : false;
}

fs.readFile(path.join(__dirname, 'input'), 'utf-8', callback);

