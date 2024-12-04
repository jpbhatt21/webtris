import { useAtom } from "jotai";
import {
	nextBagAtom,
	themeAtom,
	userAtom,
} from "../atoms";
import Rect from "./Rect";
import { useEffect, useState } from "react";
import {  socket } from "../constants";
let animTimeout:any=null
function Player2Board() {
	const [board, setBoard] = useState(
		Array.from({ length: 20 }, (_) =>
			Array.from({ length: 10 }, (_) => ({
				occupied: false,
				color: 7,
			}))
		)
	)
	const [active, setActive] = useState([
		[-10, -10],
		[-10, -10],
		[-10, -10],
		[-10, -10],
	]
	);
	const [currentShape, setCurrentShape] = useState(7);
	const [lineDissapear, setLineDissapear] = useState([]);
	const [moveDown, setMoveDown] = useState(Array(20).fill(0));
	const [theme] = useAtom(themeAtom);
	const setNextBag = useAtom(nextBagAtom)[1];
	const [speed, setSpeed] = useState(960);
	
	const [user] = useAtom(userAtom);
	useEffect(() => {
		socket.on("getBag",(data:any)=>{
			setNextBag(data.bag)
		})
		socket.on("roomCom", (data: any) => {
			// console.log(data);
			if(data.nextShape && data.sender!== user.sid){
				if(animTimeout)clearTimeout(animTimeout)
				// console.log(data.currentShape)
				setBoard(data.board)
				setActive(data.active)
				setCurrentShape(data.currentShape)
				setLineDissapear(data.lineDissapear)
				setMoveDown(data.moveDown)
				setSpeed(data.speed)
				if(data.lineDissapear.length>0){
					animTimeout=setTimeout(()=>{setLineDissapear([])},parseInt(data.speed)/2+100)
				}
			}
			})
	}	, []);
	
	return (
		<>
			<svg
				id="mainboard"
				xmlns="http://www.w3.org/2000/svg"
				className=" w-full absolute h-full tms duration-200  mb-0 "
				viewBox="0 0 2110 2215"
				fill="none">
				<rect x="515" y="5" rx={7} height="2125" width="1075" stroke={theme.text}/>
				{board.map((row, i) =>
					row.map((_, j) => (
						<Rect
							x={5 + j * 105}
							y={20 + i * 105}
							fill={theme.backpop}
							key={`${i * 10 + j}blockblxxxank`}
						/>
					))
				)}
				{board.map((row, i) =>
					row.map(
						(cell, j) =>
							cell.occupied && (
								<Rect
									x={5 + j * 105}
									y={20 + i * 105}
									fill={theme.accents[cell.color]}
									style={{
										animation:
											(lineDissapear.filter((x) => x == i)
												.length > 0
												? "clear"
												: "down" + moveDown[i]) +
											" " +
											Math.max(310, speed+10) +
											"ms",
									}}
									key={`${i * 10 + j}blockxxx`+currentShape}
								/>
							)
					)
				)}
				{lineDissapear.length==0&&active.map((pos: any, ind: any) => (
					<Rect
						className="duration-[25ms] fadein shadow-xl"
						
						x={5 + pos[1] * 105}
						y={20 + pos[0] * 105}
						fill={theme.accents[currentShape]}
						key={"active" + ind + "" + currentShape}
					/>
				))}
				
			</svg>
		</>
	);
}

export default Player2Board;
