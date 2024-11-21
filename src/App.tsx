import { useEffect, useState } from "react";
import { automatic, getWeights, rotPiece, svg } from "./Helper";
let inter: any = null;

// hld = shapess[0]
// random = shapess[1]
// nxt = shapess[2]

let cols = [
	"#88C0D0",
	"#81A1C1",
	"#D08770",
	"#EBCB8B",
	"#A3BE8C",
	"#BF616A",
	"#B48EAD",
  "#00000000"
];
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
let initTime = new Date().getTime();
let autoplay = !true;
function App() {
	let bgcol = "#353535";
	const [linesCleared, setLinesCleared] = useState(0);
	const [level, setLevel] = useState(0);
	const [weights] = useState(getWeights());
	let act = "#a3be8c";
	//   const [odds, setOds] = useState(0);
	let [board, setBoard] = useState(
		Array.from({ length: 20 }, (_) =>
			Array.from({ length: 10 }, (_) => ({
				occupied: false,
				active: false,
				color: bgcol,
			}))
		)
	);
  const [controls,setControls] = useState(false)
	const [gameOver, setGameOver] = useState(false);
	const [restart, setRestart] = useState(0);
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
  const [autp,setAutp]= useState(false)
	let timeDiff = (new Date().getTime() - initTime) / 1000;
	let sec = Math.floor(timeDiff % 60);
	let min = Math.floor(timeDiff / 60);
	const [paused, setPaused] = useState(false);
  
	useEffect(() => {
		//   setBoard(newPiece(board,random));
		//   setKey(key+1);

		if (inter == null) {
			setGameOver(false);
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
			initTime = new Date().getTime();
			let lclr = 0;
			let lv = 0;
			setLinesCleared(lclr);
			setScore(scx);
			setLevel(lv);
			setActive(act);
			setGhost(act);
			setNextShape(nxt);
			setLcRect([0, 0, 0, 0]);
			setCurShape(random);
			setHoldShape(hld == -1 ? 7 : hld);
			let keys = {
				left: false,
				right: false,
				down: false,
				up: false,
				space: false,
				alt: false,
				shift: false,
				bq: false,
			};
			let rot = 0;
			window.addEventListener("keydown", (e) => {
				if (e.code === "Backquote") {
					keys.bq = true;
				}
				if (!autoplay) {
					if (e.code === "KeyA") {
						//setKeys((prev) => ({ ...prev, left: true }));
						keys.left = true;
					}
					if (e.code === "KeyD") {
						//setKeys((prev) => ({ ...prev, right: true }));
						keys.right = true;
					}
					if (e.code === "KeyS") {
						//setKeys((prev) => ({ ...prev, down: true }));
						keys.down = true;
					}
					if (e.code === "KeyW") {
						//setKeys((prev) => ({ ...prev, up: true }));
						keys.up = true;
					}
					if (e.code === "Space") {
						//setKeys((prev) => ({ ...prev, space: true }));
						keys.space = true;
					}
					if (e.code === "AltLeft") {
						//   setActive([
						//     [-10, -10],
						//     [-10, -10],
						//     [-10, -10],
						//     [-10, -10],
						//   ]);
						//   clearInterval(inter);
						//   inter = -0;
						//setKeys((prev) => ({ ...prev, alt: true }));
						// keys.alt = true;
					}
					if (e.code === "ShiftLeft") {
						//setKeys((prev) => ({ ...prev, shift: true }));
						keys.shift = true;
					}
				}
			});
			window.addEventListener("keyup", (e) => {
				if (e.code === "KeyA") {
					//setKeys((prev) => ({ ...prev, left: false }));
					keys.left = false;
					movClock = new Date().getTime() - lrSpeed;
				}
				if (e.code === "Backquote") {
					keys.bq = false;
				}
				if (e.code === "KeyD") {
					//setKeys((prev) => ({ ...prev, right: false }));
					keys.right = false;
					movClock = new Date().getTime() - lrSpeed;
				}
				if (e.code === "KeyS") {
					//setKeys((prev) => ({ ...prev, down: false }));
					keys.down = false;
				}
				if (e.code === "KeyW") {
					//setKeys((prev) => ({ ...prev, up: false }));
					keys.up = false;
				}
				if (e.code === "Space") {
					//setKeys((prev) => ({ ...prev, space: false }));
					keys.space = false;
					rotClock = new Date().getTime() - 150;
				}
				if (e.code === "AltLeft") {
					e.preventDefault();
					//setKeys((prev) => ({ ...prev, alt: false }));
					keys.alt = false;
					rotClock = new Date().getTime() - 150;
				}
				if (e.code === "ShiftLeft") {
					//setKeys((prev) => ({ ...prev, shift: false }));
					keys.shift = false;
				}
        if(e.code === "Escape"){
          
          setControls((prev)=>{
            if(!prev)
              setPaused(false)
              return false
          })
        }
			});
			let held = false;
			function form(x: number) {
				return 1500 * Math.pow(0.76, x) + 2.21 * x;
			}
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
			function createNewPiece(
				act: number[][],
				inter: number,
				hldr: boolean = true
			) {
				if (hldr) {
					held = false;
					act.forEach((pos: number[]) => {
						board[pos[0]][pos[1]].occupied = true;
						board[pos[0]][pos[1]].color = cols[shape];
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
									color: bgcol,
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
				// if(counterx<1500){
				// 	nxt = shapess[counterx];
				// 	counterx++;
				// }
				// else{
				// 	setActive([
				// 		[-10, -10],
				// 		[-10, -10],
				// 		[-10, -10],
				// 		[-10, -10],
				// 	]);
				// 	clearInterval(inter);
				// 	inter = -0;

				// }
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
			let move = false;
			let changehold = false;
			let ps = false;
			inter = setInterval(() => {
				cur = new Date().getTime();
				if (keys.bq) {
					ps = !ps;
					setPaused(ps);
					keys.bq = false;
				}
				if (ps) {
					setPaused((prev) => {
						
            let controls =false;
            setControls((prev2)=>{
            controls=prev2;
            return prev2
            })
            ps = prev || controls;
						return prev;
					});
          
					return;
				}
        else{
          
          setControls((prev2)=>{
           ps=prev2;
           return prev2
            })
          if(ps)
          return
        }
        setAutp((prev)=>{
         autoplay=prev;
          return prev
        })
				if (!move && autoplay) {
          
					let sc1, sc2, act2;
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
					if (sc2 > sc1) {
						let temp = hld;
						hld = shape;
						act = JSON.parse(JSON.stringify(act2));
						shape = temp;
						rot = 0;
						setHoldShape(hld);
						setCurShape(shape);
						setActive(JSON.parse(JSON.stringify(act)));
					}
					move = true;
				}
				if (
					cur - movClock >= lrSpeed &&
					keys.left &&
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
					keys.right &&
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
					keys.down &&
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
				if (cur - rotClock >= 150 && keys.space) {
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
				if (cur - rotClock >= 150 && keys.alt) {
					rotClock = cur;
					[act, rot] = rotPiece(board, shape, rot, act);
					[act, rot] = rotPiece(board, shape, rot, act);
					[act, rot] = rotPiece(board, shape, rot, act);
				}
				if ((cur - rotClock >= 150 && keys.shift) || changehold) {
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
					cur - downClock >= speed &&
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
					cur - downClock >= speed &&
					cur - downClock >= 1000
				) {
					[act, shape, rot] = createNewPiece(act, inter);
					downClock = new Date().getTime();
				}
				if ((cur - upClock >= upSpeed && keys.up) || move) {
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
					upClock = new Date().getTime();
					downClock = new Date().getTime();
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
				let tempBoard = JSON.parse(JSON.stringify(board));
				ghos.forEach((pos: any) => {
					tempBoard[pos[0]][pos[1]].occupied = true;
				});
				// setOds(analyze(tempBoard));
				setGhost(() => JSON.parse(JSON.stringify(ghos)));
			}, 0);
      
		}
	}, [restart]);
  useEffect(()=>{
    if(controls)
      setPaused(true)
  },[controls])
	return (
		<>
			<div className="fixed mts gap-[2vmin] w-full h-full flex items-center justify-center">
				<div className="h-full w-[18vmin] flex flex-col justify-center items-center  text-white">
					<div className="h-full w-full flex flex-col items-center justify-center text-white">
          <div
          onClick={()=>{
            setControls(!controls)
          }}
           className="h-[4vmin] cursor-pointer select-none -mt-[8vmin] mb-[4vmin] flex items-center justify-center">{svg.cont}<label className="mt-[1.25vmin]">Controls</label> </div>
            <div className="w-full aspect-square border border-bcol rounded-[2vmin] flex flex-col items-center justify-evenly ">
							<div className="w-full flex flex-col h-2/3 items-center justify-center">
								{shapesy[holdShape].split(" ").map((row) => {
									return (
										<div className="w-full h-[4vmin] flex justify-center ">
											{row.split("").map((cell) =>
												cell !== "0" ? (
													<div
														className="w-[4vmin] aspect-square rounded-[0.4vmin] border border-blank"
														style={{
															backgroundColor:
																cols[holdShape],
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
					<div className="h-full w-full flex flex-col items-center justify-center text-white">
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
									stroke="#252525"
									strokeWidth="10px"
									strokeDasharray="596.68px"
									strokeDashoffset={0}
								/>
								<circle
									r={95}
									cx={100}
									cy={100}
									className="duration-100 ease-in-out"
									stroke={
										!(linesCleared % 20 < 10)
											? "#" +
											  (
													Math.floor(
														(((linesCleared % 20) -
															10) /
															10) *
															72
													) + 163
											  ).toString(16) +
											  (
													Math.floor(
														(((linesCleared % 20) -
															10) /
															10) *
															13
													) + 190
											  ).toString(16) +
											  (140).toString(16)
											: "#" +
											  (
													235 -
													Math.floor(
														((linesCleared % 20) /
															10) *
															72
													)
											  ).toString(16) +
											  (
													203 -
													Math.floor(
														((linesCleared % 20) /
															10) *
															13
													)
											  ).toString(16) +
											  (140).toString(16)
									}
									strokeWidth={10}
									strokeLinecap="round"
									strokeDashoffset={
										(596.68 * (10 - linesCleared)) / 10
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
											? cell.color
											: bgcol
									}
									key={`${i}-${j}`}
								/>
							))
						)}
						{ghost.map((pos: any, ind: any) => (
							<rect
								className="duration-[25ms] opacity- 0 brightness-75 ease-in-out"
								width={100}
								height={100}
								rx={10}
								x={5 + pos[1] * 105}
								y={5 + pos[0] * 105}
								fill={cols[autoplay?7:curShape]}
								key={"ghos" + ind}
							/>
						))}
						{active.map((pos: any, ind: any) => (
							<rect
								className="duration-[25ms] ease-in-out"
								width={100}
								height={100}
								rx={10}
								x={5 + pos[1] * 105}
								y={5 + pos[0] * 105}
								fill={cols[curShape]}
								key={"act" + ind}
							/>
						))}
					</svg>
					<div className="w-[50vmin] mt-[-5vmin] absolute h-[20vmin]">
						<div
							className="bg-blank border border-bcol duration-200 border-r-0 border-l-0 shadow-lg w-[50vmin] absolute "
							style={{
								opacity: (paused || gameOver) && !controls ? "0.5" : "0",
                height : (paused || gameOver) && !controls ? "20vmin":"0",
                marginTop : (paused || gameOver) && !controls ? "0vmin":"10vmin",
                pointerEvents:(paused || gameOver) && !controls?"all":"none"
							}}></div>
						<div
							className="w-full h-full flex flex-col text-white duration-200 absolute items-center justify-evenly py-[2vmin]"
							style={{
								opacity: (paused || gameOver) && !controls ? "1" : "0",
                pointerEvents:(paused || gameOver) && !controls?"all":"none"
							}}>
							<div className="text-[3.5vmin] ">
								{" "}
								{gameOver ? "Game Over" : "Paused"}
							</div>
							<div className="w-full flex text-[1.5vmin] items-center justify-evenly">
								<div
									className="bg-post cursor-pointer rounded-md border border-colors-green w-[10vmin] py-[0.5vmin] text-center bg-opacity-40"
									onClick={() => {
										setPaused(false);
									}}
									style={{
										display: gameOver ? "none" : "block",
									}}>
									Resume
								</div>
								<div
									className="bg-post rounded-md border cursor-pointer border-colors-red w-[10vmin] py-[0.5vmin] text-center bg-opacity-40"
									onClick={() => {
										setGameOver(false);
										setBoard(
											Array.from({ length: 20 }, (_) =>
												Array.from(
													{ length: 10 },
													(_) => ({
														occupied: false,
														active: false,
														color: bgcol,
													})
												)
											)
										);
										clearInterval(inter);
										inter = null;
										setRestart(restart + 1);
										setPaused(false);
									}}>
									Restart
								</div>
							</div>
						</div>
						<div
							className="bg-blank border border-bcol duration-200 pointer-events-none border-r-0 border-l-0 shadow-lg w-[50vmin] absolute "
							style={{
                opacity: controls ? "0.5" : "0",
								height : controls ? "33.5vmin":"0",
                marginTop : controls ? "-2.5vmin":"19.25vmin",
							}}></div>
						<div
							className="w-full h-full mt-[-2.5vmin] flex flex-col pointer-events-none text-white duration-200 absolute items-center justify-evenly py-[2vmin]"
							style={{
								opacity: controls ? "1" : "0",
							}}>
							<div className="text-[2.5vmin] ">
								{"Controls "}
							
							</div>
							<div className="w-full flex flex-col gap-[0.75vmin] text-[1.5vmin] items-center ">
              <div className="flex justify-between items-center w-[20vmin]">
                    Pause
                    <div className="h-[2.5vmin] aspect-square bg-bdark border border-bcol text-center rounded-[0.5vmin]">
                      `
                    </div>
                  </div>	
                  <div className="flex justify-between items-center w-[20vmin]">
                    Close Menu
                    <div className="h-[2.5vmin] text-[1.2vmin] leading-[2.25vmin] aspect-square bg-bdark border border-bcol text-center rounded-[0.5vmin]">
                      Esc
                    </div>
                  </div>
                  <div className="flex justify-between items-center w-[20vmin]">
                    Move Left
                    <div className="h-[2.5vmin] aspect-square bg-bdark border border-bcol text-center rounded-[0.5vmin]">
                      A
                    </div>
                  </div>	
                  <div className="flex justify-between items-center w-[20vmin]">
                    Move Right
                    <div className="h-[2.5vmin] aspect-square bg-bdark border border-bcol text-center rounded-[0.5vmin]">
                      D
                    </div>
                  </div>	
                  <div className="flex justify-between items-center w-[20vmin]">
                    Soft Drop
                    <div className="h-[2.5vmin] aspect-square bg-bdark border border-bcol text-center rounded-[0.5vmin]">
                      S
                    </div>
                  </div>	
                  <div className="flex justify-between items-center w-[20vmin]">
                    Hard Drop
                    <div className="h-[2.5vmin] aspect-square bg-bdark border border-bcol text-center rounded-[0.5vmin]">
                      W
                    </div>
                  </div>	
                  <div className="flex justify-between items-center w-[20vmin]">
                    Hold
                    <div className="h-[2.5vmin] w-[6.5vmin] -mr-[2vmin] bg-bdark border border-bcol text-center rounded-[0.5vmin]">
                      L Shift
                    </div>
                  </div>
                  <div className="flex justify-between items-center w-[20vmin]">
                    Rotate Clockwise
                    <div className="h-[2.5vmin] w-[10.5vmin] -mr-[4vmin] bg-bdark border border-bcol text-center rounded-[0.5vmin]">
                      Space Bar
                    </div>
                  </div>
                  
							</div>
						</div>
					</div>
				</div>
				<div className="h-full w-[18vmin]  flex flex-col justify-center items-center  text-white">
					<div className="h-full w-full flex flex-col items-center justify-center text-white">
						<div className="w-full aspect-square border border-bcol rounded-[2vmin] flex flex-col items-center justify-evenly  ">
							<div className="w-full flex flex-col h-2/3 items-center justify-center">
								{shapesy[nextShape].split(" ").map((row) => {
									return (
										<div className="w-full h-[4vmin] flex justify-center ">
											{row.split("").map((cell) =>
												cell !== "0" ? (
													<div
														className="w-[4vmin] aspect-square rounded-[0.4vmin] border border-blank"
														style={{
															backgroundColor:
																cols[nextShape],
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
					<div className="h-full w-full flex flex-col items-center justify-center text-white">
						<div
							className="text-[2vmin] duration-200 "
							style={{
								marginTop: !autp ? "0" : "-12.5vmin",
							}}>
							Autoplay
						</div>
						<div
							className="bg-post mb-[2vmin] h-[3vmin] duration-200 rounded-full border-bcol p-[0.25vmin] border aspect-video"
							style={{
								backgroundColor: autp
									? cols[4] + "22"
									: cols[5] + "22",
							}}
							onClick={() => {
								setAutp(!autp)
							}}>
							<div
								className="h-full pointer-events-none aspect-square bg-bcol rounded-full duration-200"
								style={{
									marginLeft: autp ? "50%" : "0",
									backgroundColor: autp
										? cols[4]
										: cols[5],
								}}></div>
						</div>
						<div
							className="text-[1.5vmin] lexend mb-[2vmin] duration-200 h-0 w-[20vmin] flex flex-col"
							style={{
								height: autp ? "12.5vmin" : "0vmin",
								overflow: "hidden",
								opacity: autp? "1" : "0",
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
										className="bg-black w-[4vmin] bg-opacity-0 text-center text-white"
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
										className="bg-black w-[4vmin] bg-opacity-0 text-center text-white"
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
										className="bg-black w-[4vmin] bg-opacity-0 text-center text-white"
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
										className="bg-black w-[4vmin] bg-opacity-0 text-center text-white"
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
										className="bg-black w-[4vmin] bg-opacity-0 text-center text-white"
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
										className="bg-black w-[4vmin] bg-opacity-0 text-center text-white"
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
										className="bg-black w-[4vmin] bg-opacity-0 text-center text-white"
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
										className="bg-black w-[4vmin] bg-opacity-0 text-center text-white"
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
									className="w-full min-w-fit duration-75 text-[1.5vmin]  text-blank h-full flex items-center justify-center bg-white bg-opacity-50"
									style={{
										width:
											((val * (i + 1)) / linesCleared) *
												100 +
											"%",
										backgroundColor: cols[i],
										paddingInline: val > 0 ? "0.5vmin" : "",
									}}>
									{val > 0 ? val : ""}
									<div
										className=" absolute text-white rotate-90"
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
										className=" absolute text-white"
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
