# Defo

[![Build Status](https://travis-ci.org/alsotang/defo.png?branch=master)](https://travis-ci.org/alsotang/defo)

A method_missing lib of JavaScript.

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

* initialize
* set
* get
* to_object

### initialize

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

## License

MIT http://rem.mit-license.org