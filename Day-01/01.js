const fs = require('fs');
const path = require('path');


const dataRead = (err, data) => {
    if (err) throw err;
    let response;

    const dataArrNum = data.split('\n').map(value => +value);

    const output = dataArrNum.filter((value, idx, arr) => {
        return arr.filter(val => 2020 - value === val).length 
    });    


    if (output.length === 2) {
        response = output.reduce((acc, cur) => {
            return acc = acc * cur 
        }, 1);
    }
    console.log(
        ' numbers: ', output,'\n', 
        'response: ', response,     
    );
}

fs.readFile(path.join(__dirname, 'input'), 'utf-8', dataRead);