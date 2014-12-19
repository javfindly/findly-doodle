"use strict";

var CONSTANTS = {
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
	},
	COLLECTABLES_PROPERTIES: {
		CANDIDATE: {
			asset: {type: 'sprite', filename: 'hiveblock.png' },
			points: 3
		},
		LIFE: {
			asset: {type: 'sprite', filename: 'life.png' },
			points: 0
		}
	}
}


module.exports = CONSTANTS;
