'use strict';
const sql = require('./db');
const config = require('../config');
// Soil or Hydro
let CultureType = class {
  constructor(culture_type) {
    this.culture_type = culture_type;
  }
  static getAllType(result) {
    sql.query('SELECT * FROM culturetype', function(err, res) {
      if (err) {
        console.log('error: ', err);
        result(null, err);
      } else {
        console.log('Number of lines ' + res.length + ' rows');
        result(null, res);
      }
    });
  }
};
module.exports = CultureType;
