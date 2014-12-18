"use strict";

var _ = require('lodash');
// var PixelJS = require('./vendors/pixel.js');
var CollectableElement = require('./collectable_element.js');
var CONSTANTS = require('./constants.js');

var CollectablesController = function (game) {
  if (!game) {
    throw new Error('Game argument is required.');
  }
  this.game = game;
  this.itemMap = {};
  this.initialize();
};

CollectablesController.prototype.initialize = function () {
  this.elementsLayer = this.game.createLayer("collectables");
  this.previousTime = new Date().getTime();
  this.initialVelocity = 100;
  var collectableElement = new CollectableElement(this.elementsLayer, {x:0, y: this.initialVelocity});
  this.itemMap[collectableElement.collectableEntity.id] = collectableElement;
};

CollectablesController.prototype.dropCollectables = function () {
  _.each(this.itemMap, function(entity){
    entity.update();
  });
};

CollectablesController.prototype.getItem = function (id) {
  return this.itemMap[id];
};

CollectablesController.prototype.createItem = function () {
  var time = new Date().getTime();
  if ((time - this.previousTime) > 1000) {
    this.initialVelocity += 20;
  }
  var velocity = {x:0, y: this.initialVelocity};
  var item = new CollectableElement(this.elementsLayer, velocity);
  this.itemMap[item.collectableEntity.id] = item;
  window.doodle.soundManager.play(CONSTANTS.SOUNDS.DROP);
};

CollectablesController.prototype.removeItem = function (id) {
  if(this.itemMap[id]) {
    delete this.itemMap[id];
  }
};

CollectablesController.prototype.updateCollectables = function () {
  var time = new Date().getTime();
  this.dropCollectables();
  if ((time - this.previousTime) > 2000) {
      this.createItem();
      this.previousTime = time;
  }
}

CollectablesController.prototype.itemMap = function () {
  return itemMap;
};

module.exports = CollectablesController;
