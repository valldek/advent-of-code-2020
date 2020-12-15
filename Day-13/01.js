const fs = require('fs');
const { parse } = require('path');
const path = require('path');

const callback = (err, data) => {
    if (err) throw err;

    const [earliest, busIds] = data.split('\n');
    const busInService = busIds.split(',').filter(val => val !== 'x').map(val => parseInt(val, 10));
    const timeToWait = busInService.map(val => val - (earliest % val));

    const shortest = Math.min(...timeToWait);
    const shortestIndex = timeToWait.indexOf(shortest);
    const bus = busInService[shortestIndex];

    console.log(shortest, shortestIndex, busInService, bus);

    const output = shortest * bus;

    console.log(output);
}

fs.readFile(path.join(__dirname, 'input'), 'utf-8', callback);