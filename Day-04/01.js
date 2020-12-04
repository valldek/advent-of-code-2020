const fs = require('fs');
const path = require('path');

const callback = (err, data) => {
    const dataArr = data.split('\n\n').map(val => val.split(/[\s?\n?]/));

    const dataArrOfObj = dataArr.map(val => {
        const obj = {};
        val.map(value => {
            pair = value.split(':');
            obj[pair[0]] = pair[1];
        });
        return obj;
    });

    const output = dataArrOfObj.filter(value => {
        return value.hasOwnProperty('byr') &&
        value.hasOwnProperty('iyr') &&
        value.hasOwnProperty('eyr') &&
        value.hasOwnProperty('hgt') &&
        value.hasOwnProperty('hcl') &&
        value.hasOwnProperty('ecl') &&
        value.hasOwnProperty('pid')
    }).length;

    console.log(output);
}

fs.readFile(path.join(__dirname, 'input'), 'utf-8', callback);