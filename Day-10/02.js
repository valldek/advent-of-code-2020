const fs = require('fs');
const path = require('path');

const callback = (err, data) => {
    if (err) throw err;

    const dataArrSorted = data.split('\n')
        .map(val => parseInt(val, 10))
        .sort((a, b) => a - b);
    
    const cache = {};

    const output = findWays(0, dataArrSorted, cache);
    console.log(output);
}

const findWays = (start, arr, cache) => {
    if (start === arr.length - 1) {
        return 1;
    }

    if (start in cache) {
        return cache[start];
    }

    let answer = 0;

    for (let j = start + 1; j < arr.length; j++) {
        if (arr[j] - arr[start] <= 3) {
            answer += findWays(j, arr, cache);
        }
    }

    cache[start] = answer;

    return answer
}

const task = fs.readFile(path.join(__dirname, 'input'), 'utf-8', callback);