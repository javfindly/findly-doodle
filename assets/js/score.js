"use strict";

var PixelJS = require('./vendors/pixel.js');

var Score = function(game) {
  var scoreBackgroundLayer = game.createLayer("score_background");
  scoreBackgroundLayer.static = true;
  this.entity = scoreBackgroundLayer.createEntity();
  this.entity.pos = { x: 10, y: 10 };
  this.entity.size = { width: 46, height: 57 };
  this.entity.asset = new PixelJS.Sprite();
  // this.entity.asset.transparencyKey = {R: 255, G: 198, B: 42};
  this.entity.asset.load({
    name: 'honeycomb.png'
  });
  this.scoreLayer = game.createLayer("score");
  this.scoreLayer.static = true;
  this.currentScore = 0;
  this.scoreLayer.redraw = true;
  this.scoreLayer.drawText(
    this.currentScore,
    60,
    75,
    '40pt "Trebuchet MS", Helvetica, sans-serif',
    '#F22',
    'center'
  );
};

Score.prototype.updateScore = function(points) {
  this.currentScore += points;
  this.scoreLayer.redraw = true;
  this.scoreLayer.drawText(
    this.currentScore,
    60,
    75,
    '40pt "Trebuchet MS", Helvetica, sans-serif',
    '#F22',
    'center'
  );
}

module.exports = Score;
