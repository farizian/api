/* eslint-disable no-undef */
const request = require('supertest');
const { expect } = require('chai');
const fs = require('fs');
const app = require('../app');
const getToken = require('./helpers/getToken');

describe('test endpoint users', () => {
  it('test login users', () => {
    const payload = {
      username: 'danang',
      password: 'danang',
    };
    request(app)
      .post('/login')
      .send(payload)
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).to.be.a('object');
      })
      .catch((err) => {
        console.log(err);
      });
  });
  it('test register users', () => {
    const payload = {
      username: 'hiha',
      password: 'hiha',
    };
    request(app)
      .post('/register')
      .send(payload)
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).to.be.a('object');
      })
      .catch((err) => {
        console.log(err);
      });
  });
  it('test get users', () => {
    getToken.admin().then((token) => {
      request(app)
        .get('/users')
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
  it('test get users details', () => {
    getToken.admin().then((token) => {
      request(app)
        .get('/users/1')
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
  it('test insert users', () => {
    const filePath = `${__dirname}/helpers/images/images.jpg`;
    fs.exists(filePath, (exists) => {
      if (!exists) {
        console.log('file not found');
      } else {
        request(app)
          .post('/users')
          .field('username', 'tes')
          .field('password', 'testing')
          .field('display_name', 'testing')
          .field('first_name', 'testing')
          .field('last_name', 'testing')
          .field('ttgl', 'testing')
          .field('gender', 'testing')
          .field('email_address', 'stes')
          .field('phone_number', 'testing')
          .field('delivery_address', 'testing')
          .attach('image', filePath)
          .expect('Content-Type', /json/)
          .expect(200)
          .then((response) => {
            expect(response.body).to.be.a('object');
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  });
  it('test update users', () => {
    const filePath = `${__dirname}/helpers/images/images2.jpg`;
    fs.exists(filePath, (exists) => {
      if (!exists) {
        console.log('file not found');
      } else {
        getToken.admin().then((token) => {
          request(app)
            .put('/users/39')
            .set('token', token)
            .field('username', 'testing3')
            .field('password', 'testing3')
            .attach('image', filePath)
            .field('display_name', 'testing2')
            .field('first_name', 'testing2')
            .field('last_name', 'testing2')
            .field('ttgl', 'testing2')
            .field('gender', 'testing2')
            .field('email_address', 'testing2')
            .field('phone_number', 'testing2')
            .field('delivery_address', 'testing2')
            .expect('Content-Type', /json/)
            .expect(200)
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
  it('test delete users', () => {
    getToken.admin().then((token) => {
      request(app)
        .delete('/users/9')
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
});
