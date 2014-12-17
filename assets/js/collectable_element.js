"use strict";

var PixelJS = require('./vendors/pixel.js');

var CollectableElement = function (game) {
  this.layer = game.createLayer("collectables");
  this.collectableEntity = this.layer.createEntity();
  this.collectableEntity.pos = { x: 400, y: 0 };
  this.collectableEntity.size = { width: 12, height: 12 };
  this.collectableEntity.velocity = { x: 200, y: 100 };
  this.collectableEntity.asset = new PixelJS.Sprite();
  this.collectableEntity.asset.prepare({
    name: 'cv_test.png'
  });
};

CollectableElement.prototype.drop = function() {
  this.collectableEntity.moveDown();
};

module.exports = CollectableElement;
