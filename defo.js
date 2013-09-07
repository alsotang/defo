// start: a deepclone function
// copy from: http://stackoverflow.com/questions/4459928/how-to-deep-clone-in-javascript
var clone = function(item) {
  if (!item) { return item; } // null, undefined values check

  var types = [ Number, String, Boolean ],
    result;

  // normalizing primitives if someone did new String('aaa'), or new Number('444');
  types.forEach(function(type) {
    if (item instanceof type) {
      result = type( item );
    }
  });

  if (typeof result === "undefined") {
    if (Object.prototype.toString.call( item ) === "[object Array]") {
      result = [];
      item.forEach(function(child, index, array) {
        result[index] = clone( child );
      });
    } else if (typeof item === "object") {
      // testing that this is DOM
      if (item.nodeType && typeof item.cloneNode === "function") {
        result = item.cloneNode( true );
      } else if (!item.prototype) { // check that this is a literal
        if (item instanceof Date) {
          result = new Date(item);
        } else {
          // it is an object literal
          result = {};
          for (var i in item) {
            result[i] = clone( item[i] );
          }
        }
      } else {
        // depending what you would like here,
        // just keep the reference, or create new object
        if (false && item.constructor) {
          // would not advice to do that, reason? Read below
          result = new item.constructor();
        } else {
          result = item;
        }
      }
    } else {
      result = item;
    }
  }

  return result;
};
// end: a deepclone function


// start: Defo

var Defo = function () {
  this._backed = {};
  this.isDefo = true;
  this.setDefault.apply(this, arguments);
};

Defo.prototype.setDefault = function (d) {
  this._default = d;
  return d;
};

Defo.prototype.set = function (key, value) {
  this._backed[key] = value;
  return this;
};

Defo.prototype.get = function (key) {
  var value;
  value = this._backed[key];
  if (value === undefined) {
    var _default = this._default;
    if (typeof _default === 'function') {
      value = _default.call(this, key);
    } else {
      value = this._backed[key] = _default;
      value = clone(value);
    }
  }
  return value;
};

Defo.prototype.to_object = function () {
  var obj = clone(this._backed);
  for (var k in obj) {
    var value = obj[k];
    if (value.isDefo) {
      obj[k] = value.to_object();
    }
  }

  return obj;
};

module.exports = Defo;

// end: Defo


