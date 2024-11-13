import { useEffect, useState } from "react";
import { newPiece } from "./Helper";

function App() {
	let bgcol = "#555";
  let ocp= "#055";
  let act= "#0ff";
  let bag=[0,1,2,3,4,5,6]
  let [key,setKey] = useState(0);
  let [board,setBoard] = useState(Array.from({ length: 20 }, (_, i) =>
    Array.from({ length: 10 }, (_, j) => ({
      occupied: false,
      active: false,
      color: bgcol,
    }))
  ));
  console.log(board);
  let random = Math.floor(Math.random() * bag.length);
  
  useEffect(() => {
    setBoard(newPiece(board,random));
    setKey(key+1);
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
			</svg>
		</>
	);
}

export default App;
