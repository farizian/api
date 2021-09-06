const express = require('express');
const transactiontController = require('../controllers/Transaction');
const authen = require('../middleware/authentication');

const transactiontRouter = express.Router();
transactiontRouter
  .get('/transaction', transactiontController.getList)
  .get('/transaction/:id', authen, transactiontController.getDetails)
  .post('/transaction', authen, transactiontController.insert);
module.exports = transactiontRouter;
