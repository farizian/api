const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');

const usersRouter = require('./src/routers/Users');
const categoryRouter = require('./src/routers/Category');
const productRouter = require('./src/routers/Product');
const transactionRouter = require('./src/routers/Transaction');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(usersRouter);
app.use(categoryRouter);
app.use(transactionRouter);
app.use(productRouter);
app.use(express.static(`${__dirname}/uploads`));

app.listen(8000, () => {
  console.log('service running on port 8000');
});

module.exports = app;
