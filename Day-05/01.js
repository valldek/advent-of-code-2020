const fs = require('fs');
const path = require('path');

const callback = (err, data) => {
    if (err) throw err;

    const dataArr = data.split('\n');

    const output = dataArr.map(seat => {
        const row = [0, 127];
        const col = [0, 7];
        for (let i = 0; i < seat.length; i++ ) {
            
            if (seat[i] === 'F') {
                row[1] = Math.floor((row[0] + row[1]) / 2);
            } else if (seat[i] === 'B') {
                row[0] = Math.ceil((row[0] + row[1]) / 2);
            } else if (seat[i] === 'L') {
                col[1] = Math.floor((col[0] + col[1]) / 2);
            } else {
                col[0] = Math.ceil((col[0] + col[1]) / 2);
            }
        }
        
        return row[0] * 8 + col[0];
    })

    console.log(Math.max(...output));
}

fs.readFile(path.join(__dirname, 'input'), 'utf-8', callback);