'use strict';
const sql = require('../db');
const config = require('../../config');

let CultureBooster = class {
  constructor(idbooster, idculture) {
    this.idbooster = idbooster;
    this.idculture = idculture;
  }
  static insertCultureBooster(new_cultureBooster, result) {
    for (var i = 0; i < new_cultureBooster.length; i++) {
      sql.query(
        'INSERT INTO culturebooster SET ?',
        new_cultureBooster[i],
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
module.exports = CultureBooster;
