import {
	rotationTable,
	superRotationTable,
	weights,
} from "../constants";
export function checkCollision(board: any, act: any): boolean {
	let broken = false;
	act.forEach((el: any) => {
		if (
			el[0] > 19 ||
			el[0] < 0 ||
			el[1] < 0 ||
			el[1] > 9 ||
			board[el[0]][el[1]].occupied
		) {
			broken = true;
		}
	});
	return broken;
}
export function rotate(
	board: any,
	shape: number,
	rot: number,
	act: any,
	dir=1
): any {
	rot=(rot-1.5*(dir-1))%4
	let broken = checkCollision(board, act);
	let backupRot = JSON.parse(JSON.stringify(rot));
	let backupAct = JSON.parse(JSON.stringify(act));
	if (broken || shape == 3) {
		return [act, rot];
	}
	switch (shape) {
		case 0:
			act = act.map((el: any, i: any) => [
				el[0] + dir*(rot < 2 ? 1 : -1) * rotationTable[0][i][(rot + 1) % 2],
				el[1] +
					dir*(rot == 0 || rot == 3 ? 1 : -1) *
						rotationTable[0][i][rot % 2],
			]);
			rot = (rot + 1) % 4;
			break;
		case 1:
		case 2:
			act = act.map((el: any, i: any) => [
				el[0] +
					dir*(rot < 2 ? 1 : -1) * rotationTable[1][i][(rot + shape) % 2],
				el[1] +
					dir*(rot == 0 || rot == 3 ? 1 : -1) *
						rotationTable[1][i][(rot + shape + 1) % 2],
			]);
			rot = (rot + 1) % 4;
			break;
		case 4:
		case 5:
			act = act.map((el: any, i: any) => [
				el[0] +
					dir*(rot < 2 ? 1 : -1) *
						rotationTable[2][i][(rot + shape + 1) % 2],
				el[1] +
					dir*(rot == 0 || rot == 3 ? 1 : -1) *
						rotationTable[2][i][(rot + shape) % 2],
			]);
			rot = (rot + 1) % 4;
			break;

		case 6:
			act = act.map((el: any, i: any) => [
				el[0] + dir*(rot < 2 ? 1 : -1) * rotationTable[3][i][(rot + 1) % 2],
				el[1] +
					dir*(rot == 0 || rot == 3 ? 1 : -1) *
						rotationTable[3][i][(rot + shape) % 2],
			]);
			rot = (rot + 1) % 4;
	}
	broken = checkCollision(board, act);
	let tempAct = JSON.parse(JSON.stringify(act));
	if (broken) {
		let cat = shape == 0 ? 0 : 1;
		for (let i = 0; i < 4; i++) {
			tempAct = act.map((el: any) => [
				el[0] + dir*superRotationTable[cat][backupRot][i][1],
				el[1] + dir*superRotationTable[cat][backupRot][i][0],
			]);
			broken = checkCollision(board, tempAct);
			if (!broken) {
				rot=(rot-1.5*(dir-1))%4
				return [tempAct, rot];
			}
		}
	} else {
		rot=(rot-1.5*(dir-1))%4
		return [act, rot];
	}
	backupRot=(backupRot-1.5*(dir-1))%4
	return [backupAct, backupRot];
}
export function analyze(board: any): number {
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
}
export function automatic(
	board: any,
	act: any,
	shape: any,
	rot: any,
	mode = true
): any {
	let backupAct = JSON.parse(JSON.stringify(act));
	let backupRot = JSON.parse(JSON.stringify(rot));
	let scores = [];
	let initx = 0;
	for (let i = 0; i < 4; i++) {
		while (
			!checkCollision(board, act.map((el: any) => [el[0], el[1]-1]))
		) {
			act[0][1] -= 1;
			act[1][1] -= 1;
			act[2][1] -= 1;
			act[3][1] -= 1;
		}
		let tempAct = JSON.parse(JSON.stringify(act));
		while (
			!checkCollision(board, act.map((el: any) => [el[0], el[1]]))
		) {
			initx++;
			let temp = JSON.parse(JSON.stringify(act));
			let tempBoard = JSON.parse(JSON.stringify(board));
			while (
				!checkCollision(board, act.map((el: any) => [el[0]+1, el[1]]))
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
		[act, rot] = rotate(board, shape, rot, act);
	}
	let max = -100000;
	let maxIndex = 0;
	scores.forEach((el, i) => {
		if (el[0] > max) {
			max = el[0];
			maxIndex = i;
		}
	});
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
