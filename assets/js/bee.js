"use strict";


var PixelJS = require('./vendors/pixel.js');
var CollectableElement = require('./collectable_element.js');
var Config = require('./config.js');
var $ = require('jquery');
var CONSTANTS = require('./constants.js');
var CollectablesController = require('./collectables_controller.js');

var Bee = function(game) {
  var playerLayer = game.createLayer("players");
  var self = this;
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
    collideCandidate(entity);
  });

  var lifeLayer = game.createLayer("life");

  $(document).bind( "game.lifeLost", this.lifeLost);

  playerLayer.registerCollidable(this.player);
  var self = this;

  function collideCandidate(entity) {
    if(entity.type == CONSTANTS.COLLECTABLE.TYPE) {
      var collectableItem = window.doodle.collectablesController.getItem(entity.id);
      if(collectableItem && collectableItem.collectableEntity && collectableItem.collectableEntity.status == CONSTANTS.COLLECTABLE.STATUS.FALLING) {
        collectableItem.attachToBee(self.player);
      }
    }
  }
};

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
