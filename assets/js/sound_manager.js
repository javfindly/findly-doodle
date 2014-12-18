
var _ = require('lodash');

var SOUNDS = {
	COLLECT: 'collectItem',
	DEPOSIT: 'depositItem',
	LOSE: 'loseItem'
}


var soundMap = {
	'collectItem':'collect.mp3',
	'depositItem':'deposit.mp3',
	'loseItem':'lose.mp3'
}

var SoundManager = function(game) {
	this.sounds = {};
	_.each(soundMap,function(soundFileName, soundName){
		var sound = game.createSound(soundName);
		sound.prepare({ name: soundFileName });
		this.sounds[soundName] = sound;
	});
}

SoundManager.prototype.CONSTANTS = CONSTANTS;
SoundManager.prototype.play = function(soundName) {
	console.log('try playing ' + soundName);
	if(this.sounds[soundName]){
		console.log('playing ' + soundName);
		this.sounds[soundName].play();
	}
}


module.exports = SoundManager;