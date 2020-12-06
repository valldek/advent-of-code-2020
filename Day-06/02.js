const fs = require('fs');
const path = require('path');

const callback = (err, data) => {
    if (err) throw err;

    const dataSplit = data.split('\n\n').map(val => {
        const answersOfPersons = val.split('\n');
        const groupSize = answersOfPersons.length;
        const answersOfAll = answersOfPersons.join('');
        const answersCount = answersOfAll.split('').reduce((acc, cur) => {
            acc[cur] ? acc[cur]++ : acc[cur] = 1;
            return acc;
        }, {})
        
        const allYes = Object.values(answersCount).filter(val => val === groupSize);

        return allYes.length;
    });

    const output = dataSplit.reduce((acc, cur) => 
        acc = acc + cur
        , 0);
        
    console.log(output);
}

fs.readFile(path.join(__dirname, 'input'), 'utf-8', callback);