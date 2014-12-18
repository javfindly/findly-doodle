"use strict";

var PixelJS = require('./vendors/pixel.js');
var $ = require('jquery');
var CONSTANTS = require('./constants.js');
var config = require('./config.js');
var _ = require('lodash');

var CollectableElement = function (layer, velocity) {
  _.bindAll(this, 'fall', 'pickUp', 'collect', 'dispose');
  this.collectableEntity = layer.createEntity();

  this.collectableEntity.pos = { x: Math.floor(Math.random() * 600) + 1, y: 0 };
  this.collectableEntity.velocity = velocity;
  this.collectableEntity.asset = new PixelJS.Sprite();
  this.collectableEntity.asset.load({
    name: 'hiveblock.png'
  });
  this.collectableEntity.id = "collectable_" + (new Date().getTime());
  this.collectableEntity.type = CONSTANTS.COLLECTABLE.TYPE;
  this.collectableEntity.status = CONSTANTS.COLLECTABLE.STATUS.FALLING;
  this.collectableEntity.points = 5;
  layer.registerCollidable(this.collectableEntity);
};

CollectableElement.prototype.CONSTANTS = CONSTANTS;

CollectableElement.prototype.update = function () {
  var actions = {};
  actions[CONSTANTS.COLLECTABLE.STATUS.FALLING] = this.fall;
  actions[CONSTANTS.COLLECTABLE.STATUS.PICKED_UP] = this.pickUp;
  actions[CONSTANTS.COLLECTABLE.STATUS.COLLECTED] = this.collect;

  actions[this.collectableEntity.status](this.collectableEntity);
};

CollectableElement.prototype.fall = function (entity) {
  if (entity.pos.y > config.game.height) {
    this.dispose();
    window.doodle.collectablesController.removeItem(entity.id);
    $(document).trigger("game.lifeLost");
  }
  entity.moveDown();
};

CollectableElement.prototype.pickUp = function (entity) {
  entity.moveTo(entity.attached.pos.x, entity.attached.pos.y + entity.attached.size.height - 10, 100);
};

CollectableElement.prototype.collect = function (entity) {
  this.changeStatus(CONSTANTS.COLLECTABLE.STATUS.DISPOSED);
  entity.fadeTo(0, 500, this.dispose);
  window.doodle.collectablesController.removeItem(entity.id);
};

CollectableElement.prototype.dispose = function () {
  this.collectableEntity.dispose();
};

CollectableElement.prototype.changeStatus = function(newStatus) {
  this.collectableEntity.status = newStatus;
}

CollectableElement.prototype.attachToBee = function(bee) {
  this.changeStatus(CONSTANTS.COLLECTABLE.STATUS.PICKED_UP);
  this.collectableEntity.attached = bee;
}

module.exports = CollectableElement;
