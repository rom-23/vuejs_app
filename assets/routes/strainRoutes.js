'use strict';
var express = require('express');
var strainRouter = express.Router();
const config = require('../config');
let strain = require('../controller/strainController');
//middleware that is specific to this router
// strainRouter.use(function(req, res, next) {
//   console.log('strain controller activated');
//   next();
// });
strainRouter.get(config.rootAPI + 'strain', strain.AllStrain);
strainRouter.get(config.rootAPI + 'strain/type', strain.AllStrainType);
strainRouter.get(
  config.rootAPI + 'strain/type/:idstraintype',
  strain.getTypeById
);
strainRouter.get(
  config.rootAPI + 'strain/byculture/:idculture',
  strain.StrainByIdCulture
);
strainRouter.get(config.rootAPI + 'strain/:idstrain', strain.StrainById);
strainRouter.post(config.rootAPI + 'strain/create', strain.InsertStrain);
strainRouter.delete(
  config.rootAPI + 'strain/delete/:idstrain',
  strain.DeleteStrain
);
strainRouter.put(
  config.rootAPI + 'strain/update/:idstrain',
  strain.UpdateStrain
);

module.exports = strainRouter;
