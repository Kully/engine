import {
	VALID_CONTROLLER_KEYS,
} from "./constants.js";

import {
	CONTROLLER,
} from "./state.js"


export function handleKeyDown(e) {
	for (let key of VALID_CONTROLLER_KEYS) {
		if (e.code === key)
			CONTROLLER[key] = 1;
	}
}

export function handleKeyUp(e) {
	for (let key of VALID_CONTROLLER_KEYS) {
		if (e.code === key) {
			CONTROLLER[key] = 0;
			CONTROLLER["lastKeyUp"] = key;
		}
	}
	if (e.code === "ArrowLeft" || e.code === "ArrowRight") {
		CONTROLLER["lastLeftOrRight"] = e.code;
	}
}