/**
 * @param  {} juice_name
 * @param  {} juice_origin
 * @param  {} juice_dose
 * @param  {} juice_date
 * @param  {} juice_type
 * @param  {} [idjuice]
 */
'use strict';
const sql = require('./db');
const config = require('../config');

let Juice = class {
  constructor(juice_name, juice_origin, juice_dose, juice_date, juice_type) {
    this.juice_name = juice_name;
    this.juice_origin = juice_origin;
    this.juice_dose = juice_dose;
    this.juice_date = juice_date;
    this.juice_type = juice_type;
  }
  static getAllJuice(result) {
    sql.query('SELECT * FROM juice', function(err, res) {
      if (err) {
        console.log('error: ', err);
        result(null, err);
      } else {
        console.log('Number of lines ' + res.length + ' rows');
        result(null, res);
      }
    });
  }
  static DeleteJuiceById(idjuice, result) {
    sql.query('Select * from juice where idjuice = ?', [idjuice], function(
      err,
      res
    ) {
      if (err || res[0] == undefined) {
        console.log('error :: not in the database : ');
        result(null, err);
      } else {
        sql.query('Delete from juice where idjuice = ? ', [idjuice], function(
          err,
          res
        ) {
          if (err) {
            console.log('error: ', err);
            result(null, err);
          } else {
            console.log('deleted ' + res.affectedRows + ' rows');
            result(null, res);
          }
        });
      }
    });
  }
  static UpdateJuiceById(idjuice, update_juice, result) {
    sql.query('Select * from juice where idjuice = ?', [idjuice], function(
      err,
      res
    ) {
      if (res[0] != undefined) {
        sql.query(
          'Select * from juice where idjuice != ? AND juice_name = ?',
          [idjuice, update_juice.juice_name],
          function(err, res) {
            if (res[0] != undefined) {
              console.log('Name already taken ');
              result(null, err);
            } else {
              sql.query(
                'Update juice SET juice_name= ?, juice_origin = ?, juice_dose=?, juice_date=?,juice_type=? where idjuice = ? ',
                [
                  update_juice.juice_name,
                  update_juice.juice_origin,
                  update_juice.juice_dose,
                  update_juice.juice_date,
                  update_juice.juice_type,
                  idjuice
                ],
                function(err, res) {
                  if (err) {
                    console.log('error: ', err);
                    result(null, err);
                  } else {
                    console.log(
                      'update ok changed ' + res.changedRows + ' rows'
                    );
                    result(null, res);
                  }
                }
              );
            }
          }
        );
      } else {
        console.log('error: ', err);
        result(null, res);
      }
    });
  }
  static getJuiceById(idjuice, result) {
    sql.query('Select * from juice where idjuice = ? ', [idjuice], function(
      err,
      res
    ) {
      if (err) {
        console.log('error: ', err);
        result(null, err);
      } else {
        console.log('ok');
        result(null, res);
      }
    });
  }
  static getJuiceByIdCulture(idculture, result) {
    sql.query(
      'select juice.idjuice,juice_name,juice_origin,juice_dose,juice_date,juice_type from juice,culturejuice,culture where juice.idjuice=culturejuice.idjuice and culturejuice.idculture=culture.idculture and culture.idculture = ? ',
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
  static insertJuice(new_juice, result) {
    sql.query(
      'Select * from juice where juice_name = ?',
      [new_juice.juice_name],
      function(err, res) {
        if (err || res[0] != undefined) {
          console.log('error :: name already taken : ' + res[0].juice_name);
          result(null, err);
        } else {
          sql.query('INSERT INTO juice SET ?', new_juice, function(err, res) {
            if (err) {
              console.log('error: ', err);
              result(null, err);
            } else {
              console.log('last insert id : ' + res.insertId);
              result(null, res);
            }
          });
        }
      }
    );
  }
};
module.exports = Juice;
