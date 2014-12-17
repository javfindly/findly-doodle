var Hive = function(game) {
    var hiveLayer = game.createLayer("hive");
    var theHive = hiveLayer.createEntity();
    theHive.pos = { x: 608, y: 0 };
    theHive.size = { width: 192, height: 169 };
    theHive.asset = new PixelJS.Sprite();
    theHive.asset.prepare({ 
        name: 'hive.png'
    });

    var hiveCollector = hiveLayer.createEntity();
    hiveCollector.pos = { x: 715, y: 180 };
    hiveCollector.size = { width: 50, height: 50 };
    
    hiveCollector.asset = new PixelJS.Sprite();
    /*
    // Print a black box in the position of the collector to see it and debug
    hiveCollector.asset.prepare({ 
        name: 'blackbox.png'
    });
    */

    
    hiveCollector.onCollide = function (entity) {
        collideCandidate(entity);
    };
    
    playerLayer.registerCollidable(player);

    function collideCandidate(entity) {
        if(entity.type == 'candidate') {
            entity.dispose();
        }
    }
}
