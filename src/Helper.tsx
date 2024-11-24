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
// Variable for scoring weights
let weights = {
	weightedBlocks: 0.25, //weighted sum of blocks, where a block's weight is the row it's on
	connectedHoles: 0.09, //number of vertically connected holes
	roughness: -0.63, //sum of height differences between adjacent columns
	pitholePercentage: 0.2, //number of pits divided by total pits and holes
	clearAbleLines: 0.41, //number of lines that can be cleared by an I piece
	deepestHole: 0.22, //depth of the deepest hole
	blocks: -0.36, //number of blocks
	colHoles: -1.38, //number of columns containing holes
};
export function setWeights(newWeights: any): void {
	weights = newWeights;
}
export function getWeights(): any {
	return weights;
}
export function analyze(board: any): number {
	// if(timecache[JSON.stringify(board)]!==undefined){
	//     return timecache[JSON.stringify(board)]}
	;
	
	let weightedBlocks = 0;
	let connectedHoles = 0;
	let roughness = 0;
	let pitholePercentage = 0;
	let clearAbleLines = 0;
	let deepestHole = 0;
	let blocks = 0;
	let colHoles = 0;
	for (let i = 0; i < 10; i++) {
		let hole = false;
		let holeDepth = 0;
		let block = false;
		for (let j = 0; j < 20; j++) {
			if (board[j][i].occupied) {
				weightedBlocks += j;
				block = true;
				blocks += 1;
			} else if (block) {
				connectedHoles += 1;
				hole = true;
				holeDepth += 1;
			}
			if (hole) {
				deepestHole = Math.max(deepestHole, holeDepth);
			}
		}
		if (hole) {
			colHoles += 1;
		}
	}
	for (let i = 0; i < 19; i++) {
		for (let j = 0; j < 10; j++) {
			if (board[i][j].occupied && !board[i + 1][j].occupied) {
				roughness += 1;
			}
		}
	}
	let pits = 0;
	let holes = 0;
	for (let i = 0; i < 10; i++) {
		let hole = false;
		for (let j = 0; j < 20; j++) {
			if (!board[j][i].occupied) {
				hole = true;
			} else if (hole) {
				holes += 1;
			}
		}
	}
	for (let i = 0; i < 10; i++) {
		let hole = false;
		for (let j = 0; j < 20; j++) {
			if (!board[j][i].occupied) {
				hole = true;
			} else if (hole) {
				pits += 1;
			}
		}
	}
	pitholePercentage = pits / (pits + holes);
	for (let i = 0; i < 20; i++) {
		let clear = true;
		for (let j = 0; j < 10; j++) {
			if (!board[i][j].occupied) {
				clear = false;
			}
		}
		if (clear) {
			clearAbleLines += 1;
		}
	}

	let score =
		weights.weightedBlocks * weightedBlocks +
		weights.connectedHoles * connectedHoles +
		weights.roughness * roughness +
		weights.pitholePercentage * pitholePercentage +
		weights.clearAbleLines * clearAbleLines +
		weights.deepestHole * deepestHole +
		weights.blocks * blocks +
		weights.colHoles * colHoles;


	return score;
	// return 1500 * Math.pow(0.76, x) + 2.21*x;
}
export function analyze2(board: any): number {
    
     // Constants for scoring weights
     const WEIGHTS = {
        CLEARED_LINES: 3.0,    // Reward for clearing lines
        HEIGHT: -0.51,         // Penalty for high board
        HOLES: -0.36,          // Penalty for holes
        BUMPINESS: -0.18,      // Penalty for uneven surface
        WELLS: -0.24,          // Penalty for deep wells
        BLOCKADES: -0.3        // Penalty for blocks above holes
    };

    let clearedLines = 0;
    board.forEach((row:any) => {
        if (row.every((cell:any) => cell.occupied)) {
            clearedLines++;
        }
    });

    const columnHeights = new Array(10).fill(0);
    for (let j = 0; j < 10; j++) {
        for (let i = 0; i < 20; i++) {
            if (board[i][j].occupied) {
                columnHeights[j] = 20 - i;
                break;
            }
        }
    }

    const maxHeight = Math.max(...columnHeights);

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

    let bumpiness = 0;
    for (let j = 0; j < 9; j++) {
        bumpiness += Math.abs(columnHeights[j] - columnHeights[j + 1]);
    }
	
    let wells = 0;
    for (let j = 0; j < 10; j++) {
        const leftHeight = j > 0 ? columnHeights[j - 1] : columnHeights[j];
        const rightHeight = j < 9 ? columnHeights[j + 1] : columnHeights[j];
        const currentHeight = columnHeights[j];
        
        if (currentHeight < leftHeight && currentHeight < rightHeight) {
            wells += Math.min(leftHeight, rightHeight) - currentHeight;
        }
    }

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
// let cache = {};
// let timecache = {};
export function automatic(
	board: any,
	act: any,
	shape: any,
	rot: any,
	mode = true
): any {
	// let backupBoard = JSON.parse(JSON.stringify(board));
	let backupAct = JSON.parse(JSON.stringify(act));
	// let backupShape = JSON.parse(JSON.stringify(shape));
	let backupRot = JSON.parse(JSON.stringify(rot));
	let scores = [];
	// if (cache[JSON.stringify(board) + JSON.stringify(shape)] !== undefined) {
	// 	scores = cache[JSON.stringify(board) + JSON.stringify(shape)];
	// } else {
		let initx = 0;
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
				act[0][1] < 10 &&
				act[1][1] < 10 &&
				act[2][1] < 10 &&
				act[3][1] < 10 &&
				(!(
					act[0][1] < 9 &&
					act[1][1] < 9 &&
					act[2][1] < 9 &&
					act[3][1] < 9
				) ||
					(!board[act[0][0]][act[0][1] + 1].occupied &&
						!board[act[1][0]][act[1][1] + 1].occupied &&
						!board[act[2][0]][act[2][1] + 1].occupied &&
						!board[act[3][0]][act[3][1] + 1].occupied))
			) {
				initx++;
				let temp = JSON.parse(JSON.stringify(act));
				let tempBoard = JSON.parse(JSON.stringify(board));
				while (
					act[0][0] < 19 &&
					act[1][0] < 19 &&
					act[2][0] < 19 &&
					act[3][0] < 19 &&
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
				scores.push([analyze(tempBoard), temp, rot, tempBoard]);
				act = JSON.parse(JSON.stringify(temp));
				act[0][1] += 1;
				act[1][1] += 1;
				act[2][1] += 1;
				act[3][1] += 1;
			}
			act = JSON.parse(JSON.stringify(tempAct));
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
											act.map((pos:any) => [
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
											act.map((pos:any) => [
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
											act.map((pos:any) => [
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
											act.map((pos:any) => [
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
											act.map((pos:any) => [
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
											act.map((pos:any) => [
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
											act.map((pos:any) => [
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
											act.map((pos:any) => [
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
											act.map((pos:any) => [
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
											act.map((pos:any) => [
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
											act.map((pos:any) => [
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
											act.map((pos:any) => [
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
											act.map((pos:any) => [
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
											act.map((pos:any) => [
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
											act.map((pos:any) => [
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
											act.map((pos:any) => [
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
										act.map((pos:any) => [pos[0], pos[1] - 1])
									);
								} else {
									[act, rot] = rotPiece(
										board,
										shape,
										rot,
										act.map((pos:any) => [pos[0], pos[1] + 1])
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
											act.map((pos:any) => [
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
											act.map((pos:any) => [
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
											act.map((pos:any) => [
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
											act.map((pos:any) => [
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
											act.map((pos:any) => [
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
											act.map((pos:any) => [
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
											act.map((pos:any) => [
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
											act.map((pos:any) => [
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
											act.map((pos:any) => [
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
											act.map((pos:any) => [
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
				act = JSON.parse(JSON.stringify(tempAct));
			}
		}
		//cache[JSON.stringify(backupBoard)+JSON.stringify(shape)]=scores\
	// }
	let max = -100000;
	let maxIndex = 0;
	scores.forEach((el, i) => {
		if (el[0] > max) {
			max = el[0];
			maxIndex = i;
		}
	});
	// console.log(max,shape,scores.length)
	if (mode) {
		if (scores.length == 0) {
			return [backupAct, shape, backupRot, -100000];
		}
		return [
			scores[maxIndex][1],
			shape,
			scores[maxIndex][2],
			scores[maxIndex][0],
		];
	} else return scores;
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
export let automateAnalyzer = (
	board: any,
	act: any,
	shape: any,
	rot: any,
	next: any,
	hold: any,
	held: any
) => {
	if (held) {
		//current + next
		let tempBoard = JSON.parse(JSON.stringify(board));
		let tempAct = JSON.parse(JSON.stringify(act));
		let tempShape = JSON.parse(JSON.stringify(shape));
		let tempRot = JSON.parse(JSON.stringify(rot));
		let scores1 = automatic(
			JSON.parse(JSON.stringify(tempBoard)),
			JSON.parse(JSON.stringify(tempAct)),
			tempShape,
			tempRot
		);
		let scores2 = automatic(
			tempBoard,
			JSON.parse(JSON.stringify(activePos[hold])),
			hold,
			0
		);
		return scores2 > scores1;
		let scores = automatic(
			JSON.parse(JSON.stringify(tempBoard)),
			JSON.parse(JSON.stringify(tempAct)),
			tempShape,
			tempRot,
			false
		);
		let cnScore = scores[0];
		let max = -100000;
		let chScore = scores[0];
		let maxCH = -100000;
		for (let i = 0; i < scores.length; i++) {
			let tempBoard = JSON.parse(JSON.stringify(scores[i][3]));
			let sc = automatic(
				tempBoard,
				JSON.parse(JSON.stringify(activePos[next])),
				next,
				0
			)[3];
			if (sc > max) {
				max = sc;
				cnScore = scores[i];
			}
			sc = automatic(
				tempBoard,
				JSON.parse(JSON.stringify(activePos[hold])),
				hold,
				0
			)[3];
			if (sc > maxCH) {
				maxCH = sc;
				chScore = scores[i];
			}
		}
		tempBoard = JSON.parse(JSON.stringify(board));
		tempAct = JSON.parse(JSON.stringify(act));
		tempShape = JSON.parse(JSON.stringify(shape));
		scores = automatic(
			tempBoard,
			JSON.parse(JSON.stringify(activePos[hold])),
			hold,
			0,
			false
		);
		let hnScore = scores[0];
		let hnmax = -100000;
		let hcScore = scores[0];
		let maxHC = -100000;
		for (let i = 0; i < scores.length; i++) {
			let tempBoard = JSON.parse(JSON.stringify(scores[i][3]));
			let sc = automatic(
				tempBoard,
				JSON.parse(JSON.stringify(activePos[next])),
				next,
				0
			)[3];
			if (sc > hnmax) {
				hnmax = sc;
				hnScore = scores[i];
			}
			sc = automatic(
				tempBoard,
				JSON.parse(JSON.stringify(tempAct)),
				tempShape,
				tempRot
			)[3];
			if (sc > maxHC) {
				maxHC = sc;
				hcScore = scores[i];
			}
		}
		if (
			hnScore[0] > cnScore[0] ||
			hnScore[0] > chScore[0] ||
			hcScore[0] > cnScore[0] ||
			hcScore[0] > chScore[0]
		) {
			console.log(true);
			return true;
		} else {
			return false;
		}
	} else {
		return false;
	}
};
export const svg={
	arr: <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
	className="h-[2vmin] aspect-square"
  >
    <g id="SVGRepo_bgCarrier" strokeWidth={0} />
    <g
      id="SVGRepo_tracerCarrier"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <g id="SVGRepo_iconCarrier">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.29289 8.29289C4.68342 7.90237 5.31658 7.90237 5.70711 8.29289L12 14.5858L18.2929 8.29289C18.6834 7.90237 19.3166 7.90237 19.7071 8.29289C20.0976 8.68342 20.0976 9.31658 19.7071 9.70711L12.7071 16.7071C12.3166 17.0976 11.6834 17.0976 11.2929 16.7071L4.29289 9.70711C3.90237 9.31658 3.90237 8.68342 4.29289 8.29289Z"
        fill="#ffffff"
      />
    </g>
  </svg>,
  kb:
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-[45vmin] h-[19.5vmin] 	"
    viewBox="0 50 1500 650"
    fill="none"
  >
    <rect width={90} height={90} x={40} y={90} rx={24} fill="#555555" stroke="#939393" strokeWidth={1} ></rect>
    <rect width={90} height={90} x={161.25} y={90} rx={24} fill="#555555" stroke="#939393" strokeWidth={1} />
    <rect width={90} height={90} x={256.25} y={90} rx={24} fill="#555555" stroke="#939393" strokeWidth={1} />
    <rect width={90} height={90} x={351.25} y={90} rx={24} fill="#555555" stroke="#939393" strokeWidth={1} />
    <rect width={90} height={90} x={446.25} y={90} rx={24} fill="#555555" stroke="#939393" strokeWidth={1} />
    <rect width={90} height={90} x={563.5} y={90} rx={24} fill="#555555" stroke="#939393" strokeWidth={1} />
    <rect width={90} height={90} x={658.5} y={90} rx={24} fill="#555555" stroke="#939393" strokeWidth={1} />
    <rect width={90} height={90} x={753.5} y={90} rx={24} fill="#555555" stroke="#939393" strokeWidth={1} />
    <rect width={90} height={90} x={848.5} y={90} rx={24} fill="#555555" stroke="#939393" strokeWidth={1} />
    <rect width={90} height={90} x={966.25} y={90} rx={24} fill="#555555" stroke="#939393" strokeWidth={1} />
    <rect width={90} height={90} x={1061.25} y={90} rx={24} fill="#555555" stroke="#939393" strokeWidth={1} />
    <rect width={90} height={90} x={1156.25} y={90} rx={24} fill="#555555" stroke="#939393" strokeWidth={1} />
    <rect width={90} height={90} x={1251.25} y={90} rx={24} fill="#555555" stroke="#939393" strokeWidth={1} />
    <rect width={90} height={90} x={1370} y={90} rx={24} fill="#555555" stroke="#939393" strokeWidth={1} />
    <rect width={90} height={90} x={40} y={190} rx={24} fill="#555555" stroke="#939393" strokeWidth={1} />
    <rect width={90} height={90} x={135} y={190} rx={24} fill="#555555" stroke="#939393" strokeWidth={1} />
    <rect width={90} height={90} x={230} y={190} rx={24} fill="#555555" stroke="#939393" strokeWidth={1} />
    <rect width={90} height={90} x={325} y={190} rx={24} fill="#555555" stroke="#939393" strokeWidth={1} />
    <rect width={90} height={90} x={420} y={190} rx={24} fill="#555555" stroke="#939393" strokeWidth={1} />
    <rect width={90} height={90} x={515} y={190} rx={24} fill="#555555" stroke="#939393" strokeWidth={1} />
    <rect width={90} height={90} x={610} y={190} rx={24} fill="#555555" stroke="#939393" strokeWidth={1} />
    <rect width={90} height={90} x={705} y={190} rx={24} fill="#555555" stroke="#939393" strokeWidth={1} />
    <rect width={90} height={90} x={800} y={190} rx={24} fill="#555555" stroke="#939393" strokeWidth={1} />
    <rect width={90} height={90} x={895} y={190} rx={24} fill="#555555" stroke="#939393" strokeWidth={1} />
    <rect width={90} height={90} x={990} y={190} rx={24} fill="#555555" stroke="#939393" strokeWidth={1} />
    <rect width={90} height={90} x={1085} y={190} rx={24} fill="#555555" stroke="#939393" strokeWidth={1} />
    <rect width={90} height={90} x={1180} y={190} rx={24} fill="#555555" stroke="#939393" strokeWidth={1} />
    <rect width={185} height={90} x={1275} y={190} rx={24} fill="#555555" stroke="#939393" strokeWidth={1} />
    <rect width={135} height={90} x={40} y={285} rx={24} fill="#555555" stroke="#939393" strokeWidth={1} />
    <rect width={90} height={90} x={180} y={285} rx={24} fill="#555555" stroke="#939393" strokeWidth={1} />
    <rect width={90} height={90} x={275} y={285} rx={24} fill="#555555" stroke="#939393" strokeWidth={1} />
    <rect width={90} height={90} x={370} y={285} rx={24} fill="#555555" stroke="#939393" strokeWidth={1} />
    <rect width={90} height={90} x={465} y={285} rx={24} fill="#555555" stroke="#939393" strokeWidth={1} />
    <rect width={90} height={90} x={560} y={285} rx={24} fill="#555555" stroke="#939393" strokeWidth={1} />
    <rect width={90} height={90} x={655} y={285} rx={24} fill="#555555" stroke="#939393" strokeWidth={1} />
    <rect width={90} height={90} x={750} y={285} rx={24} fill="#555555" stroke="#939393" strokeWidth={1} />
    <rect width={90} height={90} x={845} y={285} rx={24} fill="#555555" stroke="#939393" strokeWidth={1} />
    <rect width={90} height={90} x={940} y={285} rx={24} fill="#555555" stroke="#939393" strokeWidth={1} />
    <rect width={90} height={90} x={1035} y={285} rx={24} fill="#555555" stroke="#939393" strokeWidth={1} />
    <rect width={90} height={90} x={1130} y={285} rx={24} fill="#555555" stroke="#939393" strokeWidth={1} />
    <rect width={90} height={90} x={1225} y={285} rx={24} fill="#555555" stroke="#939393" strokeWidth={1} />
    <rect width={140} height={90} x={1320} y={285} rx={24} fill="#555555" stroke="#939393" strokeWidth={1} />
    <rect width={160} height={90} x={40} y={380} rx={24} fill="#555555" stroke="#939393" strokeWidth={1} />
    <rect width={90} height={90} x={205} y={380} rx={24} fill="#555555" stroke="#939393" strokeWidth={1} />
    <rect width={90} height={90} x={300} y={380} rx={24} fill="#555555" stroke="#939393" strokeWidth={1} />
    <rect width={90} height={90} x={395} y={380} rx={24} fill="#555555" stroke="#939393" strokeWidth={1} />
    <rect width={90} height={90} x={490} y={380} rx={24} fill="#555555" stroke="#939393" strokeWidth={1} />
    <rect width={90} height={90} x={585} y={380} rx={24} fill="#555555" stroke="#939393" strokeWidth={1} />
    <rect width={90} height={90} x={680} y={380} rx={24} fill="#555555" stroke="#939393" strokeWidth={1} />
    <rect width={90} height={90} x={775} y={380} rx={24} fill="#555555" stroke="#939393" strokeWidth={1} />
    <rect width={90} height={90} x={870} y={380} rx={24} fill="#555555" stroke="#939393" strokeWidth={1} />
    <rect width={90} height={90} x={965} y={380} rx={24} fill="#555555" stroke="#939393" strokeWidth={1} />
    <rect width={90} height={90} x={1060} y={380} rx={24} fill="#555555" stroke="#939393" strokeWidth={1} />
    <rect width={90} height={90} x={1155} y={380} rx={24} fill="#555555" stroke="#939393" strokeWidth={1} />
    <rect width={210} height={90} x={1250} y={380} rx={24} fill="#555555" stroke="#939393" strokeWidth={1} />
    <rect width={185} height={90} x={40} y={475} rx={24} fill="#555555" stroke="#939393" strokeWidth={1} />
    <rect width={90} height={90} x={230} y={475} rx={24} fill="#555555" stroke="#939393" strokeWidth={1} />
    <rect width={90} height={90} x={325} y={475} rx={24} fill="#555555" stroke="#939393" strokeWidth={1} />
    <rect width={90} height={90} x={420} y={475} rx={24} fill="#555555" stroke="#939393" strokeWidth={1} />
    <rect width={90} height={90} x={515} y={475} rx={24} fill="#555555" stroke="#939393" strokeWidth={1} />
    <rect width={90} height={90} x={610} y={475} rx={24} fill="#555555" stroke="#939393" strokeWidth={1} />
    <rect width={90} height={90} x={705} y={475} rx={24} fill="#555555" stroke="#939393" strokeWidth={1} />
    <rect width={90} height={90} x={800} y={475} rx={24} fill="#555555" stroke="#939393" strokeWidth={1} />
    <rect width={90} height={90} x={895} y={475} rx={24} fill="#555555" stroke="#939393" strokeWidth={1} />
    <rect width={90} height={90} x={990} y={475} rx={24} fill="#555555" stroke="#939393" strokeWidth={1} />
    <rect width={90} height={90} x={1085} y={475} rx={24} fill="#555555" stroke="#939393" strokeWidth={1} />
    <rect width={280} height={90} x={1180} y={475} rx={24} fill="#555555" stroke="#939393" strokeWidth={1} />
    <rect width={135} height={90} x={40} y={570} rx={24} fill="#555555" stroke="#939393" strokeWidth={1} />
    <rect width={135} height={90} x={180} y={570} rx={24} fill="#555555" stroke="#939393" strokeWidth={1} />
    <rect width={135} height={90} x={320} y={570} rx={24} fill="#555555" stroke="#939393" strokeWidth={1} />
    <rect width={580} height={90} x={460} y={570} rx={24} fill="#555555" stroke="#939393" strokeWidth={1} />
    <rect width={135} height={90} x={1045} y={570} rx={24} fill="#555555" stroke="#939393" strokeWidth={1} />
    <rect width={135} height={90} x={1185} y={570} rx={24} fill="#555555" stroke="#939393" strokeWidth={1} />
    <rect width={135} height={90} x={1325} y={570} rx={24} fill="#555555" stroke="#939393" strokeWidth={1} />
  </svg>,
  cont:<svg
  id="Icons"
  className="h-[4vmin]"
  xmlns="http://www.w3.org/2000/svg"
  xmlnsXlink="http://www.w3.org/1999/xlink"
  viewBox="0 0 32 32"
  xmlSpace="preserve"
  fill="#ffffff"
  stroke="#ffffff"
>
  <g id="SVGRepo_bgCarrier" strokeWidth={0} />
  <g
	id="SVGRepo_tracerCarrier"
	strokeLinecap="round"
	strokeLinejoin="round"
  />
  <g id="SVGRepo_iconCarrier">
	<style type="text/css">
	  {
		" .st0{fill:none;stroke:#bbbbbb;stroke-width:1;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} "
	  }
	</style>
	<path
	  className="st0"
	  d="M23,15c-1.2,0-2.4,0.4-3.3,1h-7.4c-0.9-0.6-2.1-1-3.3-1c-3.3,0-6,2.7-6,6s2.7,6,6,6c1.2,0,2.4-0.4,3.3-1h7.4 c0.9,0.6,2.1,1,3.3,1c3.3,0,6-2.7,6-6S26.3,15,23,15z"
	/>
	<line className="st0" x1={9} y1={19} x2={9} y2={23} />
	<line className="st0" x1={7} y1={21} x2={11} y2={21} />
	<line className="st0" x1={23} y1={19} x2={23} y2={19} />
	<line className="st0" x1={21} y1={21} x2={21} y2={21} />
	<line className="st0" x1={25} y1={21} x2={25} y2={21} />
	<line className="st0" x1={23} y1={23} x2={23} y2={23} />
	<path
	  className="st0"
	  d="M16,16v-2c0-2.2-1.8-4-4-4H9c-2.2,0-4-1.8-4-4V3"
	/>
  </g>
</svg>
}