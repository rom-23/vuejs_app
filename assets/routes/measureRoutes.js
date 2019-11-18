'use strict';
var express = require('express');
var measureRouter = express.Router();
const config = require('../config');

let measure = require('../controller/measureController');
let measureBooster = require('../controller/measureBoosterController');
//middleware that is specific to this router
// juiceRouter.use(function(req, res, next) {
//   console.log('juice controller activated');
//   next();
// });
measureRouter.get(config.rootAPI + 'measure', measure.AllMeasure);
measureRouter.get(config.rootAPI + 'measure/:idmeasure', measure.MeasureById);
measureRouter.get(
  config.rootAPI + 'measure/byculture/:idculture',
  measure.MeasureByIdCulture
);
measureRouter.post(config.rootAPI + 'measure/create', measure.InsertMeasure);
measureRouter.delete(
  config.rootAPI + 'measure/delete/:idmeasure',
  measure.DeleteMeasure
);

measureRouter.get(
  config.rootAPI + 'measurebooster',
  measureBooster.AllMeasureBooster
);
measureRouter.get(
  config.rootAPI + 'measurebooster/:idculturedosebooster',
  measureBooster.MeasureBoosterById
);
measureRouter.get(
  config.rootAPI + 'measurebooster/byculture/:idculture',
  measureBooster.MeasureBoosterByIdCulture
);
measureRouter.post(
  config.rootAPI + 'measurebooster/create',
  measureBooster.InsertMeasureBooster
);
measureRouter.delete(
  config.rootAPI + 'measurebooster/delete/:idculturedosebooster',
  measureBooster.DeleteMeasureBooster
);

module.exports = measureRouter;
