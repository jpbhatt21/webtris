import { activePos, automatic, getSettings, rotPiece } from "./Helper";

export let autoplay = true;
let started = false;
export function setStarted(val: boolean) {
	started = val;
}
export function getStarted() {
	return started;
}
let intx = null;
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
let dur=200;
export function setDur(val:number){
    dur=val;
}
export function getDur(){
    return dur;
}
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

let held = false;
let move = false;
let changehold = false;
let ps = false;
let justspawned = true;
let prev = new Date().getTime();

function initGame(
	setLinesCleared: any,
	setScore: any,
	setLevel: any,
	setActive: any,
	setGhost: any,
	setNextShape: any,
	setLcRect: any,
	setCurShape: any,
	setHoldShape: any,
    setControls: any,
    setPaused: any,
) {
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
	held = false;
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
    if(!started)
        attachEventListener(setControls, setPaused);
}

function attachEventListener(setControls: any, setPaused: any) {
	window.addEventListener("keydown", (e) => {
		settings = getSettings();
		let key = e.key.toUpperCase();
		if (key === " ") {
			key = "␣";
		}
		if (key == settings.pauseGame && started) {
			setControls((prev: any) => {
				if (!prev) keys.pauseGame = true;
				return prev;
			});
		}
		if (!autoplay) {
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
		settings = getSettings();
		let key = e.key.toUpperCase();
		if (key === " ") {
			key = "␣";
		}
		if (key === settings.moveLeft) {
			//setKeys((prev:any) => ({ ...prev, moveLeft: false }));
			keys.moveLeft = false;
			movClock = new Date().getTime() - lrSpeed;
		}
		if (key === settings.pauseGame && started) {
			setControls((prev: any) => {
				if (!prev) keys.pauseGame = false;
				return prev;
			});
		}
		if (key === settings.moveRight) {
			//setKeys((prev:any) => ({ ...prev, moveRight: false }));
			keys.moveRight = false;
			movClock = new Date().getTime() - lrSpeed;
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
			rotClock = new Date().getTime() - 150;
		}
		if (key === settings.rotateCCW) {
			e.preventDefault();
			//setKeys((prev:any) => ({ ...prev, rotateCCW: false }));
			keys.rotateCCW = false;
			rotClock = new Date().getTime() - 150;
		}
		if (key === settings.holdPiece) {
			//setKeys((prev:any) => ({ ...prev, holdPiece: false }));
			keys.holdPiece = false;
		}
		if (key === settings.closeMenu) {
			setControls((prev: any) => {
				if (!prev) setPaused(false);
				
				return false;
			});
		}
	});
}

function form(x: number) {
	return 1500 * Math.pow(0.76, x) + 2.21 * x;
}
let eventHandler:any=null;
export function startMainGameLoop({board,setBoard,setLcRect,setScore,setLinesCleared,setLevel,setActive,setGameOver,setNextShape,setCurShape,setPaused,setControls,setAutp,setHoldShape,setGhost}:any) {
    initGame(setLinesCleared,setScore,setLevel,setActive,setGhost,setNextShape,setLcRect,setCurShape,setHoldShape,setControls,setPaused);
    function createNewPiece( hldr: boolean = true) {
        if (hldr) {
            held = false;
            act.forEach((pos: number[]) => {
                board[pos[0]][pos[1]].occupied = true;
                board[pos[0]][pos[1]].color = shape;
            });
            let lines = 0;
            board.forEach((row:any, i:number) => {
                if (row.every((cell:any) => cell.occupied)) {
                    lines++;
                    row.forEach((cell:any) => {
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
                board[JSON.parse(JSON.stringify(activePos[random]))[i][0]][
                    JSON.parse(JSON.stringify(activePos[random]))[i][1]
                ].occupied
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
            JSON.stringify(JSON.parse(JSON.stringify(activePos[random])))
        );
        
        // return automatic(
        //     JSON.parse(JSON.stringify(board)),
        //     JSON.parse(JSON.stringify(act)),
        //     JSON.parse(JSON.stringify(shape)),
        //     0
        // );
    }
    move = false;
    changehold = false;
    ps = false;
    justspawned = true;
    prev = new Date().getTime();
    if(eventHandler)
        clearInterval(eventHandler);
    eventHandler = setInterval(async () => {
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
            !board[act[3][0]][act[3][1] - 1].occupied && !ps
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
            !board[act[3][0]][act[3][1] + 1].occupied  && !ps
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
            !board[act[3][0] + 1][act[3][1]].occupied  && !ps
        ) {
            act[0][0]++;
            act[1][0]++;
            act[2][0]++;
            act[3][0]++;
            movClock = new Date().getTime();
        }} , 1000 / 60);
    let inter = setInterval(async () => {
        cur = new Date().getTime();
        if (justspawned) justspawned = false;
        if (keys.pauseGame) {
            ps = !ps;
            setPaused(ps);
            keys.pauseGame = false;
        }
        if (ps) {
            setPaused((prev:any) => {
                let controls = false;
                setControls((prev2:any) => {
                    controls = prev2;
                    return prev2;
                });
                ps = prev || controls;
                return prev;
            });
    
            return;
        } else {
            setControls((prev2:any) => {
                ps = prev2;
                return prev2;
            });
            if (ps) return;
        }
        setAutp((prev:any) => {
            autoplay = prev;
            return prev;
        });
        if (autoplay && cur - prev < Math.min(dur, speed)) return;
        prev = cur;
        
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
                                [act, rot] = rotPiece(board, shape, rot, act);
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
                                [act, rot] = rotPiece(board, shape, rot, act);
                                break;
                            case 1:
                                if (rot == 0 || rot == 3) {
                                    [act, rot] = rotPiece(
                                        board,
                                        shape,
                                        rot,
                                        act.map((pos: any) => [pos[0], pos[1] - 1])
                                    );
                                } else {
                                    [act, rot] = rotPiece(
                                        board,
                                        shape,
                                        rot,
                                        act.map((pos: any) => [pos[0], pos[1] + 1])
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
                createNewPiece( false);
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
            cur - downClock >= (autoplay ? Math.min(dur, speed) : speed) &&
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
            cur - downClock >= (autoplay ? Math.min(dur, speed) : speed) &&
            cur - downClock >= (autoplay ? Math.min(dur, 1000) : 1000)
        ) {
            createNewPiece();
            move = false;
            justspawned = true;
            downClock = new Date().getTime();
        }
    
        if ((cur - upClock >= upSpeed && keys.hardDrop) || (move && dur === 0)) {
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
           createNewPiece();
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
                createNewPiece( false);
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
    return inter;
}
