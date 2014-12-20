"use strict";

var PixelJS = require('./vendors/pixel.js');
var Bee = require('./bee.js');
var Hive = require('./hive.js');
var Config = require('./config.js');
var Collectable = require('./collectable.js');
var Background = require('./background/background.js');
var CollectablesManager = require('./collectables_manager.js');
var Score = require('./score.js');
var Effects = require('./effects.js');
var SoundManager = require('./sound_manager.js');
var CONSTANTS = require('./constants.js');
var $ = require('jquery');
var _ = require('lodash');

var Doodle = function() {
  this.initialize();
}

Doodle.prototype.initialize = function() {
  console.log('Initializing Doodle...');
  _.bindAll(this, 'freeze', 'restart');
  var thisDoodle = this;

  this.game = new PixelJS.Engine();
  this.game.init(Config.game);
  this.loadElements();

  $(document).on({
    'freeze': this.freeze,
    'restart': this.restart
  });
};

Doodle.prototype.loadElements = function () {
  this.background = this.loadBackground();
  this.hive = this.loadHive();
  this.CollectablesManager = this.loadCollectablesElements();
  this.beePlayer = this.loadBee();
  this.score = this.loadScore();
  this.soundManager = this.loadSoundManager();
  this.effectsManager = this.loadEffectsManager();

};

Doodle.prototype.start = function() {
  console.log('Starting Doodle...');
  var thisDoodle = this;
  this.game.loadAndRun(function (elapsedTime, dt) {
    if (window.freeze === true) {
      return;
    }
    thisDoodle.CollectablesManager.updateCollectables();
    thisDoodle.beePlayer.update();
    thisDoodle.background.update();
  });
};

Doodle.prototype.loadBackground = function () {
  var background = new Background(this.game);
  background.render();

  return background;
};

Doodle.prototype.loadBee = function () {
  return new Bee(this.game);
};

Doodle.prototype.loadScore = function () {
  return new Score(this.game);
};

Doodle.prototype.loadHive = function () {
  return new Hive(this.game);
};

Doodle.prototype.loadSoundManager = function () {
  return new SoundManager(this.game);
};

Doodle.prototype.loadCollectablesElements = function () {
  return new CollectablesManager(this.game);
};

Doodle.prototype.loadEffectsManager = function() {
  return new Effects(this.game);
}

Doodle.prototype.freeze = function () {
  window.freeze = true;
};

Doodle.prototype.unfreeze = function () {
  window.freeze = false;
};

Doodle.prototype.restart = function () {
  this.beePlayer.restart();
  this.CollectablesManager.restart();
  this.score.restart();

  window.freeze = false;
};

Doodle.prototype.handlePanEvent = function (ev) {
  if (!ev) {
    return;
  }

  switch (ev.type) {
    case 'panleft':
      this.beePlayer.player.moveLeft();
      break;

    case 'panup':
      this.beePlayer.player.moveUp();
      break;

    case 'panright':
      this.beePlayer.player.moveRight();
      break;

    case 'pandown':
      this.beePlayer.player.moveDown();
      break;
    }
};

module.exports = Doodle;
