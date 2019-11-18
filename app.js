const bodyParser = require('body-parser');
const express = require('express');
var cors = require('cors');
const morgan = require('morgan')('dev');
const config = require('./assets/config');
const app = express();
app.use(cors());
app.use(morgan);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var boosterRouter = require('./assets/routes/boosterRoutes');
var juiceRouter = require('./assets/routes/juiceRoutes');
var strainRouter = require('./assets/routes/strainRoutes');
var cultureRouter = require('./assets/routes/cultureRoutes');
var measureRouter = require('./assets/routes/measureRoutes');

app.get(config.rootAPI, function(req, res) {
  res.send(
    'This is the root directory of the growUp API v3 - select a service to access the API'
  );
});
app.use(boosterRouter, juiceRouter, strainRouter, cultureRouter, measureRouter);
app.listen(config.port, () => console.log('Started on port ' + config.port));
