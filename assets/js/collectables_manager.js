"use strict";

var _ = require('lodash');
// var PixelJS = require('./vendors/pixel.js');
var Collectable = require('./collectable.js');
var CONSTANTS = require('./constants.js');
var Config = require('./config.js');

var CollectablesManager = function (game) {
  if (!game) {
    throw new Error('Game argument is required.');
  }
  this.game = game;
  this.itemMap = {};
  this.notRandomTypes = [];
  this.initialize();
};

CollectablesManager.prototype.initialize = function () {
  this.elementsLayer = this.game.createLayer("collectables");
  this.previousTime = new Date().getTime();
  this.initialVelocity = Config.game.falling_objects_velocity;
  this._assignRandomValues();
  this.createItem();
};

CollectablesManager.prototype._assignRandomValues = function () {
  var self = this;
  _.each(CONSTANTS.COLLECTABLE.PROPERTIES,function(entity,key){
    for (var i = 0; i < entity.weigth; i++) {
      self.notRandomTypes.push(key);
    }
  });
}

CollectablesManager.prototype.dropCollectables = function () {
  _.each(this.itemMap, function(entity){
    entity.update();
  });
};

CollectablesManager.prototype.getItem = function (id) {
  return this.itemMap[id];
};

CollectablesManager.prototype.createItem = function () {
  var time = new Date().getTime();
  if ((time - this.previousTime) > 1000) {
    this.initialVelocity += 20;
  }

  var index = Math.floor(Math.random() * this.notRandomTypes.length);
  var options = { name: 'collectable',
            x: Math.floor(Math.random() * 600) + 1, y: 0,
            velocity: { x:0, y:this.initialVelocity },
            id: "collectable_" + (new Date().getTime()),
            tag: CONSTANTS.COLLECTABLE.TAG,
            status: CONSTANTS.COLLECTABLE.STATUS.FALLING,
            type: this.notRandomTypes[index]
            };

  _.extend(options, CONSTANTS.COLLECTABLE.PROPERTIES[this.notRandomTypes[index]]);
  var collectable = new Collectable(options);
  collectable.addTo(this.elementsLayer);
  this.itemMap[collectable.entity.id] = collectable;
  this.elementsLayer.registerCollidable(collectable.entity);
};

CollectablesManager.prototype.removeItem = function (id) {
  if(this.itemMap[id]) {
    delete this.itemMap[id];
  }
};

CollectablesManager.prototype.updateCollectables = function () {
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

CollectablesManager.prototype.itemMap = function () {
  return itemMap;
};

CollectablesManager.prototype.restart = function () {
  this.initialVelocity = Config.game.falling_objects_velocity;
  this.resetMap();
};

CollectablesManager.prototype.resetMap = function () {
  _.each(this.itemMap, function (item) {
    item.dispose();
  });

  this.itemMap = {};
};

module.exports = CollectablesManager;
