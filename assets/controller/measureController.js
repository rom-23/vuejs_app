'use strict';
var Measure = require('../model/measureModel.js');
const { checkAndChange } = require('../functions');

exports.AllMeasure = function(req, res) {
  Measure.getAllMeasure(function(err, measure) {
    if (err) res.send(err);
    res.send(checkAndChange(measure));
  });
};
exports.DeleteMeasure = function(req, res) {
  Measure.DeleteMeasureById(req.params.idmeasure, function(err, measure) {
    if (req.params.idmeasure === '0' || !measure) {
      res.json({ error: ' Id Not valid for removal' });
      console.log('Id Not valid for removal');
    } else {
      res.json(checkAndChange(measure));
      console.log('--- > Id deleted done :' + req.params.idmeasure);
    }
  });
};

exports.MeasureById = function(req, res) {
  Measure.getMeasureById(req.params.idmeasure, function(err, measure) {
    if (req.params.idmeasure === '0' || measure[0] === undefined) {
      res.json({ error: 'Error with a wrong id ' });
      console.log('error with the id');
    } else {
      res.json(checkAndChange(measure));
      console.log('-- > Measure search done');
    }
  });
};
exports.MeasureByIdCulture = function(req, res) {
  Measure.getMeasureByIdCulture(req.params.idculture, function(err, measure) {
    if (req.params.idculture === '0' || measure[0] === undefined) {
      res.json({ error: 'Error with a wrong idculture ' });
      console.log('error with the idculture');
    } else {
      res.json(checkAndChange(measure));
      console.log('-- > Measures by culture search done');
    }
  });
};
exports.InsertMeasure = function(req, res) {
  let new_measure = new Measure(
    req.body.measure_ph,
    req.body.measure_ec,
    req.body.measure_date,
    req.body.idculture
  );
  Measure.insertMeasure(new_measure, function(err, measure) {
    if (err || !measure) {
      res.json({ error: 'Insert sql error' });
    } else {
      res.json(checkAndChange(measure));
      console.log('-- > Insert in database done ');
    }
  });
};
