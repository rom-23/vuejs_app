/**
 * @param  {} culture_name
 * @param  {} culture_start_date
 * @param  {} culture_comment
 * @param  {} culture_state
 * @param  {} culture_end_date
 * @param  {} idculturetype
 * @param  {} [idculture]
 */
'use strict';
const sql = require('./db');
const config = require('../config');

let Culture = class {
  constructor(
    culture_name,
    culture_start_date,
    culture_comment,
    culture_state,
    culture_end_date,
    idculturetype
  ) {
    this.culture_name = culture_name;
    this.culture_start_date = culture_start_date;
    this.culture_comment = culture_comment;
    this.culture_state = culture_state;
    this.culture_end_date = culture_end_date;
    this.idculturetype = idculturetype;
  }
  static getAllCulture(result) {
    sql.query('SELECT * FROM culture', function(err, res) {
      if (err) {
        console.log('error: ', err);
        result(null, err);
      } else {
        console.log('Number of lines ' + res.length + ' rows');
        result(null, res);
      }
    });
  }
  static DeleteCultureById(idculture, result) {
    sql.query(
      'Select * from culture where idculture = ?',
      [idculture],
      function(err, res) {
        if (err || res[0] == undefined) {
          console.log('error :: not in the database : ');
          result(null, err);
        } else {
          sql.query(
            'Delete from culture where idculture = ? ',
            [idculture],
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
  static UpdateCultureById(idculture, update_culture, result) {
    sql.query(
      'Select * from culture where idculture = ?',
      [idculture],
      function(err, res) {
        if (res[0] != undefined) {
          sql.query(
            'Select * from culture where idculture != ? AND culture_name = ?',
            [idculture, update_culture.culture_name],
            function(err, res) {
              if (res[0] != undefined) {
                console.log('Name already taken ');
                result(null, err);
              } else {
                sql.query(
                  'Update culture SET culture_name= ?, culture_start_date = ?, culture_comment=?, culture_state=?,culture_end_date=?,idculturetype=? where idculture = ? ',
                  [
                    update_culture.culture_name,
                    update_culture.culture_start_date,
                    update_culture.culture_comment,
                    update_culture.culture_state,
                    update_culture.culture_end_date,
                    update_culture.idculturetype,
                    idculture
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
      }
    );
  }
  static getCultureById(idculture, result) {
    sql.query(
      'Select * from culture,culturetype where culture.idculturetype=culturetype.idculturetype and idculture = ? ',
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
  static insertCulture(new_culture, result) {
    sql.query(
      'Select * from culture where culture_name = ?',
      [new_culture.culture_name],
      function(err, res) {
        if (err || res[0] != undefined) {
          console.log('error :: name already taken : ' + res[0].culture_name);
          result(null, err);
        } else {
          sql.query('INSERT INTO culture SET ?', new_culture, function(
            err,
            res
          ) {
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
module.exports = Culture;
