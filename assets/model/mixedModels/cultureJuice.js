'use strict';
const sql = require('../db');
const config = require('../../config');

let CultureJuice = class {
  constructor(idjuice, idculture) {
    this.idjuice = idjuice;
    this.idculture = idculture;
  }
  static insertCultureJuice(new_cultureJuice, result) {
    console.log(new_cultureJuice);
    for (var i = 0; i < new_cultureJuice.length; i++) {
      sql.query('INSERT INTO culturejuice set ?', new_cultureJuice[i], function(
        err,
        res
      ) {
        if (err) {
          console.log('error: ', err);
          result(null, err);
        } else {
          console.log('insert ok ');
          // result(null, res);
        }
      });
    }
  }
};
module.exports = CultureJuice;
