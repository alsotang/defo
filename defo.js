(function (name, definition){
  if (typeof define === 'function'){ // AMD
    define(definition);
  } else if (typeof module !== 'undefined' && module.exports) { // Node.js
    module.exports = definition();
  } else { // Browser
    var theModule = definition(), global = this, old = global[name];
    theModule.noConflict = function () {
      global[name] = old;
      return theModule;
    };
    global[name] = theModule;
  }
})('Defo', function () {

  // start: a deepclone function
  // modified from: http://stackoverflow.com/questions/4459928/how-to-deep-clone-in-javascript
  // DO NOT copy it to your project because this modified version is specified for Defo
  var clone = function(item) {
    if (!item) { return item; } // null, undefined values check
    if (item.isDefo) {
      return Defo.clone(item);
    }

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
    this._default = undefined;

    this.setDefault.apply(this, arguments);
  };

  Defo.clone = function (defo) {
    var new_defo = new Defo();
    new_defo._backed = clone(defo._backed);
    new_defo.isDefo = clone(defo.isDefo);
    new_defo._default = clone(defo._default);
    return new_defo;
  };

  Defo.prototype.setDefault = function (d) {
    this._default = d;
    return this;
  };

  Defo.prototype.set = function () {
    var key, value;
    var args = [].slice.call(arguments);
    if (args.length === 2) {
      // (key, value) set
      key = args[0];
      value = args[1];
      this._backed[key] = value;
    } else if (args[0] instanceof Object) {
      // Hash set
      var obj = args[0];
      for (key in obj) {
        value = obj[key];
        this._backed[key] = value;
      }
    }
    return this;
  };

  // Provide key, and Defo will return corresponding value to you
  Defo.prototype.get = function (key) {
    var value;
    value = this._backed[key];
    if (value === undefined) {
      var _default = this._default;
      if (typeof _default === 'function') {
        value = _default.call(this, key);
      } else {
        value = this._backed[key] = clone(_default);
      }
    }
    return value;
  };

  // create a new object from Defo object
  Defo.prototype.toObject = function () {
    var obj = clone(this._backed);
    for (var k in obj) {
      var value = obj[k];
      if (value instanceof Defo) {
        obj[k] = value.toObject();
      }
    }

    return obj;
  };

  // end: Defo

  // expose Defo
  return Defo;
});
