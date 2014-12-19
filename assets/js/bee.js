"use strict";


var PixelJS = require('./vendors/pixel.js');
var CollectableElement = require('./collectable_element.js');
var Config = require('./config.js');
var $ = require('jquery');
var CONSTANTS = require('./constants.js');
var _ = require('lodash');
var CollectablesController = require('./collectables_controller.js');
var LifeManager = require('./life.js');

var Bee = function(game) {
  _.bindAll(this, 'whenCollision', 'collect', 'drop', 'restart');
  var self = this;
  this.game = game;
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

  this.player.onCollide(this.whenCollision);

  playerLayer.registerCollidable(this.player);
  this.initLife(game);
};


Bee.prototype.whenCollision = function (entity) {
  switch(entity.tag) {
    case CONSTANTS.COLLECTABLE.TAG:
      if (!_.contains(this.history.collectedIds, entity.id)) {
        this.collect(entity);
      }
      break;
    case CONSTANTS.HIVE.TAG:
      if (Object.keys(this.entitiesCollected).length > 0) {
        this.drop(entity);
      }
      break;
  }
};

Bee.prototype.collect = function (entity) {
  if (this.history.count >= Config.game.max_collectable) {
    return;
  }

  if (this['_' + entity.tag + 'Collected'] instanceof Function) {
    this['_' + entity.tag + 'Collected'](entity);
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
  var pointCollected = 0;
  _.each(this.entitiesCollected, function (item) {
    if (!item) {
      return;
    }
    item.changeStatus(CONSTANTS.COLLECTABLE.STATUS.COLLECTED);
    window.doodle.soundManager.play(CONSTANTS.SOUNDS.DEPOSIT);
    if (item.entity.type === 'LIFE') {
      $(document).trigger("game.lifeWon");
    }
    pointCollected += item.entity.points;
    thisBee.removeEntity(item.entity);
  });
  window.doodle.score.updateScore(pointCollected);
};

Bee.prototype.addEntity = function (entity) {
  if (!window.doodle.collectablesController.getItem(entity.id)) {
    return;
  }
  this.entitiesCollected[entity.id] = window.doodle.collectablesController.getItem(entity.id);
  this.history.collectedIds.push(entity.id);
  this.history.count++;
};

Bee.prototype.removeEntity = function (entity) {
  delete this.entitiesCollected[entity.id];
  this.history.count--;
};

Bee.prototype.update = function() {
  if (window.freeze === true) {
    this.player.velocity = { x: 0, y: 0 };
    return;
  }

  this.player.velocity = { x: 1000, y: 500 };

  if(this.player.lifeManager.counter > 0) {
    this.player.canMoveDown = (this.player.pos.y + this.player.size.height) < Config.game.height - 30;
    this.player.canMoveUp = this.player.pos.y > 10;
    this.player.canMoveLeft = this.player.pos.x > 10;
    this.player.canMoveRight = (this.player.pos.x + this.player.size.width) < Config.game.width - 20;
  } else {
    this.player.canMoveDown = false;
    this.player.canMoveUp = false;
    this.player.canMoveLeft = false;
    this.player.canMoveRight = false;
  }
};

Bee.prototype.initLife = function(game) {
  this.player.lifeManager = new LifeManager(game);
  this.player.lifeManager.render();
};

Bee.prototype.restart = function () {
  this.player.lifeManager.restart();
  this.player.pos = { x: 200, y: 300 };
  _.each(this.entitiesCollected, function (entity) {
    entity.dispose();
    entity = null;
  });
  this.entitiesCollected = {};
  this.countCollector = 0;
  this.history = {
    count: 0,
    collectedIds: []
  };
};

module.exports = Bee;
