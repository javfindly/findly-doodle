"use strict";


var PixelJS = require('./vendors/pixel.js');
var Bee = require('./bee.js');
var Hive = require('./hive.js');

var Doodle = function() {
  this.initialize();
}

Doodle.prototype.initialize = function() {
  console.log('Initializing Doodle...');
  this.game = new PixelJS.Engine();
  this.game.init({
    container: 'game_container',
    width: 800,
    height: 600
  });
  this.hive = new Hive(this.game);
  this.beePlayer = new Bee(this.game);
}

Doodle.prototype.start = function() {
  console.log('Starting Doodle...');
  this.game.loadAndRun(function (elapsedTime, dt) {});
}

module.exports = Doodle;
