var Defo = function () {
  this._backed = {};
  this._default = {};
  this.setDefault.apply(this, arguments);
};

var validKey = function (key) {
  if (typeof key !== 'string') {
    throw new Error("`key` should be a String");
  }
  return key;
};

Defo.prototype.setDefault = function () {
  var key, defaultValue;
  var args = [].slice.call(arguments);
  if (args.length === 2 && (typeof args[0] === 'string')) {
    key = args[0];
    validKey(key);
    defaultValue = args[1];
    this._default[key] = defaultValue;
  } else if (args.length === 1 && (typeof args[0] === 'object')) {
    for (key in args[0]) {
      if (args[0].hasOwnProperty(key)) {
        validKey(key);
        defaultValue = args[0][key];
        this._default[key] = defaultValue;
      }
    }
  }
};

Defo.prototype.get = function (key) {
  var value;

  value = this._backed[key];
  if (!value) {
    this._backed[key] = value = this._default[key] || this._default['*'];
  }

  return value;
};

module.exports = Defo;

