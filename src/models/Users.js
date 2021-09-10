const db = require('../config/db');

const usersModel = {
  getAll: () => new Promise((resolve, reject) => {
    db.query('SELECT * from users', (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  }),
  getList: (search, field, typeSort, limit, offset) => new Promise((resolve, reject) => {
    db.query(
      `select * from users  
        WHERE username LIKE "%${search}%" 
        ORDER BY ${field} ${typeSort}
        LIMIT ${limit} OFFSET ${offset}`, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      },
    );
  }),
  getDetails: (id) => new Promise((resolve, reject) => {
    db.query(`select * from users where id='${id}'`, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  }),
  insert: (body, pass, filename) => new Promise((resolve, reject) => {
    db.query(`INSERT INTO users (
      username,password,picture,display_name,first_name,last_name,
      ttgl,gender,email_address,phone_number,delivery_address
      ) VALUE (
        '${body.username}','${pass}','${filename}','${body.display_name}','${body.first_name}',
        '${body.last_name}','${body.ttgl}','${body.gender}','${body.email_address}','${body.phone_number}','${body.delivery_address}'
      )`, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  }),
  register: (body, pass) => new Promise((resolve, reject) => {
    db.query(
      `INSERT INTO users (username,email_address,password,level)
        VALUE (
          '${body.username}','${body.email_address}','${pass}','${body.level}'
        )`, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      },
    );
  }),
  cekUsername: (body) => new Promise((resolve, reject) => {
    db.query(`select * from users where username='${body.username}' || email_address='${body.username}'`,
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
  }),
  cekUsernamedanemail: (body) => new Promise((resolve, reject) => {
    db.query(`select * from users where username='${body.username}' && email_address='${body.email_address}'`,
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
  }),
  update: (body, id, hashpassword, filename) => new Promise((resolve, reject) => {
    db.query(
      `update users set  username='${body.username}',password='${hashpassword}',picture='${filename}',
      display_name='${body.display_name}',first_name='${body.first_name}',last_name='${body.last_name}',
      ttgl='${body.ttgl}',gender='${body.gender}',email_address='${body.email_address}',phone_number='${body.phone_number}',
      delivery_address='${body.delivery_address}' where id='${id}'`, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      },
    );
  }),
  delete: (id) => new Promise((resolve, reject) => {
    db.query(`delete from users where id='${id}'`, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  }),
};

module.exports = usersModel;
