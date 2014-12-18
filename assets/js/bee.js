"use strict";


var PixelJS = require('./vendors/pixel.js');
var CollectableElement = require('./collectable_element.js');
var Config = require('./config.js');
var $ = require('jquery');
var CONSTANTS = require('./constants.js');
var _ = require('lodash');
var CollectablesController = require('./collectables_controller.js');

var Bee = function(game) {
  _.bindAll(this, 'whenCollision', 'collect', 'drop');
  var self = this;
  var playerLayer = game.createLayer("players");

  this.entitiesCollected = {};
  this.countCollector = 0;
  this.history = {
    count: 0,
    collectedIds: []
  };

  this.player = new PixelJS.Player();
  this.player.addToLayer(playerLayer);

  this.player.pos = { x: 200, y: 300 };
  //this.player.allowDiagonalMovement = true; //Fuck ups the sprite animation
  this.player.size = { width: 50, height: 50 };
  this.player.velocity = { x: 700, y: 400 };
  this.player.asset = new PixelJS.AnimatedSprite();
  this.player.asset.prepare({
    name: 'bee.png',
    frames: 3,
    rows: 4,
    speed: 100,
    defaultFrame: 1
  });

  this.player.life = 5;

  this.player.onCollide(function (entity) {
    self.whenCollision(entity);
  });

  var lifeLayer = game.createLayer("life");

  $(document).bind( "game.lifeLost", this.lifeLost);

  playerLayer.registerCollidable(this.player);
};


Bee.prototype.whenCollision = function (entity) {
  switch(entity.type) {
    case CONSTANTS.COLLECTABLE.TYPE:
      if (!_.contains(this.history.collectedIds, entity.id)) {
        this.collect(entity);
      }
      break;
    case CONSTANTS.HIVE.TYPE:
      if (Object.keys(this.entitiesCollected).length > 0) {
        this.drop(entity);
      }
      break;
  }
}

Bee.prototype.collect = function (entity) {
  if (this.history.count >= Config.game.max_collectable) {
    return;
  }

  if (this['_' + entity.type + 'Collected'] instanceof Function) {
    this['_' + entity.type + 'Collected'](entity);
  }
};

Bee.prototype._candidateCollected = function (entity) {
  this.addEntity(entity);
  var collectableItem = window.doodle.collectablesController.getItem(entity.id);
  if(collectableItem) {
    collectableItem.attachToBee(this.player);
  }
};

Bee.prototype.drop = function (entity) {
  var thisBee = this;
  _.each(this.entitiesCollected, function (item) {
    item.changeStatus(CONSTANTS.COLLECTABLE.STATUS.COLLECTED);
    thisBee.removeEntity(item.collectableEntity);
  });
};

Bee.prototype.addEntity = function (entity) {
  this.entitiesCollected[entity.id] = window.doodle.collectablesController.getItem(entity.id);
  this.history.collectedIds.push(entity.id);
  this.history.count++;
};

Bee.prototype.removeEntity = function (entity) {
  delete this.entitiesCollected[entity.id];
  this.history.count--;
}



Bee.prototype.update = function() {
  this.player.canMoveDown = (this.player.pos.y + this.player.size.height) < Config.game.height - 20;
  this.player.canMoveUp = this.player.pos.y > 10;
  this.player.canMoveLeft = this.player.pos.x > 10;
  this.player.canMoveRight = (this.player.pos.x + this.player.size.width) < Config.game.width - 10;
}

Bee.prototype.lifeLost = function() {
  self.player.life--;
  if(self.player.life <= 0) {

  }
}

module.exports = Bee;
