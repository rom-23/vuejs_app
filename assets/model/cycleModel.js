'use strict';
const sql = require('./db');
const config = require('../config');

let Cycle = class {
  constructor(cycle_name) {
    this.cycle_name = cycle_name;
  }
  static getAllCycle(result) {
    sql.query('SELECT * FROM cycle', function(err, res) {
      if (err) {
        console.log('error: ', err);
        result(null, err);
      } else {
        console.log('Number of lines ' + res.length + ' rows');
        result(null, res);
      }
    });
  }

  static getCycleById(idcycle, result) {
    sql.query('Select * from cycle where idcycle = ? ', [idcycle], function(
      err,
      res
    ) {
      if (err) {
        console.log('query error: ', err);
        result(null, err);
      } else {
        console.log('query ok');
        result(null, res);
      }
    });
  }
  static getCycleByCulture(idculture, result) {
    sql.query(
      'select cycle.idcycle,cycle_name,culture_cycle_date from cycle,culturecycle,culture where cycle.idcycle=culturecycle.idcycle and culturecycle.idculture=culture.idculture and culture.idculture = ? ',
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
};
module.exports = Cycle;
