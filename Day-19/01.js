const fs = require('fs');
const path = require('path');

const callback = (err, data) => {
    if (err) throw err;

    const inputMap = getMapFromInput(data);
    output = goThroughtTheMap(inputMap, '0');

    console.log(output);

};

const getMapFromInput = (input) => {
    const inputMap = new Map();
    const inputArr = input.split('\n');

    inputArr.forEach((row) => {
        const splitedRow = row.split(':');

        if (splitedRow[1].indexOf("\"") !== -1) {
            splitedRow[1] = splitedRow[1].replace(/\"/g, '');
        }

        inputMap.set(splitedRow[0], splitedRow[1].trim());
    });

    return inputMap;
};

const goThroughtTheMap = (map, key) => {
    let result = [];
    let resultIndex = 0;

    if (map.has(key)) {
        result[resultIndex] += goThroughtTheMap(map, map.get(key));
    } else {
        if (key === 'a' || key === 'b') {
            result[resultIndex] += key;
        } else {
            const orInKey = key.indexOf('|') === -1 ? false : true;
            if (orInKey) {
                const keysArr = key.split('|');
                keysArr.forEach((keys, idx) => {
                    resultIndex = idx;
                    result[resultIndex] += goThroughtTheMap(map, keys);
                })
            } else {
                const keys = key.trim().split(' ');
                keys.forEach(k => {
                    result[resultIndex] += goThroughtTheMap(map, k);
                })
            }
        }
    }

    return result;
}

fs.readFile(path.join(__dirname, 'shortInput'), 'utf-8', callback);
