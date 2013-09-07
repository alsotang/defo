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
console.log(defo.get('foo')); // => {a: 1, b: 2}
console.log(defo.get('bar')); // => {a: 1, b: 2}
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
* #to_object

### #initialize

Defo can be initialize when create a new Defo instance

With literal object:

```javascript
var defo = new Defo({{a: 1, b: 2}});
var defo2 = new Defo([1, 2, 3]);
```

With a function:

```js
var defo = new Defo(function (key) {
  // dosomething with key
  return key;
});
```

### #set && get

```js
var defo = new Defo();
defo.set('person', {name: 'Alsotang', age: 21});
defo.get('person').height = 1.80;
console.log(defo.get('person')); // => { name: 'Alsotang', age: 21, height: 1.8 }
```

chaining set

```js
var defo = new Defo();

defo
  .set('person', {name: 'Alsotang', age: 21})
  .set('pet', {name: 'Piglet', age: 3});
defo.get('person').height = 1.80;
console.log(defo.to_object());
// output:
// { person: { name: 'Alsotang', age: 21, height: 1.8 },
//   pet: { name: 'Piglet', age: 3 } }
```

Hash set
```js
var defo = new Defo();
defo.set({
  name: 'Alsotang',
  age: 21
});
defo.get('name').should.equal('Alsotang'); // => true
defo.get('age').should.equal(21); // => true
```

### #to_object

to_object would convert your Defo to a JavaScript Object.

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

console.log(house.to_object());
// output:
// { person: { name: 'Alsotang', age: 21 },
//   pet: { name: 'Piglet', age: 3 } }
```

## License

MIT http://rem.mit-license.org