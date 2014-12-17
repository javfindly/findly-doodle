var Doodle = {
    initGame: function() {
        if (document.readyState == "complete") {
            var game = new PixelJS.Engine();
            game.init({
                container: 'game_container',
                width: 800,
                height: 600
            });
            
            game.run(function (elapsedTime, dt) {
            });
        }
    },
    initPlayer: function() {
        
    }
}

document.onreadystatechange = function () {
    Doodle.initGame();   
}