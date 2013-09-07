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

var FOOBAR_ARRAY = ['foo', 'bar', 'foobar'];

describe('defo.test.js', function () {
  describe('set default with a non-function', function () {
    it('should return Array', function () {
      var defaultValue = [1, 2, 3];
      var defo = new Defo(defaultValue);
      FOOBAR_ARRAY.forEach(function (key) {
        defo.get(key).should.eql(defaultValue);
      });
    });

    it('should return a String', function () {
      var defaultValue = 'Hello World';
      var defo = new Defo(defaultValue);
      FOOBAR_ARRAY.forEach(function (key) {
        defo.get(key).should.equal(defaultValue);
      });
    });

    describe('each value is isolate', function () {
      it('Array', function () {
        var defaultValue = [];
        var defo = new Defo(defaultValue);
        var a = defo.get('a');
        var b = defo.get('b');
        a.should.eql(b);
        a.push(1);
        a.should.not.eql(b);
      });
    });
  });

  describe('set default with a function', function () {
    it('should return default value', function () {
      var defo = new Defo(function (key) {
        return key;
      });
      FOOBAR_ARRAY.forEach(function (key) {
        defo.get(key).should.equal(key);
      });
    });
  });

  describe('memoize fibonacci', function () {
    it('should return correct value', function () {
      var defo = new Defo(function (key) {
        if (key === 1 || key === 2) {
          return 1;
        }
        return this.set(key, this.get(key - 1) + this.get(key - 2));
      });
      defo.get(15).should.equal(610); // 610 is 15-th of fibonacci sequence
    });
  });
});