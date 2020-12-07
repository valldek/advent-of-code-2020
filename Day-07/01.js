const { match } = require('assert');
const fs = require('fs');
const path = require('path');

const callback = (err, data) => {
    if (err) throw err;

    const bags = data.split('\n')
        .map(rule => {
            const [outer, inner] = rule.split(' bags contain ');
            const color = outer.trim();
            
            const innerBags = inner.split(', ')
                .map(innerBagStr => {
                    return getBagColor(innerBagStr);
                })
                .filter(innerBag => innerBag);

            return {
                color,
                innerBags
           }
        });
    
    const output = canContainColor(bags, 'shiny gold');

    console.log(output.length);
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

const canContainColor = (bags, bagColor) => {
    let contain = [];
    let childContain = bags.filter(bag => 
        bag.innerBags.some( innerBag => 
            innerBag.color === bagColor
        )    
    );

    contain = contain.concat(childContain);

    childContain.forEach(childBag => {
        const nestedBag = canContainColor(bags, childBag.color)
        if (nestedBag && nestedBag.length) {
            contain = contain.concat(nestedBag);
        }
    });

    return [...new Set(contain)];;

}

fs.readFile(path.join(__dirname, 'input'), 'utf-8', callback);