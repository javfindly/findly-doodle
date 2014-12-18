"use strict";

var PixelJS = require('./vendors/pixel.js');

var CONSTANTS = {
  TYPE: 'candidate'
}

var CollectableElement = function (layer, velocity) {
  this.collectableEntity = layer.createEntity();
  this.collectableEntity.pos = { x: Math.floor(Math.random() * 600) + 1, y: 0 };
  this.collectableEntity.size = { width: 12, height: 12 };
  this.collectableEntity.velocity = velocity;
  this.collectableEntity.asset = new PixelJS.Sprite();
  this.collectableEntity.asset.load({
    name: 'hiveblock.png',
    size: {
      width: 12,
      height: 12
    },
    rows: 4
  });
  this.collectableEntity.id = "collectable_" + (new Date().getTime());
  this.collectableEntity.type = CONSTANTS.TYPE;
};

CollectableElement.prototype.CONSTANTS = CONSTANTS;

CollectableElement.prototype.drop = function() {
  this.collectableEntity.moveDown();
};

module.exports = CollectableElement;
