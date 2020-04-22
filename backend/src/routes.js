const express = require('express');
const routes = express.Router();

const DevController = require("./controllers/DevController");
const SearchController = require('./controllers/SearchController');



routes.get('/devs/search', SearchController.index);

routes.post('/devs', DevController.store);
