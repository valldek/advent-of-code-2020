const fs = require('fs');
const path = require('path');

const callback = (err, data) => {
    if (err) throw err;

    const dataSplit = data.split('\n\n').map(val => (new Set(val.split('\n').join(''))).size);

    const output = dataSplit.reduce((acc, cur) => 
        acc = acc + cur
    , 0);

    console.log(output);
}

fs.readFile(path.join(__dirname, 'input'), 'utf-8', callback);