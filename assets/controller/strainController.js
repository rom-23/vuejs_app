'use strict';
var Strain = require('../model/strainModel.js');
var StrainType = require('../model/strainTypeModel.js');
const { checkAndChange } = require('../functions');

exports.AllStrain = function(req, res) {
  Strain.getAllStrain(function(err, strain) {
    if (err) res.send(err);
    res.send(checkAndChange(strain));
  });
};
exports.AllStrainType = function(req, res) {
  StrainType.getAllStrainType(function(err, straintype) {
    if (err) res.send(err);
    res.send(checkAndChange(straintype));
  });
};
exports.getTypeById = function(req, res) {
  StrainType.getStrainTypeById(req.params.idstraintype, function(
    err,
    straintype
  ) {
    if (req.params.idstraintype === '0' || straintype[0] === undefined) {
      res.json({ error: 'Error with a wrong id ' });
      console.log('error with the id');
    } else {
      res.json(checkAndChange(straintype));
      console.log('-- > Strain type search done');
    }
  });
};
exports.DeleteStrain = function(req, res) {
  Strain.DeleteStrainById(req.params.idstrain, function(err, strain) {
    if (req.params.idstrain === '0' || !strain) {
      res.json({ error: ' Id Not valid for removal' });
      console.log('Id Not valid for removal');
    } else {
      res.json(checkAndChange(strain));
      console.log('--- > Id deleted done :' + req.params.idstrain);
    }
  });
};
exports.UpdateStrain = function(req, res) {
  let update_strain = new Strain(
    req.body.strain_name,
    req.body.strain_desc,
    req.body.strain_date.substr(0, 10),
    req.body.strain_genetic,
    req.body.idstraintype,
    req.body.thc_ratio,
    req.body.strain_bloom,
    req.body.strain_origin
  );
  Strain.UpdateStrainById(req.params.idstrain, update_strain, function(
    err,
    strain
  ) {
    if (err || !strain) {
      res.json({ error: 'Name already taken ' });
    } else {
      res.json(checkAndChange(strain));
      console.log('-- > Update done ');
    }
  });
};
exports.StrainById = function(req, res) {
  Strain.getStrainById(req.params.idstrain, function(err, strain) {
    if (req.params.idstrain === '0' || strain[0] === undefined) {
      res.json({ error: 'Error with a wrong id ' });
      console.log('error with the id');
    } else {
      res.json(checkAndChange(strain));
      console.log('-- > Strain search done');
    }
  });
};
exports.StrainByIdCulture = function(req, res) {
  Strain.getStrainByIdCulture(req.params.idculture, function(err, strain) {
    if (req.params.idculture === '0' || strain[0] === undefined) {
      res.json({ error: 'Error with a wrong idculture ' });
      console.log('error with the idculture');
    } else {
      res.json(checkAndChange(strain));
      console.log('-- > Strain by culture search done');
    }
  });
};
exports.InsertStrain = function(req, res) {
  let new_strain = new Strain(
    req.body.strain_name,
    req.body.strain_desc,
    req.body.strain_date,
    req.body.strain_genetic,
    req.body.idstraintype,
    req.body.thc_ratio,
    req.body.strain_bloom,
    req.body.strain_origin
  );
  Strain.insertStrain(new_strain, function(err, strain) {
    if (err || !strain) {
      res.json({ error: 'Name already taken ' });
    } else {
      res.json(checkAndChange(strain));
      console.log('-- > Insert in database done ');
    }
  });
};
