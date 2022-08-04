const path = require('path'); // for working with relative paths in your files/directories
const router = require('express').Router();

// "/" represents the root route of a server (ie. the homepage)
router.get('/', (req, res) => {
    // pathing to the html code we want to display in the browser when the "/" path is followed in the URL
    // "__dirname" iss a special var that will path to your server code (in our case, that will be this file, server.js)
    res.sendFile(path.join(__dirname, '../../public/index.html'));
});

router.get('/animals', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/animals.html'));
});

router.get('/zookeepers', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/zookeepers.html'));
});

// "*" symbolizes any route that isn't defined in case the endpoint the user inputs doesn't exist
// the "*" route should always come last
router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'))
});  


module.exports = router;