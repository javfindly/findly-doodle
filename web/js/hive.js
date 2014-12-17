var Hive = function(game) {
    var hiveLayer = game.createLayer("hive");
    var theHive = hiveLayer.createEntity();
    theHive.pos = { x: 608, y: 0 };
    theHive.size = { width: 192, height: 169 };
    theHive.asset = new PixelJS.Sprite();
    theHive.asset.prepare({ 
        name: 'hive.png'
    });
}
