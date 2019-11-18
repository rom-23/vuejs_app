'use strict';
const sql = require('./db');
const config = require('../config');

let StrainType = class {
  constructor(strain_type) {
    this.strain_type = strain_type;
  }
  static getAllStrainType(result) {
    sql.query('SELECT * FROM straintype', function(err, res) {
      if (err) {
        console.log('error: ', err);
        result(null, err);
      } else {
        console.log('Number of lines ' + res.length + ' rows');
        result(null, res);
      }
    });
  }

  static getStrainTypeById(idstraintype, result) {
    sql.query(
      'Select * from straintype where idstraintype = ? ',
      [idstraintype],
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
};
module.exports = StrainType;
