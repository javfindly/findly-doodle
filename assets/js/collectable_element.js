"use strict";

var PixelJS = require('./vendors/pixel.js');
var $ = require('jquery');
var CONSTANTS = require('./constants.js');
var config = require('./config.js');

var CollectableElement = function (layer, velocity) {
  this.collectableEntity = layer.createEntity();
  this.collectableEntity.pos = { x: Math.floor(Math.random() * 600) + 1, y: 0 };
  this.collectableEntity.size = { width: 12, height: 12 };
  this.collectableEntity.velocity = velocity;
  this.collectableEntity.asset = new PixelJS.Sprite();
  this.collectableEntity.asset.load({
    name: 'hiveblock.png',
    size: {
      width: 12,
      height: 12
    },
    rows: 4
  });
  this.collectableEntity.id = "collectable_" + (new Date().getTime());
  this.collectableEntity.type = CONSTANTS.COLLECTABLE.TYPE;
  this.collectableEntity.status = CONSTANTS.COLLECTABLE.STATUS.FALLING;
  layer.registerCollidable(this.collectableEntity);
};

CollectableElement.prototype.CONSTANTS = CONSTANTS;

CollectableElement.prototype.update = function() {
  var entity = this.collectableEntity;
  switch(entity.status) {
    case CONSTANTS.COLLECTABLE.STATUS.FALLING:
      if (entity.pos.y > config.game.height) {
        entity.dispose();
        window.doodle.collectablesController.removeItem(entity.id);
        $(document).trigger("game.lifeLost");
      }
      entity.moveDown();
      break;
    case CONSTANTS.COLLECTABLE.STATUS.PICKED_UP:
      entity.moveTo(entity.attached.pos.x, entity.attached.pos.y + entity.attached.size.height - 10, 100);
      break;
    case CONSTANTS.COLLECTABLE.STATUS.COLLECTED:

      this.changeStatus( CONSTANTS.COLLECTABLE.STATUS.DISPOSED );
      entity.fadeTo(0,500,function(){
        entity.dispose();
      })
      window.doodle.collectablesController.removeItem(entity.id);
      break;
  }
};

CollectableElement.prototype.changeStatus = function(newStatus) {
  this.collectableEntity.status = newStatus;
}

CollectableElement.prototype.attachToBee = function(bee) {
  this.changeStatus(CONSTANTS.COLLECTABLE.STATUS.PICKED_UP);
  this.collectableEntity.attached = bee;
}

module.exports = CollectableElement;
