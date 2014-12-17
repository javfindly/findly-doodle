function debug(m){
    console.log(m);
}

var Doodle = function() {
    this.initGame();
}

Doodle.prototype.initGame = function() {
    debug('init');
    this.game = new PixelJS.Engine();
    this.game.init({
        container: 'game_container',
        width: 800,
        height: 600
    });
    this.beePlayer = new Bee(this.game);    
}

Doodle.prototype.run = function() {
    this.game.loadAndRun(function (elapsedTime, dt) {});
}

document.onreadystatechange = function () {
    if (document.readyState == "complete") {
        var doodle = new Doodle();
        doodle.run();
    }
}