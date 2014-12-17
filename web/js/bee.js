var Bee = {
    var playerLayer = game.createLayer("players");
    var player = new PixelJS.Player();
    player.addToLayer(playerLayer);
    player.pos = { x: 200, y: 300 };
    player.size = { width: 32, height: 32 };
    player.velocity = { x: 100, y: 100 };
    player.asset = new PixelJS.AnimatedSprite();
    player.asset.prepare({ 
        name: 'char.png', 
        frames: 3, 
        rows: 4,
        speed: 100,
        defaultFrame: 1
    });
}
    