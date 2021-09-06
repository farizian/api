const _ = require('lodash');
const transactionModel = require('../models/Transaction');
const { success, failed } = require('../helpers/respon');
const redisAction = require('../helpers/redis');

const transaction = {
  getList: (req, res) => {
    try {
      const { query } = req;
      const search = query.search === undefined ? '' : query.search;
      const field = query.field === undefined ? 'id' : query.field;
      const typeSort = query.sort === undefined ? '' : query.sort;
      // eslint-disable-next-line radix
      const limit = query.limit === undefined ? 50 : parseInt(query.limit);
      const page = query.page === undefined ? 1 : query.page;
      // eslint-disable-next-line eqeqeq
      const offset = page === 1 ? 0 : (page - 1) * limit;
      redisAction.get('transaction', (err, result) => {
        if (err) {
          failed(res, 500, err);
        } else if (!result) {
          transactionModel.getList(search, field, typeSort, limit, offset).then(async (result1) => {
            const allData = await transactionModel.getAll();
            const output = {
              data: result1,
              totalPage: Math.ceil(allData.length / limit),
              search,
              limit,
              page: query.page,
            };
            redisAction.set('transaction', JSON.stringify(allData), (error) => {
              if (error) {
                failed(res, 401, error);
              }
            });
            success(res, output, 'succes');
          }).catch((error) => {
            failed(res, 500, error);
          });
        } else {
          const response = JSON.parse(result);
          const dataFiltered = _.filter(response, (e) => e.display_name.includes(search));
          const paginate = _.slice(dataFiltered, offset, offset + limit);
          const output = {
            data: paginate,
            search,
            limit,
            page: query.page,
            totalPage: Math.ceil(response.length / limit),
          };
          success(res, output, 'succes');
        }
      });
    } catch (error) {
      failed(res, 401, error);
    }
  },
  getDetails: (req, res) => {
    try {
      const { id } = req.params;
      transactionModel.getDetails(id).then((result) => {
        success(res, result, 'succes');
      }).catch((err) => {
        failed(res, 500, err);
      });
    } catch (error) {
      failed(res, 401, error);
    }
  },
  insert: (req, res) => {
    try {
      const { body } = req;
      transactionModel.insert(body).then((result) => {
        redisAction.del('transaction', (err) => {
          if (err) {
            failed(res, 401, err);
          }
        });
        success(res, result, 'succes');
      }).catch((err) => {
        failed(res, 500, err);
      });
    } catch (error) {
      failed(res, 401, error);
    }
  },
};

module.exports = transaction;
