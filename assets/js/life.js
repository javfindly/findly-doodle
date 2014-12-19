"use strict";
var Config = require('./config.js');
var $ = require('jquery');
var _ = require('lodash');
var PixelJS = require('./vendors/pixel.js');

var Life = function (game) {
  this.game = game;
  this.counter = 0;
  this.lifes = [];
  this.layer;
  this.initialize();
};

Life.prototype.initialize = function () {
  _.bindAll(this, 'lifeLost');
  this.counter = Config.game.life;
  this.layer = this.game.createLayer("life");
  $(document).on("game.lifeLost", this.lifeLost);
};


Life.prototype.showLife = function (i) {
  var lifeEntity = this.layer.createEntity();
  lifeEntity.size = { width: 50, height: 50 };
  var xOffset = Config.game.width - (lifeEntity.size.width + 10) * (i+1);
  lifeEntity.pos = { x: xOffset , y: 20 };
  lifeEntity.asset = new PixelJS.Sprite();
  lifeEntity.asset.load({
    name: 'life.png'
  });
  this.lifes.push(lifeEntity);
};

Life.prototype.addLife = function () {
  if (this.counter >= Config.game.life) {
    return;
  }
  this.showLife(this.counter);
  this.counter++;
}


Life.prototype.render = function () {
  var i = 0;
  for(i; i < this.counter; i++) {
    this.showLife(i);
  }
};

Life.prototype.restart = function () {
  this.counter = Config.game.life;
  this.resetLife();
  this.render();

};

Life.prototype.resetLife = function () {
  this.lifes.forEach(function (life) {
    life.dispose();
    life = null;
  });

  this.lifes = [];
};


Life.prototype.lifeLost = function() {
  if (--this.counter <= 0) {
    $(document).trigger("game.lost");
  }
  var removedLife = this.lifes.shift();
  if(removedLife) {
    removedLife.dispose();
    removedLife = null;
  }
};

module.exports = Life;
