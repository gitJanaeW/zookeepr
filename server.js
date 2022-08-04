// https://polar-waters-98180.herokuapp.com/
const fs = require('fs');
const path = require('path'); // for working with relative paths in your files/directories
const express = require('express');
const apiRoutes = require('./routes/apiRoutes'); // bc the file in this folder is a called "index", this path will immediately find the index file without it being written
const htmlRoutes = require('./routes/htmlRoutes'); // bc the file in this folder is a called "index", this path will immediately find the index file without it being written
const { animals } = require('./data/animals');
const PORT = process.env.PORT || 3001;
const app = express();

// MIDDLEWARE
// "extend: true" tells ous our server that there may be nested data within the JSON object to parse
// (otherwise it will parse only the most external data only) 
app.use(express.urlencoded({extend: true}));
// takes incoming POST data (in JSON) and parses it into the req.body object
app.use(express.json());
// telling the server that any client interaction with localhost:3001/api will be have to go through apiRoutes/index.js first
app.use('./api', apiRoutes);
// telling the server that any client interaction with localhost:3001/api will be have to go through htmlRoutes/index.js first
app.use('/', htmlRoutes);
// provide a file path to a public and instruct the server to make these files static resources
// "public": if anyone on the frontend requests a file (of any kind like js, css, img), look for it in the public folder
app.use(express.static('public'));

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});