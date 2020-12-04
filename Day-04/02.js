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
        return value.hasOwnProperty('byr') && check4DigitNumbers(value.byr, 1920, 2002) &&
        value.hasOwnProperty('iyr') && check4DigitNumbers(value.iyr, 2010, 2020) &&
        value.hasOwnProperty('eyr') && check4DigitNumbers(value.eyr, 2020, 2030) &&
        value.hasOwnProperty('hgt') && checkHeight(value.hgt) &&
        value.hasOwnProperty('hcl') && checkHairColor(value.hcl) &&
        value.hasOwnProperty('ecl') && checkEyeColor(value.ecl) &&
        value.hasOwnProperty('pid') && checkPassportID(value.pid)
    }).length;

    console.log(output);
}

const check4DigitNumbers = (input, min, max) => {
    if (!Number.isInteger(+input)) {
        return false;
    }

    if (input.length !== 4) {
        return false;
    }

    if (input >= min && input <= max) {
        return true;
    }
    
    return false;
}

const checkHeight = (input) => {
    if (input.match(/\b\d+(in)\b/)) {
        const inches = input.replace('in', '');
        return inches >= 59 && inches <= 76;
    } else if (input.match(/\b\d+(cm)\b/)) {
        const inches = input.replace('cm', '');
        return inches >= 150 && inches <= 193;
    };

    return false;
}

const checkHairColor = (input) => {
    return input.match(/\#[0-9a-f]{6}/);
}

const checkEyeColor = (input) => {
    return input.match(/\b(amb|blu|brn|gry|grn|hzl|oth)\b/);
}

const checkPassportID = (input) => {
    if (!Number.isInteger(+input)) {
        return false;
    }

    if (input.length !== 9) {
        return false;
    }

    return true;
}

fs.readFile(path.join(__dirname, 'input'), 'utf-8', callback);