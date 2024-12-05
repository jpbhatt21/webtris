import { atom, createStore } from "jotai";
import {
	activePos,
	initScale,
	initSettings,
	socket,
	themeKeys,
	themes,
} from "./constants";
import { setWeights } from "./Functionality/helper";
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
		const intervalId = _get(multiplayerInterval);
		if (update == "game over" && intervalId) {
			clearInterval(intervalId);
			set(multiplayerInterval, null);
		}
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
		_get(page),
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
		setWeights(update);
		set(weight, update);
		window.localStorage.setItem("weights", JSON.stringify(update));
	}
);
const timer = atom(0);
export const timerAtom = atom(
	(get) => get(timer),
	(_get, set, update: number) => {
		set(timer, update);
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
const multiplayerInterval = atom<number | null>(null);
export const multiplayerIntervalAtom = atom(
	(get) => get(multiplayerInterval),
	(_get, set, update: any) => {
		set(multiplayerInterval, update);
	}
);
export const resetAtom = atom(null, (_get, set,val=true) => {
	const intervalId = _get(interval);
	if (intervalId !== null) {
		clearInterval(intervalId);
		set(interval, null);
	}
	if(val)
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
	set(lineStack, [0, 0, 0, 0]);
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
	set(autoplaySpeed, 100);
	let tempUser = _get(user);
	if (tempUser.room !== "") {
		set(
			multiplayerInterval,
			setInterval(() => {
				// console.log("sending")
				if (_get(lineDissapear).length == 0)
					socket.emit("roomCom", {
						room: tempUser.room,
						board: _get(board),
						active: _get(activePiece),
						currentShape: _get(currentShape),
						nextShape: _get(nextShape),
						holdShape: _get(holdShape),
						score: _get(score),
						lines: _get(lines),
						level: _get(level),
						lineDissapear: _get(lineDissapear),
						moveDown: _get(moveDown),
						speed: _get(speed),
					});
			}, 100)
		);
	}
});
const speed = atom(960);
export const speedAtom = atom(
	(get) => get(speed),
	(_get, set, update: number) => {
		set(speed, update);
	}
);
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
			if (i == 1) continue;
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
const lineDissapear = atom([]);
export const lineDissapearAtom = atom(
	(get) => get(lineDissapear),
	(_get, set, update: any) => {
		set(lineDissapear, update);
	}
);
const moveDown = atom([]);
export const moveDownAtom = atom(
	(get) => get(moveDown),
	(_get, set, update: any) => {
		set(moveDown, update);
	}
);
let temp = [0, 1, 2, 3, 4, 5, 6];
const bag = atom(
	"0000000".split("").map((_) => {
		let random = temp[Math.floor(Math.random() * temp.length)];
		temp = temp.filter((v) => v !== random);
		return random;
	})
);
export const bagAtom = atom(
	(get) => get(bag),
	(_get, set, update: any) => {
		set(bag, update);
	}
);
const message: any = atom({ active: false, heading: "", body: "" });
export const messageAtom = atom(
	(get) => get(message),
	(_get, set, update: any) => {
		set(message, update);
	}
);
const nextBag = atom(
	"0000000".split("").map((_) => {
		let random = temp[Math.floor(Math.random() * temp.length)];
		temp = temp.filter((v) => v !== random);
		return random;
	})
);
export const nextBagAtom = atom(
	(get) => get(nextBag),
	(_get, set, update: any) => {
		set(nextBag, update);
	}
);
export const bagRandAtom = atom(null, (_get, set) => {
	let tempBag = _get(bag);
	let random = tempBag.shift();
	if (tempBag.length == 0) {
		temp = [0, 1, 2, 3, 4, 5, 6];
		tempBag = "0000000".split("").map((_) => {
			let random = temp[Math.floor(Math.random() * temp.length)];
			temp = temp.filter((v) => v !== random);
			return random;
		});
		if (_get(user).room !== "") {
			tempBag = _get(nextBag);
			socket.emit("getBag", {
				room: _get(user).room,
				name: _get(user).name,
			});
		}
	}

	set(bag, tempBag);
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

const lineStack = atom([0, 0, 0, 0]);
export const lineStackAtom = atom(
	(get) => get(lineStack),
	(_get, set, update: any) => {
		set(lineStack, update);
	}
);
export const initAtom = atom(null, (_get, set) => {
	let tempBag = [0, 1, 2, 3, 4, 5, 6];
	set(garbageLines, [0, parseInt((Math.random() * 10).toString())]);
	let tempCurSh: any = tempBag[Math.floor(Math.random() * tempBag.length)];
	tempBag = tempBag.filter((v) => v !== tempCurSh);
	let tempNxtSh: any = tempBag[Math.floor(Math.random() * tempBag.length)];
	tempBag = tempBag.filter((v) => v !== tempNxtSh);

	if (_get(user).room !== "") {
		tempBag = _get(bag);
		tempCurSh = tempBag.shift();
		tempNxtSh = tempBag.shift();
		set(bag, tempBag);
	} else set(bag, tempBag);

	set(currentShape, tempCurSh);
	set(nextShape, tempNxtSh);
	let tempHoldSh = 7;
	if (_get(autoplay)) {
		tempHoldSh = tempBag[Math.floor(Math.random() * tempBag.length)];
		tempBag = tempBag.filter((v) => v !== tempHoldSh);
	}
	set(holdShape, tempHoldSh);
	set(activePiece, activePos[tempCurSh]);
	let tempGhostPiece = JSON.parse(JSON.stringify(activePos[tempCurSh]));
	while(tempGhostPiece.every((v:any)=>v[0]<19)){
		tempGhostPiece = tempGhostPiece.map((v:any) => [v[0] + 1, v[1]]);
	}

	set(ghostPiece, tempGhostPiece);
	return [tempCurSh, tempNxtSh, tempHoldSh];
});

const garbageLines = atom([0, parseInt((Math.random() * 10).toString())]); // [0,5] means 0 lines of garbage and hole at column index 5
export const garbageLinesAtom = atom(
	(get) => get(garbageLines),
	(_get, set, update: any) => {
		if (update.type == "add")
			set(garbageLines, [
				_get(garbageLines)[0] + update.lines,
				_get(garbageLines)[1],
			]);
		else set(garbageLines, update.value);
	}
);

const user = atom({
	name: "Guest",
	sid: "0",
	count: "-",
	room: "",
	opponent: "",
});
export const userAtom = atom(
	(get) => get(user),
	(_get, set, update: any) => {
		set(user, { ..._get(user), ...update });
	}
);
