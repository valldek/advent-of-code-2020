const fs = require('fs');
const path = require('path');

const callback= (err, data) => {
    if (err) throw err;

    const [player1, player2] = parseInput(data);

    // console.log(player1, player2);

    while(player1.length > 0 && player2.length > 0) {
        nextRound(player1, player2);
    }

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

const nextRound = (cardsP1, cardsP2) => {
    const drawP1 = cardsP1.shift();
    const drawP2 = cardsP2.shift();

    const pool = [drawP1, drawP2].sort((a, b) => b - a);

    return drawP1 > drawP2 ? cardsP1.push(...pool) : cardsP2.push(...pool);
}

const getPlayerScore = (cards) => {
    return cards.reverse().reduce((acc, cur, idx) => {
        return acc += cur * (idx + 1);
    }, 0)
}

fs.readFile(path.join(__dirname, 'input'), 'utf-8', callback);