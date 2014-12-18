"use strict";

var _ = require('lodash');
var $ = require('jquery');
var Doodle = require('./doodle.js');
var PixelJS = require('./vendors/pixel.js');
var MainPage = require('./page.js');

PixelJS.assetPath = "assets";

$(document).ready(function () {
  window.doodle = new Doodle();
  window.doodle.start();
  window.mainPage = new MainPage();
  window.mainPage.start();
});
