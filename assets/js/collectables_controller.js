"use strict";

var _ = require('lodash');
// var PixelJS = require('./vendors/pixel.js');
var CollectableElement = require('./collectable_element.js');
var CONSTANTS = require('./constants.js');
var Config = require('./config.js');

var CollectablesController = function (game) {
  if (!game) {
    throw new Error('Game argument is required.');
  }
  this.game = game;
  this.itemMap = {};
  this.notRandomTypes = [];
  this.initialize();
};

CollectablesController.prototype.initialize = function () {
  this.elementsLayer = this.game.createLayer("collectables");
  this.previousTime = new Date().getTime();
  this.initialVelocity = Config.game.falling_objects_velocity;
  this._assignRandomValues();
  this.createItem();
};

CollectablesController.prototype._assignRandomValues = function () {
  var i = 0;
  for (; i < 9; i++) {
    this.notRandomTypes[i] = CONSTANTS.COLLECTABLES_PROPERTIES.CANDIDATE;
  }
  for (; i < 10; i++) {
    this.notRandomTypes[i] = CONSTANTS.COLLECTABLES_PROPERTIES.LIFE;
  }
}

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
  var options = { name: 'collectable',
            x: Math.floor(Math.random() * 600) + 1, y: 0,
            velocity: { x:0, y:this.initialVelocity },
            id: "collectable_" + (new Date().getTime()),
            type: CONSTANTS.COLLECTABLE.TYPE,
            status: CONSTANTS.COLLECTABLE.STATUS.FALLING
            };
  var index = Math.floor(Math.random() * this.notRandomTypes.length);
  _.extend(options, this.notRandomTypes[index]);
  var collectableElement = new CollectableElement(options);
  collectableElement.addTo(this.elementsLayer);
  this.itemMap[collectableElement.entity.id] = collectableElement;
  this.elementsLayer.registerCollidable(collectableElement.entity);
};

CollectablesController.prototype.removeItem = function (id) {
  if(this.itemMap[id]) {
    delete this.itemMap[id];
  }
};

CollectablesController.prototype.updateCollectables = function () {
  if (window.freeze === true) {
    return;
  }

  var time = new Date().getTime();
  this.dropCollectables();
  if ((time - this.previousTime) > 2000) {
      this.createItem();
      window.doodle.soundManager.play(CONSTANTS.SOUNDS.DROP);
      this.previousTime = time;
  }
}

CollectablesController.prototype.itemMap = function () {
  return itemMap;
};

CollectablesController.prototype.restart = function () {
  this.initialVelocity = Config.game.falling_objects_velocity;
  this.resetMap();
};

CollectablesController.prototype.resetMap = function () {
  _.each(this.itemMap, function (item) {
    item.dispose();
  });

  this.itemMap = {};
};

module.exports = CollectablesController;
