"use strict";


var PixelJS = require('./vendors/pixel.js');

var Bee = function(game,options) {
  var playerLayer = game.createLayer("players");
  var player = new PixelJS.Player();
  player.addToLayer(playerLayer);
  player.pos = { x: 200, y: 300 };
  player.allowDiagonalMovement = true;
  player.size = { width: 46, height: 57 };
  player.velocity = { x: 200, y: 250 };
  player.asset = new PixelJS.AnimatedSprite();
  player.asset.prepare({
    name: 'bee_test.png',
    frames: 3,
    rows: 3,
    speed: 150,
    defaultFrame: 0
  });

  player.onCollide = function (entity) {
    collideCandidate(entity);
  };

  playerLayer.registerCollidable(player);

  function collideCandidate(entity) {
    if (entity === options.candidate) {
        /*
        collectSound.play();
        coin.pos = {
        x: Math.floor(Math.random() * (700 - 100 + 1) + 100),
        y: Math.floor(Math.random() * (500 - 100 + 1) + 100)
      };
      score += 1;
      scoreLayer.redraw = true;
      scoreLayer.drawText(
      'Coins: ' + score,
      50,
      50,
      '14pt "Trebuchet MS", Helvetica, sans-serif',
      '#FFFFFF',
      'left'
    );
    */
    }
  }
};

module.exports = Bee;
