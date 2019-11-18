'use strict';
const sql = require('./db');
const config = require('../config');

let MeasureBooster = class {
  constructor(idculture, idbooster, date_dose_booster, dose_booster) {
    this.idculture = idculture;
    this.idbooster = idbooster;
    this.date_dose_booster = date_dose_booster;
    this.dose_booster = dose_booster;
  }
  static getAllMeasureBooster(result) {
    sql.query('SELECT * FROM culturedosebooster', function(err, res) {
      if (err) {
        console.log('error: ', err);
        result(null, err);
      } else {
        console.log('Number of lines ' + res.length + ' rows');
        result(null, res);
      }
    });
  }
  static getMeasureBoosterById(idculturedosebooster, result) {
    sql.query(
      'Select * from culturedosebooster where idculturedosebooster = ? ',
      [idculturedosebooster],
      function(err, res) {
        if (err) {
          console.log('error: ', err);
          result(null, err);
        } else {
          console.log('ok');
          result(null, res);
        }
      }
    );
  }
  static DeleteMeasureBoosterById(idculturedosebooster, result) {
    sql.query(
      'Select * from culturedosebooster where idculturedosebooster = ?',
      [idculturedosebooster],
      function(err, res) {
        if (err || res[0] == undefined) {
          console.log('error :: not in the database : ');
          result(null, err);
        } else {
          sql.query(
            'Delete from culturedosebooster where idculturedosebooster = ? ',
            [idculturedosebooster],
            function(err, res) {
              if (err) {
                console.log('error: ', err);
                result(null, err);
              } else {
                console.log('deleted ' + res.affectedRows + ' rows');
                result(null, res);
              }
            }
          );
        }
      }
    );
  }
  static getMeasureBoosterByIdCulture(idculture, result) {
    sql.query(
      'select culturedosebooster.idculturedosebooster,culturedosebooster.idculture,culturedosebooster.idbooster,culturedosebooster.date_dose_booster,culturedosebooster.dose_booster from culturedosebooster,culture where culturedosebooster.idculture=culture.idculture and culture.idculture = ? ',
      [idculture],
      function(err, res) {
        if (err) {
          console.log('error: ', err);
          result(null, err);
        } else {
          console.log('ok');
          result(null, res);
        }
      }
    );
  }
  static insertMeasureBooster(new_measureBooster, result) {
    sql.query(
      'INSERT INTO culturedosebooster SET ?',
      new_measureBooster,
      function(err, res) {
        if (err) {
          console.log('error: ', err);
          result(null, err);
        } else {
          console.log('last insert id : ' + res.insertId);
          result(null, res);
        }
      }
    );
  }
};
module.exports = MeasureBooster;
