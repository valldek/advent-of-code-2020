const fs = require('fs');
const path = require('path');

const callback = (err, data) => {
    if (err) throw (err);

    const {rules, myTicket, otherTickets} = {...parseInput(data)};
    
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