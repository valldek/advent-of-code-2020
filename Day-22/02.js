const fs = require('fs');
const path = require('path');

const callback= (err, data) => {
    if (err) throw err;

    const [player1, player2] = parseInput(data);

    console.log(player1, player2);
    playRecursiveCombat(player1, player2);

    const winner = player1.length > player2.length ? player1 : player2;

    const output = getPlayerScore(winner);

    console.log(output);
}

const parseInput = (input) => {
    const [player1, player2] = input
        .split('\n\n')
        .map(player => player
            .split('\n')
        )
        .map(player => player
            .filter((move, idx) => idx !== 0)
            .map((card) => parseInt(card, 10))
        );

    return [player1, player2];
}

const getPlayerScore = (cards) => {
    return cards.reverse().reduce((acc, cur, idx) => {
        return acc += cur * (idx + 1);
    }, 0)
}

const playRecursiveCombat = (cardsP1, cardsP2, history = new Set()) => {
    while(true) {
        const drawP1 = cardsP1.shift();
        const drawP2 = cardsP2.shift();

        const state = cardsP1.join(',') + ',' + cardsP2.join(',');

        if (history.has(state)) {
            return 'p1';
        } else {
            history.add(state)
        }

        let winner = drawP1 > drawP2 ? 'p1' : 'p2';

        if (cardsP1.length >= drawP1 && cardsP2.length >= drawP2) {
            winner = playRecursiveCombat(cardsP1.slice(0, drawP1), cardsP2.slice(0, drawP2), new Set());
        }

        if (winner === 'p1') {
            cardsP1.push(drawP1, drawP2);
        } else {
            cardsP2.push(drawP2, drawP1);
        }

        if (cardsP1.length === 0) {
            return 'p2';
        } else if (cardsP2.length === 0) {
            return 'p1';
        }
    }
}

fs.readFile(path.join(__dirname, 'input'), 'utf-8', callback);