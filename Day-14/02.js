const fs = require('fs');
const path = require('path');

const callback = (err, data) => {
    if (err) throw err;

    const dataArr = data.split('\n');
    let mem = {};
    let mask = 0;
    let floatingBitsCount = 0;
    let combinations = 0;
    console.log(combination(2));
    console.log(combination(3));
    console.log(combination(4));

    dataArr.forEach(line => {
        if (/mask/.test(line)) {
            mask = extractMask(line);
            floatingBitsCount = mask.split('').filter(val => val === 'X').length;
            combinations = combination(floatingBitsCount);
        } else {
            const {memAddress, value} = {...extractMemoryModifications(line)}
            const binaryAddress = memAddress.toString(2).padStart(36, '0');

            combinations.forEach(comb => {
                let x = 0;
                let addresses = mask.split('').map((val, idx) => {
                    if ( val === 'X') {
                        return comb[x++];
                    } 
                    if ( val === '0') {
                        return +binaryAddress[idx];
                    } else {
                        return +val
                    }
                }).join('');

                let memLocation = parseInt(addresses, 2);
                mem[memLocation] = value;
            })
        }
    })

    const output = Object.values(mem)
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
        memAddress: +memAddress,
        value: +value
    }
}

const combination = (n) => {
    const max = Math.pow(2, n);
    const result = [];
    for (let i = 0; i < max; i++) {
        result.push(Number(i).toString(2).padStart(n, '0'));
    }
    return result;
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