var should = require('chai').should();
var Defo = require('../defo');


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
        a.should.eql(defaultValue);
        a.should.eql(b);
        a.push(1);
        a.should.not.eql(defaultValue);
        a.should.not.eql(b);
      });

      it('Object', function () {
        var defaultValue = {};
        var defo = new Defo(defaultValue);
        var a = defo.get('a');
        var b = defo.get('b');
        a.should.eql(defaultValue);
        a.should.eql(b);
        a.foo = 'bar';
        a.should.not.eql(defaultValue);
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
          this.set(key, 1);
          return this.get(key);
        }
        this.set(key, this.get(key - 1) + this.get(key - 2));
        return this.get(key);
      });
      defo.get(15).should.equal(610); // 610 is 15-th of fibonacci sequence
      defo.get(20).should.equal(6765);
      defo._backed.should.eql({ '1': 1, '2': 1, '3': 2, '4': 3,
        '5': 5, '6': 8, '7': 13, '8': 21, '9': 34, '10': 55,
        '11': 89, '12': 144, '13': 233, '14': 377, '15': 610,
        '16': 987, '17': 1597, '18': 2584, '19': 4181,
        '20': 6765 });
    });
  });

  describe('convert between two data structure', function () {
    var ROWS = [
    // Name, Height, Weight, Country
      ["Alsotang", 180, 60, "Chinese"],
      ["YB", 165, 50, "Chinese"],
      ["Jack", 179, 70, "American"],
      ["Lucy", 170, 100, "American"]
    ];
    var RESULTS = {
      "Chinese": {
        "Alsotang": {
          "Height": 180,
          "Weight": 60
        },
        "YB": {
          "Height": 165,
          "Weight": 50
        }
      },
      "American": {
        "Jack": {
          "Height": 179,
          "Weight": 70
        },
        "Lucy": {
          "Height": 170,
          "Weight": 100
        }
      }
    };
    it('result should equal RESULTS', function () {
      var result = new Defo( // in this Defo, key would be Chinese or American
        new Defo( // would be Alsotang or Jack in this
          new Defo() // Height or Weight
          )
        );
      ROWS.forEach(function (person) {
        var name = person[0],
          height = person[1],
          weight = person[2],
          country = person[3];
        result.get(country).get(name)
        .set('Height', height)
        .set('Weight', weight);
      });
      result.toObject().should.eql(RESULTS);
    });
  });

  describe('#toObject()', function () {
    it('should return a corresponding Object', function () {
      var expect_obj = {
        people: {
          alsotang: {
            age: 21
          },
          tj: {
            age: -1
          }
        }
      };
      var obj = new Defo();
      obj.set('people',
        (new Defo())
        .set('alsotang',
          (new Defo()).set('age', 21))
        .set('tj', {
          age: -1
        })
      );
      obj.toObject().should.eql(expect_obj);
    });
  });

  describe('#set()', function () {
    it('should support chaining set', function () {
      var defo = new Defo();
      defo
        .set('name', 'Alsotang')
        .set('age', 21);
      defo.get('name').should.equal('Alsotang');
      defo.get('age').should.equal(21);
    });

    it('should support Hash set', function () {
      var defo = new Defo();
      defo.set({
        name: 'Alsotang',
        age: 21
      });
      defo.get('name').should.equal('Alsotang');
      defo.get('age').should.equal(21);
    });
  });
});