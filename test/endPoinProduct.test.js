/* eslint-disable no-undef */
const request = require('supertest');
const { expect } = require('chai');
const fs = require('fs');
const app = require('../app');
const getToken = require('./helpers/getToken');

describe('test endpoint product', () => {
  it('test get product', () => {
    request(app)
      .get('/product')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).to.be.a('object');
      })
      .catch((err) => {
        console.log(err);
      });
  });
  it('test get product details', () => {
    getToken.admin().then((token) => {
      request(app)
        .get('/product/1')
        .set('token', token)
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
          expect(response.body).to.be.a('object');
        })
        .catch((err) => {
          console.log(err);
        });
    });
  });
  it('test insert product', () => {
    const filePath = `${__dirname}/helpers/images/images.jpg`;
    fs.exists(filePath, (exists) => {
      if (!exists) {
        console.log('file not found');
      } else {
        getToken.admin().then((token) => {
          request(app)
            .post('/product')
            .set('token', token)
            .attach('image', filePath)
            .field('product_name', 'apel')
            .field('price', '20000')
            .field('category', '1')
            .field('ket', 'testing')
            .expect(200)
            .expect('Content-Type', /json/)
            .then((response) => {
              expect(response.body).to.be.a('object');
            })
            .catch((err) => {
              console.log(err);
            });
        });
      }
    });
  });
  it('test update', () => {
    const filePath = `${__dirname}/helpers/images/images.jpg`;
    fs.exists(filePath, (exists) => {
      if (!exists) {
        console.log('file not found');
      } else {
        getToken.admin().then((token) => {
          request(app)
            .put('/product/50')
            .set('token', token)
            .attach('image', filePath)
            .field('product_name', 'testing')
            .field('price', '1000')
            .field('category', '1')
            .field('ket', 'testing')
            .expect(200)
            .expect('Content-Type', /json/)
            .then((response) => {
              expect(response.body).to.be.a('object');
            })
            .catch((err) => {
              console.log(err);
            });
        });
      }
    });
  });
  it('test delete product', () => {
    getToken.admin().then((token) => {
      request(app)
        .delete('/product/51')
        .set('token', token)
        .expect(200)
        .expect('Content-Type', /json/)
        .then((response) => {
          expect(response.body).to.be.a('object');
        })
        .catch((err) => {
          console.log(err);
        });
    });
  });
});
