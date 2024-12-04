import { useAtom } from "jotai";
import {
	activePieceAtom,
	autoplayAtom,
	autoplaySpeedAtom,
	bagRandAtom,
	boardAtom,
	currentShapeAtom,
	garbageLinesAtom,
	getAutoplayStateAtom,
	ghostPieceAtom,
	holdShapeAtom,
	initAtom,
	intervalAtom,
	levelAtom,
	lineDissapearAtom,
	linesAtom,
	lineStackAtom,
	messageAtom,
	moveDownAtom,
	nextShapeAtom,
	pageAtom,
	scoreAtom,
	speedAtom,
	stateAtom,
	themeAtom,
	timeAtom,
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
	hardDrop: 250,
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
let eventHandler: any = null;
let settings = initSettings;
window.addEventListener("keydown", (e) => {
	settings = getThs().settings;
	let key = e.key.toUpperCase();
	if (key === " ") {
		key = "␣";
	}

	if (!ths.autoplay) {
		if (key === settings.moveLeft) {
			//setKeys((prev:any) => ({ ...prev, moveLeft: true }));
			keys.moveLeft = true;
		}
		if (key === settings.moveRight) {
			//setKeys((prev:any) => ({ ...prev, moveRight: true }));
			keys.moveRight = true;
		}
		if (key === settings.softDrop) {
			//setKeys((prev:any) => ({ ...prev, softDrop: true }));
			keys.softDrop = true;
		}
		if (key === settings.hardDrop) {
			//setKeys((prev:any) => ({ ...prev, hardDrop: true }));
			keys.hardDrop = true;
		}
		if (key === settings.rotateCW) {
			//setKeys((prev:any) => ({ ...prev, rotateCW: true }));
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
			//setKeys((prev:any) => ({ ...prev, rotateCCW: true }));
			// keys.rotateCCW = true;
		}
		if (key === settings.holdPiece) {
			//setKeys((prev:any) => ({ ...prev, holdPiece: true }));
			keys.holdPiece = true;
		}
	}
});
window.addEventListener("keyup", (e) => {
	settings = getThs().settings;
	let key = e.key.toUpperCase();
	if (key === " ") {
		key = "␣";
	}
	if (key === settings.moveLeft) {
		//setKeys((prev:any) => ({ ...prev, moveLeft: false }));
		keys.moveLeft = false;
		// movClock = new Date().getTime() - lrSpeed;
	}
	if (key === settings.pauseGame && ths.state === "pause") {
		ths.setState("play");
		// 	setControls((prev: any) => {
		// 		if (!prev) keys.pauseGame = false;
		// 		return prev;
		// 	});
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
		// setControls((prev: any) => {
		// 	if (!prev) setPaused(false);

		// 	return false;
		// });
	}
	if (key === settings.moveRight) {
		//setKeys((prev:any) => ({ ...prev, moveRight: false }));
		keys.moveRight = false;
		// movClock = new Date().getTime() - lrSpeed;
	}
	if (key === settings.softDrop) {
		//setKeys((prev:any) => ({ ...prev, softDrop: false }));
		keys.softDrop = false;
	}
	if (key === settings.hardDrop) {
		//setKeys((prev:any) => ({ ...prev, hardDrop: false }));
		keys.hardDrop = false;
	}
	if (key === settings.rotateCW) {
		//setKeys((prev:any) => ({ ...prev, rotateCW: false }));
		keys.rotateCW = false;
		// rotClock = new Date().getTime() - 150;
	}
	if (key === settings.rotateCCW) {
		e.preventDefault();
		//setKeys((prev:any) => ({ ...prev, rotateCCW: false }));
		keys.rotateCCW = false;
		// rotClock = new Date().getTime() - 150;
	}
	if (key === settings.holdPiece) {
		//setKeys((prev:any) => ({ ...prev, holdPiece: false }));
		keys.holdPiece = false;
	}
});
let inter: any = null;
let lineBar=10;
function MainBoard() {
	const [board, setBoard] = useAtom(boardAtom);
	const [active, setActive] = useAtom(activePieceAtom);
	const [ghost, setGhost] = useAtom(ghostPieceAtom);
	const [theme] = useAtom(themeAtom);
	const [autoplay] = useAtom(autoplayAtom);
	const [interval, stInterval] = useAtom(intervalAtom);
	const setLineStack = useAtom(lineStackAtom)[1];
	const [autoplaySpeed] = useAtom(autoplaySpeedAtom);
	const [, setHoldShape] = useAtom(holdShapeAtom);
	const [currentShape, setCurrentShape] = useAtom(currentShapeAtom);
	const [, setNextShape] = useAtom(nextShapeAtom);
	const setTime = useAtom(timeAtom)[1];
	const [garbageLines, setGarbageLines] = useAtom(garbageLinesAtom);
	useEffect(() => {
		console.log(garbageLines);
		ths.garbageLines = garbageLines;
	}, [garbageLines]);
	const [score, setScore] = useAtom(scoreAtom);
	const [state, setState] = useAtom(stateAtom);
	const [lines, setLines] = useAtom(linesAtom);
	const [page] = useAtom(pageAtom);
	const [level, setLevel] = useAtom(levelAtom);
	const bagRand = useAtom(bagRandAtom)[1];
	const init = useAtom(initAtom)[1];
	const getAutoplayState = useAtom(getAutoplayStateAtom)[1];
	const [lineDissapear, setLineDissapear] = useAtom(lineDissapearAtom);
	const [moveDown, setMoveDown] = useAtom(moveDownAtom);
	const setSpeed = useAtom(speedAtom)[1];
	const setMessage = useAtom(messageAtom)[1];
	const [user] = useAtom(userAtom);
	useEffect(() => {
		if (user.name == "Guest") {
			lineBar = 10;
		} else {
			lineBar = 10;
		}
	}, [user]);
	function startMainGameLoop() {
		let x = init();
		let held = false;
		ths.npc = false;
		ths.board = JSON.parse(JSON.stringify(board));
		ths.active = JSON.parse(JSON.stringify(activePos[x[0]]));
		ths.state = state;
		ths.garbageLines = 0;
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
		// console.log(ths.holdShape);
		ths.lines = JSON.parse(JSON.stringify(lines));
		ths.level = JSON.parse(JSON.stringify(level));
		
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
				if(ths.garbageLines[0]>3){
					for (let i=0;i<ths.garbageLines[0];i++){
						ths.board.shift()
						ths.board.push(
							Array.from({ length: 10 }, (_,j:any) => ({
								occupied:j!==ths.garbageLines[1]?true:false,
								color: 1,
							}))
						)
					}
					ths.garbageLines=[0, Math.floor(Math.random() * 10)]
					setGarbageLines({
						type: "set",
						value: ths.garbageLines ,
					})
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
					}
					else if(ths.page == "multi"){
						socket.emit("gameOver",{room:user.room,name:user.name})
						setMessage({
							active: true,
							heading: "Defeat",
							body: "Better luck next time!",
						});
						ths.setState("pause");
						ths.state = "game over";

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

		if (eventHandler) clearInterval(eventHandler);
		eventHandler = setInterval(async () => {
			// if(user.room!=="")
			// socket.emit("roomCom", {
			// 	room: user.room,
			// 	board: JSON.parse(JSON.stringify(ths.board)),
			// 	active: JSON.parse(JSON.stringify(ths.active)),
			// 	currentShape: JSON.parse(JSON.stringify(ths.currentShape)),
			// 	nextShape: JSON.parse(JSON.stringify(ths.nextShape)),
			// 	holdShape: JSON.parse(JSON.stringify(ths.holdShape)),
			// 	score: ths.score,
			// 	lines: ths.lines,
			// 	level: ths.level,
			// 	lineDissapear: ths.lineDissapear,
			// 	moveDown: ths.moveDown,
			// 	speed: speed,
			// 	npc: ths.npc,
			// });
			if (ths.npc) return;
			if (
				cur - prevTickTime.moveLeft >= ticker.moveLRSpeed &&
				keys.moveLeft &&
				!keys.moveRight &&
				ths.active[0][1] !== 0 &&
				ths.active[1][1] !== 0 &&
				ths.active[2][1] !== 0 &&
				ths.active[3][1] !== 0 &&
				!ths.board[ths.active[0][0]][ths.active[0][1] - 1].occupied &&
				!ths.board[ths.active[1][0]][ths.active[1][1] - 1].occupied &&
				!ths.board[ths.active[2][0]][ths.active[2][1] - 1].occupied &&
				!ths.board[ths.active[3][0]][ths.active[3][1] - 1].occupied &&
				ths.state === "play"
			) {
				ths.active[0][1]--;
				ths.active[1][1]--;
				ths.active[2][1]--;
				ths.active[3][1]--;
				prevTickTime.moveLeft = new Date().getTime();
			}
			if (
				cur - prevTickTime.moveRight >= ticker.moveLRSpeed &&
				keys.moveRight &&
				!keys.moveLeft &&
				ths.active[0][1] !== 9 &&
				ths.active[1][1] !== 9 &&
				ths.active[2][1] !== 9 &&
				ths.active[3][1] !== 9 &&
				!ths.board[ths.active[0][0]][ths.active[0][1] + 1].occupied &&
				!ths.board[ths.active[1][0]][ths.active[1][1] + 1].occupied &&
				!ths.board[ths.active[2][0]][ths.active[2][1] + 1].occupied &&
				!ths.board[ths.active[3][0]][ths.active[3][1] + 1].occupied &&
				ths.state === "play"
			) {
				ths.active[0][1]++;
				ths.active[1][1]++;
				ths.active[2][1]++;
				ths.active[3][1]++;
				prevTickTime.moveRight = new Date().getTime();
			}
			if (
				cur - prevTickTime.softDrop >= ticker.softDrop &&
				keys.softDrop &&
				ths.active[0][0] != 19 &&
				ths.active[1][0] != 19 &&
				ths.active[2][0] != 19 &&
				ths.active[3][0] != 19 &&
				!ths.board[ths.active[0][0] + 1][ths.active[0][1]].occupied &&
				!ths.board[ths.active[1][0] + 1][ths.active[1][1]].occupied &&
				!ths.board[ths.active[2][0] + 1][ths.active[2][1]].occupied &&
				!ths.board[ths.active[3][0] + 1][ths.active[3][1]].occupied &&
				ths.state === "play"
			) {
				ths.active[0][0]++;
				ths.active[1][0]++;
				ths.active[2][0]++;
				ths.active[3][0]++;
				prevTickTime.softDrop = new Date().getTime();
			}
			if (
				cur - prevTickTime.hardDrop >= ticker.hardDrop &&
				keys.hardDrop &&
				ths.state === "play"
			) {
				while (
					ths.active[0][0] !== 19 &&
					ths.active[1][0] !== 19 &&
					ths.active[2][0] !== 19 &&
					ths.active[3][0] !== 19 &&
					!ths.board[ths.active[0][0] + 1][ths.active[0][1]]
						.occupied &&
					!ths.board[ths.active[1][0] + 1][ths.active[1][1]]
						.occupied &&
					!ths.board[ths.active[2][0] + 1][ths.active[2][1]]
						.occupied &&
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
			if (
				cur - prevTickTime.rotate >= ticker.rotate &&
				keys.rotateCW &&
				ths.state === "play"
			) {
				[ths.active, ths.rot] = rotPiece(
					ths.board,
					ths.currentShape,
					ths.rot,
					ths.active
				);
				setActive(JSON.parse(JSON.stringify(ths.active)));
				prevTickTime.rotate = new Date().getTime();
			}
		}, 1000 / 60);
		let diff = 0;
		if (inter) clearInterval(inter);
		inter = setInterval(async () => {
			cur = new Date().getTime();
			diff = cur - prev;
			// console.log(held);
			[
				ths.autoplay,
				ths.state,
				ths.autoplaySpeed,
				ths.settings,
				ths.page,
			] = getAutoplayState();
			if (ths.autoplay && diff < Math.min(ths.autoplaySpeed, speed))
				return;
			if (ths.state !== "play" || ths.npc) {
				prev = cur;
				return;
			}

			//hold
			if (
				cur - prevTickTime.hold >= ticker.hold &&
				!held &&
				keys.holdPiece
			) {
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
				prevTickTime.hold = cur;
			}

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
				!ths.board[ths.active[3][0] + 1][ths.active[3][1]].occupied
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
				{!autoplay &&
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
				{active.map((pos: any, ind: any) => (
					<Rect
						className="duration-[15ms] fadein shadow-xl"
						style={{
							transitionDuration: autoplay
								? Math.min(autoplaySpeed / 4, 25) + "ms"
								: "25ms",
						}}
						x={5 + pos[1] * 105}
						y={20 + pos[0] * 105}
						fill={theme.accents[currentShape]}
						key={"active" + ind + "" + currentShape}
					/>
				))}
			</svg>
		</>
	);
}

export default MainBoard;
