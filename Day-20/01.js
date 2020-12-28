const fs = require('fs');
const path = require('path');

const callback = (err, data) => {
    if (err) throw err;

    const tilesArr = data.split('\n\n');

    console.log(tilesArr[0]);
}

fs.readFile(path.join(__dirname, 'testInput'), 'utf-8', callback);