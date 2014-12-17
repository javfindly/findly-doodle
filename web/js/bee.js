var Bee = function(game) {
    var playerLayer = game.createLayer("players");
    var player = new PixelJS.Player();
    player.addToLayer(playerLayer);
    player.pos = { x: 200, y: 300 };
    player.allowDiagonalMovement = true;
    player.size = { width: 46, height: 57 };
    player.velocity = { x: 150, y: 250 };
    player.asset = new PixelJS.AnimatedSprite();
    player.asset.prepare({ 
        name: 'bee_test.png',
        frames: 3, 
        rows: 3,
        speed: 150,
        defaultFrame: 0
    });
}

    
    