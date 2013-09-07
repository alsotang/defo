var _ = require('lodash');
var should = require('chai').should();
var Defo = require('../defo');

var ROWS = [
// Name, Height, Weight, Country
  ["Alsotang", 180, 60, "Chinese"],
  ["YB", 170, 50, "Chinese"],
  ["Jack", 180, 70, "American"],
  ["Lucy", 170, 100, "American"]
];

var RESULTS = {
  "Chinese": {
    "Alsotang": {
      "Height": 180,
      "Weight": 60
    },
    "YB": {
      "Height": 180,
      "Weight": 60
    }
  },
  "American": {
    "Jack": {
      "Height": 180,
      "Weight": 70
    },
    "Lucy": {
      "Height": 170,
      "Weight": 100
    }
  }
};

describe('defo.test.js', function () {
  describe('set default value without a key', function () {
    it('should return default value', function () {
      var defo = new Defo('*', {});
      _.isEqual({}, defo.get('somevar')).should.be.true;
      _.isEqual({}, defo.get('notdefined')).should.be.true;
    });
  });

  it('should not have default value', function () {
    var defo = new Defo();
    should.not.exist(defo.get('somevar'));
  });

  it('should initizlize with a Hash', function () {
    var defo = new Defo({
      'a': 2,
      'b': 4
    });
    defo.get('a').should.equal(2);
    defo.get('b').should.equal(4);
    should.not.exist(defo.get('c'));
  });
});