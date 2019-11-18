'use strict';
var Juice = require('../model/juiceModel.js');
const { checkAndChange } = require('../functions');

exports.AllJuice = function(req, res) {
  Juice.getAllJuice(function(err, juice) {
    if (err) res.send(err);
    res.send(checkAndChange(juice));
  });
};
exports.DeleteJuice = function(req, res) {
  Juice.DeleteJuiceById(req.params.idjuice, function(err, juice) {
    if (req.params.idjuice === '0' || !juice) {
      res.json({ error: ' Id Not valid for removal' });
      console.log('Id Not valid for removal');
    } else {
      res.json(checkAndChange(juice));
      console.log('--- > Id deleted done :' + req.params.idjuice);
    }
  });
};
exports.UpdateJuice = function(req, res) {
  let update_juice = new Juice(
    req.body.juice_name,
    req.body.juice_origin,
    req.body.juice_dose,
    req.body.juice_date.substring(0, 10),
    req.body.juice_type
  );
  Juice.UpdateJuiceById(req.params.idjuice, update_juice, function(err, juice) {
    if (err || !juice) {
      res.json({ error: 'Name already taken' + err });
      console.log('-- > error with update : ' + req.params.idjuice);
    } else {
      res.json(checkAndChange(juice));
      console.log('-- > Update done for id : ' + req.params.idjuice);
    }
  });
};
exports.JuiceById = function(req, res) {
  Juice.getJuiceById(req.params.idjuice, function(err, juice) {
    if (req.params.idjuice === '0' || juice[0] === undefined) {
      res.json({ error: 'Error with a wrong id ' });
      console.log('error with the id');
    } else {
      res.json(checkAndChange(juice));
      console.log('-- > Juice search done');
    }
  });
};
exports.JuiceByIdCulture = function(req, res) {
  Juice.getJuiceByIdCulture(req.params.idculture, function(err, juice) {
    if (req.params.idculture === '0' || juice[0] === undefined) {
      res.json({ error: 'Error with a wrong idculture ' });
      console.log('error with the idculture');
    } else {
      res.json(checkAndChange(juice));
      console.log('-- > Juices by culture search done');
    }
  });
};
exports.InsertJuice = function(req, res) {
  let new_juice = new Juice(
    req.body.juice_name,
    req.body.juice_origin,
    req.body.juice_dose,
    req.body.juice_date,
    req.body.juice_type
  );
  Juice.insertJuice(new_juice, function(err, juice) {
    if (err || !juice) {
      res.json({ error: 'Name already taken ' });
    } else {
      res.json(checkAndChange(juice));
      console.log('-- > Insert in database done ');
    }
  });
};
