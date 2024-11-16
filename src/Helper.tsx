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
export function rotPiece(board:any,shape:number,rot:number,act:any):any {
    let broken = false;
    act.forEach((el:any) => {
        if(el[0]<0 || el[0]>19 || el[1]<0 || el[1] > 9 ||  board[el[0]][el[1]].occupied){
            broken = true;
        }
    });
    if(broken){
        return [act,rot]
    }
    switch(shape){
        case 0:
            switch(rot){
                case 0:
                    if(act[1][0]>0 && act[1][0]+2<20 && !board[act[1][0]-1][act[1][1]].occupied && !board[act[1][0]+1][act[1][1]].occupied && !board[act[1][0]+2][act[1][1]].occupied){
                        act[0][0]-=1
                        act[0][1]+=1
                        act[2][0]+=1
                        act[2][1]-=1
                        act[3][0]+=2
                        act[3][1]-=2
                        rot=1
                    }
                    break;
                case 1:
                    if(act[1][1]-1>0 && act[1][1]+1<10 && !board[act[1][0]][act[1][1]+1].occupied && !board[act[1][0]][act[1][1]-1].occupied && !board[act[1][0]][act[1][1]-2].occupied){
                        act[0][0]+=1
                        act[0][1]+=1
                        act[2][0]-=1
                        act[2][1]-=1
                        act[3][0]-=2
                        act[3][1]-=2
                        rot=2
                    }
                    break;  
                case 2:
                    if(act[1][0]-1>0 && act[1][0]+2<20 && !board[act[1][0]-1][act[1][1]].occupied && !board[act[1][0]+1][act[1][1]].occupied && !board[act[1][0]-2][act[1][1]].occupied){
                        act[0][0]+=1
                        act[0][1]-=1
                        act[2][0]-=1
                        act[2][1]+=1
                        act[3][0]-=2
                        act[3][1]+=2
                        rot=3
                    }
                    break;
                case 3:
                    if(act[1][1]>0 && act[1][1]+1<9 && !board[act[1][0]][act[1][1]+1].occupied && !board[act[1][0]][act[1][1]-1].occupied && !board[act[1][0]][act[1][1]+2].occupied){
                        act[0][0]-=1
                        act[0][1]-=1
                        act[2][0]+=1
                        act[2][1]+=1
                        act[3][0]+=2
                        act[3][1]+=2
                        rot=0
                    }
                    break;

                    
                
                

            }
            break;
        case 1:
            switch(rot){
                case 0:
                    if(act[2][0]<19 && !board[act[2][0]-1][act[2][1]+1].occupied  && !board[act[2][0]-1][act[2][1]].occupied  && !board[act[2][0]+1][act[2][1]].occupied){
                        act[0][1]+=2
                        act[1][0]-=1
                        act[1][1]+=1
                        act[3][0]+=1
                        act[3][1]-=1
                        rot=1
                    }
                    break;
                case 1:
                    
                    if( act[2][1]>0 && !board[act[2][0]+1][act[2][1]+1].occupied  && !board[act[2][0]][act[2][1]+1].occupied  && !board[act[2][0]][act[2][1]-1].occupied){
                        act[0][0]+=2
                        act[1][0]+=1
                        act[1][1]+=1
                        act[3][0]-=1
                        act[3][1]-=1
                        rot=2
                    }
                    break;
                case 2:
                    if(act[2][0]>0 && !board[act[2][0]+1][act[2][1]-1].occupied  && !board[act[2][0]+1][act[2][1]].occupied  && !board[act[2][0]-1][act[2][1]].occupied){
                        act[0][1]-=2
                        act[1][0]+=1
                        act[1][1]-=1
                        act[3][0]-=1
                        act[3][1]+=1
                        rot=3
                    }
                    break;
                case 3:
                    if(act[2][1]<9 && !board[act[2][0]-1][act[2][1]-1].occupied  && !board[act[2][0]][act[2][1]-1].occupied  && !board[act[2][0]][act[2][1]+1].occupied){
                        act[0][0]-=2
                        act[1][0]-=1
                        act[1][1]-=1
                        act[3][0]+=1
                        act[3][1]+=1
                        rot=0
                    }
                    break;  
            }
            break;
        case 2:
            switch(rot){
                case 0:
                    if(act[2][0]<19 && !board[act[2][0]-1][act[2][1]-1].occupied  && !board[act[2][0]-1][act[2][1]].occupied  && !board[act[2][0]+1][act[2][1]].occupied){
                        act[0][0]+=2
                        act[1][0]+=1
                        act[1][1]-=1
                        act[3][0]-=1
                        act[3][1]+=1
                        rot=1
                    }
                    break;
                case 1:
                    if(act[2][1]>0 && !board[act[2][0]+1][act[2][1]-1].occupied  && !board[act[2][0]][act[2][1]-1].occupied  && !board[act[2][0]][act[2][1]+1].occupied){
                        act[0][1]-=2
                        act[1][0]-=1
                        act[1][1]-=1
                        act[3][0]+=1
                        act[3][1]+=1
                        rot=2
                    }
                    break;
                case 2:
                    if(act[2][0]>0 && !board[act[2][0]-1][act[2][1]+1].occupied  && !board[act[2][0]-1][act[2][1]].occupied  && !board[act[2][0]+1][act[2][1]].occupied){
                        act[0][0]-=2
                        act[1][0]-=1
                        act[1][1]+=1
                        act[3][0]+=1
                        act[3][1]-=1
                        rot=3
                    }
                    break;
                case 3:
                    if(act[2][1]<9 && !board[act[2][0]+1][act[2][1]+1].occupied  && !board[act[2][0]][act[2][1]+1].occupied  && !board[act[2][0]][act[2][1]-1].occupied){
                        act[0][1]+=2
                        act[1][0]+=1
                        act[1][1]+=1
                        act[3][0]-=1
                        act[3][1]-=1
                        rot=0
                    }
                    break;

            }
            break;
        case 3:
            switch(rot){

            }
            break;
        
        case 4:
            switch(rot){
                case 0:
                    if(act[2][0]<19 && !board[act[2][0]-1][act[2][1]+1].occupied  && !board[act[2][0]-1][act[2][1]].occupied  && !board[act[2][0]][act[2][1]-1].occupied){
                        act[0][0]+=1
                        act[0][1]+=1
                        act[1][0]+=2
                        act[3][0]-=1
                        act[3][1]+=1
                        rot=1
                    }
                    break;
                case 1:
                    if(act[2][1]>0 && !board[act[2][0]+1][act[2][1]-1].occupied  && !board[act[2][0]][act[2][1]-1].occupied  && !board[act[2][0]-1][act[2][1]].occupied){
                        act[0][0]+=1
                        act[0][1]-=1
                        act[1][1]-=2
                        act[3][0]+=1
                        act[3][1]+=1
                        rot=2
                    }
                    break;
                case 2:
                    if(act[2][0]>0 && !board[act[2][0]+1][act[2][1]-1].occupied  && !board[act[2][0]+1][act[2][1]].occupied  && !board[act[2][0]][act[2][1]+1].occupied){
                        act[0][0]-=1
                        act[0][1]-=1
                        act[1][0]-=2
                        act[3][0]+=1
                        act[3][1]-=1
                        rot=3
                    }
                    break;
                case 3:
                    if(act[2][1]<9 && !board[act[2][0]-1][act[2][1]+1].occupied  && !board[act[2][0]][act[2][1]+1].occupied  && !board[act[2][0]+1][act[2][1]].occupied){
                        act[0][0]-=1
                        act[0][1]+=1
                        act[1][1]+=2
                        act[3][0]-=1
                        act[3][1]-=1
                        rot=0
                    }
                    break;

            }
            break;
        case 5:
            switch(rot){
                case 0:
                    if(act[2][0]<19 && !board[act[2][0]-1][act[2][1]+1].occupied  && !board[act[2][0]-1][act[2][1]].occupied  && !board[act[2][0]+1][act[2][1]].occupied){
                        act[0][1]+=2
                        act[1][0]+=1
                        act[1][1]+=1
                        act[3][0]+=1
                        act[3][1]-=1
                        rot=1
                    }
                    break;
                case 1:
                    if(act[2][1]>0 && !board[act[2][0]+1][act[2][1]+1].occupied  && !board[act[2][0]][act[2][1]+1].occupied  && !board[act[2][0]][act[2][1]-1].occupied){
                        act[0][0]+=2
                        act[1][0]+=1
                        act[1][1]-=1
                        act[3][0]-=1
                        act[3][1]-=1
                        rot=2
                    }
                    break;
                case 2:
                    if(act[2][0]>0 && !board[act[2][0]+1][act[2][1]-1].occupied  && !board[act[2][0]+1][act[2][1]].occupied  && !board[act[2][0]-1][act[2][1]].occupied){
                        act[0][1]-=2
                        act[1][0]-=1
                        act[1][1]-=1
                        act[3][0]-=1
                        act[3][1]+=1
                        rot=3
                    }
                    break;
                case 3:
                    if(act[2][1]<9 && !board[act[2][0]-1][act[2][1]-1].occupied  && !board[act[2][0]][act[2][1]-1].occupied  && !board[act[2][0]][act[2][1]+1].occupied){
                        act[0][0]-=2
                        act[1][0]-=1
                        act[1][1]+=1
                        act[3][0]+=1
                        act[3][1]+=1
                        rot=0
                    }
                    break;
            }
            break

        case 6:
            switch(rot){
            case 0:
                if(act[2][0]<19 && !board[act[2][0]-1][act[2][1]-1].occupied  && !board[act[2][0]-1][act[2][1]].occupied  && !board[act[2][0]+1][act[2][1]].occupied){
                    act[0][0]+=1
                    act[0][1]+=1
                    act[1][0]-=1
                    act[1][1]+=1
                    act[3][0]+=1
                    act[3][1]-=1
                    rot=1
                }
                break;
            case 1:
                if(act[2][1]>0 && !board[act[2][0]+1][act[2][1]+1].occupied  && !board[act[2][0]][act[2][1]+1].occupied  && !board[act[2][0]][act[2][1]-1].occupied){
                    act[0][0]+=1
                    act[0][1]-=1
                    act[1][0]+=1
                    act[1][1]+=1
                    act[3][0]-=1
                    act[3][1]-=1
                    rot=2
                }
                break;
            case 2:
                if(act[2][0]>0 && !board[act[2][0]+1][act[2][1]+1].occupied  && !board[act[2][0]+1][act[2][1]].occupied  && !board[act[2][0]-1][act[2][1]].occupied){
                    act[0][0]-=1
                    act[0][1]-=1
                    act[1][0]+=1
                    act[1][1]-=1
                    act[3][0]-=1
                    act[3][1]+=1
                    rot=3
                }
                break;
            case 3:
                if(act[2][1]<9 && !board[act[2][0]-1][act[2][1]-1].occupied  && !board[act[2][0]][act[2][1]-1].occupied  && !board[act[2][0]][act[2][1]+1].occupied){
                    act[0][0]-=1
                    act[0][1]+=1
                    act[1][0]-=1
                    act[1][1]-=1
                    act[3][0]+=1
                    act[3][1]+=1
                    rot=0
                }
                break;
            
            }
    }
    return [act,rot]
}