
var _ = require('lodash');

var soundMap = {
	'collectItem':'collect.mp3',
	'depositItem':'deposit.mp3',
	'loseItem':'lose.mp3',
	'dropItem':'drop.mp3'
}

var SoundManager = function(game) {
	var self = this;
	self.sounds = {};
	_.each(soundMap,function(soundFileName, soundName){
		var sound = game.createSound(soundName);
		sound.prepare({ name: soundFileName });
		self.sounds[soundName] = sound;
	});
}

SoundManager.prototype.play = function(soundName) {
	if(this.sounds[soundName]){
		this.sounds[soundName].play();
	}
}


module.exports = SoundManager;