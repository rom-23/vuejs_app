'use strict';
var express = require('express');
var juiceRouter = express.Router();
const config = require('../config');

let juice = require('../controller/juiceController');
//middleware that is specific to this router
// juiceRouter.use(function(req, res, next) {
//   console.log('juice controller activated');
//   next();
// });
juiceRouter.get(config.rootAPI + 'juice', juice.AllJuice);
juiceRouter.get(config.rootAPI + 'juice/:idjuice', juice.JuiceById);
juiceRouter.get(
  config.rootAPI + 'juice/byculture/:idculture',
  juice.JuiceByIdCulture
);
juiceRouter.post(config.rootAPI + 'juice/create', juice.InsertJuice);
juiceRouter.delete(config.rootAPI + 'juice/delete/:idjuice', juice.DeleteJuice);
juiceRouter.put(config.rootAPI + 'juice/update/:idjuice', juice.UpdateJuice);

module.exports = juiceRouter;
