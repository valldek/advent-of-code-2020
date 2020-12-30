const fs = require('fs');
const path = require('path');

const callback= (err, data) => {
    if (err) throw err;

    const [player1, player2] = parseInput(data);

    console.log(player1, player2);
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

fs.readFile(path.join(__dirname, 'input'), 'utf-8', callback);