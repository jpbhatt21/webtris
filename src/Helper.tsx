export function newPiece(board: any, sel: number): any {
	if (sel === 0) {
		//I
		board[0][3].active = true;
		board[0][4].active = true;
		board[0][5].active = true;
		board[0][6].active = true;
	} else if (sel === 1) {
		//J
		board[0][3].active = true;
		board[1][3].active = true;
		board[1][4].active = true;
		board[1][5].active = true;
	} else if (sel === 2) {
		//L
		board[1][3].active = true;
		board[1][4].active = true;
		board[1][5].active = true;
		board[0][5].active = true;
	} else if (sel === 3) {
		//O
		board[0][4].active = true;
		board[0][5].active = true;
		board[1][4].active = true;
		board[1][5].active = true;
	} else if (sel === 4) {
		//S
		board[0][4].active = true;
		board[0][5].active = true;
		board[1][3].active = true;
		board[1][4].active = true;
	} else if (sel === 5) {
		//T
		board[0][4].active = true;
		board[1][3].active = true;
		board[1][4].active = true;
		board[1][5].active = true;
	} else if (sel === 6) {
		//Z
		board[0][3].active = true;
		board[0][4].active = true;
		board[1][4].active = true;
		board[1][5].active = true;
	}

	return board;
}
export function rotPiece(
	board: any,
	shape: number,
	rot: number,
	act: any
): any {
	let broken = false;
	act.forEach((el: any) => {
		if (
			el[0] < 0 ||
			el[0] > 19 ||
			el[1] < 0 ||
			el[1] > 9 ||
			board[el[0]][el[1]].occupied
		) {
			broken = true;
		}
	});
	if (broken) {
		return [act, rot];
	}
	switch (shape) {
		case 0:
			switch (rot) {
				case 0:
					if (
						act[1][0] > 0 &&
						act[1][0] + 2 < 20 &&
						!board[act[1][0] - 1][act[1][1]].occupied &&
						!board[act[1][0] + 1][act[1][1]].occupied &&
						!board[act[1][0] + 2][act[1][1]].occupied
					) {
						act[0][0] -= 1;
						act[0][1] += 1;
						act[2][0] += 1;
						act[2][1] -= 1;
						act[3][0] += 2;
						act[3][1] -= 2;
						rot = 1;
					}
					break;
				case 1:
					if (
						act[1][1] - 1 > 0 &&
						act[1][1] + 1 < 10 &&
						!board[act[1][0]][act[1][1] + 1].occupied &&
						!board[act[1][0]][act[1][1] - 1].occupied &&
						!board[act[1][0]][act[1][1] - 2].occupied
					) {
						act[0][0] += 1;
						act[0][1] += 1;
						act[2][0] -= 1;
						act[2][1] -= 1;
						act[3][0] -= 2;
						act[3][1] -= 2;
						rot = 2;
					}
					break;
				case 2:
					if (
						act[1][0] - 1 > 0 &&
						act[1][0] + 2 < 20 &&
						!board[act[1][0] - 1][act[1][1]].occupied &&
						!board[act[1][0] + 1][act[1][1]].occupied &&
						!board[act[1][0] - 2][act[1][1]].occupied
					) {
						act[0][0] += 1;
						act[0][1] -= 1;
						act[2][0] -= 1;
						act[2][1] += 1;
						act[3][0] -= 2;
						act[3][1] += 2;
						rot = 3;
					}
					break;
				case 3:
					if (
						act[1][1] > 0 &&
						act[1][1] + 1 < 9 &&
						!board[act[1][0]][act[1][1] + 1].occupied &&
						!board[act[1][0]][act[1][1] - 1].occupied &&
						!board[act[1][0]][act[1][1] + 2].occupied
					) {
						act[0][0] -= 1;
						act[0][1] -= 1;
						act[2][0] += 1;
						act[2][1] += 1;
						act[3][0] += 2;
						act[3][1] += 2;
						rot = 0;
					}
					break;
			}
			break;
		case 1:
			switch (rot) {
				case 0:
					if (
						act[2][0] < 19 &&
						!board[act[2][0] - 1][act[2][1] + 1].occupied &&
						!board[act[2][0] - 1][act[2][1]].occupied &&
						!board[act[2][0] + 1][act[2][1]].occupied
					) {
						act[0][1] += 2;
						act[1][0] -= 1;
						act[1][1] += 1;
						act[3][0] += 1;
						act[3][1] -= 1;
						rot = 1;
					}
					break;
				case 1:
					if (
						act[2][1] > 0 &&
						!board[act[2][0] + 1][act[2][1] + 1].occupied &&
						!board[act[2][0]][act[2][1] + 1].occupied &&
						!board[act[2][0]][act[2][1] - 1].occupied
					) {
						act[0][0] += 2;
						act[1][0] += 1;
						act[1][1] += 1;
						act[3][0] -= 1;
						act[3][1] -= 1;
						rot = 2;
					}
					break;
				case 2:
					if (
						act[2][0] > 0 &&
						!board[act[2][0] + 1][act[2][1] - 1].occupied &&
						!board[act[2][0] + 1][act[2][1]].occupied &&
						!board[act[2][0] - 1][act[2][1]].occupied
					) {
						act[0][1] -= 2;
						act[1][0] += 1;
						act[1][1] -= 1;
						act[3][0] -= 1;
						act[3][1] += 1;
						rot = 3;
					}
					break;
				case 3:
					if (
						act[2][1] < 9 &&
						!board[act[2][0] - 1][act[2][1] - 1].occupied &&
						!board[act[2][0]][act[2][1] - 1].occupied &&
						!board[act[2][0]][act[2][1] + 1].occupied
					) {
						act[0][0] -= 2;
						act[1][0] -= 1;
						act[1][1] -= 1;
						act[3][0] += 1;
						act[3][1] += 1;
						rot = 0;
					}
					break;
			}
			break;
		case 2:
			switch (rot) {
				case 0:
					if (
						act[2][0] < 19 &&
						!board[act[2][0] - 1][act[2][1] - 1].occupied &&
						!board[act[2][0] - 1][act[2][1]].occupied &&
						!board[act[2][0] + 1][act[2][1]].occupied
					) {
						act[0][0] += 2;
						act[1][0] += 1;
						act[1][1] -= 1;
						act[3][0] -= 1;
						act[3][1] += 1;
						rot = 1;
					}
					break;
				case 1:
					if (
						act[2][1] > 0 &&
						!board[act[2][0] + 1][act[2][1] - 1].occupied &&
						!board[act[2][0]][act[2][1] - 1].occupied &&
						!board[act[2][0]][act[2][1] + 1].occupied
					) {
						act[0][1] -= 2;
						act[1][0] -= 1;
						act[1][1] -= 1;
						act[3][0] += 1;
						act[3][1] += 1;
						rot = 2;
					}
					break;
				case 2:
					if (
						act[2][0] > 0 &&
						!board[act[2][0] - 1][act[2][1] + 1].occupied &&
						!board[act[2][0] - 1][act[2][1]].occupied &&
						!board[act[2][0] + 1][act[2][1]].occupied
					) {
						act[0][0] -= 2;
						act[1][0] -= 1;
						act[1][1] += 1;
						act[3][0] += 1;
						act[3][1] -= 1;
						rot = 3;
					}
					break;
				case 3:
					if (
						act[2][1] < 9 &&
						!board[act[2][0] + 1][act[2][1] + 1].occupied &&
						!board[act[2][0]][act[2][1] + 1].occupied &&
						!board[act[2][0]][act[2][1] - 1].occupied
					) {
						act[0][1] += 2;
						act[1][0] += 1;
						act[1][1] += 1;
						act[3][0] -= 1;
						act[3][1] -= 1;
						rot = 0;
					}
					break;
			}
			break;
		case 3:
			switch (rot) {
			}
			break;

		case 4:
			switch (rot) {
				case 0:
					if (
						act[2][0] < 19 &&
						!board[act[2][0] - 1][act[2][1] + 1].occupied &&
						!board[act[2][0] - 1][act[2][1]].occupied &&
						!board[act[2][0]][act[2][1] - 1].occupied
					) {
						act[0][0] += 1;
						act[0][1] += 1;
						act[1][0] += 2;
						act[3][0] -= 1;
						act[3][1] += 1;
						rot = 1;
					}
					break;
				case 1:
					if (
						act[2][1] > 0 &&
						!board[act[2][0] + 1][act[2][1] - 1].occupied &&
						!board[act[2][0]][act[2][1] - 1].occupied &&
						!board[act[2][0] - 1][act[2][1]].occupied
					) {
						act[0][0] += 1;
						act[0][1] -= 1;
						act[1][1] -= 2;
						act[3][0] += 1;
						act[3][1] += 1;
						rot = 2;
					}
					break;
				case 2:
					if (
						act[2][0] > 0 &&
						!board[act[2][0] + 1][act[2][1] - 1].occupied &&
						!board[act[2][0] + 1][act[2][1]].occupied &&
						!board[act[2][0]][act[2][1] + 1].occupied
					) {
						act[0][0] -= 1;
						act[0][1] -= 1;
						act[1][0] -= 2;
						act[3][0] += 1;
						act[3][1] -= 1;
						rot = 3;
					}
					break;
				case 3:
					if (
						act[2][1] < 9 &&
						!board[act[2][0] - 1][act[2][1] + 1].occupied &&
						!board[act[2][0]][act[2][1] + 1].occupied &&
						!board[act[2][0] + 1][act[2][1]].occupied
					) {
						act[0][0] -= 1;
						act[0][1] += 1;
						act[1][1] += 2;
						act[3][0] -= 1;
						act[3][1] -= 1;
						rot = 0;
					}
					break;
			}
			break;
		case 5:
			switch (rot) {
				case 0:
					if (
						act[2][0] < 19 &&
						!board[act[2][0] - 1][act[2][1] + 1].occupied &&
						!board[act[2][0] - 1][act[2][1]].occupied &&
						!board[act[2][0] + 1][act[2][1]].occupied
					) {
						act[0][1] += 2;
						act[1][0] += 1;
						act[1][1] += 1;
						act[3][0] += 1;
						act[3][1] -= 1;
						rot = 1;
					}
					break;
				case 1:
					if (
						act[2][1] > 0 &&
						!board[act[2][0] + 1][act[2][1] + 1].occupied &&
						!board[act[2][0]][act[2][1] + 1].occupied &&
						!board[act[2][0]][act[2][1] - 1].occupied
					) {
						act[0][0] += 2;
						act[1][0] += 1;
						act[1][1] -= 1;
						act[3][0] -= 1;
						act[3][1] -= 1;
						rot = 2;
					}
					break;
				case 2:
					if (
						act[2][0] > 0 &&
						!board[act[2][0] + 1][act[2][1] - 1].occupied &&
						!board[act[2][0] + 1][act[2][1]].occupied &&
						!board[act[2][0] - 1][act[2][1]].occupied
					) {
						act[0][1] -= 2;
						act[1][0] -= 1;
						act[1][1] -= 1;
						act[3][0] -= 1;
						act[3][1] += 1;
						rot = 3;
					}
					break;
				case 3:
					if (
						act[2][1] < 9 &&
						!board[act[2][0] - 1][act[2][1] - 1].occupied &&
						!board[act[2][0]][act[2][1] - 1].occupied &&
						!board[act[2][0]][act[2][1] + 1].occupied
					) {
						act[0][0] -= 2;
						act[1][0] -= 1;
						act[1][1] += 1;
						act[3][0] += 1;
						act[3][1] += 1;
						rot = 0;
					}
					break;
			}
			break;

		case 6:
			switch (rot) {
				case 0:
					if (
						act[2][0] < 19 &&
						!board[act[2][0] - 1][act[2][1] - 1].occupied &&
						!board[act[2][0] - 1][act[2][1]].occupied &&
						!board[act[2][0] + 1][act[2][1]].occupied
					) {
						act[0][0] += 1;
						act[0][1] += 1;
						act[1][0] -= 1;
						act[1][1] += 1;
						act[3][0] += 1;
						act[3][1] -= 1;
						rot = 1;
					}
					break;
				case 1:
					if (
						act[2][1] > 0 &&
						!board[act[2][0] + 1][act[2][1] + 1].occupied &&
						!board[act[2][0]][act[2][1] + 1].occupied &&
						!board[act[2][0]][act[2][1] - 1].occupied
					) {
						act[0][0] += 1;
						act[0][1] -= 1;
						act[1][0] += 1;
						act[1][1] += 1;
						act[3][0] -= 1;
						act[3][1] -= 1;
						rot = 2;
					}
					break;
				case 2:
					if (
						act[2][0] > 0 &&
						!board[act[2][0] + 1][act[2][1] + 1].occupied &&
						!board[act[2][0] + 1][act[2][1]].occupied &&
						!board[act[2][0] - 1][act[2][1]].occupied
					) {
						act[0][0] -= 1;
						act[0][1] -= 1;
						act[1][0] += 1;
						act[1][1] -= 1;
						act[3][0] -= 1;
						act[3][1] += 1;
						rot = 3;
					}
					break;
				case 3:
					if (
						act[2][1] < 9 &&
						!board[act[2][0] - 1][act[2][1] - 1].occupied &&
						!board[act[2][0]][act[2][1] - 1].occupied &&
						!board[act[2][0]][act[2][1] + 1].occupied
					) {
						act[0][0] -= 1;
						act[0][1] += 1;
						act[1][0] -= 1;
						act[1][1] -= 1;
						act[3][0] += 1;
						act[3][1] += 1;
						rot = 0;
					}
					break;
			}
	}
	return [act, rot];
}
export function analyze(board: any): number {
    if(timecache[JSON.stringify(board)]!==undefined){
        return timecache[JSON.stringify(board)]}
     // Constants for scoring weights
     const WEIGHTS = {
        CLEARED_LINES: 3.0,    // Reward for clearing lines
        HEIGHT: -0.51,         // Penalty for high board
        HOLES: -0.36,          // Penalty for holes
        BUMPINESS: -0.18,      // Penalty for uneven surface
        WELLS: -0.24,          // Penalty for deep wells
        BLOCKADES: -0.3        // Penalty for blocks above holes
    };

    // Calculate cleared lines (using your existing logic)
    let clearedLines = 0;
    board.forEach((row, i) => {
        if (row.every((cell) => cell.occupied)) {
            clearedLines++;
        }
    });

    // Calculate column heights
    const columnHeights = new Array(10).fill(0);
    for (let j = 0; j < 10; j++) {
        for (let i = 0; i < 20; i++) {
            if (board[i][j].occupied) {
                columnHeights[j] = 20 - i;
                break;
            }
        }
    }

    // Calculate maximum height
    const maxHeight = Math.max(...columnHeights);

    // Calculate holes and blockades
    let holes = 0;
    let blockades = 0;
    for (let j = 0; j < 10; j++) {
        let foundTop = false;
        let holeCount = 0;
        let blockadeCount = 0;
        
        for (let i = 0; i < 20; i++) {
            if (board[i][j].occupied) {
                foundTop = true;
                blockadeCount += holeCount; // Blocks above holes
            } else if (foundTop) {
                holeCount++;
            }
        }
        
        holes += holeCount;
        blockades += blockadeCount;
    }

    // Calculate bumpiness (difference between adjacent columns)
    let bumpiness = 0;
    for (let j = 0; j < 9; j++) {
        bumpiness += Math.abs(columnHeights[j] - columnHeights[j + 1]);
    }

    // Calculate wells (deep gaps between higher columns)
    let wells = 0;
    for (let j = 0; j < 10; j++) {
        const leftHeight = j > 0 ? columnHeights[j - 1] : columnHeights[j];
        const rightHeight = j < 9 ? columnHeights[j + 1] : columnHeights[j];
        const currentHeight = columnHeights[j];
        
        if (currentHeight < leftHeight && currentHeight < rightHeight) {
            wells += Math.min(leftHeight, rightHeight) - currentHeight;
        }
    }

    // Calculate final score
    const score = 
        WEIGHTS.CLEARED_LINES * Math.pow(2, clearedLines) +
        WEIGHTS.HEIGHT * maxHeight +
        WEIGHTS.HOLES * holes +
        WEIGHTS.BUMPINESS * bumpiness +
        WEIGHTS.WELLS * wells +
        WEIGHTS.BLOCKADES * blockades;
    // timecache[JSON.stringify(board)]=score
    return score;
	// return 1500 * Math.pow(0.76, x) + 2.21*x;

}
let cache={}
let timecache={}
export function automatic(board: any, act: any, shape: any, rot: any,mode=true): any {
    
	let backupBoard = JSON.parse(JSON.stringify(board));
	let backupAct = JSON.parse(JSON.stringify(act));
	let backupShape = JSON.parse(JSON.stringify(shape));
	let backupRot = JSON.parse(JSON.stringify(rot));
	let scores = [];
    if(cache[JSON.stringify(board)+JSON.stringify(shape)]!==undefined){
     scores=cache[JSON.stringify(board)+JSON.stringify(shape)]   
    }
    else{
    let initx=0
	for (let i = 0; i < 4; i++) {
        
        while (
            act[0][1] !== 0 &&
            act[1][1] !== 0 &&
            act[2][1] !== 0 &&
            act[3][1] !== 0 &&
            !board[act[0][0]][act[0][1] - 1].occupied &&
            !board[act[1][0]][act[1][1] - 1].occupied &&
            !board[act[2][0]][act[2][1] - 1].occupied &&
            !board[act[3][0]][act[3][1] - 1].occupied
        ) {
            act[0][1] -= 1;
            act[1][1] -= 1;
            act[2][1] -= 1;
            act[3][1] -= 1;
        }
        let tempAct = JSON.parse(JSON.stringify(act));
        while (
            act[0][1] !== 10 &&
            act[1][1] !== 10 &&
            act[2][1] !== 10 &&
            act[3][1] !== 10 &&
            !board[act[0][0]][act[0][1]].occupied &&
            !board[act[1][0]][act[1][1]].occupied &&
            !board[act[2][0]][act[2][1]].occupied &&
            !board[act[3][0]][act[3][1]].occupied
        ) { initx++
            let temp = JSON.parse(JSON.stringify(act));
            let tempBoard = JSON.parse(JSON.stringify(board));
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
              act.forEach((pos: number[]) => {
                tempBoard[pos[0]][pos[1]].occupied = true;
              });
              scores.push([analyze(tempBoard), act, rot,tempBoard]);
            act = JSON.parse(JSON.stringify(temp));
            act[0][1] += 1;
            act[1][1] += 1;
            act[2][1] += 1;
            act[3][1] += 1;
        }
        act=JSON.parse(JSON.stringify(tempAct));
        let prevRot = JSON.parse(JSON.stringify(rot));
          for (let i = 0; i < 5 && prevRot === rot; i++) {
            act = JSON.parse(JSON.stringify(tempAct));
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
                          act.map((pos) => [pos[0], pos[1] - 2])
                        );
                        break;
                      case 1:
                        [act, rot] = rotPiece(
                          board,
                          shape,
                          rot,
                          act.map((pos) => [pos[0], pos[1] - 1])
                        );
                        break;
                      case 2:
                        [act, rot] = rotPiece(
                          board,
                          shape,
                          rot,
                          act.map((pos) => [pos[0], pos[1] + 2])
                        );
                        break;
                      case 3:
                        
                        [act, rot] = rotPiece(
                          board,
                          shape,
                          rot,
                          act.map((pos) => [pos[0], pos[1] + 1])
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
                          act.map((pos) => [pos[0], pos[1] - 2])
                        );
                        break;
                      case 2:
                        [act, rot] = rotPiece(
                          board,
                          shape,
                          rot,
                          act.map((pos) => [pos[0], pos[1] - 1])
                        );
                        break;
                      case 1:
                        [act, rot] = rotPiece(
                          board,
                          shape,
                          rot,
                          act.map((pos) => [pos[0], pos[1] + 2])
                        );
                        break;
                      case 0:
                        [act, rot] = rotPiece(
                          board,
                          shape,
                          rot,
                          act.map((pos) => [pos[0], pos[1] + 1])
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
                          act.map((pos) => [pos[0] - 1, pos[1] - 2])
                        );
                        break;
                      case 1:
                        [act, rot] = rotPiece(
                          board,
                          shape,
                          rot,
                          act.map((pos) => [pos[0] + 2, pos[1] - 1])
                        );
                        break;
                      case 2:
                        [act, rot] = rotPiece(
                          board,
                          shape,
                          rot,
                          act.map((pos) => [pos[0] + 1, pos[1] + 2])
                        );
                        break;
                      case 3:
                        [act, rot] = rotPiece(
                          board,
                          shape,
                          rot,
                          act.map((pos) => [pos[0] - 2, pos[1] + 1])
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
                          act.map((pos) => [pos[0] + 2, pos[1] + 1])
                        );
                        break;
                      case 1:
                        [act, rot] = rotPiece(
                          board,
                          shape,
                          rot,
                          act.map((pos) => [pos[0] - 1, pos[1] + 2])
                        );
                        break;
                      case 2:
                        [act, rot] = rotPiece(
                          board,
                          shape,
                          rot,
                          act.map((pos) => [pos[0] - 2, pos[1] - 1])
                        );
                        break;
                      case 3:
                        [act, rot] = rotPiece(
                          board,
                          shape,
                          rot,
                          act.map((pos) => [pos[0] + 1, pos[1] - 2])
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
                        act.map((pos) => [pos[0], pos[1] - 1])
                      );
                    } else {
                      [act, rot] = rotPiece(
                        board,
                        shape,
                        rot,
                        act.map((pos) => [pos[0], pos[1] + 1])
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
                          act.map((pos) => [pos[0] + 1, pos[1] - 1])
                        );
                        break;
                      case 1:
                        [act, rot] = rotPiece(
                          board,
                          shape,
                          rot,
                          act.map((pos) => [pos[0] - 1, pos[1] + 1])
                        );
                        break;
                      case 2:
                        [act, rot] = rotPiece(
                          board,
                          shape,
                          rot,
                          act.map((pos) => [pos[0] + 1, pos[1] + 1])
                        );
                        break;
                      case 3:
                        [act, rot] = rotPiece(
                          board,
                          shape,
                          rot,
                          act.map((pos) => [pos[0] - 1, pos[1] - 1])
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
                          act.map((pos) => [pos[0] - 2, pos[1]])
                        );
                        break;
                      case 1:
                      case 3:
                        [act, rot] = rotPiece(
                          board,
                          shape,
                          rot,
                          act.map((pos) => [pos[0] + 2, pos[1]])
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
                          act.map((pos) => [pos[0] - 2, pos[1] - 1])
                        );
                        break;
                      case 1:
                        [act, rot] = rotPiece(
                          board,
                          shape,
                          rot,
                          act.map((pos) => [pos[0] + 2, pos[1] + 1])
                        );
                        break;
                      case 2:
                        [act, rot] = rotPiece(
                          board,
                          shape,
                          rot,
                          act.map((pos) => [pos[0] - 2, pos[1] + 1])
                        );
                        break;
                      case 3:
                        [act, rot] = rotPiece(
                          board,
                          shape,
                          rot,
                          act.map((pos) => [pos[0] + 2, pos[1] - 1])
                        );
                        break;
                    }
                }
            }
          }
          if (prevRot === rot) {
            act = JSON.parse(JSON.stringify(tempAct));
          }
    }
    //cache[JSON.stringify(backupBoard)+JSON.stringify(shape)]=scores\
	}
    let max = -100000;
    let maxIndex = 0;
    scores.forEach((el,i) => {
        if(el[0]>max){
            max = el[0];
            maxIndex = i;
        }
    });
	if(mode)
    {  
        if(scores.length==0){
            return [backupAct,shape,backupRot,-100000];
        }
        return [scores[maxIndex][1],shape,scores[maxIndex][2],scores[maxIndex][0]];}
	else
	return scores
}
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
export let automateAnalyzer = (board: any, act: any, shape: any, rot: any, next:any , hold:any,held:any) => {

	if(held){
		//current + next
		let tempBoard = JSON.parse(JSON.stringify(board));
		let tempAct = JSON.parse(JSON.stringify(act));
		let tempShape = JSON.parse(JSON.stringify(shape));
		let tempRot = JSON.parse(JSON.stringify(rot));
		let scores1=automatic(JSON.parse(JSON.stringify(tempBoard)),JSON.parse(JSON.stringify(tempAct)),tempShape,tempRot);
		let scores2=automatic(tempBoard,JSON.parse(JSON.stringify(activePos[hold])),hold,0);
		return scores2>scores1
		let scores=automatic(JSON.parse(JSON.stringify(tempBoard)),JSON.parse(JSON.stringify(tempAct)),tempShape,tempRot,false);
		let cnScore=scores[0];
		let max=-100000;
		let chScore=scores[0];
		let maxCH=-100000;
        for(let i=0;i<scores.length;i++){
            let tempBoard = JSON.parse(JSON.stringify(scores[i][3]));
            let sc=automatic(tempBoard,JSON.parse(JSON.stringify(activePos[next])),next,0)[3];
            if(sc>max){
                max=sc;
                cnScore=scores[i];
            }
            sc=automatic(tempBoard,JSON.parse(JSON.stringify(activePos[hold])),hold,0)[3];
            if(sc>maxCH){
                maxCH=sc;
                chScore=scores[i];
            }
        }
        tempBoard = JSON.parse(JSON.stringify(board));
		tempAct = JSON.parse(JSON.stringify(act));
		tempShape = JSON.parse(JSON.stringify(shape));
		scores=automatic(tempBoard,JSON.parse(JSON.stringify(activePos[hold])),hold,0,false);
		let hnScore=scores[0];
		let hnmax=-100000;
		let hcScore=scores[0];
		let maxHC=-100000;
        for(let i=0;i<scores.length;i++){
            let tempBoard = JSON.parse(JSON.stringify(scores[i][3]));
            let sc=automatic(tempBoard,JSON.parse(JSON.stringify(activePos[next])),next,0)[3];
            if(sc>hnmax){
                hnmax=sc;
                hnScore=scores[i];
            }
            sc=automatic(tempBoard,JSON.parse(JSON.stringify(tempAct)),tempShape,tempRot)[3];
            if(sc>maxHC){
                maxHC=sc;
                hcScore=scores[i];
            }
        }
        if(hnScore[0]>cnScore[0] || hnScore[0]>chScore[0] || hcScore[0]>cnScore[0] || hcScore[0]>chScore[0]){
            console.log(true)
           return true
        }
        else{
            return false
        }

	}
	else{
        return false
    }
}