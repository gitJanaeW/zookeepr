// https://polar-waters-98180.herokuapp.com/
const express = require('express');
const { animals } = require('./data/animals');
const PORT = process.env.PORT || 3001;
const app = express();

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

// get() arguments are: the route that the client will have to fetch from (ie. a part of the URL)
// & a function taht will execute when that route is accessed with a GET request
app.get('/api/animals', (req, res) => {
  let results = animals;
  if (req.query) {
    results = filterByQuery(req.query, results);
  }
  console.log(res);
  // when response is "got", send result to the client, using the res parameter's "json()" method
    // res = response
  res.json(results);
});

// This is a param route. It MUST come after the other "get()" route
// In the route, params are determined by the value following the ":" in the route
app.get('/api/animals/:id', (req, res) => {
  const result = findById(req.params.id, animals);
  if (result) {
    // when response is "got", send response to the client, using the res parameter's "json()" method
    res.json(result);
  } else {
    res.send(404);
  }
});

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});