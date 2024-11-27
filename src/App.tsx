import { useEffect, useState } from "react";
import {
	automatic,
	getColorScheme,
	getSettings,
	getWeights,
	rotPiece,
	svg,
} from "./Helper";
import PauseScreen from "./Pause";
import StartScreen from "./Start";
import SettingsScreen from "./Settings";
let inter: any = null;
let autoplay = true;
let started = !false;
let keys = {
	moveLeft: false,
	moveRight: false,
	softDrop: false,
	hardDrop: false,
	rotateCW: false,
	rotateCCW: false,
	holdPiece: false,
	pauseGame: false,
};
let activePos = [
	[
		[0, 3],
		[0, 4],
		[0, 5],
		[0, 6],
	],
	[
		[0, 3],
		[1, 3],
		[1, 4],
		[1, 5],
	],
	[
		[0, 5],
		[1, 5],
		[1, 4],
		[1, 3],
	],
	[
		[0, 4],
		[0, 5],
		[1, 4],
		[1, 5],
	],
	[
		[0, 4],
		[0, 5],
		[1, 4],
		[1, 3],
	],
	[
		[0, 3],
		[0, 4],
		[1, 4],
		[1, 5],
	],
	[
		[0, 4],
		[1, 3],
		[1, 4],
		[1, 5],
	],
];
let bag = [0, 1, 2, 3, 4, 5, 6];
let random = bag[Math.floor(Math.random() * bag.length)];
bag = bag.filter((val) => val !== random);
let nxt = bag[Math.floor(Math.random() * bag.length)];
bag = bag.filter((val) => val !== nxt);
let hld = -1;
if (autoplay) hld = bag[Math.floor(Math.random() * bag.length)];
bag = bag.filter((val) => val !== hld);
let scx = 0;
let act = JSON.parse(JSON.stringify(activePos[random]));
let shape = random;
//   let counterx = 3;
let lclr = 0;
let lv = 0;
let settings = getSettings();
let movClock = new Date().getTime();
let rotClock = new Date().getTime();
let downClock = new Date().getTime();
let upClock = new Date().getTime();
let lcl = [0, 0, 0, 0];
let cur = new Date().getTime();
let ghos = JSON.parse(JSON.stringify(activePos[random]));
let speed = 1500; //smaller is faster, in ms
let lrSpeed = 100; //smaller is faster, in ms
let upSpeed = 250; //smaller is faster, in ms
let rot = 0;

let setInter = (val: any) => {
	inter = val;
	if (!started) {
		autoplay = false;
		dur = 100;
	}
	started = true;
};
// hld = shapess[0]
// random = shapess[1]
// nxt = shapess[2]
let held = false;
let move = false;
let changehold = false;
let ps = false;
let justspawned = true;
let prev = new Date().getTime();
let theme = getColorScheme();

let dur = 20;
let prevWeight = JSON.stringify(getWeights());
function App() {
	const [_, setUpdate] = useState(0);
	theme = getColorScheme();
	let bgcol = "#353535";
	const [linesCleared, setLinesCleared] = useState(0);
	const [level, setLevel] = useState(0);
	const [weights] = useState(getWeights());
  if(weights!==prevWeight){
    prevWeight=JSON.stringify(weights)
    window.localStorage.setItem("weights",JSON.stringify(weights))
  }
	//   const [odds, setOds] = useState(0);
	let [board, setBoard] = useState(
		Array.from({ length: 20 }, (_) =>
			Array.from({ length: 10 }, (_) => ({
				occupied: false,
				active: false,
				color: 0,
			}))
		)
	);
	const [controls, setControls] = useState(false);
	const [gameOver, setGameOver] = useState(false);
	const [restart, setRestart] = useState(new Date().getTime());
	const [score, setScore] = useState(0);
	const [lcRect, setLcRect] = useState([0, 0, 0, 0]);
	const [active, setActive] = useState(
		JSON.parse(JSON.stringify(activePos[0]))
	);
	const [ghost, setGhost] = useState(
		JSON.parse(JSON.stringify(activePos[0]))
	);
	let shapesy = [
		"1111",
		"100 111",
		"001 111",
		"11 11",
		"011 110",
		"110 011",
		"1 111",
		"",
	];
	let [nextShape, setNextShape] = useState(7);
	let [curShape, setCurShape] = useState(7);
	let [holdShape, setHoldShape] = useState(7);
	const [autp, setAutp] = useState(autoplay);
	let timeDiff = (new Date().getTime() - restart) / 1000;
	let sec = Math.floor(timeDiff % 60);
	let min = Math.floor(timeDiff / 60);
	const [paused, setPaused] = useState(false);
	useEffect(() => {
		if (inter == null) {
			setGameOver(false);
			bag = [0, 1, 2, 3, 4, 5, 6];
			random = bag[Math.floor(Math.random() * bag.length)];
			bag = bag.filter((val) => val !== random);
			nxt = bag[Math.floor(Math.random() * bag.length)];
			bag = bag.filter((val) => val !== nxt);
			hld = -1;
			if (autoplay) hld = bag[Math.floor(Math.random() * bag.length)];
			bag = bag.filter((val) => val !== hld);
			scx = 0;
			act = JSON.parse(JSON.stringify(activePos[random]));
			shape = random;
			//   let counterx = 3;
			lclr = 0;
			lv = 0;
			settings = getSettings();
			setLinesCleared(lclr);
			setScore(scx);
			setLevel(lv);
			setActive(act);
			setGhost(act);
			setNextShape(nxt);
			setLcRect([0, 0, 0, 0]);
			setCurShape(random);
			setHoldShape(hld == -1 ? 7 : hld);
			keys = {
				moveLeft: false,
				moveRight: false,
				softDrop: false,
				hardDrop: false,
				rotateCW: false,
				rotateCCW: false,
				holdPiece: false,
				pauseGame: false,
			};
			rot = 0;
			if (!started || true) {
				window.addEventListener("keydown", (e) => {
					settings = getSettings();
					let key = e.key.toUpperCase();
					if (key === " ") {
						key = "␣";
					}
					if (key == settings.pauseGame && started) {
						setControls((prev) => {
							if (!prev) keys.pauseGame = true;
							return prev;
						});
					}
					if (!autoplay) {
						if (key === settings.moveLeft) {
							//setKeys((prev) => ({ ...prev, moveLeft: true }));
							keys.moveLeft = true;
						}
						if (key === settings.moveRight) {
							//setKeys((prev) => ({ ...prev, moveRight: true }));
							keys.moveRight = true;
						}
						if (key === settings.softDrop) {
							//setKeys((prev) => ({ ...prev, softDrop: true }));
							keys.softDrop = true;
						}
						if (key === settings.hardDrop) {
							//setKeys((prev) => ({ ...prev, hardDrop: true }));
							keys.hardDrop = true;
						}
						if (key === settings.rotateCW) {
							//setKeys((prev) => ({ ...prev, rotateCW: true }));
							keys.rotateCW = true;
						}
						if (key === settings.rotateCCW) {
							//   setActive([
							//     [-10, -10],
							//     [-10, -10],
							//     [-10, -10],
							//     [-10, -10],
							//   ]);
							//   clearInterval(inter);
							//   inter = -0;
							//setKeys((prev) => ({ ...prev, rotateCCW: true }));
							// keys.rotateCCW = true;
						}
						if (key === settings.holdPiece) {
							//setKeys((prev) => ({ ...prev, holdPiece: true }));
							keys.holdPiece = true;
						}
					}
				});
				window.addEventListener("keyup", (e) => {
					settings = getSettings();
					let key = e.key.toUpperCase();
					if (key === " ") {
						key = "␣";
					}
					if (key === settings.moveLeft) {
						//setKeys((prev) => ({ ...prev, moveLeft: false }));
						keys.moveLeft = false;
						movClock = new Date().getTime() - lrSpeed;
					}
					if (key === settings.pauseGame && started) {
						setControls((prev) => {
							if (!prev) keys.pauseGame = false;
							return prev;
						});
					}
					if (key === settings.moveRight) {
						//setKeys((prev) => ({ ...prev, moveRight: false }));
						keys.moveRight = false;
						movClock = new Date().getTime() - lrSpeed;
					}
					if (key === settings.softDrop) {
						//setKeys((prev) => ({ ...prev, softDrop: false }));
						keys.softDrop = false;
					}
					if (key === settings.hardDrop) {
						//setKeys((prev) => ({ ...prev, hardDrop: false }));
						keys.hardDrop = false;
					}
					if (key === settings.rotateCW) {
						//setKeys((prev) => ({ ...prev, rotateCW: false }));
						keys.rotateCW = false;
						rotClock = new Date().getTime() - 150;
					}
					if (key === settings.rotateCCW) {
						e.preventDefault();
						//setKeys((prev) => ({ ...prev, rotateCCW: false }));
						keys.rotateCCW = false;
						rotClock = new Date().getTime() - 150;
					}
					if (key === settings.holdPiece) {
						//setKeys((prev) => ({ ...prev, holdPiece: false }));
						keys.holdPiece = false;
					}
					if (key === settings.closeMenu) {
						setControls((prev) => {
							if (!prev) setPaused(false);
							console.log(prev);
							return false;
						});
					}
				});
			}
			held = false;
			function form(x: number) {
				return 1500 * Math.pow(0.76, x) + 2.21 * x;
			}
			movClock = new Date().getTime();
			rotClock = new Date().getTime();
			downClock = new Date().getTime();
			upClock = new Date().getTime();
			lcl = [0, 0, 0, 0];
			cur = new Date().getTime();
			ghos = JSON.parse(JSON.stringify(activePos[random]));
			speed = 1500; //smaller is faster, in ms
			lrSpeed = 100; //smaller is faster, in ms
			upSpeed = 250; //smaller is faster, in ms
			function createNewPiece(
				act: number[][],
				inter: number,
				hldr: boolean = true
			) {
				if (hldr) {
					held = false;
					act.forEach((pos: number[]) => {
						board[pos[0]][pos[1]].occupied = true;
						board[pos[0]][pos[1]].color = shape;
					});
					let lines = 0;
					board.forEach((row, i) => {
						if (row.every((cell) => cell.occupied)) {
							lines++;
							row.forEach((cell) => {
								cell.occupied = false;
							});
							board.splice(i, 1);
							board.unshift(
								Array.from({ length: 10 }, (_) => ({
									occupied: false,
									active: false,
									color: 0,
								}))
							);
							setBoard(JSON.parse(JSON.stringify(board)));
						}
					});
					if (lines > 0) {
						lcl[lines - 1]++;
						setLcRect(lcl);
					}
					lclr += lines;
					scx += [0, 40, 100, 300, 1200][lines] * (lv + 1);
					setScore(scx);
					lv = Math.floor(lclr / 10);
					setLevel(lv);
					speed = lv < 20 ? form(lv) : 50;
					setLinesCleared(lclr);
					setBoard(board);
					// console.log(scx,lclr,shape,nxt);
				}

				let random = nxt;
				nxt = bag[Math.floor(Math.random() * bag.length)];
				bag = bag.filter((val) => val !== nxt);
				if (bag.length === 0) {
					bag = [0, 1, 2, 3, 4, 5, 6];
				}
				for (let i = 0; i < 4; i++) {
					if (
						board[
							JSON.parse(JSON.stringify(activePos[random]))[i][0]
						][JSON.parse(JSON.stringify(activePos[random]))[i][1]]
							.occupied
					) {
						setActive([
							[-10, -10],
							[-10, -10],
							[-10, -10],
							[-10, -10],
						]);
						clearInterval(inter);
						setGameOver(true);
						inter = -0;
						break;
					}
				}
				// setOds(analyze(JSON.parse(JSON.stringify(board))));
				setActive(JSON.parse(JSON.stringify(activePos[random])));
				setNextShape(nxt);
				shape = random;
				setCurShape(shape);
				rot = 0;
				act = JSON.parse(
					JSON.stringify(
						JSON.parse(JSON.stringify(activePos[random]))
					)
				);
				return [act, shape, rot];
				return automatic(
					JSON.parse(JSON.stringify(board)),
					JSON.parse(JSON.stringify(act)),
					JSON.parse(JSON.stringify(shape)),
					0
				);
			}
			move = false;
			changehold = false;
			ps = false;
			justspawned = true;
			prev = new Date().getTime();
			inter = setInterval(async () => {
				cur = new Date().getTime();
				if (justspawned) justspawned = false;
				if (keys.pauseGame) {
					ps = !ps;
					setPaused(ps);
					keys.pauseGame = false;
				}
				if (ps) {
					setPaused((prev) => {
						let controls = false;
						setControls((prev2) => {
							controls = prev2;
							return prev2;
						});
						ps = prev || controls;
						return prev;
					});

					return;
				} else {
					setControls((prev2) => {
						ps = prev2;
						return prev2;
					});
					if (ps) return;
				}
				setAutp((prev) => {
					autoplay = prev;
					return prev;
				});
				if (autoplay && cur - prev < Math.min(dur, speed)) return;
				prev = cur;
				if (
					cur - movClock >= lrSpeed &&
					keys.moveLeft &&
					act[0][1] !== 0 &&
					act[1][1] !== 0 &&
					act[2][1] !== 0 &&
					act[3][1] !== 0 &&
					!board[act[0][0]][act[0][1] - 1].occupied &&
					!board[act[1][0]][act[1][1] - 1].occupied &&
					!board[act[2][0]][act[2][1] - 1].occupied &&
					!board[act[3][0]][act[3][1] - 1].occupied
				) {
					act[0][1]--;
					act[1][1]--;
					act[2][1]--;
					act[3][1]--;
					movClock = new Date().getTime();
				} else if (
					cur - movClock >= lrSpeed &&
					keys.moveRight &&
					act[0][1] !== 9 &&
					act[1][1] !== 9 &&
					act[2][1] !== 9 &&
					act[3][1] !== 9 &&
					!board[act[0][0]][act[0][1] + 1].occupied &&
					!board[act[1][0]][act[1][1] + 1].occupied &&
					!board[act[2][0]][act[2][1] + 1].occupied &&
					!board[act[3][0]][act[3][1] + 1].occupied
				) {
					act[0][1]++;
					act[1][1]++;
					act[2][1]++;
					act[3][1]++;
					movClock = new Date().getTime();
				} else if (
					cur - movClock >= lrSpeed &&
					keys.softDrop &&
					act[0][0] != 19 &&
					act[1][0] != 19 &&
					act[2][0] != 19 &&
					act[3][0] != 19 &&
					!board[act[0][0] + 1][act[0][1]].occupied &&
					!board[act[1][0] + 1][act[1][1]].occupied &&
					!board[act[2][0] + 1][act[2][1]].occupied &&
					!board[act[3][0] + 1][act[3][1]].occupied
				) {
					act[0][0]++;
					act[1][0]++;
					act[2][0]++;
					act[3][0]++;
					movClock = new Date().getTime();
				}
				if (cur - rotClock >= 250 && keys.rotateCW) {
					let temp = JSON.parse(JSON.stringify(act));
					rotClock = cur;
					let prevRot = JSON.parse(JSON.stringify(rot));
					for (let i = 0; i < 5 && prevRot === rot; i++) {
						act = JSON.parse(JSON.stringify(temp));
						switch (shape) {
							case 0:
								switch (i) {
									case 0:
										[act, rot] = rotPiece(
											board,
											shape,
											rot,
											act
										);
										break;
									case 1:
										switch (rot) {
											case 0:
												[act, rot] = rotPiece(
													board,
													shape,
													rot,
													act.map((pos: any) => [
														pos[0],
														pos[1] - 2,
													])
												);
												break;
											case 1:
												[act, rot] = rotPiece(
													board,
													shape,
													rot,
													act.map((pos: any) => [
														pos[0],
														pos[1] - 1,
													])
												);
												break;
											case 2:
												[act, rot] = rotPiece(
													board,
													shape,
													rot,
													act.map((pos: any) => [
														pos[0],
														pos[1] + 2,
													])
												);
												break;
											case 3:
												[act, rot] = rotPiece(
													board,
													shape,
													rot,
													act.map((pos: any) => [
														pos[0],
														pos[1] + 1,
													])
												);
												break;
										}
										break;
									case 2:
										switch (rot) {
											case 3:
												[act, rot] = rotPiece(
													board,
													shape,
													rot,
													act.map((pos: any) => [
														pos[0],
														pos[1] - 2,
													])
												);
												break;
											case 2:
												[act, rot] = rotPiece(
													board,
													shape,
													rot,
													act.map((pos: any) => [
														pos[0],
														pos[1] - 1,
													])
												);
												break;
											case 1:
												[act, rot] = rotPiece(
													board,
													shape,
													rot,
													act.map((pos: any) => [
														pos[0],
														pos[1] + 2,
													])
												);
												break;
											case 0:
												[act, rot] = rotPiece(
													board,
													shape,
													rot,
													act.map((pos: any) => [
														pos[0],
														pos[1] + 1,
													])
												);
												break;
										}
										break;
									case 3:
										switch (rot) {
											case 0:
												[act, rot] = rotPiece(
													board,
													shape,
													rot,
													act.map((pos: any) => [
														pos[0] - 1,
														pos[1] - 2,
													])
												);
												break;
											case 1:
												[act, rot] = rotPiece(
													board,
													shape,
													rot,
													act.map((pos: any) => [
														pos[0] + 2,
														pos[1] - 1,
													])
												);
												break;
											case 2:
												[act, rot] = rotPiece(
													board,
													shape,
													rot,
													act.map((pos: any) => [
														pos[0] + 1,
														pos[1] + 2,
													])
												);
												break;
											case 3:
												[act, rot] = rotPiece(
													board,
													shape,
													rot,
													act.map((pos: any) => [
														pos[0] - 2,
														pos[1] + 1,
													])
												);
												break;
										}
										break;
									case 4:
										switch (rot) {
											case 0:
												[act, rot] = rotPiece(
													board,
													shape,
													rot,
													act.map((pos: any) => [
														pos[0] + 2,
														pos[1] + 1,
													])
												);
												break;
											case 1:
												[act, rot] = rotPiece(
													board,
													shape,
													rot,
													act.map((pos: any) => [
														pos[0] - 1,
														pos[1] + 2,
													])
												);
												break;
											case 2:
												[act, rot] = rotPiece(
													board,
													shape,
													rot,
													act.map((pos: any) => [
														pos[0] - 2,
														pos[1] - 1,
													])
												);
												break;
											case 3:
												[act, rot] = rotPiece(
													board,
													shape,
													rot,
													act.map((pos: any) => [
														pos[0] + 1,
														pos[1] - 2,
													])
												);
												break;
										}
										break;
								}
								break;
							default:
								switch (i) {
									case 0:
										[act, rot] = rotPiece(
											board,
											shape,
											rot,
											act
										);
										break;
									case 1:
										if (rot == 0 || rot == 3) {
											[act, rot] = rotPiece(
												board,
												shape,
												rot,
												act.map((pos: any) => [
													pos[0],
													pos[1] - 1,
												])
											);
										} else {
											[act, rot] = rotPiece(
												board,
												shape,
												rot,
												act.map((pos: any) => [
													pos[0],
													pos[1] + 1,
												])
											);
										}
										break;
									case 2:
										switch (rot) {
											case 0:
												[act, rot] = rotPiece(
													board,
													shape,
													rot,
													act.map((pos: any) => [
														pos[0] + 1,
														pos[1] - 1,
													])
												);
												break;
											case 1:
												[act, rot] = rotPiece(
													board,
													shape,
													rot,
													act.map((pos: any) => [
														pos[0] - 1,
														pos[1] + 1,
													])
												);
												break;
											case 2:
												[act, rot] = rotPiece(
													board,
													shape,
													rot,
													act.map((pos: any) => [
														pos[0] + 1,
														pos[1] + 1,
													])
												);
												break;
											case 3:
												[act, rot] = rotPiece(
													board,
													shape,
													rot,
													act.map((pos: any) => [
														pos[0] - 1,
														pos[1] - 1,
													])
												);
												break;
										}
										break;
									case 3:
										switch (rot) {
											case 0:
											case 2:
												[act, rot] = rotPiece(
													board,
													shape,
													rot,
													act.map((pos: any) => [
														pos[0] - 2,
														pos[1],
													])
												);
												break;
											case 1:
											case 3:
												[act, rot] = rotPiece(
													board,
													shape,
													rot,
													act.map((pos: any) => [
														pos[0] + 2,
														pos[1],
													])
												);
												break;
										}
										break;
									case 4:
										switch (rot) {
											case 0:
												[act, rot] = rotPiece(
													board,
													shape,
													rot,
													act.map((pos: any) => [
														pos[0] - 2,
														pos[1] - 1,
													])
												);
												break;
											case 1:
												[act, rot] = rotPiece(
													board,
													shape,
													rot,
													act.map((pos: any) => [
														pos[0] + 2,
														pos[1] + 1,
													])
												);
												break;
											case 2:
												[act, rot] = rotPiece(
													board,
													shape,
													rot,
													act.map((pos: any) => [
														pos[0] - 2,
														pos[1] + 1,
													])
												);
												break;
											case 3:
												[act, rot] = rotPiece(
													board,
													shape,
													rot,
													act.map((pos: any) => [
														pos[0] + 2,
														pos[1] - 1,
													])
												);
												break;
										}
								}
						}
					}
					if (prevRot === rot) {
						act = JSON.parse(JSON.stringify(temp));
					}
					let wrong = false;
					act.forEach((pos: any) => {
						if (
							pos[0] < 0 ||
							pos[0] > 19 ||
							pos[1] < 0 ||
							pos[1] > 9 ||
							board[pos[0]][pos[1]].occupied
						) {
							wrong = true;
						}
					});
					if (wrong) {
						act = JSON.parse(JSON.stringify(temp));
						rot = prevRot;
					}
				}
				if (cur - rotClock >= 150 && keys.rotateCCW) {
					rotClock = cur;
					[act, rot] = rotPiece(board, shape, rot, act);
					[act, rot] = rotPiece(board, shape, rot, act);
					[act, rot] = rotPiece(board, shape, rot, act);
				}
				if ((cur - rotClock >= 150 && keys.holdPiece) || changehold) {
					if (changehold) {
						changehold = false;
					}
					if (hld === -1) {
						held = true;
						hld = shape;
						[act, shape, rot] = createNewPiece(act, inter, false);
						setHoldShape(hld);
						setActive(JSON.parse(JSON.stringify(act)));
					} else if (!held) {
						held = true;
						let temp = hld;
						hld = shape;
						act = JSON.parse(JSON.stringify(activePos[temp]));
						shape = temp;
						rot = 0;
						setHoldShape(hld);
						setCurShape(shape);
						setActive(JSON.parse(JSON.stringify(act)));
					}
					rotClock = cur;
				}
				if (
					cur - downClock >=
						(autoplay ? Math.min(dur, speed) : speed) &&
					act[0][0] !== 19 &&
					act[1][0] !== 19 &&
					act[2][0] !== 19 &&
					act[3][0] !== 19 &&
					!board[act[0][0] + 1][act[0][1]].occupied &&
					!board[act[1][0] + 1][act[1][1]].occupied &&
					!board[act[2][0] + 1][act[2][1]].occupied &&
					!board[act[3][0] + 1][act[3][1]].occupied
				) {
					act[0][0]++;
					act[1][0]++;
					act[2][0]++;
					act[3][0]++;
					downClock = new Date().getTime();
				} else if (
					cur - downClock >=
						(autoplay ? Math.min(dur, speed) : speed) &&
					cur - downClock >= (autoplay ? Math.min(dur, 1000) : 1000)
				) {
					[act, shape, rot] = createNewPiece(act, inter);
					move = false;
					justspawned = true;
					downClock = new Date().getTime();
				}

				if (
					(cur - upClock >= upSpeed && keys.hardDrop) ||
					(move && dur === 0)
				) {
					let mainboard = document.getElementById("mainboard");
					if (mainboard) {
						mainboard.style.marginBottom = "-1.25vmin";
						setTimeout(() => {
							mainboard.style.marginBottom = "0";
						}, 100);
					}
					move = false;
					while (
						act[0][0] !== 19 &&
						act[1][0] !== 19 &&
						act[2][0] !== 19 &&
						act[3][0] !== 19 &&
						!board[act[0][0] + 1][act[0][1]].occupied &&
						!board[act[1][0] + 1][act[1][1]].occupied &&
						!board[act[2][0] + 1][act[2][1]].occupied &&
						!board[act[3][0] + 1][act[3][1]].occupied
					) {
						act[0][0]++;
						act[1][0]++;
						act[2][0]++;
						act[3][0]++;
					}
					[act, shape, rot] = createNewPiece(act, inter);
					justspawned = true;
					upClock = new Date().getTime();
					downClock = new Date().getTime();
				}
				if (justspawned && dur == 0) justspawned = false;
				if (!move && autoplay) {
					let sc1, sc2, act2;
					let prev = JSON.parse(JSON.stringify(act));
					let prevRot = JSON.parse(JSON.stringify(rot));
					[act, shape, rot, sc1] = automatic(
						JSON.parse(JSON.stringify(board)),
						JSON.parse(JSON.stringify(act)),
						JSON.parse(JSON.stringify(shape)),
						rot
					);
					if (hld === -1) {
						held = true;
						hld = shape;
						[act, shape, rot] = createNewPiece(act, inter, false);
						setHoldShape(hld);
						setActive(JSON.parse(JSON.stringify(act)));
					}
					[act2, , , sc2] = automatic(
						JSON.parse(JSON.stringify(board)),
						JSON.parse(JSON.stringify(activePos[hld])),
						JSON.parse(JSON.stringify(hld)),
						0
					);
					if (sc2 > sc1 && !justspawned) {
						let temp = hld;
						hld = shape;
						act = JSON.parse(JSON.stringify(act2));
						shape = temp;
						rot = 0;
						setHoldShape(hld);
						setCurShape(shape);
						setActive(JSON.parse(JSON.stringify(act)));
						move = true;
					} else if (sc2 > sc1) {
						let temp = hld;
						hld = shape;
						act = JSON.parse(JSON.stringify(activePos[temp]));
						shape = temp;
						rot = 0;
						setHoldShape(hld);
						setCurShape(shape);
						setActive(JSON.parse(JSON.stringify(act)));
					} else if (justspawned) {
						act = JSON.parse(JSON.stringify(prev));
						rot = JSON.parse(JSON.stringify(prevRot));
					} else {
						move = true;
					}
				}

				setActive(() => [...act]);
				ghos = JSON.parse(JSON.stringify(act));
				while (
					ghos[0][0] !== 19 &&
					ghos[1][0] !== 19 &&
					ghos[2][0] !== 19 &&
					ghos[3][0] !== 19 &&
					!board[ghos[0][0] + 1][ghos[0][1]].occupied &&
					!board[ghos[1][0] + 1][ghos[1][1]].occupied &&
					!board[ghos[2][0] + 1][ghos[2][1]].occupied &&
					!board[ghos[3][0] + 1][ghos[3][1]].occupied
				) {
					ghos[0][0]++;
					ghos[1][0]++;
					ghos[2][0]++;
					ghos[3][0]++;
				}
				// let tempBoard = JSON.parse(JSON.stringify(board));
				// ghos.forEach((pos: any) => {
				// 	tempBoard[pos[0]][pos[1]].occupied = true;
				// });
				// setOds(analyze(tempBoard));
				setGhost(() => JSON.parse(JSON.stringify(ghos)));
			}, 0);
		}
	}, [restart]);
	useEffect(() => {
		if (controls && started) setPaused(true);
	}, [controls]);
	return (
		<>
			<div
				className="fixed mts gap-[2vmin] w-full h-full flex items-center justify-center "
				style={{
					color: theme.text,
					backgroundColor: theme.background,
				}}>
				<div
					className="h-full w-[18vmin] duration-300 flex flex-col justify-center items-center  "
					style={{
						opacity: started ? 1 : 0,
					}}>
					<div className="h-full w-full flex flex-col items-center justify-center ">
						<div
							onClick={() => {
								setControls(!controls);
							}}
							className="h-[4vmin] cursor-pointer select-none gap-[0.5vmin] -mt-[8vmin] mb-[4vmin] flex items-center justify-center">
							<div className="h-[2vmin] flex items-center justify-center w-[2vmin]">
              {svg.settings}
              </div>
							<label className="">
								Settings
							</label>{" "}
						</div>
						<div
							className="w-full aspect-square border  rounded-[2vmin] flex flex-col items-center justify-evenly "
							style={{
								borderColor: theme.text,
							}}>
							<div className="w-full flex flex-col h-2/3 items-center justify-center">
								{shapesy[holdShape].split(" ").map((row) => {
									return (
										<div className="w-full h-[4vmin] flex justify-center ">
											{row.split("").map((cell) =>
												cell !== "0" ? (
													<div
														className="w-[4vmin] aspect-square rounded-[0.4vmin] border"
														style={{
															backgroundColor:
																theme.accents[
																	holdShape
																],
															borderColor:
																theme.background,
														}}></div>
												) : (
													<div className="w-[4vmin] aspect-square "></div>
												)
											)}
										</div>
									);
								})}
							</div>
							Hold
						</div>
					</div>
					<div className="h-full w-full flex flex-col items-center justify-center ">
						<div className="text-[2vmin]">
							Speed Lv. {level + 1}
						</div>
						{/* <div>
							Score :{(odds).toFixed(2)}
						</div> */}
						<div className="w-full text-[3vmin] mt-[2vmin] flex flex-col items-center justify-center aspect-square">
							<svg
								className="w-[18vmin] h-[18vmin] absolute"
								viewBox="0 0 200 200"
								xmlns="http://www.w3.org/2000/svg"
								style={{
									transform: "rotate(-90deg)",
								}}>
								<circle
									r={95}
									cx={100}
									cy={100}
									fill="transparent"
									stroke={theme.backpop}
									strokeWidth="10px"
									strokeDasharray="596.68px"
									strokeDashoffset={0}
								/>
								<circle
									r={95}
									cx={100}
									cy={100}
									className="duration-100 ease-in-out"
									stroke={theme.accents[4]}
									strokeWidth={10}
									strokeLinecap="round"
									strokeDashoffset={
										(596.68 *
											(10 -
												(linesCleared +
													10 *
														Math.floor(
															linesCleared / 10
														)))) /
										10
									}
									fill="transparent"
									strokeDasharray="596.68px"
								/>
							</svg>
							<div className="w-fit h-fit flex flex-col items-center justify-center">
								<div>{linesCleared}</div>
								<div className="w-full h-[1px] bg-white"></div>
								<div>{(level + 1) * 10}</div>
							</div>
						</div>
						{/* <label>Lines</label> */}
					</div>
				</div>
				<div className="w-[45vmin] h-[90vmin] flex items-center justify-center">
					<svg
						id="mainboard"
						xmlns="http://www.w3.org/2000/svg"
						className=" w-full h-full tms duration-200  mb-0 "
						viewBox="0 0 1055 2110"
						fill="none">
						{board.map((row, i) =>
							row.map((cell, j) => (
								<rect
									width={100}
									className="duration-100 ease-in-out"
									height={100}
									rx={10}
									x={5 + j * 105}
									y={5 + i * 105}
									fill={
										cell.active
											? act
											: cell.occupied
											? theme.accents[cell.color]
											: theme.backpop
									}
									key={`${i}-${j}`}
								/>
							))
						)}
						{ghost.map((pos: any, ind: any) => (
							<rect
								className="duration-[15ms] opacity- 0 brightness-75 "
								// style={{
								// 	transitionDuration: autoplay
								// 		? dur / 4 + "ms"
								// 		: "25ms",
								// }}
								width={100}
								height={100}
								rx={10}
								x={5 + pos[1] * 105}
								y={5 + pos[0] * 105}
								fill={
									theme.accents[
										autoplay ? curShape : curShape
									]
								}
								key={"ghos" + ind + "" + curShape}
							/>
						))}
						{active.map((pos: any, ind: any) => (
							<rect
								className="duration-[15ms] "
								// style={{
								// 	transitionDuration: autoplay
								// 		? dur / 4 + "ms"
								// 		: "25ms",
								// }}
								width={100}
								height={100}
								rx={10}
								x={5 + pos[1] * 105}
								y={5 + pos[0] * 105}
								fill={theme.accents[curShape]}
								key={"act" + ind + "" + curShape}
							/>
						))}
					</svg>
					<div className="w-[48vmin] mt-[-5vmin] absolute h-[20vmin]">
						<div
							className="w-full bg-black h-full top-0 left-0 fixed flex items-center duration-200 justify-center "
							style={{
								pointerEvents:
									paused || gameOver || controls
										? "all"
										: "none",
								backgroundColor:
									"#000000" +
									(paused || gameOver || controls
										? "6B"
										: "00"),
							}}
							id="dismiss"
							onClick={() => {
								
									if (paused) setPaused(false);
									else if (controls) setControls(false);
								
							}}
						/>
						<PauseScreen
							props={{
								show:
									(paused || gameOver) &&
									!controls &&
									started,
								gameOver,
								setPaused,
								setGameOver,
								setBoard,
								inter,
								setInter,
								bgcol,
								setRestart,
								theme,
							}}
						/>

						<StartScreen
							props={{
								show:
									inter !== null &&
									!started &&
									!controls &&
									!false,
								setBoard,
								inter,
								setInter,
								setRestart,
								setPaused,
								setGameOver,
								setAutp,
								theme,
							}}
						/>
						<SettingsScreen
							props={{
								show: controls || !true,
								theme,
								setUpdate,
							}}
						/>
					</div>
				</div>
				<div
					className="h-full w-[18vmin]  flex flex-col duration-300 justify-center items-center  "
					style={{
						opacity: started ? 1 : 0,
					}}>
					<div className="h-full w-full flex flex-col items-center justify-center ">
						<div
							className="w-full aspect-square border border-bcol rounded-[2vmin] flex flex-col items-center justify-evenly"
							style={{
								borderColor: theme.text,
							}}>
							<div className="w-full flex flex-col h-2/3 items-center justify-center">
								{shapesy[nextShape].split(" ").map((row) => {
									return (
										<div className="w-full h-[4vmin] flex justify-center ">
											{row.split("").map((cell) =>
												cell !== "0" ? (
													<div
														className="w-[4vmin] aspect-square rounded-[0.4vmin] border"
														style={{
															backgroundColor:
																theme.accents[
																	nextShape
																],
															borderColor:
																theme.background,
														}}></div>
												) : (
													<div className="w-[4vmin] aspect-square "></div>
												)
											)}
										</div>
									);
								})}
							</div>
							<label className="">Next</label>
						</div>
					</div>
					<div className="h-full w-full flex flex-col items-center justify-center ">
						<div
							className="text-[2vmin] duration-200 "
							style={{
								marginTop:
									!autp || !started ? "0" : "-17.25vmin",
							}}>
							Autoplay
						</div>
						<div
							className="bg-post mb-[2vmin] h-[3vmin] duration-200 rounded-full  p-[0.25vmin] border aspect-video"
							style={{
								backgroundColor:
									autp && started
										? theme.accents[4] + "22"
										: theme.accents[5] + "22",
								borderColor:
									autp && started
										? theme.accents[4] + "35"
										: theme.accents[5] + "35",
							}}
							onClick={() => {
								setAutp(!autp);
							}}>
							<div
								className="h-full pointer-events-none aspect-square bg-bcol rounded-full duration-200"
								style={{
									marginLeft: autp && started ? "50%" : "0",
									backgroundColor:
										autp && started
											? theme.accents[4]
											: theme.accents[5],
								}}></div>
						</div>
						<div
							className="text-[1.5vmin] lexend mb-[0.75vmin] duration-200 h-0 w-[20vmin] flex flex-col"
							style={{
								height: autp && started ? "12.25vmin" : "0vmin",
								overflow: "hidden",
								opacity: autp && started ? "1" : "0",
							}}>
							<div className="text-[2vmin] mts w-full text-center">
								Weights
							</div>
							<div className="w-full flex justify-between px-[0.25vmin] gap-[1.5vmin]">
								<div className="w-[8.5vmin]  gap-[0.5vmin] justify-between flex ">
									<div className="w-[4vmin]">WB</div>{" "}
									<div>:</div>
									<input
										type="number"
										step="0.01"
										className="bg-black w-[4vmin] bg-opacity-0 text-center "
										defaultValue={weights.weightedBlocks}
										onChange={(e) => {
											weights.weightedBlocks = parseFloat(
												e.target.value
											);
										}}
									/>
								</div>
								<div className="w-[8.5vmin]  gap-[0.5vmin] justify-between flex ">
									<div className="w-[4vmin]">CH</div>{" "}
									<div>:</div>
									<input
										type="number"
										step="0.01"
										className="bg-black w-[4vmin] bg-opacity-0 text-center "
										defaultValue={weights.connectedHoles}
										onChange={(e) => {
											weights.connectedHoles = parseFloat(
												e.target.value
											);
										}}
									/>
								</div>
							</div>

							<div className="w-full flex justify-between px-[0.25vmin] gap-[1.5vmin]">
								<div className="w-[8.5vmin]  gap-[0.5vmin] justify-between flex ">
									<div className="w-[4vmin]">RH</div>{" "}
									<div>:</div>
									<input
										type="number"
										step="0.01"
										className="bg-black w-[4vmin] bg-opacity-0 text-center "
										defaultValue={weights.roughness}
										onChange={(e) => {
											weights.roughness = parseFloat(
												e.target.value
											);
										}}
									/>
								</div>
								<div className="w-[8.5vmin]  gap-[0.5vmin] justify-between flex ">
									<div className="w-[4vmin]">PHP</div>{" "}
									<div>:</div>
									<input
										type="number"
										step="0.01"
										className="bg-black w-[4vmin] bg-opacity-0 text-center "
										defaultValue={weights.pitholePercentage}
										onChange={(e) => {
											weights.pitholePercentage =
												parseFloat(e.target.value);
										}}
									/>
								</div>
							</div>

							<div className="w-full flex justify-between px-[0.25vmin] gap-[1.5vmin]">
								<div className="w-[8.5vmin]  gap-[0.5vmin] justify-between flex ">
									<div className="w-[4vmin]">CL</div>{" "}
									<div>:</div>
									<input
										type="number"
										step="0.01"
										className="bg-black w-[4vmin] bg-opacity-0 text-center "
										defaultValue={weights.clearAbleLines}
										onChange={(e) => {
											weights.clearAbleLines = parseFloat(
												e.target.value
											);
										}}
									/>
								</div>
								<div className="w-[8.5vmin]  gap-[0.5vmin] justify-between flex ">
									<div className="w-[4vmin]">DH</div>{" "}
									<div>:</div>
									<input
										type="number"
										step="0.01"
										className="bg-black w-[4vmin] bg-opacity-0 text-center "
										defaultValue={weights.deepestHole}
										onChange={(e) => {
											weights.deepestHole = parseFloat(
												e.target.value
											);
										}}
									/>
								</div>
							</div>

							<div className="w-full flex justify-between px-[0.25vmin] gap-[1.5vmin]">
								<div className="w-[8.5vmin]  gap-[0.5vmin] justify-between flex ">
									<div className="w-[4vmin]">BLK</div>{" "}
									<div>:</div>
									<input
										type="number"
										step="0.01"
										className="bg-black w-[4vmin] bg-opacity-0 text-center "
										defaultValue={weights.blocks}
										onChange={(e) => {
											weights.blocks = parseFloat(
												e.target.value
											);
										}}
									/>
								</div>
								<div className="w-[8.5vmin]  gap-[0.5vmin] justify-between flex ">
									<div className="w-[4vmin]">CLH</div>{" "}
									<div>:</div>
									<input
										type="number"
										step="0.01"
										className="bg-black w-[4vmin] bg-opacity-0 text-center "
										defaultValue={weights.colHoles}
										onChange={(e) => {
											weights.colHoles = parseFloat(
												e.target.value
											);
										}}
									/>
								</div>
							</div>
						</div>
						<div
							className="flex text-[2vmin] mts gap-[0.25vmin] duration-200 flex-col mb-[2vmin] items-center justify-center"
							style={{
								height: autp && started ? "5vmin" : "0vmin",
								overflow: "hidden",
								opacity: autp && started ? "1" : "0",
							}}>
							Speed
							<input
								type="range"
								defaultValue={100 - dur / 10}
								min={0}
								max={100}
								onChange={(e) => {
									dur =
										(100 - parseFloat(e.target.value)) * 10;
								}}
							/>
						</div>

						<div className="text-[2vmin]">Time</div>
						<div className="text-[2vmin] mb-[2vmin]">
							{(min < 10 ? "0" : "") +
								min +
								":" +
								(sec < 10 ? "0" : "") +
								sec}
						</div>
						<div className="text-[2vmin]">Score</div>
						<div className="text-[2vmin]">
							{score.toLocaleString()}
						</div>
						<div className="w-full mt-[4vmin] overflow-hidden rounded-full flex h-[1.5vmin]">
							{lcRect.map((val, i) => (
								<div
									className="w-full min-w-fit duration-75 text-[1.5vmin]  text h-full flex items-center justify-center bg-white bg-opacity-50"
									style={{
										width:
											((val * (i + 1)) / linesCleared) *
												100 +
											"%",
										backgroundColor: theme.accents[i],
										paddingInline: val > 0 ? "0.5vmin" : "",
                    
									}}>
									<div style={{color:theme.background}}>{val > 0 ? val : ""}</div>
									<div
										className=" absolute  rotate-90"
										style={{
											marginTop:
												i % 2 == 0
													? i == 0
														? "-3vmin"
														: "-3vmin"
													: "",
											marginBottom:
												i % 2 == 1
													? i == 1
														? "-3vmin"
														: "-3vmin"
													: "",
										}}>
										{val > 0 ? "-" : ""}
									</div>
									<div
										className=" absolute "
										style={{
											marginTop:
												i % 2 == 0
													? i == 0
														? "-6vmin"
														: "-6vmin"
													: "",
											marginBottom:
												i % 2 == 1
													? i == 1
														? "-6vmin"
														: "-6vmin"
													: "",
										}}>
										{val > 0
											? [
													"Single",
													"Double",
													"Triple",
													"Tetris",
											  ][i]
											: ""}
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default App;
