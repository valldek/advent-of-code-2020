const fs = require('fs');
const path = require('path');

const callback = (err, data) => {
    if (err) throw err;

    const parsedInput = parseInput(data);
    const possible = getAllergentPossibleIngredients(parsedInput);

    const withAllergent = getAllIngredientsWithAllergent(possible);

    // const output = getAllIngredients(parsedInput)
    //     .ingredients
    //     .filter((ingredient) => {
    //         return !withAllergent.has(ingredient)
    //     });

    // console.log(possible);

    const output = getCanonicalDangerousIngredientList(possible);

    console.log(output);
}

const parseInput = (input) => {
    const inputLine = input.split('\n');

    return inputLine.map((line) => {
        const [ingredientsStr, allergensStr] = line.replace('\)', '').split(' (contains ');
        return {
            ingredients: ingredientsStr.split(' '),
            allergens: allergensStr.split(', ')
        }
    });
}

const getAllergentPossibleIngredients = (input) => {
    const possible = {};

    input.forEach((ingAll) => {
        ingAll.allergens.forEach((allergen) => {
            if (possible[allergen]) {
                possible[allergen] = ingAll.ingredients.filter((ing) => {
                        return possible[allergen].includes(ing);
                    })
            } else {
                possible[allergen] = ingAll.ingredients;
            }
        })
    });

    return possible;
}

const getAllIngredientsWithAllergent = (possible) => {
    const ingredients = Object.values(possible).flat();

    return new Set(ingredients);
}

const getAllIngredients = (input) => {
    const ingredients = [];

    input.forEach((ingAll) => {
        ingredients.push(...ingAll.ingredients)
    });

    return {
        uniqueIngredients: new Set(ingredients),
        ingredients
    }
}

const getCanonicalDangerousIngredientList = (possible) => {
    const allergentList = {};
    let lastAdded = '';
    while (Object.keys(possible).length) {
        for (const allIng in possible) {
            if (possible[allIng].length === 1) {
                allergentList[allIng] = possible[allIng];
                lastAdded = possible[allIng][0];
                delete possible[allIng];
                break;
            }
        }

        for (const allIng in possible) {
            possible[allIng] = possible[allIng].filter(ing => ing !== lastAdded);
        }
    }
    console.log(allergentList);

    const sortedKeys = Object.keys(allergentList).sort();

    return sortedKeys.map(key => allergentList[key]).flat().join(',');
}



fs.readFile(path.join(__dirname, 'input'), 'utf-8', callback);