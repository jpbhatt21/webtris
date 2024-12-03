import { atom, createStore } from "jotai";
import { activePos, initScale, initSettings, themeKeys, themes } from "./constants";
let act: number = window.localStorage.getItem("colorScheme")
	? parseInt(window.localStorage.getItem("colorScheme") as string)
	: 0;

const index = atom(act);
export const themeAtom = atom(themes[themeKeys[act]]);
export const themeIndexAtom = atom(
	(get) => get(index),
	(_get, set, update: number) => {
		set(index, update);
		set(themeAtom, themes[themeKeys[update]]);
		window.localStorage.setItem("colorScheme", update.toString());
	}
);

const state = atom("play");
export const stateAtom = atom(
	(get) => get(state),
	(_get, set, update: string) => {
		set(state, update);
	}
);

const page = atom("home");
export const pageAtom = atom(
	(get) => get(page),
	(_get, set, update: string) => {
		set(page, update);
	}
);

const gameOver = atom(false);
export const gameOverAtom = atom(
	(get) => get(gameOver),
	(_get, set, update: boolean) => {
		set(gameOver, update);
	}
);

const board = atom(
	Array.from({ length: 20 }, (_) =>
		Array.from({ length: 10 }, (_) => ({
			occupied: false,
			color: 7,
		}))
	)
);
export const boardAtom = atom(
	(get) => get(board),
	(_get, set, update: any) => {
		set(board, update);
	}
);

const autoplay = atom(!false);
export const autoplayAtom = atom(
	(get) => get(autoplay),
	(_get, set, update: boolean) => {
		set(autoplay, update);
	}
);

export const getAutoplayStateAtom = atom(null, (_get) => {
	let temp = [
		_get(autoplay),
		_get(state),
		_get(autoplaySpeed),
		_get(settings),
		_get(page)
	];
	return temp;
});
const holdShape = atom(7);
export const holdShapeAtom = atom(
	(get) => get(holdShape),
	(_get, set, update: number) => {
		set(holdShape, update);
	}
);

const currentShape = atom(7);
export const currentShapeAtom = atom(
	(get) => get(currentShape),
	(_get, set, update: number) => {
		set(currentShape, update);
	}
);

const nextShape = atom(7);
export const nextShapeAtom = atom(
	(get) => get(nextShape),
	(_get, set, update: number) => {
		set(nextShape, update);
	}
);

const level = atom(0);
export const levelAtom = atom(
	(get) => get(level),
	(_get, set, update: number) => {
		set(level, update);
	}
);

const score = atom(0);
export const scoreAtom = atom(
	(get) => get(score),
	(_get, set, update: number) => {
		set(score, update);
	}
);

const lines = atom(0);
export const linesAtom = atom(
	(get) => get(lines),
	(_get, set, update: number) => {
		set(lines, update);
	}
);

export const allStatsAtom = atom((get) => [get(level), get(score), get(lines)]);

const activePiece = atom([
	[0, 0],
	[0, 0],
	[0, 0],
	[0, 0],
]);
export const activePieceAtom = atom(
	(get) => get(activePiece),
	(_get, set, update: any) => {
		set(activePiece, update);
	}
);

const ghostPiece = atom([
	[0, 0],
	[0, 0],
	[0, 0],
	[0, 0],
]);
export const ghostPieceAtom = atom(
	(get) => get(ghostPiece),
	(_get, set, update: any) => {
		set(ghostPiece, update);
	}
);

const autoplaySpeed = atom(100);
export const autoplaySpeedAtom = atom(
	(get) => get(autoplaySpeed),
	(_get, set, update: number) => {
		set(autoplaySpeed, update);
	}
);

export const weight = atom(
	window.localStorage.getItem("weights")
		? JSON.parse(window.localStorage.getItem("weights") as string)
		: {
				weightedBlocks: 0.25, //weighted sum of blocks, where a block's weight is the row it's on
				connectedHoles: 0.09, //number of vertically connected holes
				roughness: -0.63, //sum of height differences between adjacent columns
				pitholePercentage: 0.2, //number of pits divided by total pits and holes
				clearAbleLines: 0.41, //number of lines that can be cleared by an I piece
				deepestHole: 0.22, //depth of the deepest hole
				blocks: -0.36, //number of blocks
				colHoles: -1.38, //number of columns containing holes
		  }
);
export const weightsAtom = atom(
	(get) => get(weight),
	(_get, set, update: any) => {
		set(weight, update);
		window.localStorage.setItem("weights", JSON.stringify(update));
	}
);
export const store = createStore();
const interval = atom<number | null>(null);
export const intervalAtom = atom(
	(get) => get(interval),
	(_get, set, update: any) => {
		set(interval, update);
	}
);
export const resetAtom = atom(null, (_get, set) => {
	const intervalId = _get(interval);
	if (intervalId !== null) {
		clearInterval(intervalId);
        set(interval, null);
	}
    set(state, "play");
	set(gameOver, false);
	set(
		board,
		Array.from({ length: 20 }, (_) =>
			Array.from({ length: 10 }, (_) => ({
				occupied: false,
				color: 7,
			}))
		)
	);
	// set(autoplay, false);
    set(lineStack, [0,0,0,0]);
	set(holdShape, 7);
	set(currentShape, 7);
	set(nextShape, 7);
	set(level, 0);
	set(score, 0);
	set(lines, 0);
	set(activePiece, [
		[0, 0],
		[0, 0],
		[0, 0],
		[0, 0],
	]);
	set(ghostPiece, [
		[0, 0],
		[0, 0],
		[0, 0],
		[0, 0],
	]);
	set(autoplaySpeed, 50);
});

const scale = atom(initScale);
export const scaleAtom = atom(
	(get) => get(scale),
	(_get, set, update: number) => {
		set(scale, update);
		window.localStorage.setItem("scale", update.toString());
	}
);
const settings = atom(initSettings);
export const settingsAtom = atom(
	(get) => get(settings),
	(_get, set, update: any) => {
		let temp = update(_get(settings));
		let values = Object.values(temp);
		let prev: any = [];
		let clash: any = [];
		for (let i = 0; i < values.length; i++) {
			let value = values[i];
			if (prev.includes(value)) {
				clash.push(value);
			} else {
				prev.push(value);
			}
		}
		temp.clash = clash;

		set(settings, temp);
		window.localStorage.setItem("settings", JSON.stringify(temp));
	}
);

const bag = atom([0, 1, 2, 3, 4, 5, 6]);
export const bagAtom = atom(
	(get) => get(bag),
	(_get, set, update: any) => {
		set(bag, update);
	}
);
export const bagRandAtom = atom(null, (_get, set) => {
	let temp = _get(bag);
	let random = temp[Math.floor(Math.random() * temp.length)];
	temp = temp.filter((v) => v !== random);
	if (temp.length === 0) {
		temp = [0, 1, 2, 3, 4, 5, 6];
	}
	set(bag, temp);
	return random;
});
const rotate = atom(0);
export const rotateAtom = atom(
	(get) => get(rotate),
	(_get, set, update: number) => {
		set(rotate, update);
	}
);
const time = atom(0);
export const timeAtom = atom(
    (get) => get(time),
    (_get, set, update: number) => {
        set(time, update);
    }
);

const lineStack = atom([0,0,0,0]);
export const lineStackAtom = atom(
    (get) => get(lineStack),
    (_get, set, update: any) => {
        set(lineStack, update);
    }
);  
export const initAtom = atom(null, (_get, set) => {
	let tempBag = [0, 1, 2, 3, 4, 5, 6];
	let tempCurSh = tempBag[Math.floor(Math.random() * tempBag.length)];
	tempBag = tempBag.filter((v) => v !== tempCurSh);
	let tempNxtSh = tempBag[Math.floor(Math.random() * tempBag.length)];
	tempBag = tempBag.filter((v) => v !== tempNxtSh);
	set(currentShape, tempCurSh);
	set(nextShape, tempNxtSh);
	let tempHoldSh = 7;
	if (_get(autoplay)) {
		tempHoldSh = tempBag[Math.floor(Math.random() * tempBag.length)];
		tempBag = tempBag.filter((v) => v !== tempHoldSh);
	}
	set(holdShape, tempHoldSh);
	set(bag, tempBag);
	set(activePiece, activePos[tempCurSh]);
	set(ghostPiece, activePos[tempCurSh]);

	return [tempCurSh, tempNxtSh, tempHoldSh];
});
