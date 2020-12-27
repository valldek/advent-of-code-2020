const fs = require('fs');
const path = require('path');

const callback = (err, data) => {
    if (err) throw err;

    const inputData = data.split('\n\n');

    const inputMap = getMapFromInput(inputData[0]);
    const inputMessages = inputData[1].split('\n');
    const zeroMap = reduceMap(inputMap);
    const regExp = zeroMap.get('0').replace(/\s/g, '');

    const output = countMessagesMatchingRule(regExp, inputMessages);

    console.log(regExp);
    console.log(output);
};

const getMapFromInput = (input) => {
    const inputMap = new Map();
    const inputArr = input.split('\n');

    inputArr.forEach((row) => {
        const splitedRow = row.split(':');

        if (splitedRow[1].indexOf('"') !== -1) {
            splitedRow[1] = splitedRow[1].replace(/\"/g, '');
        }

        inputMap.set(splitedRow[0], splitedRow[1].trim());
    });

    return inputMap;
};

const reduceMap = (map) => {
    while (map.size > 1) {
        const keys = findKeysForValuesWithoutNumbers(map);
        console.log(keys);
        keys.forEach((key) => {
            let value = map.get(key);
            if (value.length > 1) {
                value = `(${value})`;
            }

            map.delete(key);
            map.forEach((v, k) => {
                v = v.replace(new RegExp(key, 'g'), value);
                map.set(k, v);
            });
        });
    }
    return map;
};

const findKeysForValuesWithoutNumbers = (map) => {
    const keys = [];
    map.forEach((value, key) => {
        if (!/[\d+]/.test(value)) {
            keys.push(key);
        }
    });

    return keys;
};

const countMessagesMatchingRule = (rule, messages) => {
    const ruleRegExp = new RegExp(`^${rule}$`);
    return messages.filter((value) => {
        return ruleRegExp.test(value)
    }).length;
};

fs.readFile(path.join(__dirname, 'testInput'), 'utf-8', callback);
