const { match } = require('assert');
const fs = require('fs');
const path = require('path');

const callback = (err, data) => {
    if (err) throw err;

    const bagMap = {};
    const bags = data.split('\n')
        .map(rule => {
            const [outer, inner] = rule.split(' bags contain ');
            const color = outer.trim();
            
            const innerBags = inner.split(', ')
                .map(innerBagStr => {
                    return getBagColor(innerBagStr);
                })
                .filter(innerBag => innerBag);

            bagMap[color] = {
                color,
                innerBags
           }
        });
    
    // const output = canContainColor(bags, 'shiny gold');
    const output = findHowMany(bagMap, 'shiny gold');

    console.log(output);
}

const getBagColor = (innerBagStr) => {
    if (innerBagStr === 'no other bags.' ) {
        return null;
    }

    const [, ammount, color] = /(\d+)\s([a-z]+\s[a-z]+)\sbags?.?/.exec(innerBagStr)
    return {
        ammount: +ammount,
        color
    }
}

const findHowMany = (bagMap, color) => {
    const root = bagMap[color];

    return root.innerBags.reduce((acc, cur) => {
        const innerAmmount = findHowMany(bagMap, cur.color);
        return acc + cur.ammount + cur.ammount * innerAmmount;
    }, 0)
}

fs.readFile(path.join(__dirname, 'input'), 'utf-8', callback);