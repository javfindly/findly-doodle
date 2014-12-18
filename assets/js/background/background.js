"use strict";

var PixelJS = require('../vendors/pixel.js');
var SkyEntity = require('./entities/sky.js');
var GrassEntity = require('./entities/grass.js');
var CloudEntity = require('./entities/cloud.js');

var Background = function (game) {
  if (!game) {
    throw new Error('Game argument is required.');
  }

  this.game = game;
  this.entityCollection = {};
  this.initialize();
};

Background.prototype.initialize = function () {
  this.layer = this.game.createLayer('background');
};

Background.prototype.render = function () {

  this.entityCollection.sky = new SkyEntity({ name: 'sky', asset: { type: 'tile', filename: 'sky.png', width: 800, height: 600 } });
  this.entityCollection.sky.addTo(this.layer);

  this.entityCollection.grass = new GrassEntity({ name: 'grass', x: 0, y: 450, asset: { type: 'sprite', filename: 'grass.png', width: 800, height: 200 }});
  this.entityCollection.grass.addTo(this.layer);

  this.generateClouds(15);
};

Background.prototype.update = function () {
  this.entityCollection.clouds.forEach(function (cloud) {
    cloud.move();
  });
};

Background.prototype.generateEntities = function (number) {
  this.entityCollection.clouds = [];
  while (number-- > 0) {
    var cloud = new CloudEntity();
    this.entityCollection.clouds.push(cloud.addTo(this.layer));
  }
};


module.exports = Background;
