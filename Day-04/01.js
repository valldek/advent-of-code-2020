const fs = require('fs');
const path = require('path');

const callback = (err, data) => {
    console.log(data);
}

fs.readFile(path.join(__dirname, 'input'), 'utf-8', callback);