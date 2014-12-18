"use strict";

var PixelJS = require('./vendors/pixel.js');
var CollectableElement = require('./collectable_element.js');
var CONSTANTS = require('./constants.js');

var Hive = function(game) {
  var hiveLayer = game.createLayer("hive");
  var theHive = hiveLayer.createEntity();
  theHive.pos = { x: 666, y: 200 };
  theHive.size = { width: 192, height: 169 };
  theHive.asset = new PixelJS.Sprite();
  theHive.asset.prepare({
    name: 'small_hive.png'
  });

  var hiveCollector = hiveLayer.createEntity();

  hiveCollector.pos = { x: 715, y: 290 };
  hiveCollector.size = { width: 70, height: 70 };

  hiveCollector.asset = new PixelJS.Sprite();
  
  hiveCollector.onCollide(function (entity) {
    collideCandidate(entity);
  });

  hiveLayer.registerCollidable(hiveCollector);

  function collideCandidate(entity) {
    if(entity.type == CONSTANTS.COLLECTABLE.TYPE) {
      var collectable = window.doodle.collectablesController.getItem(entity.id);
      if(collectable && collectable.status == CONSTANTS.COLLECTABLE.PICKED_UP) {
        collectable.changeStatus(CONSTANTS.COLLECTABLE.STATUS.COLLECTED);
      }
    }
  }
}

module.exports = Hive;
