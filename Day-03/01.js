const fs = require('fs');
const path = require('path');

const callback = (err, data) => {
    if (err) throw err;
    dataArr = data.split('\n');
    let down = 1;
    let right = 3;

    const reduced = dataArr.reduce((acc, cur, idx) => {
        right = (idx * 3) % 31
        return acc = acc + cur[right];
    }, '').replace(/\./g, '').length;
    
    console.log(reduced);
}

fs.readFile(path.join(__dirname, 'input'), 'utf-8', callback);