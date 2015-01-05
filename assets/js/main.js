"use strict";

var _ = require('lodash');
var $ = require('jquery');
var Doodle = require('./doodle.js');
var PixelJS = require('./vendors/pixel.js');
var MainPage = require('./page.js');
var Hammer = require('hammerjs');

PixelJS.assetPath = "assets";

$(document).ready(function () {
  window.doodle = new Doodle();
  window.doodle.start();
  window.mainPage = new MainPage();
  window.mainPage.start();

  console.log(window.doodle);
  console.log($('#game_container'));
  var hammertime = new Hammer($('#game_container')[0]);
  hammertime.get('pan').set({ direction: Hammer.DIRECTION_ALL });
  // hammertime.on("panleft panright panup pandown tap press", function(ev) {
  hammertime.on("panleft panright panup pandown", function(ev) {
    window.doodle.handlePanEvent(ev);
    console.log(window.doodle);
    console.log(ev.type +" gesture detected.");
  });
});
