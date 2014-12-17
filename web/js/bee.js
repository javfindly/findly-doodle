var Bee = function(game) {
    var playerLayer = game.createLayer("players");
    var player = new PixelJS.Player();
    player.addToLayer(playerLayer);
    player.pos = { x: 200, y: 300 };
    player.size = { width: 64, height: 64 };
    player.velocity = { x: 100, y: 100 };
    player.asset = new PixelJS.AnimatedSprite();
    player.asset.prepare({ 
        name: 'blackbox.png',
        frames: 3, 
        rows: 3,
        speed: 150,
        defaultFrame: 1
    });
}

    
    