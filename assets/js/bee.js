"use strict";


var PixelJS = require('./vendors/pixel.js');
var CollectableElement = require('./collectable_element.js');
var Config = require('./config.js');
var CONSTANTS = require('./constants.js');
var CollectablesController = require('./collectables_controller.js');

var Bee = function(game) {
  var playerLayer = game.createLayer("players");
  this.player = new PixelJS.Player();
  this.player.addToLayer(playerLayer);
  this.player.pos = { x: 200, y: 300 };
  this.player.allowDiagonalMovement = true;
  this.player.size = { width: 46, height: 57 };
  this.player.velocity = { x: 500, y: 400 };
  this.player.asset = new PixelJS.AnimatedSprite();
  this.player.asset.prepare({
    name: 'bee_test.png',
    frames: 3,
    rows: 3,
    speed: 150,
    defaultFrame: 0
  });

  this.player.onCollide(function (entity) {
    collideCandidate(entity);
  });

  playerLayer.registerCollidable(this.player);
  var self = this;

  function collideCandidate(entity) {
    if(entity.type == CONSTANTS.COLLECTABLE.TYPE) {
      var collectableItem = window.doodle.collectablesController.getItem(entity.id);
      if(collectableItem) {
        collectableItem.attachToBee(self.player);
      }
    }
  }
};

Bee.prototype.update = function() {
  this.player.canMoveDown = (this.player.pos.y + this.player.size.height) < Config.game.height - 20;
  this.player.canMoveUp = this.player.pos.y > 10;
  this.player.canMoveLeft = this.player.pos.x > 100;
  this.player.canMoveRight = (this.player.pos.x + this.player.size.width) < Config.game.width - 20;
}

module.exports = Bee;
