"use strict";


var PixelJS = require('./vendors/pixel.js');
var Bee = require('./bee.js');
var Hive = require('./hive.js');
var Config = require('./config.js');
var CollectableElement = require('./collectable_element.js');

var Doodle = function() {
  this.initialize();
}

Doodle.prototype.initialize = function() {
  console.log('Initializing Doodle...');
  this.game = new PixelJS.Engine();
  this.game.init(Config.game);
  this.hive = new Hive(this.game);
  this.beePlayer = new Bee(this.game);  
  this.collectableElement = new CollectableElement(this.game);
}

Doodle.prototype.start = function() {
  console.log('Starting Doodle...');
  var thisDoodle = this;
  this.game.loadAndRun(function (elapsedTime, dt) {
    thisDoodle.collectableElement.drop();
    thisDoodle.beePlayer.update();
  });
}

module.exports = Doodle;
