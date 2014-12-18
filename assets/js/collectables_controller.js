"use strict";

var _ = require('lodash');
// var PixelJS = require('./vendors/pixel.js');
var CollectableElement = require('./collectable_element.js');

var CollectablesController = function (game) {
  this.elementsLayer = game.createLayer("collectables");
  var collectableElement = new CollectableElement(this.elementsLayer);
  this.lastTime = new Date().getTime();
  this.itemMap = {};
  this.itemMap[collectableElement.collectableEntity.id] = collectableElement;
};

CollectablesController.prototype.dropCollectables = function () {
  _.each(this.itemMap, function(entity, key){
    entity.drop();
  });
};

CollectablesController.prototype.getItem = function (id) {
  return this.itemMap.get(id);
};

CollectablesController.prototype.createItem = function () {
  var item = new CollectableElement(this.elementsLayer);
  this.elementsLayer.redraw = true;
  this.elementsLayer.draw();
  this.itemMap[item.collectableEntity.id] =  item;
};

CollectablesController.prototype.removeItem = function () {
  // remove from itemMap
};

CollectablesController.prototype.updateCollectables = function () {
  var time = new Date().getTime();
  this.dropCollectables();
  if ((time - this.lastTime) > 2000) {
      this.createItem();
      this.lastTime = time;
  }
}

CollectablesController.prototype.itemMap = function () {
  return itemMap;
};

module.exports = CollectablesController;
