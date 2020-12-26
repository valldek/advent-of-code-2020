const fs = require('fs');
const path = require('path');

const callback = (err, data) => {
    if (err) throw err;

    const cycleCount = 6;

    const initialState = pocketInitialization(data);
    let state = initialState;

    for (let i = 0; i < cycleCount; i ++) {
        state = nextCycle(state);
    }

    let sum = 0;
    let cubes = state.values();
    for (const cube of cubes) {
        if(cube === '#') sum++;
    }

    console.log(sum);
};

const pocketInitialization = (input) => {
    const initialState = new Map();
    const rows = input.split('\n').map((val) => val.split(''));
    rows.forEach((row, y) => {
        row.forEach((col, x) => {
            const active = col === '#' ? '#' : '.';
            const key = [0, 0, y, x].join(',');
            initialState.set(key, active);
        });
    });
    return initialState;
};

const nextCycle = (state) => {
    const newState = new Map();
    const minMax = expandRegion(state);

    for (let q = minMax[0]; q <= minMax[1]; q++) {
        for (let z = minMax[2]; z <= minMax[3]; z++) {
            for (let y = minMax[4]; y <= minMax[5]; y++) {
                for (let x = minMax[6]; x <= minMax[7]; x++) {
                    const neighbors = getNeighbors(q, z, y, x, state);
                    const activeNeibors = neighbors.filter((x) => x === '#').length;
                    const key = [q, z, y, x].join(`,`);
                    const activeKey = state.has(key) ? state.get(key) : '.';
                    const isActive = activeKey === '#';
                    if (isActive && activeNeibors !== 2 && activeNeibors !== 3) {
                        newState.set(key, '.');
                    } else if (!isActive && activeNeibors === 3) {
                        newState.set(key, '#');
                    } else {
                        newState.set(key, activeKey);
                    }
                }
            }
        }
    }
        return newState;
};

const expandRegion = (state) => {
    let minMax = Array.from({length: 8}, () => 0);

    state.forEach((val, key) => {
        const [q, z, y, x] = key.split(',').map(k => parseInt(k, 10));
        if (q < minMax[0]) minMax[0] = q;
        if (q > minMax[1]) minMax[1] = q;
        if (z < minMax[2]) minMax[2] = z;
        if (z > minMax[3]) minMax[3] = z;
        if (y < minMax[4]) minMax[4] = y;
        if (y > minMax[5]) minMax[5] = y;
        if (x < minMax[6]) minMax[6] = x;
        if (x > minMax[7]) minMax[7] = x;
    });

    return minMax.map((val, idx) => {
        return idx % 2 ? val + 1 : val - 1;
    });
}

const getNeighbors = (q, z, y, x, state) => {
    const neighbors = []
    for (let m = q - 1; m <= q + 1; m++) {
        for (let i = z - 1; i <= z + 1; i++) {
            for (let j = y - 1; j <= y + 1; j++) {
                for (let k = x - 1; k <= x + 1; k++) {
                    if (m !== q || i !== z || j !== y || k !== x) {
                        const key = [m, i, j, k].join(`,`);
                        if (state.has(key)) {
                            neighbors.push(state.get(key));
                        } else {
                            neighbors.push('.');
                        }
                    }
                }
            }
        }
    }
    return neighbors;
};

fs.readFile(path.join(__dirname, 'input'), 'utf-8', callback);
