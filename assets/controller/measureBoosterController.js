'use strict';
var MeasureBooster = require('../model/measureBoosterModel.js');
const { checkAndChange } = require('../functions');

exports.AllMeasureBooster = function(req, res) {
  MeasureBooster.getAllMeasureBooster(function(err, measurebooster) {
    if (err) res.send(err);
    res.send(checkAndChange(measurebooster));
  });
};
exports.DeleteMeasureBooster = function(req, res) {
  MeasureBooster.DeleteMeasureBoosterById(
    req.params.idculturedosebooster,
    function(err, measurebooster) {
      if (req.params.idculturedosebooster === '0' || !measurebooster) {
        res.json({ error: ' Id Not valid for removal' });
        console.log('Id Not valid for removal');
      } else {
        res.json(checkAndChange(measurebooster));
        console.log(
          '--- > Id deleted done :' + req.params.idculturedosebooster
        );
      }
    }
  );
};

exports.MeasureBoosterById = function(req, res) {
  MeasureBooster.getMeasureBoosterById(
    req.params.idculturedosebooster,
    function(err, measurebooster) {
      if (
        req.params.idculturedosebooster === '0' ||
        measurebooster[0] === undefined
      ) {
        res.json({ error: 'Error with a wrong id ' });
        console.log('error with the id');
      } else {
        res.json(checkAndChange(measurebooster));
        console.log('-- > MeasureBooster search done');
      }
    }
  );
};
exports.MeasureBoosterByIdCulture = function(req, res) {
  MeasureBooster.getMeasureBoosterByIdCulture(req.params.idculture, function(
    err,
    measurebooster
  ) {
    if (req.params.idculture === '0' || measurebooster[0] === undefined) {
      res.json({ error: 'Error with a wrong idculture ' });
      console.log('error with the idculture');
    } else {
      res.json(checkAndChange(measurebooster));
      console.log('-- > MeasureBoosters by culture search done');
    }
  });
};
exports.InsertMeasureBooster = function(req, res) {
  let new_measurebooster = new MeasureBooster(
    req.body.idculture,
    req.body.idbooster,
    req.body.date_dose_booster,
    req.body.dose_booster
  );
  MeasureBooster.insertMeasureBooster(new_measurebooster, function(
    err,
    measurebooster
  ) {
    if (err || !measurebooster) {
      res.json({ error: 'Insert sql error' });
    } else {
      res.json(checkAndChange(measurebooster));
      console.log('-- > Insert in database done ');
    }
  });
};
