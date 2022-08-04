// https://polar-waters-98180.herokuapp.com/
const fs = require('fs');
const path = require('path'); // for working with relative paths in your files/directories
const express = require('express');
const { animals } = require('./data/animals');
const PORT = process.env.PORT || 3001;
const app = express();

// "extend: true" tells ous our server that there may be nested data within the JSON object to parse
// (otherwise it will parse only the most external data only) 
app.use(express.urlencoded({extend: true}));
// takes incoming POST data (in JSON) and parses it into the req.body object
app.use(express.json());
// provide a file path to a public and instruct the server to make these files static resources
// "public": if anyone on the frontend requests a file (of any kind like js, css, img), look for it in the public folder
app.use(express.static('public'));

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
    path.join(__dirname, './data/animals.json'),
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
  if (!animal.personalityTraits || typeof personalityTraits !== 'string') {
    return false;
  }
  return true;
}

// "/" represents the root route of a server (ie. the homepage)
app.get('/', (req, res) => {
  // pathing to the html code we want to display in the browser when the "/" path is followed in the URL
  // "__dirname" iss a special var that will path to your server code (in our case, that will be this file, server.js)
  res.sendFile(path.join(__dirname, './public/index.html'));
});

// get represents the a server requesting that a client accept data. Server -> client
// get() arguments are: the route that the client will have to fetch from (ie. a part of the URL)
// & a function taht will execute when that route is accessed with a GET request
app.get('/api/animals', (req, res) => {
  let results = animals;
  if (req.query) {
    results = filterByQuery(req.query, results);
  }
  console.log(res);
  // when response is "got", send result to the client, using the res parameter's "json()" method
  // res = response. .json tells the client what type of data to expect (JSON in this case)
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

// post represents a client requesting that the server accept data. Client -> server
app.post('/api/animals', (req, res) => {
  // set id to the whatever the value of the next index would be in string form (note: length is index +1 which is why we used it)
  req.body.id = animals.length.toString();  
  // req.body is where incoming JSON object will be stored
  console.log(req.body, animals);
  if (!validateAnimal(req.body)) {
    res.status(400).send('The animal is not properly formatted.');
  } else {
    // add animal to JSON file and animals array in this function
    const animal = createNewAnimal(req.body, animals);
    res.json(req.body);
  }
  
});

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});