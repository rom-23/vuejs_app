'use strict';
var express = require('express');
var cultureRouter = express.Router();
const config = require('../config');

let culture = require('../controller/cultureController');
//middleware that is specific to this router
// cultureRouter.use(function(req, res, next) {
//   console.log('culture controller activated');
//   next();
// });
cultureRouter.get(config.rootAPI + 'culture', culture.AllCulture);
cultureRouter.get(config.rootAPI + 'culture/cycle', culture.AllCycle);
cultureRouter.get(config.rootAPI + 'culture/type', culture.AllType);
cultureRouter.get(config.rootAPI + 'culture/:idculture', culture.CultureById);
cultureRouter.get(
  config.rootAPI + 'culture/culturestrain/:idculture',
  culture.CultureStrainByIdCulture
);
cultureRouter.get(
  config.rootAPI + 'culture/culturecycle/:idculture',
  culture.CycleByIdCulture
);
cultureRouter.post(config.rootAPI + 'culture/create', culture.InsertCulture);
cultureRouter.post(
  config.rootAPI + 'culture/culturecycle/create',
  culture.InsertCultureCycle
);
cultureRouter.post(
  config.rootAPI + 'culture/culturejuice/create',
  culture.Insert_CultureJuice
);
cultureRouter.post(
  config.rootAPI + 'culture/culturestrain/create',
  culture.Insert_CultureStrain
);
cultureRouter.post(
  config.rootAPI + 'culture/culturebooster/create',
  culture.Insert_CultureBooster
);
cultureRouter.delete(
  config.rootAPI + 'culture/delete/:idculture',
  culture.DeleteCulture
);
cultureRouter.put(
  config.rootAPI + 'culture/update/:idculture',
  culture.UpdateCulture
);

module.exports = cultureRouter;
