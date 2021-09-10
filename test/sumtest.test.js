/* eslint-disable no-multi-spaces */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
const chai = require('chai');

const  { expect } = chai;
const sum = require('../src/utils/sum');

describe('Testing sum', () => {
  it('return must be 5', () => {
    expect(sum(2, 3)).to.equal(5);
  });
  it('retrun must be number', () => {
    expect(sum(2, 3)).to.be.a('number');
  });
});
