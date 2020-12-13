const fs = require('fs');
const path = require('path');

const callback = (err, data) => {
    if (err) throw err;

    const dataMtrx = data
        .split('\n')
        .map(val => {
            const heading = val.slice(0,1);
            const ammount = parseInt(val.slice(1), 10);
            return [heading, ammount];
        })                 
    const output = dataMtrx.reduce((acc, cur) => {
        console.log(acc, cur);
        return acc = navigateShip(acc, cur);
    }, ['E', 0, 0]);

    console.log(output);
    console.log(Math.abs(output[1]) + Math.abs(output[2]));
}

const navigateShip = (prev, current) => {
    let directionIndex = 0;
    let newDirectionIndex = 0;
    let newDirection = '';

    const directions = ['E', 'S', 'W', 'N'];
    switch(current[0]) {
        case 'N':
            prev[2] += current[1];
            break;
        case 'S':
            prev[2] -= current[1];
            break;
        case 'E':
            prev[1] += current[1];
            break;
        case 'W':
            prev[1] -= current[1];
            break;
        case 'L':
            directionIndex = directions.indexOf(prev[0]);
            newDirectionIndex = (directionIndex - current[1] / 90)     //1 2 3 4
            if ( newDirectionIndex < 0) {
                newDirectionIndex += directions.length;
            }
            newDirection = directions[newDirectionIndex];
            prev[0] = newDirection;
            break;
        case 'R':
            directionIndex = directions.indexOf(prev[0]);
            newDirectionIndex = (directionIndex + current[1] / 90)     //1 2 3 4
            if ( newDirectionIndex > directions.length - 1) {
                newDirectionIndex -= directions.length;
            }
            newDirection = directions[newDirectionIndex];
            prev[0] = newDirection;
            break;
        case 'F':
            navigateShip(prev, [prev[0], current[1]]);
    }
    return prev;
}

fs.readFile(path.join(__dirname, 'input'), 'utf-8', callback);