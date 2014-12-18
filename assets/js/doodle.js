"use strict";

var PixelJS = require('./vendors/pixel.js');
var Bee = require('./bee.js');
var Hive = require('./hive.js');
var Config = require('./config.js');
var CollectableElement = require('./collectable_element.js');
var Background = require('./background/background.js');
var CollectablesController = require('./collectables_controller.js');
var Score = require('./score.js');
var SoundManager = require('./sound_manager.js');
var CONSTANTS = require('./constants.js');

var Doodle = function() {
  this.initialize();
}

Doodle.prototype.initialize = function() {
  console.log('Initializing Doodle...');
  this.game = new PixelJS.Engine();
  this.game.init(Config.game);

  this.background = new Background(this.game);
  this.background.render();
  this.hive = new Hive(this.game);

  this.collectablesController = new CollectablesController(this.game);
  this.beePlayer = new Bee(this.game);
  this.score = new Score(this.game);

  this.soundManager = new SoundManager(this.game);
}

Doodle.prototype.start = function() {
  console.log('Starting Doodle...');
  var thisDoodle = this;
  this.game.loadAndRun(function (elapsedTime, dt) {
    thisDoodle.collectablesController.updateCollectables();
    thisDoodle.beePlayer.update();
    thisDoodle.background.update();
    // thisDoodle.score.updateScore(3); //example how to increase the score
  });
}

module.exports = Doodle;
