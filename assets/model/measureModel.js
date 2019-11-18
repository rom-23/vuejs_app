'use strict';
const sql = require('./db');
const config = require('../config');

let Measure = class {
  constructor(measure_ph, measure_ec, measure_date, idculture) {
    this.measure_ph = measure_ph;
    this.measure_ec = measure_ec;
    this.measure_date = measure_date;
    this.idculture = idculture;
  }
  static getAllMeasure(result) {
    sql.query('SELECT * FROM measure', function(err, res) {
      if (err) {
        console.log('error: ', err);
        result(null, err);
      } else {
        console.log('Number of lines ' + res.length + ' rows');
        result(null, res);
      }
    });
  }
  static DeleteMeasureById(idmeasure, result) {
    sql.query(
      'Select * from measure where idmeasure = ?',
      [idmeasure],
      function(err, res) {
        if (err || res[0] == undefined) {
          console.log('error :: not in the database : ');
          result(null, err);
        } else {
          sql.query(
            'Delete from measure where idmeasure = ? ',
            [idmeasure],
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
  static getMeasureById(idmeasure, result) {
    sql.query(
      'Select * from measure where idmeasure = ? ',
      [idmeasure],
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
  static getMeasureByIdCulture(idculture, result) {
    sql.query(
      'select measure.idmeasure,measure_ph,measure_ec,measure_date from culture,measure where measure.idculture=culture.idculture and culture.idculture = ? ',
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
  static insertMeasure(new_measure, result) {
    sql.query('INSERT INTO measure SET ?', new_measure, function(err, res) {
      if (err) {
        console.log('error: ', err);
        result(null, err);
      } else {
        console.log('last insert id : ' + res.insertId);
        result(null, res);
      }
    });
  }
};
module.exports = Measure;
