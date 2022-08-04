// this file adds middleware so our app knows about the routes in animalRoutes.js
// this file also acts as  central hub for all routing functions declared with "router" in the application
const router = require('express').Router();
const animalRoutes = require('../apiRoutes/animalRoutes');

router.use(animalRoutes);

module.exports = router;