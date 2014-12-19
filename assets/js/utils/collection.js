"use strict";

var Radio = require('backbone.radio');

var Collection = function (options) {
  this.options = options || {};
  this.items = {};

  this.channel = Radio.getChannel(options.name || 'store');
  this.channel.commands.setHandlers({
    'item:destroy': this.remove
  });

  this.history.time = 0;
};

Collection.prototype.add = function (entity) {
  this.items[entity.id] = entity;
};

Collection.prototype.remove = function (entity) {
  delete this.items[entity.id];
};

Collection.prototype.getItem = function (id) {
  return this.items[id];
}

Collection.prototype.executeAll = function (fn) {
  _.each(this.items, function (item) {
    if (item[fn] instanceof Function) {
      item[fn]();
    }
  });
};

Collection.prototype.destroy = function () {
  this.items = null;
  this.channel.removeHandler('item:destroy');
};

Collection.prototype.isDelayPast = function (now) {
  return (now - this.history.time) > this.options.delay;
}

module.exports = Collection;
