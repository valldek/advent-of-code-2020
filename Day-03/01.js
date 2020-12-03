const fs = require('fs');
const path = require('path');

const callback = (err, data) => {
    if (err) throw err;
    console.log(data);
}

fs.readFile(path.join(__dirname, 'input'), 'utf-8', callback);