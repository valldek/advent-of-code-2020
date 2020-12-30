const fs = require('fs');
const path = require('path');

const callback = (err, data) => {
    if (err) throw err;

    const parsedInput = parseInput(data);
    const possible = getAllergentPossibleIngredients(parsedInput);

    console.log(parsedInput);

    // console.log(getAllIngredients(parsedInput));

    const withAllergent = getAllIngredientsWithAllergent(possible);

    console.log(withAllergent);

    const output = getAllIngredients(parsedInput)
        .ingredients
        .filter((ingredient) => {
            return !withAllergent.has(ingredient)
        });

    console.log(output.length);

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



fs.readFile(path.join(__dirname, 'input'), 'utf-8', callback);