export function newPiece(board :any,sel:number):any {
    if(sel===0){ //I
        board[0][3].active = true;
        board[0][4].active = true;
        board[0][5].active = true;
        board[0][6].active = true;
    }
    else if(sel===1){ //J
        board[0][3].active = true;
        board[1][3].active = true;
        board[1][4].active = true;
        board[1][5].active = true;
    }
    else if(sel===2){ //L
        board[1][3].active = true;
        board[1][4].active = true;
        board[1][5].active = true;
        board[0][5].active = true;
    }
    else if(sel===3){ //O
        board[0][4].active = true;
        board[0][5].active = true;
        board[1][4].active = true;
        board[1][5].active = true;
    }
    else if(sel===4){ //S
        board[0][4].active = true;
        board[0][5].active = true;
        board[1][3].active = true;
        board[1][4].active = true;
    }
    else if(sel===5){ //T
        board[0][4].active = true;
        board[1][3].active = true;
        board[1][4].active = true;
        board[1][5].active = true;
    }
    else if(sel===6){ //Z
        board[0][3].active = true;
        board[0][4].active = true;
        board[1][4].active = true;
        board[1][5].active = true;
    }

    return board;
}