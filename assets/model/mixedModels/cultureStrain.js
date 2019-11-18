'use strict';
const sql = require('../db');
const config = require('../../config');

let CultureStrain = class {
  constructor(idstrain, idculture, strain_base, strain_quantity) {
    this.idstrain = idstrain;
    this.idculture = idculture;
    this.strain_base = strain_base;
    this.strain_quantity = strain_quantity;
  }
  static getCultureStrainByCulture(idculture, result) {
    sql.query(
      'Select * from culturestrain where idculture = ? ',
      [idculture],
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
  static insertCultureStrain(new_cultureStrain, result) {
    console.log(new_cultureStrain);
    for (var i = 0; i < new_cultureStrain.length; i++) {
      sql.query(
        'INSERT INTO culturestrain SET ?',
        new_cultureStrain[i],
        function(err, res) {
          if (err) {
            console.log('error: ', err);
            result(null, err);
          } else {
            console.log('insert ok ');
            // result(null, res);
          }
        }
      );
    }
  }
};
module.exports = CultureStrain;
