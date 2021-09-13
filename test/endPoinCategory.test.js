/* eslint-disable no-undef */
const request = require('supertest');
const { expect } = require('chai');
const app = require('../app');
const getToken = require('./helpers/getToken');

describe('test endpoint category', () => {
  it('test get category', () => {
    getToken.admin().then((token) => {
      request(app)
        .get('/category')
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
  it('test get category details', () => {
    getToken.admin().then((token) => {
      request(app)
        .get('/category/1')
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
  it('test insert category', () => {
    const payload = {
      category: 'testing',
    };
    getToken.admin().then((token) => {
      request(app)
        .post('/category')
        .set('token', token)
        .send(payload)
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
  it('test update category', () => {
    const payload = {
      category: 'apple',
    };
    getToken.admin().then((token) => {
      request(app)
        .put('/category/15')
        .set('token', token)
        .send(payload)
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
  it('test delete category', () => {
    getToken.admin().then((token) => {
      request(app)
        .delete('/category/16')
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
