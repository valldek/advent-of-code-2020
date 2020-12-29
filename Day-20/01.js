const fs = require('fs');
const path = require('path');

const callback = (err, data) => {
    if (err) throw err;

    const tilesArr = data.split('\n\n');
    const tilesBorder = tilesArr.map((tile) => parseTile(tile));

    console.log(tilesBorder);
};

const parseTile = (str) => {
    const tile = str.split(':\n');
    const tileName = tile[0].split(' ')[1];
    const tileImageLines = tile[1].split('\n');
    const tileImageLinesCount = tileImageLines.length;
    const tileImageLineLength = tileImageLines[0].length;

    const tileBorder = {
        top: tileImageLines[0],
        right: '',
        bottom: tileImageLines[tileImageLinesCount - 1],
        left: '',
    };

    tileImageLines.forEach((line, idx) => {
        tileBorder.right += line[tileImageLineLength -1];
        tileBorder.left += line[0];
    });

    return {
        name: tileName,
        border: tileBorder
    };
};

fs.readFile(path.join(__dirname, 'testInput'), 'utf-8', callback);
