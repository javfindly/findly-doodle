var CollectablesController = function(game) {
  this.elementsLayer = this.game.createLayer("collectables");
  this.collectableElement = new CollectableElement(this.elementsLayer);
}

CollectablesController.prototype.dropElements() {
  this.collectableElement.drop({x: 200, y: 100});
}
