import { useAtom } from "jotai";
import { activePieceAtom, autoplayAtom, autoplaySpeedAtom, bagRandAtom, boardAtom, currentShapeAtom, ghostPieceAtom, holdShapeAtom, initAtom, levelAtom, linesAtom, nextShapeAtom, scoreAtom } from "../atoms";
import { activePos } from "../constants";
import { automatic } from "./helper";

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
	return 1500 * Math.pow(0.76, x) + 2.21 * x;
}
let movClock = new Date().getTime();
let rotClock = new Date().getTime();
let downClock = new Date().getTime();
let upClock = new Date().getTime();
let speed = 1500; //smaller is faster, in ms
let lrSpeed = 100; //smaller is faster, in ms
let upSpeed = 250; //smaller is faster, in ms
export function startMainGameLoop() {
	useAtom(initAtom)[1]();
    let held=false;
    const [board,setBoard]=useAtom(boardAtom);
    const [autoplay,setAutoplay]=useAtom(autoplayAtom);
    const [autoplaySpeed,setAutoplaySpeed]=useAtom(autoplaySpeedAtom);
    const [currentShape,setCurrentShape]=useAtom(currentShapeAtom);
    const [holdShape,setHoldShape]=useAtom(holdShapeAtom);
    const [nextShape,setNextShape]=useAtom(nextShapeAtom);
    const [ghostPiece,setGhostPiece]=useAtom(ghostPieceAtom);
    const [activePiece,setActivePiece]=useAtom(activePieceAtom)
    const [lines,setLines]=useAtom(linesAtom);
    const [,bagRand]=useAtom(bagRandAtom)
    const [level,setLevel]=useAtom(levelAtom);
    const [score,setScore]=useAtom(scoreAtom);
	function createNewPiece(hldr: boolean = true) {
		if (hldr) {
			held = false;
			activePiece.forEach((pos: number[]) => {
				board[pos[0]][pos[1]].occupied = true;
				board[pos[0]][pos[1]].color = currentShape;
			});
			let line = 0;
			board.forEach((row: any, i: number) => {
				if (row.every((cell: any) => cell.occupied)) {
					line++;
					row.forEach((cell: any) => {
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
			// if (lines > 0) {
			// 	lcl[lines - 1]++;
			// 	setLcRect(lcl);
			// }
			// lclr += line;
			setScore(score+ [0, 40, 100, 300, 1200][line] * (level + 1));
			// setScore(scx);
			// lv = Math.floor(lclr / 10);
			setLevel(Math.floor((lines+line) / 10));
            setLines(lines+line);
			// speed = lv < 20 ? form(lv) : 50;
			// setLinesCleared(lclr);
			setBoard(board);
			// console.log(scx,lclr,shape,nxt);
		}

		
		for (let i = 0; i < 4; i++) {
			if (
				board[JSON.parse(JSON.stringify(activePos[nextShape]))[i][0]][
					JSON.parse(JSON.stringify(activePos[nextShape]))[i][1]
				].occupied
			) {
				// setActive([
				// 	[-10, -10],
				// 	[-10, -10],
				// 	[-10, -10],
				// 	[-10, -10],
				// ]);
				// clearInterval(inter);
				// setGameOver(true);
				// inter = -0;
				break;
			}
		}
		// setOds(analyze(JSON.parse(JSON.stringify(board))));
		setActivePiece(JSON.parse(JSON.stringify(activePos[nextShape])));
		setCurrentShape(JSON.parse(JSON.stringify(nextShape)))
		setNextShape(bagRand());
		// rot = 0;
		// activePiece = JSON.parse(
		// 	JSON.stringify(JSON.parse(JSON.stringify(activePos[random])))
		// );

		// return automatic(
		//     JSON.parse(JSON.stringify(board)),
		//     JSON.parse(JSON.stringify(activePiece)),
		//     JSON.parse(JSON.stringify(shape)),
		//     0
		// );
	}
    let move=false
    let changehold=false
    let speed=1500
    let cur,prev = new Date().getTime();
    let inter = setInterval(async () => {
        cur = new Date().getTime();
        // if (justspawned) justspawned = false;
        // if (keys.pauseGame) {
        //     ps = !ps;
        //     setPaused(ps);
        //     keys.pauseGame = false;
        // }
        // if (ps) {
        //     setPaused((prev:any) => {
        //         let controls = false;
        //         setControls((prev2:any) => {
        //             controls = prev2;
        //             return prev2;
        //         });
        //         ps = prev || controls;
        //         return prev;
        //     });
    
        //     return;
        // } else {
        //     setControls((prev2:any) => {
        //         ps = prev2;
        //         return prev2;
        //     });
        //     if (ps) return;
        // }
        // setAutp((prev:any) => {
        //     autoplay = prev;
        //     return prev;
        // });
        if (autoplay && cur - prev < Math.min(autoplaySpeed, speed)) return;
        prev = cur;
        
        // if (cur - rotClock >= 250 && keys.rotateCW) {
        //     let temp = JSON.parse(JSON.stringify(act));
        //     rotClock = cur;
        //     let prevRot = JSON.parse(JSON.stringify(rot));
        //     for (let i = 0; i < 5 && prevRot === rot; i++) {
        //         act = JSON.parse(JSON.stringify(temp));
        //         switch (shape) {
        //             case 0:
        //                 switch (i) {
        //                     case 0:
        //                         [act, rot] = rotPiece(board, shape, rot, act);
        //                         break;
        //                     case 1:
        //                         switch (rot) {
        //                             case 0:
        //                                 [act, rot] = rotPiece(
        //                                     board,
        //                                     shape,
        //                                     rot,
        //                                     act.map((pos: any) => [
        //                                         pos[0],
        //                                         pos[1] - 2,
        //                                     ])
        //                                 );
        //                                 break;
        //                             case 1:
        //                                 [act, rot] = rotPiece(
        //                                     board,
        //                                     shape,
        //                                     rot,
        //                                     act.map((pos: any) => [
        //                                         pos[0],
        //                                         pos[1] - 1,
        //                                     ])
        //                                 );
        //                                 break;
        //                             case 2:
        //                                 [act, rot] = rotPiece(
        //                                     board,
        //                                     shape,
        //                                     rot,
        //                                     act.map((pos: any) => [
        //                                         pos[0],
        //                                         pos[1] + 2,
        //                                     ])
        //                                 );
        //                                 break;
        //                             case 3:
        //                                 [act, rot] = rotPiece(
        //                                     board,
        //                                     shape,
        //                                     rot,
        //                                     act.map((pos: any) => [
        //                                         pos[0],
        //                                         pos[1] + 1,
        //                                     ])
        //                                 );
        //                                 break;
        //                         }
        //                         break;
        //                     case 2:
        //                         switch (rot) {
        //                             case 3:
        //                                 [act, rot] = rotPiece(
        //                                     board,
        //                                     shape,
        //                                     rot,
        //                                     act.map((pos: any) => [
        //                                         pos[0],
        //                                         pos[1] - 2,
        //                                     ])
        //                                 );
        //                                 break;
        //                             case 2:
        //                                 [act, rot] = rotPiece(
        //                                     board,
        //                                     shape,
        //                                     rot,
        //                                     act.map((pos: any) => [
        //                                         pos[0],
        //                                         pos[1] - 1,
        //                                     ])
        //                                 );
        //                                 break;
        //                             case 1:
        //                                 [act, rot] = rotPiece(
        //                                     board,
        //                                     shape,
        //                                     rot,
        //                                     act.map((pos: any) => [
        //                                         pos[0],
        //                                         pos[1] + 2,
        //                                     ])
        //                                 );
        //                                 break;
        //                             case 0:
        //                                 [act, rot] = rotPiece(
        //                                     board,
        //                                     shape,
        //                                     rot,
        //                                     act.map((pos: any) => [
        //                                         pos[0],
        //                                         pos[1] + 1,
        //                                     ])
        //                                 );
        //                                 break;
        //                         }
        //                         break;
        //                     case 3:
        //                         switch (rot) {
        //                             case 0:
        //                                 [act, rot] = rotPiece(
        //                                     board,
        //                                     shape,
        //                                     rot,
        //                                     act.map((pos: any) => [
        //                                         pos[0] - 1,
        //                                         pos[1] - 2,
        //                                     ])
        //                                 );
        //                                 break;
        //                             case 1:
        //                                 [act, rot] = rotPiece(
        //                                     board,
        //                                     shape,
        //                                     rot,
        //                                     act.map((pos: any) => [
        //                                         pos[0] + 2,
        //                                         pos[1] - 1,
        //                                     ])
        //                                 );
        //                                 break;
        //                             case 2:
        //                                 [act, rot] = rotPiece(
        //                                     board,
        //                                     shape,
        //                                     rot,
        //                                     act.map((pos: any) => [
        //                                         pos[0] + 1,
        //                                         pos[1] + 2,
        //                                     ])
        //                                 );
        //                                 break;
        //                             case 3:
        //                                 [act, rot] = rotPiece(
        //                                     board,
        //                                     shape,
        //                                     rot,
        //                                     act.map((pos: any) => [
        //                                         pos[0] - 2,
        //                                         pos[1] + 1,
        //                                     ])
        //                                 );
        //                                 break;
        //                         }
        //                         break;
        //                     case 4:
        //                         switch (rot) {
        //                             case 0:
        //                                 [act, rot] = rotPiece(
        //                                     board,
        //                                     shape,
        //                                     rot,
        //                                     act.map((pos: any) => [
        //                                         pos[0] + 2,
        //                                         pos[1] + 1,
        //                                     ])
        //                                 );
        //                                 break;
        //                             case 1:
        //                                 [act, rot] = rotPiece(
        //                                     board,
        //                                     shape,
        //                                     rot,
        //                                     act.map((pos: any) => [
        //                                         pos[0] - 1,
        //                                         pos[1] + 2,
        //                                     ])
        //                                 );
        //                                 break;
        //                             case 2:
        //                                 [act, rot] = rotPiece(
        //                                     board,
        //                                     shape,
        //                                     rot,
        //                                     act.map((pos: any) => [
        //                                         pos[0] - 2,
        //                                         pos[1] - 1,
        //                                     ])
        //                                 );
        //                                 break;
        //                             case 3:
        //                                 [act, rot] = rotPiece(
        //                                     board,
        //                                     shape,
        //                                     rot,
        //                                     act.map((pos: any) => [
        //                                         pos[0] + 1,
        //                                         pos[1] - 2,
        //                                     ])
        //                                 );
        //                                 break;
        //                         }
        //                         break;
        //                 }
        //                 break;
        //             default:
        //                 switch (i) {
        //                     case 0:
        //                         [act, rot] = rotPiece(board, shape, rot, act);
        //                         break;
        //                     case 1:
        //                         if (rot == 0 || rot == 3) {
        //                             [act, rot] = rotPiece(
        //                                 board,
        //                                 shape,
        //                                 rot,
        //                                 act.map((pos: any) => [pos[0], pos[1] - 1])
        //                             );
        //                         } else {
        //                             [act, rot] = rotPiece(
        //                                 board,
        //                                 shape,
        //                                 rot,
        //                                 act.map((pos: any) => [pos[0], pos[1] + 1])
        //                             );
        //                         }
        //                         break;
        //                     case 2:
        //                         switch (rot) {
        //                             case 0:
        //                                 [act, rot] = rotPiece(
        //                                     board,
        //                                     shape,
        //                                     rot,
        //                                     act.map((pos: any) => [
        //                                         pos[0] + 1,
        //                                         pos[1] - 1,
        //                                     ])
        //                                 );
        //                                 break;
        //                             case 1:
        //                                 [act, rot] = rotPiece(
        //                                     board,
        //                                     shape,
        //                                     rot,
        //                                     act.map((pos: any) => [
        //                                         pos[0] - 1,
        //                                         pos[1] + 1,
        //                                     ])
        //                                 );
        //                                 break;
        //                             case 2:
        //                                 [act, rot] = rotPiece(
        //                                     board,
        //                                     shape,
        //                                     rot,
        //                                     act.map((pos: any) => [
        //                                         pos[0] + 1,
        //                                         pos[1] + 1,
        //                                     ])
        //                                 );
        //                                 break;
        //                             case 3:
        //                                 [act, rot] = rotPiece(
        //                                     board,
        //                                     shape,
        //                                     rot,
        //                                     act.map((pos: any) => [
        //                                         pos[0] - 1,
        //                                         pos[1] - 1,
        //                                     ])
        //                                 );
        //                                 break;
        //                         }
        //                         break;
        //                     case 3:
        //                         switch (rot) {
        //                             case 0:
        //                             case 2:
        //                                 [act, rot] = rotPiece(
        //                                     board,
        //                                     shape,
        //                                     rot,
        //                                     act.map((pos: any) => [
        //                                         pos[0] - 2,
        //                                         pos[1],
        //                                     ])
        //                                 );
        //                                 break;
        //                             case 1:
        //                             case 3:
        //                                 [act, rot] = rotPiece(
        //                                     board,
        //                                     shape,
        //                                     rot,
        //                                     act.map((pos: any) => [
        //                                         pos[0] + 2,
        //                                         pos[1],
        //                                     ])
        //                                 );
        //                                 break;
        //                         }
        //                         break;
        //                     case 4:
        //                         switch (rot) {
        //                             case 0:
        //                                 [act, rot] = rotPiece(
        //                                     board,
        //                                     shape,
        //                                     rot,
        //                                     act.map((pos: any) => [
        //                                         pos[0] - 2,
        //                                         pos[1] - 1,
        //                                     ])
        //                                 );
        //                                 break;
        //                             case 1:
        //                                 [act, rot] = rotPiece(
        //                                     board,
        //                                     shape,
        //                                     rot,
        //                                     act.map((pos: any) => [
        //                                         pos[0] + 2,
        //                                         pos[1] + 1,
        //                                     ])
        //                                 );
        //                                 break;
        //                             case 2:
        //                                 [act, rot] = rotPiece(
        //                                     board,
        //                                     shape,
        //                                     rot,
        //                                     act.map((pos: any) => [
        //                                         pos[0] - 2,
        //                                         pos[1] + 1,
        //                                     ])
        //                                 );
        //                                 break;
        //                             case 3:
        //                                 [act, rot] = rotPiece(
        //                                     board,
        //                                     shape,
        //                                     rot,
        //                                     act.map((pos: any) => [
        //                                         pos[0] + 2,
        //                                         pos[1] - 1,
        //                                     ])
        //                                 );
        //                                 break;
        //                         }
        //                 }
        //         }
        //     }
        //     if (prevRot === rot) {
        //         act = JSON.parse(JSON.stringify(temp));
        //     }
        //     let wrong = false;
        //     act.forEach((pos: any) => {
        //         if (
        //             pos[0] < 0 ||
        //             pos[0] > 19 ||
        //             pos[1] < 0 ||
        //             pos[1] > 9 ||
        //             board[pos[0]][pos[1]].occupied
        //         ) {
        //             wrong = true;
        //         }
        //     });
        //     if (wrong) {
        //         act = JSON.parse(JSON.stringify(temp));
        //         rot = prevRot;
        //     }
        // }
        // if (cur - rotClock >= 150 && keys.rotateCCW) {
        //     rotClock = cur;
        //     [act, rot] = rotPiece(board, shape, rot, act);
        //     [act, rot] = rotPiece(board, shape, rot, act);
        //     [act, rot] = rotPiece(board, shape, rot, act);
        // }
        if ((cur - rotClock >= 150 && keys.holdPiece) || changehold) {
            if (changehold) {
                changehold = false;
            }
            if (holdShape==7) {
                held = true;
                setHoldShape(currentShape);
                createNewPiece( false);
                
            } else if (!held) {
                held = true;
                let temp = JSON.parse(JSON.stringify(holdShape));
                setHoldShape(currentShape);
                setCurrentShape(temp);
                setActivePiece(JSON.parse(JSON.stringify(activePos[temp])));
            }
            rotClock = cur;
        }
        if (
            cur - downClock >= (autoplay ? Math.min(autoplaySpeed, speed) : speed) &&
            activePiece[0][0] !== 19 &&
            activePiece[1][0] !== 19 &&
            activePiece[2][0] !== 19 &&
            activePiece[3][0] !== 19 &&
            !board[activePiece[0][0] + 1][activePiece[0][1]].occupied &&
            !board[activePiece[1][0] + 1][activePiece[1][1]].occupied &&
            !board[activePiece[2][0] + 1][activePiece[2][1]].occupied &&
            !board[activePiece[3][0] + 1][activePiece[3][1]].occupied
        ) {
            activePiece[0][0]++;
            activePiece[1][0]++;
            activePiece[2][0]++;
            activePiece[3][0]++;
            downClock = new Date().getTime();
        } else if (
            cur - downClock >= (autoplay ? Math.min(autoplaySpeed, speed) : speed) &&
            cur - downClock >= (autoplay ? Math.min(autoplaySpeed, 1000) : 1000)
        ) {
            createNewPiece();
            move = false;
            // justspawned = true;
            downClock = new Date().getTime();
        }
    
        // if ((cur - upClock >= upSpeed && keys.hardDrop) || (move && autoplaySpeed === 0)) {
        //     let mainboard = document.getElementById("mainboard");
        //     if (mainboard) {
        //         mainboard.style.marginBottom = "-1.25vmin";
        //         setTimeout(() => {
        //             mainboard.style.marginBottom = "0";
        //         }, 100);
        //     }
        //     move = false;
        //     while (
        //         act[0][0] !== 19 &&
        //         act[1][0] !== 19 &&
        //         act[2][0] !== 19 &&
        //         act[3][0] !== 19 &&
        //         !board[act[0][0] + 1][act[0][1]].occupied &&
        //         !board[act[1][0] + 1][act[1][1]].occupied &&
        //         !board[act[2][0] + 1][act[2][1]].occupied &&
        //         !board[act[3][0] + 1][act[3][1]].occupied
        //     ) {
        //         act[0][0]++;
        //         act[1][0]++;
        //         act[2][0]++;
        //         act[3][0]++;
        //     }
        //    createNewPiece();
        //     justspawned = true;
        //     upClock = new Date().getTime();
        //     downClock = new Date().getTime();
        // }
        // if (justspawned && autoplaySpeed == 0) justspawned = false;
        if (!move && autoplay) {
            let act,shape,rot,sc1, sc2, act2;
            let prev = JSON.parse(JSON.stringify(activePiece));
            let prevRot = JSON.parse(JSON.stringify(0));
            [act, shape, rot, sc1] = automatic(
                JSON.parse(JSON.stringify(board)),
                JSON.parse(JSON.stringify(act)),
                JSON.parse(JSON.stringify(shape)),
                rot
            );
            if (holdShape === 7) {
                held = true;
                
                setHoldShape(currentShape);
                createNewPiece( false);
                setActivePiece(JSON.parse(JSON.stringify(activePos[currentShape])));
            }
            [act2, , , sc2] = automatic(
                JSON.parse(JSON.stringify(board)),
                JSON.parse(JSON.stringify(activePos[holdShape])),
                JSON.parse(JSON.stringify(holdShape)),
                0
            );
            if (sc2 > sc1) {
                let temp = JSON.parse(JSON.stringify(holdShape));
                
                setHoldShape(currentShape);
                setCurrentShape(temp);
                setActivePiece(JSON.parse(JSON.stringify(act2)));
                move = true;
            } else {
               
                setActivePiece(JSON.parse(JSON.stringify(act)));
            } 
        }
        let ghos = JSON.parse(JSON.stringify(activePiece));
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
        setGhostPiece(() => JSON.parse(JSON.stringify(ghos)));
    }, 0);
}
