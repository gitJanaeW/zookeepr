const router = require('express').Router();

const {filterByQuery, findById, createNewAnimal, validateAnimal} = require('../../lib/animals');
const {animals} = require('../../data/animals');

// get represents the a server requesting that a client accept data. Server -> client
// get() arguments are: the route that the client will have to fetch from (ie. a part of the URL)
// & a function taht will execute when that route is accessed with a GET request
// a route with "/api/" will be responsible for handling JSON data
router.get('/animals', (req, res) => {
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
router.get('/animals/:id', (req, res) => {
    const result = findById(req.params.id, animals);
    if (result) {
        // when response is "got", send response to the client, using the res parameter's "json()" method
        res.json(result);
    } else {
        res.send(404);
    }
});
  
// post represents a client requesting that the server accept data. Client -> server
router.post('/animals', (req, res) => {
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

module.exports = router;