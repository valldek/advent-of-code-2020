const fs = require('fs');
const path = require('path');

const callback = (err, data) => {
    if (err) throw err;

    const input = data.split(',').map(val => +val);
    const spokenNumbers = new Map();
    let currentTurnNumber = 0;
    let turn = 0;


    while (turn < 2020) {
        if (input[turn]) {
            currentTurnNumber = input[turn];
            spokenNumbers.set(currentTurnNumber, turn + 1);
        } else if (!(spokenNumbers.has(currentTurnNumber))) {
            spokenNumbers.set(currentTurnNumber, turn);
            currentTurnNumber = 0;
        } else {
            const tmp = spokenNumbers.get(currentTurnNumber);
            spokenNumbers.set(currentTurnNumber, turn);
            currentTurnNumber = turn - tmp;
        }

        // console.log(currentTurnNumber);
        turn++;
    }

    console.log(currentTurnNumber);
}

fs.readFile(path.join(__dirname, 'input'), 'utf-8', callback);