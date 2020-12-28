const fs = require('fs');
const path = require('path');

const callback = (err, data) => {
    if (err) throw err;

    const inputData = data.split('\n\n');

    const inputMap = getMapFromInput(inputData[0]);
    const modifiedInputMap = modifyMap(inputMap);

    const inputMessages = inputData[1].split('\n');
    const zeroMap = reduceMap(modifiedInputMap);
    // const regExp = zeroMap.get('0').replace(/\s/g, '');

    const output = countMessagesMatchingRule(inputMessages, zeroMap);

    // console.log(regExp);
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
    // let infiniteLoop = false;
    let rule42 = '';
    let rule31 = '';

    while (map.size > 1) {
        let keys = findKeysForValuesWithoutNumbers(map);

        if (!keys.length) {
            // infiniteLoop = true;
            keys = ['8', '11'];
            const rule8 = map.get('8').replace('8', `(${rule42})+`);
            const rule11 = map.get('11').replace('11', `(${rule42})+ (${rule31})+`);

            map.set('8', rule8);
            map.set('11', rule11);
        }

        keys.forEach((key) => {
            if (key === '42') {
                rule42 = map.get(key);
            }

            if (key === '31') {
                rule31 = map.get(key);
            }

            let value = map.get(key);
            if (value.length > 1) {
                value = `(${value})`;
            }

            map.delete(key);
            map.forEach((v, k) => {
                const toReplace = new RegExp(`\\b${key}\\b`, 'g');
                v = v.replace(toReplace, value);
                map.set(k, v);
            });
        });
    }
    map.set('31', rule31);
    map.set('42', rule42);
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

const countMessagesMatchingRule = (messages, map) => {
    const rule31 = map.get('31').replace(/\s/g, '');
    const rule42 = map.get('42').replace(/\s/g, '');

    const ruleRegExp = new RegExp(`^(?<g42>(${rule42})+)(?<g31>(${rule31})+)$`);

    return messages.filter((message) => {
        const matches = ruleRegExp.exec(message);
        if (matches) {
            const matches42 = matches.groups.g42.match(new RegExp(rule42, 'g')).length;
            const matches31 = matches.groups.g31.match(new RegExp(rule31, 'g')).length;

            if (matches42 > matches31) {
                return true;
            }
        }
        return false;
    }).length

};

const modifyMap = (map) => {
    const modifiedMap = new Map(map);
    modifiedMap.set('8', '42 | 42 8');
    modifiedMap.set('11', '42 31 | 42 11 31');

    return modifiedMap;
};

fs.readFile(path.join(__dirname, 'input'), 'utf-8', callback);
