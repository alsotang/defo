# Defo

[![Build Status](https://travis-ci.org/alsotang/defo.png?branch=master)](https://travis-ci.org/alsotang/defo)

A method_missing(or Hash.new) lib for JavaScript.

Defo pronounce 'default' without /t$/.

## Installation

`npm install defo`

## Quick Examples

Set default value with a literal JS Object
```javascript
var Defo = require('defo');
var defo = new Defo({a: 1, b: 2});
console.log(defo.get('notExist')); // => {a: 1, b: 2}
console.log(defo.get('lol<3')); // => {a: 1, b: 2}
```

More advanced, with a Function

```javascript
var Defo = require('defo');

var defo = new Defo(function (key) {
  return key + '!!!';
});

console.log(defo.get('Hello')); // => Hello!!!
```

To see more(and more advanced) examples, please visit:

[More Examples](https://github.com/alsotang/defo/blob/master/test/defo.test.js)

## Documentation

* #initialize
* #set
* #get
* #toObject

### #initialize

Defo can be initialized when create a new Defo instance

With literal object:

```javascript
var defo = new Defo({a: 1, b: 2});
var defo2 = new Defo([1, 2, 3]);
```

With a function:

```js
var defo = new Defo(function (key) {
  var value = ...// dosomething with key
  return value;
});
```

### #set && get

```js
var defo = new Defo();
defo.set('person', {name: 'Alsotang', age: 21});
defo.get('person').height = 1.80;
console.log(defo.get('person')); // => { name: 'Alsotang', age: 21, height: 1.8 }
console.log(defo.get('<3')); // => undefined
```

chaining set

```js
var defo = new Defo();

defo
  .set('person', {name: 'Alsotang', age: 21})
  .set('pet', {name: 'Piglet', age: 3});
defo.get('person').height = 1.80;
console.log(defo.toObject());
// output:
// { person: { name: 'Alsotang', age: 21, height: 1.8 },
//   pet: { name: 'Piglet', age: 3 } }
```

set with a Hash
```js
var defo = new Defo();
defo.set({
  name: 'Alsotang',
  age: 21
});
defo.get('name').should.equal('Alsotang'); // => true
defo.get('age').should.equal(21); // => true
```

### #toObject

toObject would convert your Defo to a JavaScript Object.

This method will create a new object instead of modify Defo object.

```js
var person = new Defo();
person
  .set('name', 'Alsotang')
  .set('age', 21);

var pet = new Defo();
pet
  .set('name', 'Piglet')
  .set('age', 3);

var house = new Defo();
house
  .set('person', person)
  .set('pet', pet);

console.log(house.toObject());
// output:
// { person: { name: 'Alsotang', age: 21 },
//   pet: { name: 'Piglet', age: 3 } }
```

## Why I create Defo

In my work, there are lots of situations to deal with data structure transformation.

For example, there is some rows from SQL database:

```js
var ROWS = [
// Name, Height, Weight, Country
  ["Alsotang", 180, 60, "Chinese"],
  ["YB", 165, 50, "Chinese"],
  ["Jack", 179, 70, "American"],
  ["Lucy", 170, 100, "American"]
];
```

and I need to transform it to below:

```js
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
```

With Defo, I can just write:

```js
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
result.toObject().should.eql(RESULTS); // => true
```

And it works! Otherwise the implement code is ugly, especially when the data structure is not such simple.

## License

MIT http://rem.mit-license.org