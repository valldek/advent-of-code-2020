const fs = require('fs');
const path = require('path');

const callback = (err, data) => {
    if (err) throw err;

    const dataArr = data.split('\n');
    let mask = 0;
    const memory = dataArr.reduce((acc, cur) => {
        if (cur.match('mask')) {
            mask = extractMask(cur);
            acc = {...acc};
        } else {
            const {memAddress, value} = {...extractMemoryModifications(cur)};
            const bitValue = convertTo36BitBinary(value);
            const afterMask = applayMask(mask, bitValue);
            acc[memAddress] = afterMask;
        }

        return acc;
    }, {})

    const output = Object.values(memory)
        .reduce((acc, cur) => {
            return acc += cur
        }, 0);
    
    console.log(output);
}

const extractMask = (str) => {
    return str.split(' = ')[1];
}

const extractMemoryModifications = (str) => {
    const regex = /\[(\d+)\]\s=\s(\d+)/;
    const [, memAddress, value] = regex.exec(str);

    return {
        memAddress,
        value
    }
}

const convertTo36BitBinary = (str) => {
    const strInBinary = Number(str).toString(2);
    const fillUpto36 = Array.from({length: 36 - strInBinary.length}, () => 0).join('');
    
    return fillUpto36 + strInBinary;
}

const applayMask = (mask, value) => {
    const maskSize = mask.length;
    let result = [];

    for (let i = 0; i < maskSize; i++) {
        if (mask[i] === 'X') {
            result[i] = value[i];
        } else {
            result[i] = mask[i];
        }
    }
    return parseInt(result.join(''), 2);
}

fs.readFile(path.join(__dirname, 'input'), 'utf-8', callback);