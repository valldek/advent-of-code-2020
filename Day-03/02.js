const fs = require('fs');
const path = require('path');

const callback = (err, data) => {
    if (err) throw err;
    dataArr = data.split('\n');

    const reduced11 = throughtSloups(dataArr, 1);
    const reduced31 = throughtSloups(dataArr, 3);
    const reduced51 = throughtSloups(dataArr, 5);
    const reduced71 = throughtSloups(dataArr, 7);
    const reduced12 = throughtSloups(dataArr.filter((val, idx) => !(idx % 2)), 1);
    
    output = reduced11 * reduced31 * reduced51 * reduced71 * reduced12;
    
    console.log(output);
}

const throughtSloups = (arr, rightBy) => {
    
        return arr.reduce((acc, cur, idx) => {
            const right = (idx * rightBy) % 31;
            return acc = acc + cur[right];
        }, '')
        .replace(/\./g, '')
        .length;
    
}

fs.readFile(path.join(__dirname, 'input'), 'utf-8', callback);