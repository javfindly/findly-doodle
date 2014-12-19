"use strict";

var CONSTANTS = {
	HIVE: {
		TYPE: 'hive'
	},
	COLLECTABLE: {
		TAG: 'candidate',
  	STATUS: {
	    FALLING: 'FALLING',
	    PICKED_UP:'PICKED_UP',
	    COLLECTED: 'COLLECTED',
	    LOSTED: 'LOSTED',
	    DISPOSED: 'DISPOSED',
  	},
		PROPERTIES: {
			CANDIDATE: {
				asset: {type: 'sprite', filename: 'hiveblock.png' },
				points: 3
			},
			LIFE: {
				asset: {type: 'sprite', filename: 'life.png' },
				points: 0
			}
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
