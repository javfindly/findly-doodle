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
  
  this.player.onCollide(function (entity) {
  self.whenCollision(entity);

  });

  playerLayer.registerCollidable(this.player);
  this.initLife(game);
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
    window.doodle.soundManager.play(CONSTANTS.SOUNDS.DEPOSIT);
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
  if(this.player.life > 0) {
    this.player.canMoveDown = (this.player.pos.y + this.player.size.height) < Config.game.height - 20;
    this.player.canMoveUp = this.player.pos.y > 10;
    this.player.canMoveLeft = this.player.pos.x > 10;
    this.player.canMoveRight = (this.player.pos.x + this.player.size.width) < Config.game.width - 10;
  } else {
    this.player.canMoveDown = false;
    this.player.canMoveUp = false;
    this.player.canMoveLeft = false;
    this.player.canMoveRight = false;
  }
}

Bee.prototype.initLife = function(game) {
  var self = this;
  self.player.life = 5;
  self.lifes = [];
  var lifeLayer = game.createLayer("life");
  for(var i = 0; i < self.player.life; i++) {
    var lifeEntity = lifeLayer.createEntity();
    lifeEntity.size = { width: 50, height: 50 };
    var xOffset = Config.game.width - (lifeEntity.size.width + 10) * (i+1);
    lifeEntity.pos = { x: xOffset , y: 20 };
    lifeEntity.asset = new PixelJS.Sprite();
    lifeEntity.asset.prepare({
      name: 'life.png'
    });
    self.lifes.push(lifeEntity);
  }
  $(document).bind("game.lifeLost", function(e) {
    self.lifeLost(self,e)
  });
}

Bee.prototype.lifeLost = function(self,e) {
  self.player.life--;
  if(self.player.life <= 0) {
    $(document).trigger("game.lost");
  }
  var lifeEntity = self.lifes.shift();
  if(lifeEntity) {
    lifeEntity.dispose();
  }
}

module.exports = Bee;
