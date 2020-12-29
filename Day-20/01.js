const fs = require('fs');
const path = require('path');

const callback = (err, data) => {
    if (err) throw err;

    const tilesArr = data.split('\n\n');
    const tiles = tilesArr.map((tile) => parseTile(tile));
    const tilesCount = tiles.length;

    tiles.forEach((tile, idx, arr) => {
        tile.mutualEdge = [];
        tile.borderPossibility.forEach((edge) => {
            arr.forEach((otherTile, index) => {
                if (index !== idx) {
                    if(otherTile.borderPossibility.includes(edge)) {
                        tile.mutualEdge.push(edge);
                    }
                }
            })
        })
        tile.mutualEdgeCount = tile.mutualEdge.length / 2;
    });

    const cornerTiles = tiles.filter((tile) => tile.mutualEdgeCount === 2);
    const cornerTilesNames = cornerTiles.map((tile) => parseInt(tile.name), 10);
    const output = cornerTilesNames.reduce((acc, cur) => acc *= cur, 1);

    console.log(cornerTilesNames);
    console.log(output);
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

    const tileBorderTransform = {
        top: tileBorder.top.split('').reverse().join(''),
        right: tileBorder.right.split('').reverse().join(''),
        bottom: tileBorder.bottom.split('').reverse().join(''),
        left: tileBorder.left.split('').reverse().join(''),
    }

    return {
        name: tileName,
        border: tileBorder,
        borderTransform: tileBorderTransform,
        borderPossibility: [...Object.values(tileBorder), ...Object.values(tileBorderTransform)]
    };
};

fs.readFile(path.join(__dirname, 'input'), 'utf-8', callback);
