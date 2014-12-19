"use strict";

var PixelJS = require('./vendors/pixel.js');
var $ = require('jquery');
var CONSTANTS = require('./constants.js');
var config = require('./config.js');
var _ = require('lodash');
var Entity = require('./utils/entity.js');

var CollectableElement = function (options) {
  _.bindAll(this, 'fall', 'pickUp', 'collect', 'dispose');
  Entity.call(this, options);
};

CollectableElement.prototype = Entity.prototype;

CollectableElement.prototype.CONSTANTS = CONSTANTS;

CollectableElement.prototype.update = function () {
  if (window.freeze === true) {
    return;
  }

  var actions = {};
  actions[CONSTANTS.COLLECTABLE.STATUS.FALLING] = this.fall;
  actions[CONSTANTS.COLLECTABLE.STATUS.PICKED_UP] = this.pickUp;
  actions[CONSTANTS.COLLECTABLE.STATUS.COLLECTED] = this.collect;

  actions[this.entity.status](this.entity);
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
  window.doodle.effectsManager.createSparks(entity.pos);
};

CollectableElement.prototype.dispose = function () {
  this.entity.dispose();
};

CollectableElement.prototype.changeStatus = function(newStatus) {
  this.entity.status = newStatus;
}

CollectableElement.prototype.attachToBee = function(bee) {
  this.changeStatus(CONSTANTS.COLLECTABLE.STATUS.PICKED_UP);
  this.entity.attached = bee;
}


module.exports = CollectableElement;
