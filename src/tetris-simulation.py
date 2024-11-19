import random
import time
bag = [0, 1, 2, 3, 4, 5, 6]
hold = random.choice(bag)
bag = [x for x in bag if x != hold]
rand=random.choice(bag)
bag = [x for x in bag if x != rand]
next =random.choice(bag)
bag = [x for x in bag if x != next]
startTime = time.time()
activePos = [
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
]
from copy import deepcopy
active = deepcopy(activePos[rand])
shape = rand
held = False
level = 0
lines = 0
rot = 0
score = 0
board = [[False for x in range(10)] for y in range(20)]
counterx=3
def createNewPiece():
    global bag, next, active, shape, held, board,level,score,lines,rot,counterx
    held = False
    for i in active:
        board[i[0]][i[1]] = True
    line=0
    for i in range(20):
        if all(board[i]):
            board.pop(i)
            board.insert(0, [False for x in range(10)])
            line+=1
    lines+=line
    # #print("\n\n\n")
    # for i in board:
    #     str=""
    #     for j in i:
    #         if(j):
    #             str+="1"
    #         else:
    #             str+="0"
    #     #print(str)
    score+=[0, 40, 100, 300, 1200][line] * (level + 1)
    
    
    level = lines // 10
    # print(score,lines,shape,next)
    shape = next
    active = deepcopy(activePos[shape])
    if len(bag) == 0:
        bag = [0, 1, 2, 3, 4, 5, 6]
    # if(counterx<10000):
    #     next = shapess[counterx]
    #     counterx+=1
    #     # print(counterx)
    # else:
    #     return False
    next = random.choice(bag)
    bag = [x for x in bag if x != next]
    rot = 0
    for i in active:
        if board[i[0]][i[1]]:
           
            return False
    return True

def rot_piece(board, shape, rot, act):
    # Check if the piece is out of bounds or overlapping
    broken = any(
        el[0] < 0 or el[0] > 19 or 
        el[1] < 0 or el[1] > 9 or 
        board[el[0]][el[1]] 
        for el in act
    )
    
    if broken:
        # #print(broken)
        return [act, rot]
    
    # Rotation logic for different piece shapes
    if shape == 0:  # I-piece
        if rot == 0:
            if (act[1][0] > 0 and act[1][0] + 2 < 20 and
                not board[act[1][0] - 1][act[1][1]] and
                not board[act[1][0] + 1][act[1][1]] and
                not board[act[1][0] + 2][act[1][1]]):
                act[0][0] -= 1
                act[0][1] += 1
                act[2][0] += 1
                act[2][1] -= 1
                act[3][0] += 2
                act[3][1] -= 2
                rot = 1
        
        elif rot == 1:
            if (act[1][1] - 1 > 0 and act[1][1] + 1 < 10 and
                not board[act[1][0]][act[1][1] + 1] and
                not board[act[1][0]][act[1][1] - 1] and
                not board[act[1][0]][act[1][1] - 2]):
                act[0][0] += 1
                act[0][1] += 1
                act[2][0] -= 1
                act[2][1] -= 1
                act[3][0] -= 2
                act[3][1] -= 2
                rot = 2
        
        elif rot == 2:
            if (act[1][0] - 1 > 0 and act[1][0] + 2 < 20 and
                not board[act[1][0] - 1][act[1][1]] and
                not board[act[1][0] + 1][act[1][1]] and
                not board[act[1][0] - 2][act[1][1]]):
                act[0][0] += 1
                act[0][1] -= 1
                act[2][0] -= 1
                act[2][1] += 1
                act[3][0] -= 2
                act[3][1] += 2
                rot = 3
        
        elif rot == 3:
            if (act[1][1] > 0 and act[1][1] + 1 < 9 and
                not board[act[1][0]][act[1][1] + 1] and
                not board[act[1][0]][act[1][1] - 1] and
                not board[act[1][0]][act[1][1] + 2]):
                act[0][0] -= 1
                act[0][1] -= 1
                act[2][0] += 1
                act[2][1] += 1
                act[3][0] += 2
                act[3][1] += 2
                rot = 0
    
    elif shape == 1:  # L-piece (right)
        if rot == 0:
            if (act[2][0] < 19 and
                not board[act[2][0] - 1][act[2][1] + 1] and
                not board[act[2][0] - 1][act[2][1]] and
                not board[act[2][0] + 1][act[2][1]]):
                act[0][1] += 2
                act[1][0] -= 1
                act[1][1] += 1
                act[3][0] += 1
                act[3][1] -= 1
                rot = 1
        
        elif rot == 1:
            if (act[2][1] > 0 and
                not board[act[2][0] + 1][act[2][1] + 1] and
                not board[act[2][0]][act[2][1] + 1] and
                not board[act[2][0]][act[2][1] - 1]):
                act[0][0] += 2
                act[1][0] += 1
                act[1][1] += 1
                act[3][0] -= 1
                act[3][1] -= 1
                rot = 2
        
        elif rot == 2:
            if (act[2][0] > 0 and
                not board[act[2][0] + 1][act[2][1] - 1] and
                not board[act[2][0] + 1][act[2][1]] and
                not board[act[2][0] - 1][act[2][1]]):
                act[0][1] -= 2
                act[1][0] += 1
                act[1][1] -= 1
                act[3][0] -= 1
                act[3][1] += 1
                rot = 3
        
        elif rot == 3:
            if (act[2][1] < 9 and
                not board[act[2][0] - 1][act[2][1] - 1] and
                not board[act[2][0]][act[2][1] - 1] and
                not board[act[2][0]][act[2][1] + 1]):
                act[0][0] -= 2
                act[1][0] -= 1
                act[1][1] -= 1
                act[3][0] += 1
                act[3][1] += 1
                rot = 0
    
    elif shape == 2:  # L-piece (left)
        if rot == 0:
            if (act[2][0] < 19 and
                not board[act[2][0] - 1][act[2][1] - 1] and
                not board[act[2][0] - 1][act[2][1]] and
                not board[act[2][0] + 1][act[2][1]]):
                act[0][0] += 2
                act[1][0] += 1
                act[1][1] -= 1
                act[3][0] -= 1
                act[3][1] += 1
                rot = 1
        
        elif rot == 1:
            if (act[2][1] > 0 and
                not board[act[2][0] + 1][act[2][1] - 1] and
                not board[act[2][0]][act[2][1] - 1] and
                not board[act[2][0]][act[2][1] + 1]):
                act[0][1] -= 2
                act[1][0] -= 1
                act[1][1] -= 1
                act[3][0] += 1
                act[3][1] += 1
                rot = 2
        
        elif rot == 2:
            if (act[2][0] > 0 and
                not board[act[2][0] - 1][act[2][1] + 1] and
                not board[act[2][0] - 1][act[2][1]] and
                not board[act[2][0] + 1][act[2][1]]):
                act[0][0] -= 2
                act[1][0] -= 1
                act[1][1] += 1
                act[3][0] += 1
                act[3][1] -= 1
                rot = 3
        
        elif rot == 3:
            if (act[2][1] < 9 and
                not board[act[2][0] + 1][act[2][1] + 1] and
                not board[act[2][0]][act[2][1] + 1] and
                not board[act[2][0]][act[2][1] - 1]):
                act[0][1] += 2
                act[1][0] += 1
                act[1][1] += 1
                act[3][0] -= 1
                act[3][1] -= 1
                rot = 0
    
    elif shape == 3:  # Square piece
        # No rotation for square piece
        pass
    
    elif shape == 4:  # S-piece
        if rot == 0:
            if (act[2][0] < 19 and
                not board[act[2][0] - 1][act[2][1] + 1] and
                not board[act[2][0] - 1][act[2][1]] and
                not board[act[2][0]][act[2][1] - 1]):
                act[0][0] += 1
                act[0][1] += 1
                act[1][0] += 2
                act[3][0] -= 1
                act[3][1] += 1
                rot = 1
        
        elif rot == 1:
            if (act[2][1] > 0 and
                not board[act[2][0] + 1][act[2][1] - 1] and
                not board[act[2][0]][act[2][1] - 1] and
                not board[act[2][0] - 1][act[2][1]]):
                act[0][0] += 1
                act[0][1] -= 1
                act[1][1] -= 2
                act[3][0] += 1
                act[3][1] += 1
                rot = 2
        
        elif rot == 2:
            if (act[2][0] > 0 and
                not board[act[2][0] + 1][act[2][1] - 1] and
                not board[act[2][0] + 1][act[2][1]] and
                not board[act[2][0]][act[2][1] + 1]):
                act[0][0] -= 1
                act[0][1] -= 1
                act[1][0] -= 2
                act[3][0] += 1
                act[3][1] -= 1
                rot = 3
        
        elif rot == 3:
            if (act[2][1] < 9 and
                not board[act[2][0] - 1][act[2][1] + 1] and
                not board[act[2][0]][act[2][1] + 1] and
                not board[act[2][0] + 1][act[2][1]]):
                act[0][0] -= 1
                act[0][1] += 1
                act[1][1] += 2
                act[3][0] -= 1
                act[3][1] -= 1
                rot = 0
    
    elif shape == 5:  # T-piece
        if rot == 0:
            if (act[2][0] < 19 and
                not board[act[2][0] - 1][act[2][1] + 1] and
                not board[act[2][0] - 1][act[2][1]] and
                not board[act[2][0] + 1][act[2][1]]):
                act[0][1] += 2
                act[1][0] += 1
                act[1][1] += 1
                act[3][0] += 1
                act[3][1] -= 1
                rot = 1
        
        elif rot == 1:
            if (act[2][1] > 0 and
                not board[act[2][0] + 1][act[2][1] + 1] and
                not board[act[2][0]][act[2][1] + 1] and
                not board[act[2][0]][act[2][1] - 1]):
                act[0][0] += 2
                act[1][0] += 1
                act[1][1] -= 1
                act[3][0] -= 1
                act[3][1] -= 1
                rot = 2
        
        elif rot == 2:
            if (act[2][0] > 0 and
                not board[act[2][0] + 1][act[2][1] - 1] and
                not board[act[2][0] + 1][act[2][1]] and
                not board[act[2][0] - 1][act[2][1]]):
                act[0][1] -= 2
                act[1][0] -= 1
                act[1][1] -= 1
                act[3][0] -= 1
                act[3][1] += 1
                rot = 3
        
        elif rot == 3:
            if (act[2][1] < 9 and
                not board[act[2][0] - 1][act[2][1] - 1] and
                not board[act[2][0]][act[2][1] - 1] and
                not board[act[2][0]][act[2][1] + 1]):
                act[0][0] -= 2
                act[1][0] -= 1
                act[1][1] += 1
                act[3][0] += 1
                act[3][1] += 1
                rot = 0
    
    elif shape == 6:  # Z-piece
        if rot == 0:
            if (act[2][0] < 19 and
                not board[act[2][0] - 1][act[2][1] - 1] and
                not board[act[2][0] - 1][act[2][1]] and
                not board[act[2][0] + 1][act[2][1]]):
                act[0][0] += 1
                act[0][1] += 1
                act[1][0] -= 1
                act[1][1] += 1
                act[3][0] += 1
                act[3][1] -= 1
                rot = 1
        
        elif rot == 1:
            if (act[2][1] > 0 and
                not board[act[2][0] + 1][act[2][1] + 1] and
                not board[act[2][0]][act[2][1] + 1] and
                not board[act[2][0]][act[2][1] - 1]):
                act[0][0] += 1
                act[0][1] -= 1
                act[1][0] += 1
                act[1][1] += 1
                act[3][0] -= 1
                act[3][1] -= 1
                rot = 2
        
        elif rot == 2:
            if (act[2][0] > 0 and
                not board[act[2][0] + 1][act[2][1] + 1] and
                not board[act[2][0] + 1][act[2][1]] and
                not board[act[2][0] - 1][act[2][1]]):
                act[0][0] -= 1
                act[0][1] -= 1
                act[1][0] += 1
                act[1][1] -= 1
                act[3][0] -= 1
                act[3][1] += 1
                rot = 3
        
        elif rot == 3:
            if (
            act[2][1] < 9 and
            not board[act[2][0] - 1][act[2][1] - 1] and
            not board[act[2][0]][act[2][1] - 1] and
            not board[act[2][0]][act[2][1] + 1]):
                act[0][0] -= 1
                act[0][1] += 1
                act[1][0] -= 1
                act[1][1] -= 1
                act[3][0] += 1
                act[3][1] += 1
                rot = 0
    return act, rot

def analyze(board):
    # Constants for scoring weights
    WEIGHTS = {
        "CLEARED_LINES": 3.0,  # Reward for clearing lines
        "HEIGHT": -0.51,      # Penalty for high board
        "HOLES": -0.36,       # Penalty for holes
        "BUMPINESS": -0.18,   # Penalty for uneven surface
        "WELLS": -0.24,       # Penalty for deep wells
        "BLOCKADES": -0.3,    # Penalty for blocks above holes
    }

    # Calculate cleared lines
    cleared_lines = 0
    for row in board:
        if all(cell for cell in row):
            cleared_lines += 1
    # #print(cleared_lines,"clr")
    # Calculate column heights
    column_heights = [0] * 10
    for j in range(10):
        for i in range(20):
            if board[i][j]:
                column_heights[j] = 20 - i
                break

    # Calculate maximum height
    max_height = max(column_heights)

    # Calculate holes and blockades
    holes = 0
    blockades = 0
    for j in range(10):
        found_top = False
        hole_count = 0
        blockade_count = 0

        for i in range(20):
            if board[i][j]:
                found_top = True
                blockade_count += hole_count  # Blocks above holes
            elif found_top:
                hole_count += 1

        holes += hole_count
        blockades += blockade_count

    # Calculate bumpiness (difference between adjacent columns)
    bumpiness = sum(
        abs(column_heights[j] - column_heights[j + 1]) for j in range(9)
    )

    # Calculate wells (deep gaps between higher columns)
    wells = 0
    for j in range(10):
        left_height = column_heights[j - 1] if j > 0 else column_heights[j]
        right_height = column_heights[j + 1] if j < 9 else column_heights[j]
        current_height = column_heights[j]

        if current_height < left_height and current_height < right_height:
            wells += min(left_height, right_height) - current_height

    # Calculate final score
    score = (
        WEIGHTS["CLEARED_LINES"] * (2 ** cleared_lines) +
        WEIGHTS["HEIGHT"] * max_height +
        WEIGHTS["HOLES"] * holes +
        WEIGHTS["BUMPINESS"] * bumpiness +
        WEIGHTS["WELLS"] * wells +
        WEIGHTS["BLOCKADES"] * blockades
    )
    return score

def automate(board,active,shape,rot):
    
    tempBoard = deepcopy(board)
    tempActive = deepcopy(active)
    tempRot = rot
    tempShape = shape
    scores = []
    for i in range (4):
        while(
            tempActive[0][1]!=0 and
            tempActive[1][1]!=0 and
            tempActive[2][1]!=0 and
            tempActive[3][1]!=0 and
            not board[tempActive[0][0]][tempActive[0][1]-1] and
            not board[tempActive[1][0]][tempActive[1][1]-1] and
            not board[tempActive[2][0]][tempActive[2][1]-1] and
            not board[tempActive[3][0]][tempActive[3][1]-1]
        ):
            for i in tempActive:
                i[1]-=1
        tempActive1 = deepcopy(tempActive)
        bact=deepcopy(tempActive)
        while(
             tempActive1[0][1]<10 and
            tempActive1[1][1]<10 and
            tempActive1[2][1]<10 and
            tempActive1[3][1]<10 and
            (not (
             tempActive1[0][1]<9 and
            tempActive1[1][1]<9 and
            tempActive1[2][1]<9 and
            tempActive1[3][1]<9 
             )or (not board[tempActive1[0][0]][tempActive1[0][1]+1] and
            not board[tempActive1[1][0]][tempActive1[1][1]+1] and
            not board[tempActive1[2][0]][tempActive1[2][1]+1] and
            not board[tempActive1[3][0]][tempActive1[3][1]+1]))
        ):
            temp=deepcopy(tempActive1)
            tempB=deepcopy(tempBoard)
            while(
                temp[0][0]<19 and
                temp[1][0]<19 and
                temp[2][0]<19 and
                temp[3][0]<19 and
                not tempB[temp[0][0]+1][temp[0][1]] and
                not tempB[temp[1][0]+1][temp[1][1]] and
                not tempB[temp[2][0]+1][temp[2][1]] and
                not tempB[temp[3][0]+1][temp[3][1]]
            ):
                for i in temp:
                    i[0]+=1
            for i in temp:
                tempB[i[0]][i[1]] = True
            scores.append([analyze(tempB),deepcopy(tempActive1),deepcopy(rot)])
            tempActive1[0][1]+=1
            tempActive1[1][1]+=1
            tempActive1[2][1]+=1
            tempActive1[3][1]+=1
        tempActive = deepcopy(bact)
        prev_rot = deepcopy(rot)
        for i in range(5):
            if prev_rot == rot:
                tempActive = deepcopy(bact)
                if shape == 0:
                    if i == 0:
                        tempActive, rot = rot_piece(board, shape, rot, tempActive)
                    elif i == 1:
                        if rot == 0:
                            tempActive, rot = rot_piece(
                                board, shape, rot, [[pos[0], pos[1] - 2] for pos in tempActive]
                            )
                        elif rot == 1:
                            tempActive, rot = rot_piece(
                                board, shape, rot, [[pos[0], pos[1] - 1] for pos in tempActive]
                            )
                        elif rot == 2:
                            tempActive, rot = rot_piece(
                                board, shape, rot, [[pos[0], pos[1] + 2] for pos in tempActive]
                            )
                        elif rot == 3:
                            tempActive, rot = rot_piece(
                                board, shape, rot, [[pos[0], pos[1] + 1] for pos in tempActive]
                            )
                    elif i == 2:
                        if rot == 3:
                            tempActive, rot = rot_piece(
                                board, shape, rot, [[pos[0], pos[1] - 2] for pos in tempActive]
                            )
                        elif rot == 2:
                            tempActive, rot = rot_piece(
                                board, shape, rot, [[pos[0], pos[1] - 1] for pos in tempActive]
                            )
                        elif rot == 1:
                            tempActive, rot = rot_piece(
                                board, shape, rot, [[pos[0], pos[1] + 2] for pos in tempActive]
                            )
                        elif rot == 0:
                            tempActive, rot = rot_piece(
                                board, shape, rot, [[pos[0], pos[1] + 1] for pos in tempActive]
                            )
                    elif i == 3:
                        if rot == 0:
                            tempActive, rot = rot_piece(
                                board, shape, rot, [[pos[0] - 1, pos[1] - 2] for pos in tempActive]
                            )
                        elif rot == 1:
                            tempActive, rot = rot_piece(
                                board, shape, rot, [[pos[0] + 2, pos[1] - 1] for pos in tempActive]
                            )
                        elif rot == 2:
                            tempActive, rot = rot_piece(
                                board, shape, rot, [[pos[0] + 1, pos[1] + 2] for pos in tempActive]
                            )
                        elif rot == 3:
                            tempActive, rot = rot_piece(
                                board, shape, rot, [[pos[0] - 2, pos[1] + 1] for pos in tempActive]
                            )
                    elif i == 4:
                        if rot == 0:
                            tempActive, rot = rot_piece(
                                board, shape, rot, [[pos[0] + 2, pos[1] + 1] for pos in tempActive]
                            )
                        elif rot == 1:
                            tempActive, rot = rot_piece(
                                board, shape, rot, [[pos[0] - 1, pos[1] + 2] for pos in tempActive]
                            )
                        elif rot == 2:
                            tempActive, rot = rot_piece(
                                board, shape, rot, [[pos[0] - 2, pos[1] - 1] for pos in tempActive]
                            )
                        elif rot == 3:
                            tempActive, rot = rot_piece(
                                board, shape, rot, [[pos[0] + 1, pos[1] - 2] for pos in tempActive]
                            )
                else:
                    if i == 0:
                        tempActive, rot = rot_piece(board, shape, rot, tempActive)
                    elif i == 1:
                        if rot == 0 or rot == 3:
                            tempActive, rot = rot_piece(
                                board, shape, rot, [[pos[0], pos[1] - 1] for pos in tempActive]
                            )
                        else:
                            tempActive, rot = rot_piece(
                                board, shape, rot, [[pos[0], pos[1] + 1] for pos in tempActive]
                            )
                    elif i == 2:
                        if rot == 0:
                            tempActive, rot = rot_piece(
                                board, shape, rot, [[pos[0] + 1, pos[1] - 1] for pos in tempActive]
                            )
                        elif rot == 1:
                            tempActive, rot = rot_piece(
                                board, shape, rot, [[pos[0] - 1, pos[1] + 1] for pos in tempActive]
                            )
                        elif rot == 2:
                            tempActive, rot = rot_piece(
                                board, shape, rot, [[pos[0] + 1, pos[1] + 1] for pos in tempActive]
                            )
                        elif rot == 3:
                            tempActive, rot = rot_piece(
                                board, shape, rot, [[pos[0] - 1, pos[1] - 1] for pos in tempActive]
                            )
                    elif i == 3:
                        if rot in {0, 2}:
                            tempActive, rot = rot_piece(
                                board, shape, rot, [[pos[0] - 2, pos[1]] for pos in tempActive]
                            )
                        elif rot in {1, 3}:
                            tempActive, rot = rot_piece(
                                board, shape, rot, [[pos[0] + 2, pos[1]] for pos in tempActive]
                            )
                    elif i == 4:
                        if rot == 0:
                            tempActive, rot = rot_piece(
                                board, shape, rot, [[pos[0] - 2, pos[1] - 1] for pos in tempActive]
                            )
                        elif rot == 1:
                            tempActive, rot = rot_piece(
                                board, shape, rot, [[pos[0] + 2, pos[1] + 1] for pos in tempActive]
                            )
                        elif rot == 2:
                            tempActive, rot = rot_piece(
                                board, shape, rot, [[pos[0] - 2, pos[1] + 1] for pos in tempActive]
                            )
                        elif rot == 3:
                            tempActive, rot = rot_piece(
                                board, shape, rot, [[pos[0] + 2, pos[1] - 1] for pos in tempActive]
                            )
        
        if prev_rot == rot:
            tempActive = deepcopy(bact)
        
        #print(tempActive)
    maxScore=-100000
    maxInd=0
    for i in range (len(scores)):
        if(scores[i][0]>maxScore):
            maxScore=scores[i][0]
            maxInd=i
    #print(maxScore,shape,len(scores))
    if(len(scores)==0):
        return 0,active
    return scores[maxInd][0],scores[maxInd][1]

tx=[
    [[0, 0], [0, 1], [0, 2], [0, 3]],
    [[0, 0], [0, 1], [0, 2], [0, 3]],
    [[0, 0], [0, 1], [0, 2], [0, 3]],
    [[0, 0], [0, 1], [0, 2], [0, 3]],
    [[0, 4], [0, 5], [0, 6], [0, 7]],
    [[0, 4], [0, 5], [0, 6], [0, 7]],
    [[0, 4], [0, 5], [0, 6], [0, 7]],
    [[0, 4], [0, 5], [0, 6], [0, 7]],
    [[0, 8], [1, 8], [2, 8], [3, 8]],
    [[0, 9], [1, 9], [2, 9], [3, 9]],
]
def main():
    global bag, next, active, shape, held, board,level,score,lines,rot,hold
    move = False
    
    while True:
        if(not move):
           
            scr,active=automate(board,active,shape,rot)
            scr2,active2=automate(board,deepcopy(activePos[hold]),hold,0)
            if(scr2>scr):
                active=active2
                temp=shape
                shape=hold
                rot=0
                hold=temp
                
            
            move = True
        if (move):
            
            move = False
            while(
                active[0][0] < 19 and
                active[1][0] < 19 and
                active[2][0] < 19 and
                active[3][0] < 19 and
                not board[active[0][0]+1][active[0][1]] and
                not board[active[1][0]+1][active[1][1]] and
                not board[active[2][0]+1][active[2][1]] and
                not board[active[3][0]+1][active[3][1]]
            ):
                for i in active:
                    i[0]+=1
            if not createNewPiece():
                break

        



    print("Score: " + str(score))
    print("Time: " + str(time.time() - startTime))

    

main()