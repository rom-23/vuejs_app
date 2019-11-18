'use strict';
var express = require('express');
var boosterRouter = express.Router();
const config = require('../config');

let booster = require('../controller/boosterController');
//middleware that is specific to this router
// boosterRouter.use(function(req, res, next) {
//   console.log('booster controller activated');
//   next();
// });
// boosterRouter.get(config.rootAPI, function(req, res) {
//   res.redirect(config.rootAPI + 'booster');
// });

boosterRouter.get(config.rootAPI + 'booster', booster.AllBooster);
boosterRouter.get(config.rootAPI + 'booster/:idbooster', booster.BoosterById);
boosterRouter.get(
  config.rootAPI + 'booster/byculture/:idculture',
  booster.BoosterByIdCulture
);
boosterRouter.post(config.rootAPI + 'booster/create', booster.InsertBooster);
boosterRouter.delete(
  config.rootAPI + 'booster/delete/:idbooster',
  booster.DeleteBooster
);
boosterRouter.put(
  config.rootAPI + 'booster/update/:idbooster',
  booster.UpdateBooster
);

module.exports = boosterRouter;
