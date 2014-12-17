"use strict";

var _ = require('lodash');
var $ = require('jquery');
var Doodle = require('./doodle.js');
var PixelJS = require('./vendors/pixel.js');

PixelJS.assetPath = "assets";

$(document).ready(function () {
  var doodle = new Doodle();
  doodle.start();
});
