import { useAtom } from "jotai";
import {
	activePieceAtom,
	autoplayAtom,
	autoplaySpeedAtom,
	bagRandAtom,
	boardAtom,
	currentShapeAtom,
	garbageLinesAtom,
	ghostPieceAtom,
	holdShapeAtom,
	initAtom,
	intervalAtom,
	levelAtom,
	lineDissapearAtom,
	linesAtom,
	lineStackAtom,
	moveDownAtom,
	nextShapeAtom,
	pageAtom,
	scoreAtom,
	settingsAtom,
	speedAtom,
	stateAtom,
	themeAtom,
	timeAtom,
	timerAtom,
	userAtom,
} from "../atoms";
import { useEffect } from "react";
import { activePos, initSettings, socket } from "../constants";
import { automatic, rotPiece } from "../Functionality/helper";
import Rect from "./Rect";
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
function form(x: number) {
	// let speed=960
	return 960 * Math.pow(Math.E, -0.2 * x);
	// switch (x) {
	// 	case 0:
	// 		speed=960
	// 		break;
	// 	case 1:
	// 		speed = 860;
	// 		break;
	// 	case 2:
	// 		speed= 760
	// 		break;
	// 	case 3:
	// 		speed = 660;
	// 		break;
	// 	case 4:
	// 		speed = 560;
	// 		break;
	// 	case 5:
	// 		speed = 460;
	// 		break;
	// 	case 6:
	// 		speed = 360;
	// 		break;
	// 	case 7:
	// 		speed = 260;
	// 		break;
	// 	case 8:
	// 		speed = 160;
	// 		break;
	// 	case 9:
	// 		speed = 120;
	// 		break;
	// 	default:
	// 		if(x<13)
	// 		speed = 100;
	// 		else if(x<16)
	// 		speed = 80;
	// 		else if(x<19)
	// 		speed = 60;
	// 		else if(x<29)
	// 		speed = 40;
	// 		else
	// 		speed = 20;
	// 		break;

	// }
	// return speed
	// return 1500 * Math.pow(0.76, x) + 2.21 * x;
}
let initTime = new Date().getTime();
let ticker = {
	rotate: 150,
	softDrop: 100,
	moveLRSpeed: 100,
	hardDrop: 333,
	hold: 150,
};
let prevTickTime = {
	rotate: initTime,
	softDrop: initTime,
	moveLeft: initTime,
	moveRight: initTime,
	hardDrop: initTime,
	gravity: initTime,
	hold: initTime,
};
let ths: any = {};
function getThs() {
	return ths;
}
let speed = 960;
let settings = initSettings;
let intervals: any = {
	rotate: null,
	softDrop: null,
	moveLeft: null,
	moveRight: null,
	hardDrop: null,
	gravity: null,
};
let moveFunctions = {
	moveLeft: () => {
		if (
			!keys.moveRight &&
			ths.active[0][1] !== 0 &&
			ths.active[1][1] !== 0 &&
			ths.active[2][1] !== 0 &&
			ths.active[3][1] !== 0 &&
			!ths.board[ths.active[0][0]][ths.active[0][1] - 1].occupied &&
			!ths.board[ths.active[1][0]][ths.active[1][1] - 1].occupied &&
			!ths.board[ths.active[2][0]][ths.active[2][1] - 1].occupied &&
			!ths.board[ths.active[3][0]][ths.active[3][1] - 1].occupied &&
			ths.state === "play" &&
			!ths.npc
		) {
			ths.active[0][1]--;
			ths.active[1][1]--;
			ths.active[2][1]--;
			ths.active[3][1]--;
			prevTickTime.moveLeft = new Date().getTime();
		}
	},
	moveRight: () => {
		if (
			!keys.moveLeft &&
			ths.active[0][1] !== 9 &&
			ths.active[1][1] !== 9 &&
			ths.active[2][1] !== 9 &&
			ths.active[3][1] !== 9 &&
			!ths.board[ths.active[0][0]][ths.active[0][1] + 1].occupied &&
			!ths.board[ths.active[1][0]][ths.active[1][1] + 1].occupied &&
			!ths.board[ths.active[2][0]][ths.active[2][1] + 1].occupied &&
			!ths.board[ths.active[3][0]][ths.active[3][1] + 1].occupied &&
			ths.state === "play" &&
			!ths.npc
		) {
			ths.active[0][1]++;
			ths.active[1][1]++;
			ths.active[2][1]++;
			ths.active[3][1]++;
			prevTickTime.moveRight = new Date().getTime();
		}
	},
	softDrop: () => {
		if (
			ths.active[0][0] != 19 &&
			ths.active[1][0] != 19 &&
			ths.active[2][0] != 19 &&
			ths.active[3][0] != 19 &&
			!ths.board[ths.active[0][0] + 1][ths.active[0][1]].occupied &&
			!ths.board[ths.active[1][0] + 1][ths.active[1][1]].occupied &&
			!ths.board[ths.active[2][0] + 1][ths.active[2][1]].occupied &&
			!ths.board[ths.active[3][0] + 1][ths.active[3][1]].occupied &&
			ths.state === "play" &&
			!ths.npc
		) {
			ths.active[0][0]++;
			ths.active[1][0]++;
			ths.active[2][0]++;
			ths.active[3][0]++;
			prevTickTime.softDrop = new Date().getTime();
			prevTickTime.gravity = new Date().getTime();
		}
	},
	hardDrop: () => {
		if (ths.state === "play" && !ths.npc) {
			while (
				ths.active[0][0] !== 19 &&
				ths.active[1][0] !== 19 &&
				ths.active[2][0] !== 19 &&
				ths.active[3][0] !== 19 &&
				!ths.board[ths.active[0][0] + 1][ths.active[0][1]].occupied &&
				!ths.board[ths.active[1][0] + 1][ths.active[1][1]].occupied &&
				!ths.board[ths.active[2][0] + 1][ths.active[2][1]].occupied &&
				!ths.board[ths.active[3][0] + 1][ths.active[3][1]].occupied
			) {
				ths.active[0][0]++;
				ths.active[1][0]++;
				ths.active[2][0]++;
				ths.active[3][0]++;
			}
			prevTickTime.hardDrop = new Date().getTime();
			prevTickTime.gravity = -100;
		}
	},
	rotateCW: () => {},
	hold:()=>{},
};
window.addEventListener("keydown", (e) => {
	settings = getThs().settings;
	let key = e.key.toUpperCase();
	if (key === " ") {
		key = "␣";
	}

	if (!ths.autoplay) {
		if (key === settings.moveLeft) {
			keys.moveLeft = true;
			if (!intervals.moveLeft)
				intervals.moveLeft = setInterval(() => {
					if (
						new Date().getTime() - prevTickTime.moveLeft >=
						ticker.moveLRSpeed
					)
						moveFunctions.moveLeft();
				}, 0);
		}
		if (key === settings.moveRight) {
			keys.moveRight = true;
			if (!intervals.moveRight)
				intervals.moveRight = setInterval(() => {
					if (
						new Date().getTime() - prevTickTime.moveRight >=
						ticker.moveLRSpeed
					)
						moveFunctions.moveRight();
				}, 0);
		}
		if (key === settings.softDrop) {
			keys.softDrop = true;
			if (!intervals.softDrop)
				intervals.softDrop = setInterval(() => {
					if (
						new Date().getTime() - prevTickTime.softDrop >=
						ticker.softDrop
					)
						moveFunctions.softDrop();
				}, 0);
		}
		if (key === settings.hardDrop) {
			if (!intervals.hardDrop)
				intervals.hardDrop = setInterval(() => {
					if (
						new Date().getTime() - prevTickTime.hardDrop >=
						ticker.hardDrop
					)
						moveFunctions.hardDrop();
				}, 0);
		}
		if (key === settings.rotateCW) {
			if (!intervals.rotateCW)
				intervals.rotateCW = setInterval(() => {
					if (
						new Date().getTime() - prevTickTime.rotate >=
						ticker.rotate
					)
						moveFunctions.rotateCW();
				}, 0);
		}
		if (key === settings.rotateCCW) {
		}
		if (key === settings.holdPiece) {
			moveFunctions.hold();
		}
	}
});
window.addEventListener("keyup", (e) => {
	settings = getThs().settings;
	let key = e.key.toUpperCase();
	if (key === " ") {
		key = "␣";
	}

	if (key === settings.pauseGame && ths.state === "pause") {
		ths.setState("play");
	} else if (
		key == settings.pauseGame &&
		ths.state === "play" &&
		ths.page == "single"
	) {
		ths.setState("pause");
	} else if (key === settings.closeMenu) {
		if (ths.state === "game over") return;
		if (ths.state == "settings" && ths.page == "single")
			ths.setState("pause");
		else ths.setState("play");
	}
	if (key === settings.moveLeft) {
		intervals.moveLeft && clearInterval(intervals.moveLeft);
		intervals.moveLeft = null;
		keys.moveLeft = false;
		prevTickTime.moveLeft -= ticker.moveLRSpeed;
	}
	if (key === settings.moveRight) {
		intervals.moveRight && clearInterval(intervals.moveRight);
		intervals.moveRight = null;
		keys.moveRight = false;
		prevTickTime.moveRight -= ticker.moveLRSpeed;
	}
	if (key === settings.softDrop) {
		intervals.softDrop && clearInterval(intervals.softDrop);
		intervals.softDrop = null;
		keys.softDrop = false;
		prevTickTime.softDrop -= ticker.softDrop;
	}
	if (key === settings.hardDrop) {
		intervals.hardDrop && clearInterval(intervals.hardDrop);
		intervals.hardDrop = null;
		prevTickTime.hardDrop -= ticker.hardDrop;
	}
	if (key === settings.rotateCW) {
		intervals.rotateCW && clearInterval(intervals.rotateCW);
		intervals.rotateCW = null;
		prevTickTime.rotate -= ticker.rotate;
	}
	if (key === settings.rotateCCW) {
		e.preventDefault();
		keys.rotateCCW = false;
	}
	// if (key === settings.holdPiece) {
	// 	keys.holdPiece = false;
	// }
});
let inter: any = null;
let lineBar = 10;
function MainBoard() {
	const [, setLineStack] = useAtom(lineStackAtom);
	const [, setHoldShape] = useAtom(holdShapeAtom);
	const [, setNextShape] = useAtom(nextShapeAtom);
	const [, setTime] = useAtom(timeAtom);
	const [, bagRand] = useAtom(bagRandAtom);
	const [, init] = useAtom(initAtom);
	const [, setSpeed] = useAtom(speedAtom);
	const[settings]= useAtom(settingsAtom)
	const [board, setBoard] = useAtom(boardAtom);
	const [active, setActive] = useAtom(activePieceAtom);
	const [ghost, setGhost] = useAtom(ghostPieceAtom);
	const [theme] = useAtom(themeAtom);
	const [autoplay] = useAtom(autoplayAtom);
	const [interval, stInterval] = useAtom(intervalAtom);
	const [autoplaySpeed] = useAtom(autoplaySpeedAtom);
	const [currentShape, setCurrentShape] = useAtom(currentShapeAtom);
	const [garbageLines, setGarbageLines] = useAtom(garbageLinesAtom);
	const [score, setScore] = useAtom(scoreAtom);
	const [state, setState] = useAtom(stateAtom);
	const [lines, setLines] = useAtom(linesAtom);
	const [page] = useAtom(pageAtom);
	const [level, setLevel] = useAtom(levelAtom);
	const [lineDissapear, setLineDissapear] = useAtom(lineDissapearAtom);
	const [moveDown, setMoveDown] = useAtom(moveDownAtom);
	const [user] = useAtom(userAtom);
	const [timer] = useAtom(timerAtom);
	useEffect(()=>{
		ths.autoplay=autoplay
		ths.state=state
		ths.autoplaySpeed = autoplaySpeed
		ths.page= page
		ths.settings=settings
	},[
		autoplay,state, autoplaySpeed,page,settings
	])
	function startMainGameLoop() {
		moveFunctions.rotateCW = () => {
			if (ths.state === "play" && !ths.npc) {
				[ths.active, ths.rot] = rotPiece(
					ths.board,
					ths.currentShape,
					ths.rot,
					ths.active
				);
				setActive(JSON.parse(JSON.stringify(ths.active)));
				prevTickTime.rotate = new Date().getTime();
			}
		};
		moveFunctions.hold=()=>{
			if (ths.holdShape == 7) {
				ths.holdShape = JSON.parse(
					JSON.stringify(ths.currentShape)
				);
				setHoldShape(ths.currentShape);
				createNewPiece(false);
			} else if (!held) {
				held = true;
				let temp = JSON.parse(JSON.stringify(ths.holdShape));
				ths.holdShape = JSON.parse(
					JSON.stringify(ths.currentShape)
				);
				ths.currentShape = temp;
				ths.rot = 0;
				ths.active = JSON.parse(
					JSON.stringify(activePos[ths.currentShape])
				);
				setHoldShape(ths.holdShape);
				setCurrentShape(ths.currentShape);
				setActive(JSON.parse(JSON.stringify(ths.active)));
			}

			held = true;
		}
		let x = init();
		let held = false;
		ths.npc = false;
		ths.board = JSON.parse(JSON.stringify(board));
		ths.active = JSON.parse(JSON.stringify(activePos[x[0]]));
		ths.state = state;
		ths.garbageLines = [0, Math.floor(Math.random() * 10)];
		setGarbageLines({
			type: "set",
			value: ths.garbageLines,
		});
		speed = 960;
		setSpeed(speed);
		ths.setState = setState;
		setActive(activePos[x[0]]);
		ths.lineDissapear = [];
		ths.moveDown = Array(20).fill(0);
		ths.ghost = JSON.parse(JSON.stringify(ghost));
		ths.autoplay = JSON.parse(JSON.stringify(autoplay));
		ths.autoplaySpeed = JSON.parse(JSON.stringify(autoplaySpeed));
		ths.holdShape = JSON.parse(JSON.stringify(x[2]));
		ths.currentShape = JSON.parse(JSON.stringify(x[0]));
		ths.nextShape = JSON.parse(JSON.stringify(x[1]));
		ths.page = page;
		ths.score = JSON.parse(JSON.stringify(score));
		ths.rot = JSON.parse(JSON.stringify(0));
		ths.lines = JSON.parse(JSON.stringify(lines));
		ths.level = JSON.parse(JSON.stringify(level));
		let scrf = document.getElementById("scrf");
		if (scrf) scrf.style.opacity = "0";
		ths.lineStack = [0, 0, 0, 0];
		async function createNewPiece(hldr: boolean = true) {
			let line = 0;
			ths.npc = true;
			if (hldr) {
				setActive([
					[-10, -10],
					[-10, -10],
					[-10, -10],
					[-10, -10],
				]);
				setCurrentShape(7);
				setGhost([
					[-10, -10],
					[-10, -10],
					[-10, -10],
					[-10, -10],
				]);
				held = false;
				ths.active.forEach((pos: number[]) => {
					ths.board[pos[0]][pos[1]].occupied = true;
					ths.board[pos[0]][pos[1]].color = ths.currentShape;
				});

				ths.lineDissapear = [];
				ths.moveDown = Array(20).fill(0);
				ths.board.forEach((row: any, i: number) => {
					if (row.every((cell: any) => cell.occupied)) {
						ths.lineDissapear.push(i);
						for (let j = 0; j < i; j++) {
							ths.moveDown[j]++;
						}
						line++;
					}
				});
				setLineDissapear(ths.lineDissapear);
				setMoveDown(ths.moveDown);
				if (user.room !== "")
					socket.emit("roomCom", {
						room: user.room,
						board: JSON.parse(JSON.stringify(ths.board)),
						active: JSON.parse(JSON.stringify(ths.active)),
						currentShape: JSON.parse(
							JSON.stringify(ths.currentShape)
						),
						nextShape: JSON.parse(JSON.stringify(ths.nextShape)),
						holdShape: JSON.parse(JSON.stringify(ths.holdShape)),
						score: ths.score,
						lines: ths.lines,
						level: ths.level,
						lineDissapear: ths.lineDissapear,
						moveDown: ths.moveDown,
						speed: speed,
						npc: ths.npc,
					});
				if (line > 0) {
					ths.lineStack[line - 1]++;
					setLineStack(ths.lineStack);
				}
				// lclr += lines;
				ths.score += [0, 40, 100, 300, 1200][line] * (ths.level + 1);
				setScore(ths.score);
				ths.lines += line;
				setLines(ths.lines);
				ths.level = Math.min(Math.floor(ths.lines / lineBar), 29);
				setLevel(ths.level);
				if (line > 0 && !(ths.autoplay && ths.page == "single"))
					await new Promise((resolve) =>
						setTimeout(resolve, Math.max(150, speed / 2))
					);
				ths.board.forEach((row: any, i: number) => {
					if (row.every((cell: any) => cell.occupied)) {
						row.forEach((cell: any) => {
							cell.occupied = false;
						});
						ths.board.splice(i, 1);
						ths.board.unshift(
							Array.from({ length: 10 }, (_) => ({
								occupied: false,
								active: false,
								color: 0,
							}))
						);
					}
				});
				if (ths.garbageLines[0] > 3) {
					for (let i = 0; i < ths.garbageLines[0]; i++) {
						ths.board.shift();
						ths.board.push(
							Array.from({ length: 10 }, (_, j: any) => ({
								occupied:
									j !== ths.garbageLines[1] ? true : false,
								color: 8,
							}))
						);
					}
					ths.garbageLines = [0, Math.floor(Math.random() * 10)];
					setGarbageLines({
						type: "set",
						value: ths.garbageLines,
					});
				}
				setBoard(ths.board);
				ths.lineDissapear = [];
				ths.moveDown = Array(20).fill(0);
				setLineDissapear([]);
				setMoveDown(Array(20).fill(0));
				speed = form(ths.level);
				setSpeed(speed);
			}

			for (let i = 0; i < 4; i++) {
				if (
					ths.board[activePos[ths.nextShape][i][0]][
						activePos[ths.nextShape][i][1]
					].occupied
				) {
					setActive([
						[-10, -10],
						[-10, -10],
						[-10, -10],
						[-10, -10],
					]);
					setCurrentShape(7);
					clearInterval(inter);
					inter = -0;
					if (ths.page == "single") {
						ths.state = "game over";
						ths.setState("game over");
					} else if (ths.page == "multi") {
						setTimeout(() => {
							socket.emit("gameOver", {
								room: user.room,
								name: user.name,
								score: ths.score,
							});
						}, 100);
						if (scrf) scrf.style.opacity = "1";
						// setMessage({
						// 	active: true,
						// 	heading: "Defeat",
						// 	body: "Better luck next time!",
						// });
					}

					return;
				}
			}
			// setOds(analyze(JSON.parse(JSON.stringify(board))));
			ths.currentShape = ths.nextShape;
			ths.active = JSON.parse(
				JSON.stringify(activePos[ths.currentShape])
			);

			setCurrentShape(ths.currentShape);
			setActive(ths.active);
			ths.nextShape = bagRand();
			ths.rot = 0;
			setNextShape(ths.nextShape);

			ths.npc = false;
		}
		let move = false;
		ths.time = 0;

		let cur: any,
			prev = new Date().getTime();
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

		let diff = 0;
		if (inter) clearInterval(inter);
		inter = setInterval(async () => {
			cur = new Date().getTime();
			diff = cur - prev;
			// console.log(held);
			// [
			// 	ths.autoplay,
			// 	ths.state,
			// 	ths.autoplaySpeed,
			// 	ths.settings,
			// 	ths.page,
			// ] = getAutoplayState();
			if (ths.autoplay && diff < Math.min(ths.autoplaySpeed, speed))
				return;
			if (ths.state !== "play" || ths.npc) {
				prev = cur;
				return;
			}

			//hold
			// if (
			// 	cur - prevTickTime.hold >= ticker.hold &&
			// 	!held &&
			// 	keys.holdPiece
			// ) {
				
			// }

			//gravity
			if (
				cur - prevTickTime.gravity >=
					(ths.autoplay
						? Math.min(ths.autoplaySpeed, speed)
						: speed) &&
				ths.active[0][0] !== 19 &&
				ths.active[1][0] !== 19 &&
				ths.active[2][0] !== 19 &&
				ths.active[3][0] !== 19 &&
				!ths.board[ths.active[0][0] + 1][ths.active[0][1]].occupied &&
				!ths.board[ths.active[1][0] + 1][ths.active[1][1]].occupied &&
				!ths.board[ths.active[2][0] + 1][ths.active[2][1]].occupied &&
				!ths.board[ths.active[3][0] + 1][ths.active[3][1]].occupied && (ths.autoplay || !keys.softDrop||speed<ticker.softDrop)
			) {
				ths.active[0][0]++;
				ths.active[1][0]++;
				ths.active[2][0]++;
				ths.active[3][0]++;
				prevTickTime.gravity = cur;
			} else if (
				cur - prevTickTime.gravity >=
					(ths.autoplay
						? Math.min(ths.autoplaySpeed, speed)
						: speed) &&
				cur - prevTickTime.gravity >=
					(ths.autoplay ? Math.min(ths.autoplaySpeed, 1000) : 1000)
			) {
				await createNewPiece();
				move = false;
				// justspawned = true;
				prevTickTime.gravity = cur;
			}
			if (!move && ths.autoplay) {
				let sc1, sc2, act2;
				// let prev = JSON.parse(JSON.stringify(ths.active));
				// let prevRot = JSON.parse(JSON.stringify(0));
				[ths.active, ths.currentShape, ths.rot, sc1] = automatic(
					JSON.parse(JSON.stringify(ths.board)),
					JSON.parse(JSON.stringify(ths.active)),
					JSON.parse(JSON.stringify(ths.currentShape)),
					0
				);
				if (ths.holdShape === 7) {
					held = true;
					ths.holdShape = JSON.parse(
						JSON.stringify(ths.currentShape)
					);
					setHoldShape(ths.currentShape);
					createNewPiece(false);
				}
				[act2, , , sc2] = automatic(
					JSON.parse(JSON.stringify(ths.board)),
					JSON.parse(JSON.stringify(activePos[ths.holdShape])),
					JSON.parse(JSON.stringify(ths.holdShape)),
					0
				);
				if (sc2 > sc1) {
					let temp = JSON.parse(JSON.stringify(ths.holdShape));
					ths.holdShape = JSON.parse(
						JSON.stringify(ths.currentShape)
					);
					ths.currentShape = temp;
					ths.active = JSON.parse(JSON.stringify(act2));
					setCurrentShape(temp);
					setHoldShape(ths.holdShape);
					move = true;
				}
				move = true;
			}

			setActive(JSON.parse(JSON.stringify(ths.active)));
			let ghos = JSON.parse(JSON.stringify(ths.active));
			while (
				ghos[0][0] !== 19 &&
				ghos[1][0] !== 19 &&
				ghos[2][0] !== 19 &&
				ghos[3][0] !== 19 &&
				!ths.board[ghos[0][0] + 1][ghos[0][1]].occupied &&
				!ths.board[ghos[1][0] + 1][ghos[1][1]].occupied &&
				!ths.board[ghos[2][0] + 1][ghos[2][1]].occupied &&
				!ths.board[ghos[3][0] + 1][ghos[3][1]].occupied
			) {
				ghos[0][0]++;
				ghos[1][0]++;
				ghos[2][0]++;
				ghos[3][0]++;
			}
			setGhost(() => JSON.parse(JSON.stringify(ghos)));

			ths.time += diff / 1000;
			setTime(ths.time);
			prev = cur;
		}, 0);
		stInterval(inter);
	}

	useEffect(() => {
		if (user.name == "Guest") {
			lineBar = 10;
		} else {
			lineBar = 10;
		}
	}, [user]);
	useEffect(() => {
		ths.garbageLines = garbageLines;
	}, [garbageLines]);
	useEffect(() => {
		if (interval === null) {
			startMainGameLoop();
		}
	}, [interval]);

	return (
		<>
			<svg
				id="mainboard"
				xmlns="http://www.w3.org/2000/svg"
				className=" w-full absolute h-full tms duration-200  mb-0 "
				viewBox="0 0 2110 2215"
				fill="none">
				<rect
					x="515"
					y="5"
					rx={7}
					height="2125"
					width="1075"
					fill={theme.background}
					stroke={theme.text}
				/>
				{board.map((row, i) =>
					row.map((_, j) => (
						<Rect
							x={5 + j * 105}
							y={20 + i * 105}
							fill={theme.backpop}
							key={`${i * 10 + j}blockblank`}
						/>
					))
				)}
				{board.map((row, i) =>
					row.map(
						(cell, j) =>
							cell.occupied && (
								<Rect
									x={5 + j * 105}
									y={20 + i * 105}
									fill={theme.accents[cell.color]}
									style={{
										animation:
											(lineDissapear.filter((x) => x == i)
												.length > 0
												? "clear"
												: "down" + moveDown[i]) +
											" " +
											Math.max(300, speed) +
											"ms",
									}}
									key={`${i * 10 + j}block` + currentShape}
								/>
							)
					)
				)}
				{timer == 0 &&
					!autoplay &&
					ghost.map((pos: any, ind: any) => (
						<Rect
							className="duration-[15ms] fadein brightness-75 "
							style={{
								transitionDuration: autoplay
									? Math.min(autoplaySpeed / 4, 25) + "ms"
									: "25ms",
							}}
							x={5 + pos[1] * 105}
							y={20 + pos[0] * 105}
							fill={
								theme.accents[
									autoplay ? currentShape : currentShape
								]
							}
							key={"ghos" + ind + "" + currentShape}
						/>
					))}
				{timer == 0 &&
					active.map((pos: any, ind: any) => (
						<Rect
							className="duration-[15ms] fadein shadow-xl"
							style={{
								transitionDuration: autoplay
									? Math.min(autoplaySpeed / 4, speed) + "ms"
									: Math.min(25, speed) + "ms",
							}}
							x={5 + pos[1] * 105}
							y={20 + pos[0] * 105}
							fill={theme.accents[currentShape]}
							key={
								"active" + ind + "" + currentShape + "" + score
							}
						/>
					))}
			</svg>
		</>
	);
}

export default MainBoard;
