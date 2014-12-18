"use strict";

var PixelJS = require('./vendors/pixel.js');

var CONSTANTS = require('./constants.js');

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

CollectableElement.prototype.update = function(velocity) {
  switch(this.collectableEntity.status) {
    case CONSTANTS.COLLECTABLE.STATUS.FALLING:
      this.collectableEntity.moveDown();
      break;
    case CONSTANTS.COLLECTABLE.STATUS.PICKED_UP:
      this.collectableEntity.moveTo(this.collectableEntity.attached.pos.x,this.collectableEntity.attached.pos.y + this.collectableEntity.attached.size.height - 10);
      break;
    case CONSTANTS.COLLECTABLE.STATUS.COLLECTED:
      var entity = this.collectableEntity;
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
