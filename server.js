const {animals} = require('./data/animals.json');
const express = require('express');
const app = express();

// get() arguments are: the route that the client will have to fetch from & a function taht will execute when that route is accessed with a GET request
app.get('/api/animals', (req, res) => {
    // when response is "got", send 'Hello!' to the client, using the res parameter's "send()" method
    res.send('Hello');
});

app.listen(3001, () => {
    console.log('API server not on port 3001.');
});