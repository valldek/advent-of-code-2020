const fs = require('fs');
const path = require('path');

const callback = (err, data) => {
    if (err) throw err;

    const dataArrStr = data.trim().split('\n')
        .map(val => val.split(' '))
        .filter(item => {
            const range = item[0].split('-').map(val => +val);
            const character = item[1][0];
            const testString = ' ' + item[2];

            // const regex = new RegExp("[^" + character +"]", "g");
            // const testStringWithout = testString.replace(regex, '');
            
            // return testStringWithout.length >= range[0] && testStringWithout.length <= range[1];

            return testString[range[0]] === character 
                ? testString[range[1]] !== character 
                : testString[range[1]] !== character      
        })
        .length;


    console.log(dataArrStr);
}

fs.readFile(path.join(__dirname, 'input'), 'utf-8', callback);