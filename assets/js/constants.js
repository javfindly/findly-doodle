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
				asset: {type: 'sprite', filename: 'candidateout.png' },
				points: 5,
				weigth: 25
			},
			LIFE: {
				asset: {type: 'sprite', filename: 'life.png' },
				points: 0,
				weigth: 10
			},
			CV: {
				asset: {type: 'sprite', filename: 'cvhex.png' },
				points: 10,
				weigth: 20
			},
			CXAPPLY: {
				asset: {type: 'sprite', filename: 'cxapplyhex.png' },
				points: 50,
				weigth: 5
			},
			JOB: {
				asset: {type: 'sprite', filename: 'jobhex.png' },
				points: 15,
				weigth: 20
			},
			RECRUITER: {
				asset: {type: 'sprite', filename: 'recout.png' },
				points: 15,
				weigth: 10
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
