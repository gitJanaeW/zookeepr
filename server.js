const {animals} = require('./data/animals.json');
const express = require('express');
const app = express();

// take req.query as an argument and return a filtered list of query results
function filterByQuery(query, animalsArray) {
    let personalityTraitsArray = [];
    // Creating a new array for filtered results
    let filteredResults = animalsArray;
    if (query.personalityTraits) {
        // If personalityTraits query is a string, place it into a new array and save.
        if(typeof query.personalityTraits === 'string') {
            personalityTraitsArray = [query.personalityTraits];
        } // If personalityTraits query is already an array, no array is needed
        else {
            personalityTraitsArray = query.personalityTraits;
        }
        // On each iteration, revise filteredResults so that it only contains animals that possess the indicated trait
        personalityTraitsArray.forEach(trait => {
            // For each index, filter the animals that match the current trait in the index
            filteredResults = filteredResults.filter(
                // FOR BRIAN: Where are the parameters "trait" and "animal" coming from? What do they represent? Also, why is there a -1?
                animal => animal.personalityTraits.indexOf(trait) !== -1
            );
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

// get() arguments are: the route that the client will have to fetch from (ie. a part of the URL)
// & a function taht will execute when that route is accessed with a GET request
app.get('/api/animals', (req, res) => {
    let results = animals;
    if (req.query) {
        results = filterByQuery(req.query, results);
    }
    // when response is "got", send 'Hello!' to the client, using the res parameter's "send()" method
    res.json(results);
});

app.listen(3001, () => {
    console.log('API server on port 3001.');
});