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
    let cache = {};

    console.log(findWays(0, cache))
}

const findWays = (i, cache) => {
    if (i === dataArrSorted.length - 1) {
        return 1;
    }

    if (i in cache) {
        return cache[i];
    }

    let answer = 0;

    for (let j = i + 1; j < dataArrSorted.length; j++) {
        if (dataArrSorted[j] - dataArrSorted[i] <= 3) {
            answer += findWays(j, cache);
        }
    }

    cache[i] = answer;

    return answer
}

const task = fs.readFile(path.join(__dirname, 'input'), 'utf-8', callback);