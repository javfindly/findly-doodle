"use strict";

var Entity = require('../../utils/entity.js');
var SuperMath = require('../../utils/math.js');
var Config = require('../../config.js');

var CloudEntity = function (options) {
  var width = SuperMath.getRandomInt(50, 200);
  options = options || {
    name: 'cloud',
    x: SuperMath.getRandomInt(50, Config.game.width - 50),
    y: SuperMath.getRandomInt(50, Config.game.height - 200),
    velocity: {
      x: SuperMath.getRandomInt(10, 50),
      y: SuperMath.getRandomInt(50, 100),
    },
    asset: {
      type: 'sprite',
      filename: 'cloud.png',
      width: width,
      height: width / 2
    }
  };

  Entity.call(this, options);
};

CloudEntity.prototype = Entity.prototype;

CloudEntity.prototype.move = function () {
  if (this.entity.pos.x < -200) {
    this.entity.pos.x = Config.game.width;
    this.entity.pos.y = SuperMath.getRandomInt(50, Config.game.height - 200);
  }

  this.entity.moveLeft();
};

module.exports = CloudEntity;
