"use strict";

var PixelJS = require('./vendors/pixel.js');

var CONSTANTS = {
  TYPE: 'candidate'
}

var CollectableElement = function (layer) {
  this.collectableEntity = layer.createEntity();
  this.collectableEntity.pos = { x: Math.floor(Math.random() * 600) + 1, y: 0 };
  this.collectableEntity.size = { width: 12, height: 12 };
  this.collectableEntity.velocity = { x: 200, y: 100 };
  this.collectableEntity.asset = new PixelJS.Sprite();
  this.collectableEntity.asset.prepare({
    name: 'cv_test.png'
  });
  this.collectableEntity.id = "collectable_" + (new Date().getTime());
  this.collectableEntity.type = CONSTANTS.TYPE;
};

CollectableElement.prototype.CONSTANTS = CONSTANTS;

CollectableElement.prototype.drop = function(velocity) {
  // this.collectableEntity.velocity = velocity;
  this.collectableEntity.moveDown();
};

module.exports = CollectableElement;
