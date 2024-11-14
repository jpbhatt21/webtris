import { useEffect, useState } from "react";
import { newPiece, rotPiece } from "./Helper";
let inter:any=null
function App() {
	let bgcol = "#555";
  let ocp= "#ebcb8b";
  let act= "#a3be8c";
  let bag=[0,1,2,3,4,5,6]
  let [key,setKey] = useState(0);
  let [board,setBoard] = useState(Array.from({ length: 20 }, (_, i) =>
    Array.from({ length: 10 }, (_, j) => ({
      occupied: false,
      active: false,
      color: bgcol,
    }))
  ));
  const [pieceCount,setPieceCount] = useState(0);
  const [keys,setKeys] = useState({left:false,right:false,down:false,up:false,space:false});
  // console.log(board);
  let random = Math.floor(Math.random() * bag.length);
  let activePos=[
    [[0,3],[0,4],[0,5],[0,6]],
    [[0,3],[1,3],[1,4],[1,5]],
    [[0,5],[1,5],[1,4],[1,3]],
    [[0,4],[0,5],[1,4],[1,5]],
    [[0,4],[0,5],[1,4],[1,3]],
    [[0,3],[0,4],[1,4],[1,5]],
    [[0,4],[1,3],[1,4],[1,5]],
  ]
  const [active,setActive] = useState(activePos[random]);
  useEffect(() => {
  //   setBoard(newPiece(board,random));
  //   setKey(key+1);
  
  if(inter==null){
    let act=activePos[random];
    let shape=random;
    let keys2=JSON.parse(JSON.stringify(keys));
    let rot=0;
    window.addEventListener("keydown",(e)=>{
      if(e.code==="KeyA"){
        setKeys(prev=>({...prev,left:true}));
        keys2.left=true;
      }
      if(e.code==="KeyD"){
        setKeys(prev=>({...prev,right:true}));
        keys2.right=true;
      }
      if(e.code==="KeyS"){
        setKeys(prev=>({...prev,down:true}));
        keys2.down=true;
      }
      if(e.code==="KeyW"){
        setKeys(prev=>({...prev,up:true}));
        keys2.up=true;
      }
      if(e.code==="Space")
      {
        setKeys(prev=>({...prev,space:true}));
        keys2.space=true;
      }
    });
    window.addEventListener("keyup",(e)=>{
      if(e.code==="KeyA"){
        setKeys(prev=>({...prev,left:false}));
        keys2.left=false;
      }
      if(e.code==="KeyD"){
        setKeys(prev=>({...prev,right:false}));
        keys2.right=false;
      }
      if(e.code==="KeyS"){
        setKeys(prev=>({...prev,down:false}));
        keys2.down=false;
      }
      if(e.code==="KeyW"){
        setKeys(prev=>({...prev,up:false}));
        keys2.up=false;
      }
      if(e.code==="Space")
      {
        setKeys(prev=>({...prev,space:false}));
        keys2.space=false;
      }
    });
    let prev=new Date().getTime();
    let movClock=new Date().getTime();
    let rotClock=new Date().getTime();
    let downClock=new Date().getTime();
    let upClock=new Date().getTime();
    let cur=new Date().getTime();
    let speed=1000; //smaller is faster, in ms
    let lrSpeed=100; //smaller is faster, in ms
    let upSpeed=250; //smaller is faster, in ms
    console.log("star")
  inter=setInterval(()=>{
    
    cur=new Date().getTime();
    if(cur-movClock>=lrSpeed && keys2.left && act[0][1]!==0 && act[1][1]!==0 && act[2][1]!==0 && act[3][1]!==0 && !board[act[0][0]][act[0][1]-1].occupied && !board[act[1][0]][act[1][1]-1].occupied && !board[act[2][0]][act[2][1]-1].occupied && !board[act[3][0]][act[3][1]-1].occupied){
      act[0][1]--;
      act[1][1]--;
      act[2][1]--;
      act[3][1]--;
      movClock=new Date().getTime();
      setActive(prev=>[...act]);
    }
    else if(cur-movClock>=lrSpeed && keys2.right && act[0][1]!==9 && act[1][1]!==9 && act[2][1]!==9 && act[3][1]!==9 && !board[act[0][0]][act[0][1]+1].occupied && !board[act[1][0]][act[1][1]+1].occupied && !board[act[2][0]][act[2][1]+1].occupied && !board[act[3][0]][act[3][1]+1].occupied){
      act[0][1]++;
      act[1][1]++;
      act[2][1]++;
      act[3][1]++;
      movClock=new Date().getTime();
      setActive(prev=>[...act]);
    }
    else if(cur-movClock>=lrSpeed && keys2.down && act[0][0]!=19 && act[1][0]!=19 && act[2][0]!=19 && act[3][0]!=19 && !board[act[0][0]+1][act[0][1]].occupied && !board[act[1][0]+1][act[1][1]].occupied && !board[act[2][0]+1][act[2][1]].occupied && !board[act[3][0]+1][act[3][1]].occupied){
      act[0][0]++;
      act[1][0]++;
      act[2][0]++;
      act[3][0]++;
      movClock=new Date().getTime();
      setActive(prev=>[...act]);
    }
    if(cur-rotClock>=150 && keys2.space){
      console.log("rot", cur, rotClock);
      rotClock=cur;
      [act,rot]=rotPiece(board,shape,rot,act);
    }
    if(cur-upClock>=upSpeed && keys2.up){
      while(act[0][0]!==19 && act[1][0]!==19 && act[2][0]!==19 && act[3][0]!==19 && !board[act[0][0]+1][act[0][1]].occupied && !board[act[1][0]+1][act[1][1]].occupied && !board[act[2][0]+1][act[2][1]].occupied && !board[act[3][0]+1][act[3][1]].occupied){
        act[0][0]++;
        act[1][0]++;
        act[2][0]++;
        act[3][0]++;
      }
      act.forEach((pos:number[])=>{
        board[pos[0]][pos[1]].occupied=true;
      });
      setBoard(board);
      let random = Math.floor(Math.random() * bag.length);
      let activePos=[
        [[0,3],[0,4],[0,5],[0,6]],
        [[0,3],[1,3],[1,4],[1,5]],
        [[0,5],[1,5],[1,4],[1,3]],
        [[0,4],[0,5],[1,4],[1,5]],
        [[0,4],[0,5],[1,4],[1,3]],
        [[0,3],[0,4],[1,4],[1,5]],
        [[0,4],[1,3],[1,4],[1,5]],
      ]
      setActive(activePos[random]);
      shape=random;
      rot=0;
      act=JSON.parse(JSON.stringify(activePos[random]));
      upClock=new Date().getTime();
    }
    if(cur-downClock>=speed && act[0][0]!==19 && act[1][0]!==19 && act[2][0]!==19 && act[3][0]!==19 && !board[act[0][0]+1][act[0][1]].occupied && !board[act[1][0]+1][act[1][1]].occupied && !board[act[2][0]+1][act[2][1]].occupied && !board[act[3][0]+1][act[3][1]].occupied){
      act[0][0]++;
      act[1][0]++;
      act[2][0]++;
      act[3][0]++;
      downClock=new Date().getTime();
      setActive(prev=>[...act]);
    }
    else if (cur-downClock>=speed){
      act.forEach((pos:number[])=>{
        board[pos[0]][pos[1]].occupied=true;
      });
      setBoard(board);
      let random = Math.floor(Math.random() * bag.length);
      let activePos=[
        [[0,3],[0,4],[0,5],[0,6]],
        [[0,3],[1,3],[1,4],[1,5]],
        [[0,5],[1,5],[1,4],[1,3]],
        [[0,4],[0,5],[1,4],[1,5]],
        [[0,4],[0,5],[1,4],[1,3]],
        [[0,3],[0,4],[1,4],[1,5]],
        [[0,4],[1,3],[1,4],[1,5]],
      ] 
      setActive(activePos[random]);
      act=JSON.parse(JSON.stringify(activePos[random]));
      shape=random;
      rot=0;
    }


  },0);}
   },[]);

	return (
		<>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width={400}
				height={800}
				viewBox="0 0 1060 2110"
				fill="none"
        key={key}>
				{board.map((row, i) =>(
          row.map((cell, j) => (
            <rect
							width={100}
							height={100}
							rx={10}
							x={5 + j * 105}
							y={5 + i * 105}
							fill={cell.active?act:cell.occupied?ocp:bgcol}
							key={`${i}-${j}`}
						/>
          ))
        ))}
        {
          active.map((pos,ind)=>(
            <rect
            className="duration-100 ease-in-out"
              width={100}
              height={100}
              rx={10}
              x={5 + pos[1] * 105}
              y={5 + pos[0] * 105}
              fill={act}
              key={"act"+ind}
            />
          ))
        }
			</svg>
		</>
	);
}

export default App;
