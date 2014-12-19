"use strict";

var PixelJS = require('./vendors/pixel.js');
var CollectableElement = require('./collectable_element.js');
var CONSTANTS = require('./constants.js');
var Config = require('./config.js');

var Hive = function(game) {
  var hiveLayer = game.createLayer("hive");
  var theHive = hiveLayer.createEntity();
  theHive.type = CONSTANTS.HIVE.TYPE;
  theHive.pos = { x: Config.game.width - 134, y: Config.game.height / 2 };
  theHive.size = { width: 192, height: 169 };
  theHive.asset = new PixelJS.Sprite();
  theHive.asset.prepare({
    name: 'small_hive.png'
  });

  var hiveCollector = hiveLayer.createEntity();
  hiveCollector.type = CONSTANTS.HIVE.TYPE;
  hiveCollector.pos = { x: Config.game.width - 75, y: theHive.pos.y + 90 };
  hiveCollector.size = { width: 70, height: 70 };

  hiveCollector.asset = new PixelJS.Sprite();

  hiveCollector.onCollide(function (entity) {
    collideCandidate(entity);
  });

  hiveLayer.registerCollidable(hiveCollector);

  function collideCandidate(entity) {
    if(entity.type == CONSTANTS.COLLECTABLE.TAG) {
      var collectable = window.doodle.collectablesController.getItem(entity.id);
      if(collectable && collectable.status == CONSTANTS.COLLECTABLE.PICKED_UP) {
        collectable.changeStatus(CONSTANTS.COLLECTABLE.STATUS.COLLECTED);
        window.doodle.soundManager.play(CONSTANTS.SOUNDS.DEPOSIT);
      }
    }
  }
};

module.exports = Hive;
