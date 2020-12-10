const fs = require('fs');
const path = require('path');

const callback = (err, data) => {
    if (err) throw err;

    const output = {
        '3': 1
    };

    dataArrSorted = data.split('\n')
        .map(val => parseInt(val, 10))
        .sort((a, b) => a - b);
    
    let levelToChek = [0];
    let out = [];

    for (let j = 0; j < dataArrSorted.length; j++) {
        levelToChek = findNextLevel(dataArrSorted, levelToChek);
        console.log(j, levelToChek);
    }

    console.log(levelToChek.length);
}

const findNextLevel = (arr, current) => {
    const last = arr[arr.length - 1];
    let nextLevel = [];
    for (let i = 0; i < current.length; i++) {
        const currentIndex = arr.indexOf(current[i]);
        if (currentIndex === -1) continue;
        if (current[i] === last) nextLevel.push(current[i]);
        const next = arr
            .slice(currentIndex + 1, currentIndex + 4)
            .filter(val => {
                return val <= current[i] + 3;
            });
        nextLevel.push(...next);
    }

    return nextLevel;
}

const task = fs.readFile(path.join(__dirname, 'input'), 'utf-8', callback);