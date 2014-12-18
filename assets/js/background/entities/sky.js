"use strict";

var Entity = require('../../utils/entity.js');

var SkyEntity = function (options) {
  Entity.call(this, options);
};

SkyEntity.prototype = Entity.prototype;

module.exports = SkyEntity;
