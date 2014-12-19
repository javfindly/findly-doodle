"use strict"

var PixelJS = require('./vendors/pixel.js');

var Effects = function(game) {
	if(!this.effectsLayer) {
		this.effectsLayer = game.createLayer("effects");
	}
}

Effects.prototype.createSparks = function(position) {
  var spark = this.effectsLayer.createEntity();
  var offsetPosition = { x: position.x, y: position.y - 20 };
  spark.pos = offsetPosition;
  spark.size = { width: 50, height: 50 };
  spark.velocity = { x: 700, y: 400 };
  spark.asset = new PixelJS.AnimatedSprite();
  spark.asset.load({
    name: 'sparks.png',
    frames: 5,
    rows: 1,
    speed: 100,
    defaultFrame: 0
  });
  setTimeout(function() {
    spark.dispose();
  }, 500);
};

module.exports = Effects;