const fs = require('fs');
const path = require('path');

const callback = (err, data) => {
    if (err) throw (err);

    const {rules, myTicket, otherTickets} = {...parseInput(data)};
    const expandedRules = expandRules(rules);

    const invalidNumbers = otherTickets.map(ticket => {
        return ticket.filter(number => {
            return !((number >= expandedRules.fRangeMin && number <= expandedRules.fRangeMax) ||
                   (number >= expandedRules.sRangeMin && number <= expandedRules.sRangeMax));
        })
    });

    
    const validTickets = otherTickets.filter((val, idx) => {
        return !invalidNumbers[idx].length;
    })
    
    // console.log(invalidNumbers.filter(val => val.length).length, validTickets.length, otherTickets.length);

    const posibilities = Array.from({length: myTicket.length}, () => [])
    const posibilitiesCounted = [];

    validTickets.forEach(ticket => {
        const couldBe = findWhatItCouldBe(rules, ticket);

        for (let i = 0; i < couldBe.length; i++) {
            posibilities[i] = posibilities[i].concat(couldBe[i])
        }
    });

    posibilities.forEach((field, idx) => {
        const tmp = field.reduce((acc, cur) => {
            acc[cur] ? acc[cur]++ : acc[cur] = 1;
            return acc; 
        }, {})
        posibilitiesCounted[idx] = Object.keys(tmp).filter(key => tmp[key] === 190);
    });

    const output = nameTheFields(posibilitiesCounted).reduce((acc, cur, idx) => {
        if (/^departure/.test(cur)) {
            acc *= myTicket[idx];
        } else {
            acc *= 1;
        }
        return acc;
    }, 1); 

    console.log(output); 
}

const nameTheFields = (fieldsPosibilities) => {
    let namedFields = [];
    let tmp = '';
    for (let i = 0; i < fieldsPosibilities.length; i++) {
        fieldsPosibilities.forEach((posibilities, idx) => {
            if (posibilities.length === 1) {
                tmp = posibilities[0];
                namedFields[idx] = posibilities[0];
            }
        });

        fieldsPosibilities = fieldsPosibilities.map(val => {
            return val.filter(val => val !== tmp);
        })
    }

    return namedFields;
}

const findWhatItCouldBe = (rules, ticket) => {
    return ticket.map(number => {
        let couldBe = [];
        
        rules.forEach(rule => {
            if (
                (number >= rule.fRangeMin && number <= rule.fRangeMax) ||
                (number >= rule.sRangeMin && number <= rule.sRangeMax)
            ) {
                couldBe.push(rule.ruleName);
            }
        }) 

        return couldBe;
    })
}

const expandRules = (rules) => {
    return rules.reduce((acc, cur, idx) => {
        if (idx === 0 ) {
            acc.fRangeMin = cur.fRangeMin;
            acc.fRangeMax = cur.fRangeMax;
            acc.sRangeMin = cur.sRangeMin;
            acc.sRangeMax = cur.sRangeMax;
            
        } else {
            acc.fRangeMin = acc.fRangeMin > cur.fRangeMin ? cur.fRangeMin : acc.fRangeMin;
            acc.fRangeMax = acc.fRangeMax < cur.fRangeMax ? cur.fRangeMax : acc.fRangeMax;
            acc.sRangeMin = acc.sRangeMin > cur.sRangeMin ? cur.sRangeMin : acc.sRangeMin;
            acc.sRangeMax = acc.sRangeMax < cur.sRangeMax ? cur.sRangeMax : acc.sRangeMax;
        }
        return acc;  
    }, {})
}

const parseInput = (input) => {
    const inputParts = input.split('\n\n');
    const rules = parseRules(inputParts[0]);
    const myTicket = parseMyTicket(inputParts[1]);
    const otherTickets = parseOtherTickets(inputParts[2]);

    return {
        rules,
        myTicket,
        otherTickets
    }
}

const parseRules = (rulesPart) => {
    ruleRegex = /^(?<ruleName>\w+\s?\w+?):\s(?<fRangeMin>\d+)-(?<fRangeMax>\d+)\s\w+\s(?<sRangeMin>\d+)-(?<sRangeMax>\d+)/;
    const rules = rulesPart.split('\n').map(val => {
        // return ruleRegex.exec(val).groups
        const tmp = {...val.match(ruleRegex).groups}
        return {
            ruleName: tmp.ruleName,
            fRangeMin: +tmp.fRangeMin,
            fRangeMax: +tmp.fRangeMax,
            sRangeMin: +tmp.sRangeMin,
            sRangeMax: +tmp.sRangeMax
        };
    })

    return rules;
}

const parseMyTicket = (yourTicketPart) => {
    return yourTicketPart.split('\n')[1].split(',').map(val => +val);
}

const parseOtherTickets = (otherTickets) => {
    const tickets = otherTickets.split('\n').slice(1).map(val => {
        return val.split(',').map(v => + v);
    });

    return tickets;
}

fs.readFile(path.join(__dirname, 'input'), 'utf-8', callback);