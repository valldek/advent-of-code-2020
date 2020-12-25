const fs = require('fs');
const path = require('path');

const callback = (err, data) => {
    if (err) throw err;

    const initialState = pocketInitialization(data);
    const next = nextCycle(initialState);

    console.log(next);
}

const pocketInitialization = (input) => {
    const initialState = new Map();
    const rows = input.split('\n').map(val => val.split(''));
    rows.forEach((row, y) => {
        row.forEach((col, x) => {
            const active = col === '#';
            const key = [x, y, 0].join('');
            initialState.set(key, active);
        })
    });  
    return initialState;
}

const nextCycle = (state) => {
    const newState = new Map();
    const minMax = expandRegion(state);
    console.log(minMax)
    for (let x = minMax[0]; x <= minMax[1]; x++) {
        for (let y = minMax[2]; y <= minMax[3]; y++) {
            for (let z = minMax[4]; z <= minMax[5]; z++) {
                const neighbors = getNeighbors(x, y, z, state);
                const activeNeibors = neighbors.filter(x => x).length;
                const key = [x, y, z].join(`,`);
                const isActive = state.has(key) ? state.get(key) : false;
                if (isActive && activeNeibors !== 2 && activeNeibours !== 3) {
                    newState.set(key, false);
                } else if (!isActive && activeNeibors === 3) {
                    newState.set(key, true);
                } else {
                    newState.set(key, isActive);
                }
            }
        }
    }
    return newState;
}

const expandRegion = (state) => {
    // console.log(state.keys());

    // const keys = state.keys();
    let minMax = Array.from({length: 6}, () => 0);

    state.forEach((val, key) => {
        // console.log(typeof key);
        const [x, y, z] = key.split('').map(k => parseInt(k, 10));
        if (x < minMax[0]) minMax[0] = x;
        if (x > minMax[1]) minMax[1] = x;
        if (y < minMax[2]) minMax[2] = y;
        if (y > minMax[3]) minMax[3] = y;
        if (z < minMax[4]) minMax[4] = z;
        if (z > minMax[5]) minMax[5] = z; 
    });


    return minMax.map((val, idx) => {
        return idx % 2 ? val + 1 : val - 1; 
    });
}

const getNeighbors = (x, y, z, state) => {
    const neighbors = [];
    for (let i = x - 1; i <= x + 1; i++) {
        for (let j = y - 1; j <= y + 1; j++) {
            for (let k = z - 1; k <= z + 1; k++) {
                if (i != x || j != y || k != z) {
                    const key = [i, j, k].join(`,`)
                    if (state.has(key)) {
                        neighbors.push(state.get(key));
                    } else {
                        neighbors.push(false);
                    }
                }
            }
        }

    }
    return neighbors;
}

fs.readFile(path.join(__dirname, 'testInput'), 'utf-8', callback);