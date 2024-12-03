import { useAtom } from "jotai";
import { store, weight, weightsAtom } from "../atoms";
import { activePos } from "../constants";



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
    let backupAct = JSON.parse(JSON.stringify(act));
    let backupRot = JSON.parse(JSON.stringify(rot));
	if (broken) {
		return [act, rot];
	}
	let edit=false;
    for(let i=0;i<5 && edit==false;i++){
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
                            edit=true;
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
                            edit=true;
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
                            edit=true;
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
                            edit=true;
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
                            edit=true;
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
                            edit=true;
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
                            edit=true;
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
                            edit=true;
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
                            edit=true;
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
                            edit=true;
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
                            edit=true;
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
                            edit=true;
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
                            edit=true;
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
                            edit=true;
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
                            edit=true;
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
                            edit=true;
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
                            edit=true;
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
                            edit=true;
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
                            edit=true;
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
                            edit=true;
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
                            edit=true;
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
                            edit=true;
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
                            edit=true;
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
                            edit=true;
                        }
                        break;
                }
        }
        if(edit)
            break;
        act=JSON.parse(JSON.stringify(backupAct));
        switch (shape) {
            case 0:
                switch(i){
                    case 0:
                        switch (rot) {
                            case 0:
                                act=act.map((pos: any) => [
                                    pos[0],
                                    pos[1] - 2,
                                ]);
                                break;
                            case 1:
                                act=act.map((pos: any) => [
                                    pos[0],
                                    pos[1] - 1,
                                ])
                                break;
                            case 2:
                                act=act.map((pos: any) => [
                                    pos[0],
                                    pos[1] + 2,
                                ]);
                                break;
                            case 3:
                                act=act.map((pos: any) => [
                                    pos[0],
                                    pos[1] + 1,
                                ]);
                                break;
                        }
                        break;
                    case 1:
                        switch (rot) {
                            case 0:
                                act=act.map((pos: any) => [
                                    pos[0],
                                    pos[1] + 1,
                                ]);
                                break;
                            case 1:
                                act=act.map((pos: any) => [
                                    pos[0],
                                    pos[1] + 2,
                                ])
                                break;
                            case 2:
                                act=act.map((pos: any) => [
                                    pos[0],
                                    pos[1] - 1,
                                ]);
                                break;
                            case 3:
                                act=act.map((pos: any) => [
                                    pos[0],
                                    pos[1] - 2,
                                ]);
                                break;
                        }
                        break;
                    case 2:
                        switch (rot) {
                            case 0:
                                act=act.map((pos: any) => [
                                    pos[0]-1,
                                    pos[1] - 2,
                                ]);
                                break;
                            case 1:
                                act=act.map((pos: any) => [
                                    pos[0]+2,
                                    pos[1] - 1,
                                ])
                                break;
                            case 2:
                                act=act.map((pos: any) => [
                                    pos[0]+1,
                                    pos[1] + 2,
                                ]);
                                break;
                            case 3:
                                act=act.map((pos: any) => [
                                    pos[0]-2,
                                    pos[1] + 1,
                                ]);
                                break;
                        }
                        break;
                    case 3:
                        switch (rot) {
                            case 0:
                                act=act.map((pos: any) => [
                                    pos[0]+2,
                                    pos[1] + 1,
                                ]);
                                break;
                            case 1:
                                act=act.map((pos: any) => [
                                    pos[0]-1,
                                    pos[1] + 2,
                                ])
                                break;
                            case 2:
                                act=act.map((pos: any) => [
                                    pos[0]-2,
                                    pos[1] -1,
                                ]);
                                break;
                            case 3:
                                act=act.map((pos: any) => [
                                    pos[0]+1,
                                    pos[1] -2,
                                ]);
                                break;
                        }
                        break;
                }
                break;
            default:
                switch (i) {
                    case 0:
                        if (rot == 0 || rot == 3) {
                           
                                act=act.map((pos: any) => [pos[0], pos[1] - 1])
                        
                        } else {
                            act=act.map((pos: any) => [pos[0], pos[1] + 1])
                        
                        }
                        break;
                    case 1:
                        switch (rot) {
                            case 0:
                                act=act.map((pos: any) => [
                                        pos[0] + 1,
                                        pos[1] - 1,
                                    ])
                            
                                break;
                            case 1:
                                act=act.map((pos: any) => [
                                        pos[0] - 1,
                                        pos[1] + 1,
                                    ])
                                
                                break;
                            case 2:
                                act=act.map((pos: any) => [
                                        pos[0] + 1,
                                        pos[1] + 1,
                                    ])
                                
                                break;
                            case 3:
                                act=act.map((pos: any) => [
                                        pos[0] - 1,
                                        pos[1] - 1,
                                    ])
                                
                                break;
                        }
                        break;
                    case 2:
                        switch (rot) {
                            case 0:
                            case 2:
                                act=act.map((pos: any) => [
                                        pos[0] - 2,
                                        pos[1],
                                    ])
                                
                                break;
                            case 1:
                            case 3:
                                act=act.map((pos: any) => [
                                        pos[0] + 2,
                                        pos[1],
                                    ])
                                
                                break;
                        }
                        break;
                    case 3:
                        switch (rot) {
                            case 0:
                                act=act.map((pos: any) => [
                                        pos[0] - 2,
                                        pos[1] - 1,
                                    ])
                                
                                break;
                            case 1:
                                act= act.map((pos: any) => [
                                        pos[0] + 2,
                                        pos[1] + 1,
                                    ])
                                
                                break;
                            case 2:
                                act= act.map((pos: any) => [
                                        pos[0] - 2,
                                        pos[1] + 1,
                                    ])
                                
                                break;
                            case 3:
                                act= act.map((pos: any) => [
                                        pos[0] + 2,
                                        pos[1] - 1,
                                    ])
                                
                                break;
                        }
                }
                break;
        }
    }
    if (edit)
	return [act, rot];
    return [backupAct, backupRot];
}
export function analyze(board: any): number {
    const weights={
        weightedBlocks: 0.25, //weighted sum of blocks, where a block's weight is the row it's on
        connectedHoles: 0.09, //number of vertically connected holes
        roughness: -0.63, //sum of height differences between adjacent columns
        pitholePercentage: 0.2, //number of pits divided by total pits and holes
        clearAbleLines: 0.41, //number of lines that can be cleared by an I piece
        deepestHole: 0.22, //depth of the deepest hole
        blocks: -0.36, //number of blocks
        colHoles: -1.38, //number of columns containing holes
  }
	// if(timecache[JSON.stringify(board)]!==undefined){
	//     return timecache[JSON.stringify(board)]}
	
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
			[act, rot] = rotPiece(board, shape, rot, act);
			
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