const fs = require('fs');
const { parse } = require('path');
const path = require('path');

const callback = (err, data) => {
    if (err) throw err;

    const [earliest, busIds] = data.split('\n');

    const busIdsRules = busIds.split(',').map((val, idx) => {
        return val !== 'x' ?
            {
                id: BigInt(val),
                offset: BigInt(idx)
            }
        : null
    }).filter(val => val);

    const output = findTimeStamp(busIdsRules);

    console.log(output);
}

function findTimeStamp(busRules) {
    let time = BigInt(0);
    let step = BigInt(1);

    for (let i = 0; i < busRules.length; i++) {
        const { id, offset } = busRules[i];
        
        while ((time + offset) % id) {
            time += step;
        }
        step *= id;
    }

    return time;
}

fs.readFile(path.join(__dirname, 'input'), 'utf-8', callback);