"use strict";

var _ = require('lodash');
// var PixelJS = require('./vendors/pixel.js');
var CollectableElement = require('./collectable_element.js');

var CollectablesController = function (game) {
  this.elementsLayer = game.createLayer("collectables");
  this.previousTime = new Date().getTime();
  this.itemMap = {};
  //starting the first collectable element
  this.initialVelocity = 100;
  var velocity = {x:0, y: this.initialVelocity};
  var collectableElement = new CollectableElement(this.elementsLayer, velocity);
  this.itemMap[collectableElement.collectableEntity.id] = collectableElement;

};

CollectablesController.prototype.dropCollectables = function () {
  _.each(this.itemMap, function(entity, key){
    entity.drop();
  });
};

CollectablesController.prototype.getItem = function (id) {
  return this.itemMap[id];
};

CollectablesController.prototype.createItem = function () {
  var time = new Date().getTime();
  if ((time - this.previousTime) > 1000) {
    console.log('increase');
    this.initialVelocity += 20;
  }
  var velocity = {x:0, y: this.initialVelocity};
  var item = new CollectableElement(this.elementsLayer, velocity);
  this.itemMap[item.collectableEntity.id] =  item;
};

CollectablesController.prototype.removeItem = function () {
  // remove from itemMap
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
