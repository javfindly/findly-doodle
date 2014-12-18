"use strict";

var PixelJS = require('../vendors/pixel.js');
var SkyEntity = require('./entities/sky.js');
var GrassEntity = require('./entities/grass.js');

var Background = function (game) {
  if (!game) {
    throw new Error('Game argument is required.');
  }

  this.game = game;
  this.initialize();
};

Background.prototype.initialize = function () {
  this.layer = this.game.createLayer('background');
};

Background.prototype.render = function () {
  var sky = new SkyEntity({ name: 'sky', asset: { type: 'tile', filename: 'sky.png', width: 800, height: 600 } });
  sky.addTo(this.layer);

  var grass = new GrassEntity({ name: 'grass', x: 0, y: 400, asset: { type: 'sprite', filename: 'grass.png', width: 800, height: 200 }});
  grass.addTo(this.layer);
};

Background.prototype.addEntity = function (entity) {
  entity.addTo(this.layer);
};


module.exports = Background;
