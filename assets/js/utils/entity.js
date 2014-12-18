"use strict";

var PixelJS = require('../vendors/pixel.js');
var _ = require('lodash');

var Entity = function (options) {
  this.options = options || {};
  if (!options.asset || !options.asset.type) {
    throw new Error('asset arguments not defined for Entity ' + (options.name || 'Anonymous'));
  }
};

Entity.prototype.addTo = function (layer) {
  if (!layer) {
    throw new Error('Layer argument is required.');
  }

  this.entity = layer.createEntity();
  this._setAsset();
  this._setPosition();
  this._setSize();
};

Entity.prototype._setPosition = function () {
  if (!_.isNumber(this.options.x) || !_.isNumber(this.options.y)) {
    return;
  }

  this.entity.pos = {
    x: this.options.x || 0,
    y: this.options.y || 0
  };
};

Entity.prototype._setSize = function () {
  if (!_.isNumber(this.options.width) || !_.isNumber(this.options.height)) {
    return;
  }

  this.entity.size = {
    width: this.options.width || 0,
    height: this.options.height || 0
  };
};

Entity.prototype._setAsset = function () {
  var functionName = '_' + this.options.asset.type;
  if (!this[functionName] instanceof Function) {
    throw new Error('asset type undefined');
  }

  this[functionName]();
};

Entity.prototype._tile = function () {
  this.entity.asset = new PixelJS.Tile();
  this.entity.asset.prepare({
    name: this.options.asset.filename,
    size: {
      width: this.options.asset.width,
      height: this.options.asset.height
    }
  });
};

Entity.prototype._player = function () {

};

Entity.prototype._sound = function () {

};

Entity.prototype._sprite = function () {
  this.entity.asset = new PixelJS.Sprite();
  this.entity.asset.prepare({
    name: this.options.asset.filename//,
    // size: {
    //   width: this.options.asset.width,
    //   height: this.options.asset.height
    // }
  });
};

Entity.prototype._spritesheet = function () {

};


module.exports = Entity;