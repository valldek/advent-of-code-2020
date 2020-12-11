const fs = require('fs');
const path = require('path');

const callback = (err, data) => {
    if (err) throw err;

    const dataLines = data.split('\n');
    const colCount = dataLines[0].length;
    const dataStr = dataLines.join('');

    let afterFirst = firstRound(dataStr);

    while (true) {
        const output = changeSeats(afterFirst, colCount);
        if (output === afterFirst) {
            console.log(output.split('').filter(val => val === '#').length);
            break;
        } else {
            afterFirst = output
        }
    }
}

const firstRound = (str) => {
    if (!str.match('#')) {
        const strCopy = str.replace(/L/g, '#')
        return strCopy;
    }
}

const changeSeats = (str, cols) => {
    const strSize = str.length;
    const outputString = [];

    for (let i = 0; i < strSize; i++) {

        let adjacent = [];
        if (i % cols === 0) {
            // its left side
            adjacent = [i - cols, i - cols + 1, i + 1, i + cols, i + cols + 1];
        } else if (i % cols === cols - 1) {
            // its right side
            adjacent = [i - cols - 1, i - cols, i - 1, i + cols -1, i + cols];
        } else {
            adjacent = [i - cols - 1, i - cols, i - cols + 1, i - 1, i + 1, i + cols -1, i + cols, i + cols + 1];
        }

        if (str[i] === '.') {
            outputString[i] = '.';
        } else { 
            const occupiedSeatsCount = adjacent
                .map(val => str[val])
                .filter(val => val === '#' )
                .length;
            // console.log(occupiedSeatsCount);
            if (str[i] === 'L' && occupiedSeatsCount === 0) {
                outputString[i] = '#';
            } else {
                if (occupiedSeatsCount >= 4) {
                    outputString[i] = 'L';
                } else {
                    outputString[i] = str[i];
                }
            }
        }

        // console.log(outputString[i]);
    }

    return outputString.join('');
}


fs.readFile(path.join(__dirname, 'input'), 'utf-8', callback);