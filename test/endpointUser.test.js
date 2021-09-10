/* eslint-disable no-undef */
const request = require('supertest');
const { expect } = require('chai');
const app = require('../app');

describe('test endpoint caregory', () => {
  it('test get /', () => {
    request(app)
      .get('/category')
      .expect('Content-Type', /json/)
      .then((response) => {
        expect(response.body).to.be.a('object');
      })
      .catch((err) => {
        console.log(err);
      });
  });
});

describe('test endpoint product', () => {
  it('test get /product', () => {
    request(app)
      .get('/product')
      .expect('Content-Type', /json/)
      .then((response) => {
        expect(response.body).to.be.a('object');
      })
      .catch((err) => {
        console.log(err);
      });
  });
  it('test get /product/:id', () => {
    request(app)
      .get('/product/1')
      .expect('Content-Type', /json/)
      .then((response) => {
        expect(response.body).to.be.a('object');
      })
      .catch((err) => {
        console.log(err);
      });
  });
});
