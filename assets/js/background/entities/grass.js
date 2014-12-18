"use strict";

var Entity = require('../../utils/entity.js');

var GrassEntity = function (options) {
  Entity.call(this, options);
};

GrassEntity.prototype = Entity.prototype;

module.exports = GrassEntity;
