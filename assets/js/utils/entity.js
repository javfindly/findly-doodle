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
  this._setVelocity();
  this._setId();
  this._setPoints();
  this._setStatus();
  this._setTag();
  this._setType();

  return this;
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

Entity.prototype._setVelocity = function () {
  if (!this.options.velocity || !_.isNumber(this.options.velocity.x) || !_.isNumber(this.options.velocity.y)) {
    return;
  }
  this.entity.velocity = {
    x: this.options.velocity.x || 0,
    y: this.options.velocity.y || 0
  };
};

Entity.prototype._setAsset = function () {
  var functionName = '_' + this.options.asset.type;
  if (!this[functionName] instanceof Function) {
    throw new Error('asset type undefined');
  }

  this[functionName]();
};

Entity.prototype._setId  = function () {
  if (!this.options.id) {
    return;
  }
  this.entity.id = this.options.id;
}

Entity.prototype._setPoints  = function () {
  if (!_.isNumber(this.options.points)) {
    return;
  }
  this.entity.points = this.options.points;
}

Entity.prototype._setStatus  = function () {
  if (!this.options.status) {
    return;
  }
  this.entity.status = this.options.status;
}

Entity.prototype._setTag  = function () {
  if (!this.options.tag) {
    return;
  }
  this.entity.tag = this.options.tag;
}

Entity.prototype._setType  = function () {
  if (!this.options.type) {
    return;
  }
  this.entity.type = this.options.type;
}


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

  this.entity.asset.load({
    name: this.options.asset.filename
  });
};

Entity.prototype._spritesheet = function () {

};


module.exports = Entity;
