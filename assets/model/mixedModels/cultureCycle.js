'use strict';
const sql = require('../db');
const config = require('../../config');

let CultureCycle = class {
  constructor(idcycle, idculture, culture_cycle_date) {
    this.idcycle = idcycle;
    this.idculture = idculture;
    this.culture_cycle_date = culture_cycle_date;
  }
  static getAllCultureCycle(result) {
    sql.query('SELECT * FROM culturecycle', function(err, res) {
      if (err) {
        console.log('error: ', err);
        result(null, err);
      } else {
        console.log('Number of lines ' + res.length + ' rows');
        result(null, res);
      }
    });
  }
  static getCultureCycleByIdCycle(idcycle, result) {
    sql.query(
      'Select * from culturecycle where idcycle = ? ',
      [idcycle],
      function(err, res) {
        if (err) {
          console.log('query error: ', err);
          result(null, err);
        } else {
          console.log('query ok');
          result(null, res);
        }
      }
    );
  }
  static InsertCultureCycle1(new_cultureCycle, result) {
    sql.query('INSERT INTO culturecycle SET ?', new_cultureCycle, function(
      err,
      res
    ) {
      if (err) {
        console.log('error: ', err);
        result(null, err);
      } else {
        console.log('insert ok ');
        result(null, res);
      }
    });
  }
};
module.exports = CultureCycle;
