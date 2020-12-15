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
    //  way    ship
    }, [10, 1, 0, 0]);

    console.log(output);
    console.log(Math.abs(output[2]) + Math.abs(output[3]));
}

const navigateShip = (prev, current) => {
    switch(current[0]) {
        case 'N':
            prev[1] += current[1];
            break;
        case 'S':
            prev[1] -= current[1];
            break;
        case 'E':
            prev[0] += current[1];
            break;
        case 'W':
            prev[0] -= current[1];
            break;
        case 'F':
            prev = moveShipForard(prev, current);
            break;
        case 'L':
        case 'R':
            prev = rotateWaypoint(prev, current);
            break;
    }
    return prev;
}

const rotateWaypoint = (prev, current) => {
    let angle = current[1];
    const side = current[0];

    const [wx, wy, sx, sy] = prev;
    const rotation = {
        '90': [wy, -wx, sx, sy],
        '180': [-wx, -wy, sx, sy],
        '270': [-wy, wx, sx, sy]
    }

    if (side === 'L') {
        angle = 360 - angle;
    }

    return rotation[angle];
}

const moveShipForard = (prev, current) => {
    const ammount = current[1];

    prev[2] += ammount * prev[0];
    prev[3] += ammount * prev[1];

    return prev;
}

fs.readFile(path.join(__dirname, 'input'), 'utf-8', callback);