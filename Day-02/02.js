const fs = require('fs');
const path = require('path');

const callback = (err, data) => {
    if (err) throw err;

    const dataArrStr = data.trim().split('\n')
        .map(val => val.split(' '))
        .filter(item => {
            const range = item[0].split('-').map(val => val - 1);
            const character = item[1][0];
            const testString = item[2];
            let correct = false;

            if (testString[range[0]] === character && testString[range[1]] !== character) {
                correct = true;
            } else if (testString[range[0]] !== character && testString[range[1]] === character)  {
                correct = true;
            } else {
                correct = false
            }

            return correct;
            
        })
        .length;


    console.log(dataArrStr);
}

fs.readFile(path.join(__dirname, 'input'), 'utf-8', callback);