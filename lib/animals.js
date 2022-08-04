const fs = require('fs');
const path = require('path'); // for working with relative paths in your files/directories

// take req.query as an argument and return a filtered list of query results
function filterByQuery(query, animalsArray) {
    let personalityTraitsArray = [];
    // Creating a new array for filtered results
    let filteredResults = animalsArray;
    if (query.personalityTraits) {
        // If personalityTraits query is a string, place it into a new array and save.
        if (typeof query.personalityTraits === 'string') {
        personalityTraitsArray = [query.personalityTraits];
        } // If personalityTraits query is already an array, no array is needed
        else {
        personalityTraitsArray = query.personalityTraits;
        }
        personalityTraitsArray.forEach(trait => {
        // For each index, filter the animals that match the current trait in the index
        filteredResults = filteredResults.filter(
            animal => animal.personalityTraits.indexOf(trait) !== -1
        );
        console.log(trait);
        });
    }
    if (query.diet) {
        filteredResults = filteredResults.filter(animal => animal.diet === query.diet);
    }
    if (query.species) {
        filteredResults = filteredResults.filter(animal => animal.species === query.species);
    }
    if (query.name) {
        filteredResults = filteredResults.filter(animal => animal.name === query.name);
    }
    return filteredResults;
}

// A seperate function from findByQuery() because queries can return multiple results and a id should only return one result
function findById(id, animalsArray) {
    // FOR BRIAN: What is the [0] for? Is it the first key/value pair in the object returned by the filter()?
    const result = animalsArray.filter(animal => animal.id === id)[0];
    return result;
}

// import to the animals array
function createNewAnimal(body, animalsArray) {
    const animal = body; // Create a new var for body (aka: animal)
    animalsArray.push(animal); // Push animal to the animalsArray
    // writeFileSync is the sync version of the asycn "writeFile" function. Bc this is a small data set, sync will work for our needs
    fs.writeFileSync(
        // __dirname represents the file we're executing code in. the 2nd parameter is the file that is being joined
        path.join(__dirname, '../data/animals.json'),
        // parse the animal array into JSON
        JSON.stringify({animals:animalsArray},
        // null represents no changes to our existing data, 2 represents wanting to create white space between our existing data
        // The arguments are optional, but the return data is easier to read with them included
        null, 2)
    );
    return animal;
}

function validateAnimal(animal) {
    if (!animal.name || typeof animal.name !== 'string') {
        return false;
    }
    if (!animal.species || typeof animal.species !== 'string') {
        return false;
    }
    if (!animal.diet || typeof animal.diet !== 'string') {
        return false;
    }
    if (!animal.personalityTraits) {
        return false;
    }
    return true;
}

module.exports = {filterByQuery, findById, createNewAnimal, validateAnimal};