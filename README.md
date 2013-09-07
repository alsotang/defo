# Defo

A method_missing lib of JavaScript.

## Installation

`npm install defo`

## Usage

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

## License

MIT http://rem.mit-license.org