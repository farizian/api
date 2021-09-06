const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../helpers/env');

const authentication = (req, res, next) => {
  const { token } = req.headers;
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      res.json(err);
    } else {
      req.userId = decoded.id;
      next();
    }
  });
};

module.exports = authentication;
