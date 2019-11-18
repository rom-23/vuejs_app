/**
 * @param  {} strain_desc
 * @param  {} strain_date
 * @param  {} strain_genetic
 * @param  {} idstraintype
 * @param  {} thc_ratio
 * @param  {} strain_bloom
 * @param  {} strain_origin
 * @param  {} [idstrain]
 */
'use strict';
const sql = require('./db');
const config = require('../config');
let Strain = class {
  constructor(
    strain_name,
    strain_desc,
    strain_date,
    strain_genetic,
    idstraintype,
    thc_ratio,
    strain_bloom,
    strain_origin
  ) {
    this.strain_name = strain_name;
    this.strain_desc = strain_desc;
    this.strain_date = strain_date;
    this.strain_genetic = strain_genetic;
    this.idstraintype = idstraintype;
    this.thc_ratio = thc_ratio;
    this.strain_bloom = strain_bloom;
    this.strain_origin = strain_origin;
  }
  static getAllStrain(result) {
    sql.query('SELECT * FROM strain', function(err, res) {
      if (err) {
        console.log('error: ', err);
        result(null, err);
      } else {
        console.log('Number of lines ' + res.length + ' rows');
        result(null, res);
      }
    });
  }
  static DeleteStrainById(idstrain, result) {
    sql.query('Select * from strain where idstrain = ?', [idstrain], function(
      err,
      res
    ) {
      if (err || res[0] == undefined) {
        console.log('error :: not in the database : ');
        result(null, err);
      } else {
        sql.query(
          'Delete from strain where idstrain = ? ',
          [idstrain],
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
    });
  }
  static UpdateStrainById(idstrain, update_strain, result) {
    sql.query('Select * from strain where idstrain = ?', [idstrain], function(
      err,
      res
    ) {
      if (res[0] != undefined) {
        sql.query(
          'Select * from strain where idstrain != ? AND strain_name = ?',
          [idstrain, update_strain.strain_name],
          function(err, res) {
            if (res[0] != undefined) {
              console.log('Name already taken ');
              result(null, err);
            } else {
              sql.query(
                'Update strain SET strain_name= ?, strain_desc = ?, strain_date=?, strain_genetic=?,idstraintype=?,thc_ratio=?,strain_bloom=?,strain_origin=? where idstrain = ? ',
                [
                  update_strain.strain_name,
                  update_strain.strain_desc,
                  update_strain.strain_date,
                  update_strain.strain_genetic,
                  update_strain.idstraintype,
                  update_strain.thc_ratio,
                  update_strain.strain_bloom,
                  update_strain.strain_origin,
                  idstrain
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
  static getStrainById(idstrain, result) {
    sql.query('Select * from strain where idstrain = ? ', [idstrain], function(
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
  static getStrainByIdCulture(idculture, result) {
    sql.query(
      'select strain.idstrain,strain_name,strain_type,strain_bloom,strain_base,strain_quantity from culturestrain,strain,straintype,culture where straintype.idstraintype=strain.idstraintype and strain.idstrain=culturestrain.idstrain and culturestrain.idculture=culture.idculture and culture.idculture = ? ',
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
  static insertStrain(new_strain, result) {
    sql.query(
      'Select * from strain where strain_name = ?',
      [new_strain.strain_name],
      function(err, res) {
        if (err || res[0] != undefined) {
          console.log('error :: name already taken : ' + res[0].strain_name);
          result(null, err);
        } else {
          sql.query('INSERT INTO strain SET ?', new_strain, function(err, res) {
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
module.exports = Strain;
