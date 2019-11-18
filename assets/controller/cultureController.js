'use strict';
var Culture = require('../model/cultureModel.js');
var Cycle = require('../model/cycleModel.js');
var CultureType = require('../model/cultureTypeModel.js');
var CultureBooster = require('../model/mixedModels/cultureBooster.js');
var CultureCycle = require('../model/mixedModels/cultureCycle.js');
var CultureJuice = require('../model/mixedModels/cultureJuice.js');
var CultureStrain = require('../model/mixedModels/cultureStrain.js');
const { checkAndChange } = require('../functions');

exports.AllCulture = function(req, res) {
  Culture.getAllCulture(function(err, culture) {
    if (err) res.send(err);
    res.send(checkAndChange(culture));
  });
};
exports.AllCycle = function(req, res) {
  Cycle.getAllCycle(function(err, cycle) {
    if (err) res.send(err);
    res.send(checkAndChange(cycle));
  });
};
exports.AllType = function(req, res) {
  CultureType.getAllType(function(err, culturetype) {
    if (err) res.send(err);
    res.send(checkAndChange(culturetype));
  });
};
exports.CycleById = function(req, res) {
  Cycle.getCycleById(req.params.idcycle, function(err, cycle) {
    if (req.params.idcycle === '0' || cycle[0] === undefined) {
      res.json({ error: 'Error with a wrong id ' });
      console.log('error with the id');
    } else {
      res.json(checkAndChange(cycle));
      console.log('-- > Cycle search done');
    }
  });
};
exports.CultureById = function(req, res) {
  Culture.getCultureById(req.params.idculture, function(err, culture) {
    if (req.params.idculture === '0' || culture[0] === undefined) {
      res.json({ error: 'Error with a wrong id ' });
      console.log('error with the id');
    } else {
      res.json(checkAndChange(culture));
      console.log('-- > Culture search done');
    }
  });
};
exports.CultureStrainByIdCulture = function(req, res) {
  CultureStrain.getCultureStrainByCulture(req.params.idculture, function(
    err,
    culturestrain
  ) {
    if (req.params.idculture === '0' || culturestrain[0] === undefined) {
      res.json({ error: 'Error with a wrong id ' });
      console.log('error with the id');
    } else {
      res.json(checkAndChange(culturestrain));
      console.log('-- > Culture strain  search done');
    }
  });
};
exports.CycleByIdCulture = function(req, res) {
  Cycle.getCycleByCulture(req.params.idculture, function(err, cycle) {
    if (req.params.idculture === '0' || cycle[0] === undefined) {
      res.json({ error: 'Error with a wrong id ' });
      console.log('error with the id');
    } else {
      res.json(checkAndChange(cycle));
      console.log('-- > Culture cycle  search done');
    }
  });
};
exports.DeleteCulture = function(req, res) {
  Culture.DeleteCultureById(req.params.idculture, function(err, culture) {
    if (req.params.idculture === '0' || !culture) {
      res.json({ error: ' Id Not valid for removal' });
      console.log('Id Not valid for removal');
    } else {
      res.json(checkAndChange(culture));
      console.log('--- > Id deleted done :' + req.params.idculture);
    }
  });
};
exports.UpdateCulture = function(req, res) {
  let update_culture = new Culture(
    req.body.culture_name,
    req.body.culture_start_date,
    req.body.culture_comment,
    req.body.culture_state,
    req.body.culture_end_date,
    req.body.idculturetype
  );
  Culture.UpdateCultureById(req.params.idculture, update_culture, function(
    err,
    culture
  ) {
    if (err || !culture) {
      res.json({ error: 'Name already taken ' });
    } else {
      res.json(checkAndChange(culture));
      console.log('-- > Update done ');
    }
  });
};
exports.InsertCulture = function(req, res) {
  let new_culture = new Culture(
    req.body.culture_name,
    req.body.culture_start_date,
    req.body.culture_comment,
    req.body.culture_state,
    req.body.culture_end_date,
    req.body.idculturetype
  );
  Culture.insertCulture(new_culture, function(err, culture) {
    if (err || !culture) {
      res.json({ error: 'Name already taken ' });
    } else {
      res.json(checkAndChange(culture));
      console.log('-- > Insert in database done ');
    }
  });
};
exports.InsertCultureCycle = function(req, res) {
  let new_cultureCycle = new CultureCycle(
    req.body.idcycle,
    req.body.idculture,
    req.body.culture_cycle_date
  );
  CultureCycle.InsertCultureCycle1(new_cultureCycle, function(
    err,
    culturecycle
  ) {
    if (err) {
      res.json({ error: error });
    } else {
      res.json(checkAndChange(culturecycle));
      console.log('-- > Insert in database done ');
    }
  });
};
exports.Insert_CultureJuice = function(req, res) {
  CultureJuice.insertCultureJuice(req.body.new_cultureJuice, function(
    err,
    culturejuice
  ) {
    if (err) {
      res.json({ error: error + 'Id juice is needed' });
    } else {
      res.json(checkAndChange(culturejuice));
      console.log('-- > Insert in database done ');
    }
  });
};
exports.Insert_CultureStrain = function(req, res) {
  CultureStrain.insertCultureStrain(req.body.new_cultureStrain, function(
    err,
    culturestrain
  ) {
    if (err) {
      res.json({ error: error });
    } else {
      res.json(checkAndChange(culturestrain));
      console.log('-- > Insert in database done ');
    }
  });
};
exports.Insert_CultureBooster = function(req, res) {
  CultureBooster.insertCultureBooster(req.body.new_cultureBooster, function(
    err,
    culturebooster
  ) {
    if (err) {
      res.json({ error: error + 'Id booster is needed' });
    } else {
      res.json(checkAndChange(culturebooster));
      console.log('-- > Insert in database done ');
    }
  });
};
