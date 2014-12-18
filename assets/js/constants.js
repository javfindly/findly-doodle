"use strict";

var CONTSTANTS = {
	HIVE: {
		TYPE: 'hive'
	},
	COLLECTABLE: {
		TYPE: 'candidate',
  	STATUS: {
	    FALLING: 'FALLING',
	    PICKED_UP:'PICKED_UP',
	    COLLECTED: 'COLLECTED',
	    LOSTED: 'LOSTED',
	    DISPOSED: 'DISPOSED',
  	}
	},
	SOUNDS: {
		COLLECT: 'collectItem',
		DEPOSIT: 'depositItem',
		LOSE: 'loseItem',
		DROP: 'dropItem'
	}
}

module.exports = CONSTANTS;
