const db = require('../config/db');

const authorization = {
  isAdmin: (req, res, next) => {
    const id = req.userId;
    db.query(`SELECT * FROM users WHERE id ='${id}'`, (err, result) => {
      if (err) {
        res.json(err);
      } else if (result[0].level === 0) {
        next();
      } else {
        res.json({
          msg: 'hanya Admin',
        });
      }
    });
  },
};

module.exports = authorization;
