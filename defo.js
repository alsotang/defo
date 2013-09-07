var Defo = function () {
  this._backed = {};
  this._default = {};
};

Defo.prototype.default = function () {
  var key, defaultValue;
  if (arguments.length === 2 && (typeof arguments[0] === 'string')) {
    key = arguments[0];
    defaultValue = arguments[1];
    this.setDefault(key, defaultValue);
  } else if (arguments.length === 1 && (typeof arguments[0] === 'object')) {
    for (key in arguments[0]) {
      if (arguments[0].hasOwnProperty(key)) {
        defaultValue = arguments[0][key];
        this.setDefault(key, defaultValue);
      }
    }
  }
};

Defo.prototype.setDefault = function (key, defaultValue) {
  if (typeof key !== 'string') {
    throw new Error("`key` should be a String");
  }
  this._default[key] = defaultValue;
};

Defo.prototype.get = function (key) {
  var value = this._backed[key];
  if (!value) {
    value = this._default[key];
  }

  return value;
};

module.exports = Defo;

