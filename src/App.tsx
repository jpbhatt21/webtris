import { useEffect, useState } from "react";
import {
	activePos,
	getColorScheme,
	getWeights,
	svg,
} from "./Helper";
import PauseScreen from "./Pause";
import StartScreen from "./Start";
import SettingsScreen from "./Settings";
import { autoplay, getDur, getStarted, setDur, setStarted, startMainGameLoop } from "./MainGame";
let inter: any = null;
let setInter = (val: any) => {
	inter = val;
	if (!getStarted()) {
		setDur(100);
		setStarted(true);
	}
};
let theme = getColorScheme();
let prevWeight = JSON.stringify(getWeights());
function App() {
	let dur = getDur();
	theme = getColorScheme();
	const [_, setUpdate] = useState(0);
	let started = getStarted();
	const [linesCleared, setLinesCleared] = useState(0);
	const [level, setLevel] = useState(0);
	const [weights] = useState(getWeights());
	if (weights !== prevWeight) {
		prevWeight = JSON.stringify(weights);
		window.localStorage.setItem("weights", JSON.stringify(weights));
	}
	let [board, setBoard] = useState(
		Array.from({ length: 20 }, (_) =>
			Array.from({ length: 10 }, (_) => ({
				occupied: false,
				active: false,
				color: 0,
			}))
		)
	);
	const [controls, setControls] = useState(false);
	const [gameOver, setGameOver] = useState(false);
	const [restart, setRestart] = useState(new Date().getTime());
	const [score, setScore] = useState(0);
	const [lcRect, setLcRect] = useState([0, 0, 0, 0]);
	const [active, setActive] = useState(
		JSON.parse(JSON.stringify(activePos[0]))
	);
	const [ghost, setGhost] = useState(
		JSON.parse(JSON.stringify(activePos[0]))
	);
	let shapesy = [
		"1111",
		"100 111",
		"001 111",
		"11 11",
		"011 110",
		"110 011",
		"1 111",
		"",
	];
	let [nextShape, setNextShape] = useState(7);
	let [curShape, setCurShape] = useState(7);
	let [holdShape, setHoldShape] = useState(7);
	const [autp, setAutp] = useState(autoplay);
	let timeDiff = (new Date().getTime() - restart) / 1000;
	let sec = Math.floor(timeDiff % 60);
	let min = Math.floor(timeDiff / 60);
	const [paused, setPaused] = useState(false);
	useEffect(() => {
		if (inter == null) {
			setGameOver(false);
			inter=startMainGameLoop(
				{
					board,setBoard,setLcRect,setScore,setLinesCleared,setLevel,setActive,setGameOver,setNextShape,setCurShape,setPaused,setControls,setAutp,setHoldShape,setGhost
				}
			)
		}
	}, [restart]);
	useEffect(() => {
		if (controls && started) setPaused(true);
	}, [controls]);
	return (
		<>
			<div
				className="fixed mts gap-[2vmin] w-full h-full flex items-center justify-center "
				style={{
					color: theme.text,
					backgroundColor: theme.background,
				}}>
				<div
					className="h-full w-[18vmin] duration-300 flex flex-col justify-center items-center  "
					style={{
						opacity: started ? 1 : 0,
					}}>
					<div className="h-full w-full flex flex-col items-center justify-center ">
						<div
							onClick={() => {
								setControls(!controls);
							}}
							className="h-[4vmin] cursor-pointer select-none gap-[0.5vmin] -mt-[8vmin] mb-[4vmin] flex items-center justify-center">
							<div className="h-[2vmin] flex items-center justify-center w-[2vmin]">
								{svg.settings}
							</div>
							<label className="">Settings</label>{" "}
						</div>
						<div
							className="w-full aspect-square border  rounded-[2vmin] flex flex-col items-center justify-evenly "
							style={{
								borderColor: theme.text,
							}}>
							<div className="w-full flex flex-col h-2/3 items-center justify-center">
								{shapesy[holdShape].split(" ").map((row) => {
									return (
										<div className="w-full h-[4vmin] flex justify-center ">
											{row.split("").map((cell) =>
												cell !== "0" ? (
													<div
														className="w-[4vmin] aspect-square rounded-[0.4vmin] border"
														style={{
															backgroundColor:
																theme.accents[
																	holdShape
																],
															borderColor:
																theme.background,
														}}></div>
												) : (
													<div className="w-[4vmin] aspect-square "></div>
												)
											)}
										</div>
									);
								})}
							</div>
							Hold
						</div>
					</div>
					<div className="h-full w-full flex flex-col items-center justify-center ">
						<div className="text-[2vmin]">
							Speed Lv. {level + 1}
						</div>
						{/* <div>
							Score :{(odds).toFixed(2)}
						</div> */}
						<div className="w-full text-[3vmin] mt-[2vmin] flex flex-col items-center justify-center aspect-square">
							<svg
								className="w-[18vmin] h-[18vmin] absolute"
								viewBox="0 0 200 200"
								xmlns="http://www.w3.org/2000/svg"
								style={{
									transform: "rotate(-90deg)",
								}}>
								<circle
									r={95}
									cx={100}
									cy={100}
									fill="transparent"
									stroke={theme.backpop}
									strokeWidth="10px"
									strokeDasharray="596.68px"
									strokeDashoffset={0}
								/>
								<circle
									r={95}
									cx={100}
									cy={100}
									className="duration-100 ease-in-out"
									stroke={theme.accents[4]}
									strokeWidth={10}
									strokeLinecap="round"
									strokeDashoffset={
										(596.68 *
											(10 -
												(linesCleared +
													10 *
														Math.floor(
															linesCleared / 10
														)))) /
										10
									}
									fill="transparent"
									strokeDasharray="596.68px"
								/>
							</svg>
							<div className="w-fit h-fit flex flex-col items-center justify-center">
								<div>{linesCleared}</div>
								<div className="w-full h-[1px] bg-white"></div>
								<div>{(level + 1) * 10}</div>
							</div>
						</div>
						{/* <label>Lines</label> */}
					</div>
				</div>
				<div className="w-[45vmin] h-[90vmin] flex items-center justify-center">
					<svg
						id="mainboard"
						xmlns="http://www.w3.org/2000/svg"
						className=" w-full h-full tms duration-200  mb-0 "
						viewBox="0 0 1055 2110"
						fill="none">
						{board.map((row, i) =>
							row.map((cell, j) => (
								<rect
									width={100}
									className="duration-100 ease-in-out"
									height={100}
									rx={10}
									x={5 + j * 105}
									y={5 + i * 105}
									fill={
										cell.occupied
											? theme.accents[cell.color]
											: theme.backpop
									}
									key={`${i}-${j}`}
								/>
							))
						)}
						{ghost.map((pos: any, ind: any) => (
							<rect
								className="duration-[15ms] opacity- 0 brightness-75 "
								style={{
									transitionDuration: autoplay
										? Math.min(dur / 4, 25) + "ms"
										: "25ms",
								}}
								width={100}
								height={100}
								rx={10}
								x={5 + pos[1] * 105}
								y={5 + pos[0] * 105}
								fill={
									theme.accents[
										autoplay ? curShape : curShape
									]
								}
								key={"ghos" + ind + "" + curShape}
							/>
						))}
						{active.map((pos: any, ind: any) => (
							<rect
								className="duration-[15ms]"
								style={{
									transitionDuration: autoplay
										? Math.min(dur / 4, 25) + "ms"
										: "25ms",
								}}
								width={100}
								height={100}
								rx={10}
								x={5 + pos[1] * 105}
								y={5 + pos[0] * 105}
								fill={theme.accents[curShape]}
								key={"act" + ind + "" + curShape}
							/>
						))}
					</svg>
					<div className="w-[48vmin] mt-[-5vmin] absolute h-[20vmin]">
						<div
							className="w-full bg-black h-full top-0 left-0 fixed flex items-center duration-200 justify-center "
							style={{
								pointerEvents:
									paused || gameOver || controls
										? "all"
										: "none",
								backgroundColor:
									"#000000" +
									(paused || gameOver || controls
										? "6B"
										: "00"),
							}}
							id="dismiss"
							onClick={() => {
								if (controls) setControls(false);
								if (paused) setPaused(false);
							}}
						/>
						<PauseScreen
							props={{
								show:
									(paused || gameOver) &&
									!controls &&
									started,
								gameOver,
								setPaused,
								setGameOver,
								setBoard,
								inter,
								setInter,
								setRestart,
								theme,
							}}
						/>

						<StartScreen
							props={{
								show:
									inter !== null &&
									!started &&
									!controls &&
									!false,
								setBoard,
								inter,
								setInter,
								setRestart,
								setPaused,
								setGameOver,
								setAutp,
								theme,
							}}
						/>
						<SettingsScreen
							props={{
								show: controls || !true,
								theme,
								setUpdate,
							}}
						/>
					</div>
				</div>
				<div
					className="h-full w-[18vmin]  flex flex-col duration-300 justify-center items-center  "
					style={{
						opacity: started ? 1 : 0,
					}}>
					<div className="h-full w-full flex flex-col items-center justify-center ">
						<div
							className="w-full aspect-square border border-bcol rounded-[2vmin] flex flex-col items-center justify-evenly"
							style={{
								borderColor: theme.text,
							}}>
							<div className="w-full flex flex-col h-2/3 items-center justify-center">
								{shapesy[nextShape].split(" ").map((row) => {
									return (
										<div className="w-full h-[4vmin] flex justify-center ">
											{row.split("").map((cell) =>
												cell !== "0" ? (
													<div
														className="w-[4vmin] aspect-square rounded-[0.4vmin] border"
														style={{
															backgroundColor:
																theme.accents[
																	nextShape
																],
															borderColor:
																theme.background,
														}}></div>
												) : (
													<div className="w-[4vmin] aspect-square "></div>
												)
											)}
										</div>
									);
								})}
							</div>
							<label className="">Next</label>
						</div>
					</div>
					<div className="h-full w-full flex flex-col items-center justify-center ">
						<div
							className="text-[2vmin] duration-200 "
							style={{
								marginTop:
									!autp || !started ? "0" : "-17.25vmin",
							}}>
							Autoplay
						</div>
						<div
							className="bg-post mb-[2vmin] h-[3vmin] duration-200 rounded-full  p-[0.25vmin] border aspect-video"
							style={{
								backgroundColor:
									autp && started
										? theme.accents[4] + "22"
										: theme.accents[5] + "22",
								borderColor:
									autp && started
										? theme.accents[4] + "35"
										: theme.accents[5] + "35",
							}}
							onClick={() => {
								setAutp(!autp);
							}}>
							<div
								className="h-full pointer-events-none aspect-square bg-bcol rounded-full duration-200"
								style={{
									marginLeft: autp && started ? "50%" : "0",
									backgroundColor:
										autp && started
											? theme.accents[4]
											: theme.accents[5],
								}}></div>
						</div>
						<div
							className="text-[1.5vmin] lexend mb-[0.75vmin] duration-200 h-0 w-[20vmin] flex flex-col"
							style={{
								height: autp && started ? "12.25vmin" : "0vmin",
								overflow: "hidden",
								opacity: autp && started ? "1" : "0",
							}}>
							<div className="text-[2vmin] mts w-full text-center">
								Weights
							</div>
							<div className="w-full flex justify-between px-[0.25vmin] gap-[1.5vmin]">
								<div className="w-[8.5vmin]  gap-[0.5vmin] justify-between flex ">
									<div className="w-[4vmin]">WB</div>{" "}
									<div>:</div>
									<input
										type="number"
										step="0.01"
										className="bg-black w-[4vmin] bg-opacity-0 text-center "
										defaultValue={weights.weightedBlocks}
										onChange={(e) => {
											weights.weightedBlocks = parseFloat(
												e.target.value
											);
										}}
									/>
								</div>
								<div className="w-[8.5vmin]  gap-[0.5vmin] justify-between flex ">
									<div className="w-[4vmin]">CH</div>{" "}
									<div>:</div>
									<input
										type="number"
										step="0.01"
										className="bg-black w-[4vmin] bg-opacity-0 text-center "
										defaultValue={weights.connectedHoles}
										onChange={(e) => {
											weights.connectedHoles = parseFloat(
												e.target.value
											);
										}}
									/>
								</div>
							</div>

							<div className="w-full flex justify-between px-[0.25vmin] gap-[1.5vmin]">
								<div className="w-[8.5vmin]  gap-[0.5vmin] justify-between flex ">
									<div className="w-[4vmin]">RH</div>{" "}
									<div>:</div>
									<input
										type="number"
										step="0.01"
										className="bg-black w-[4vmin] bg-opacity-0 text-center "
										defaultValue={weights.roughness}
										onChange={(e) => {
											weights.roughness = parseFloat(
												e.target.value
											);
										}}
									/>
								</div>
								<div className="w-[8.5vmin]  gap-[0.5vmin] justify-between flex ">
									<div className="w-[4vmin]">PHP</div>{" "}
									<div>:</div>
									<input
										type="number"
										step="0.01"
										className="bg-black w-[4vmin] bg-opacity-0 text-center "
										defaultValue={weights.pitholePercentage}
										onChange={(e) => {
											weights.pitholePercentage =
												parseFloat(e.target.value);
										}}
									/>
								</div>
							</div>

							<div className="w-full flex justify-between px-[0.25vmin] gap-[1.5vmin]">
								<div className="w-[8.5vmin]  gap-[0.5vmin] justify-between flex ">
									<div className="w-[4vmin]">CL</div>{" "}
									<div>:</div>
									<input
										type="number"
										step="0.01"
										className="bg-black w-[4vmin] bg-opacity-0 text-center "
										defaultValue={weights.clearAbleLines}
										onChange={(e) => {
											weights.clearAbleLines = parseFloat(
												e.target.value
											);
										}}
									/>
								</div>
								<div className="w-[8.5vmin]  gap-[0.5vmin] justify-between flex ">
									<div className="w-[4vmin]">DH</div>{" "}
									<div>:</div>
									<input
										type="number"
										step="0.01"
										className="bg-black w-[4vmin] bg-opacity-0 text-center "
										defaultValue={weights.deepestHole}
										onChange={(e) => {
											weights.deepestHole = parseFloat(
												e.target.value
											);
										}}
									/>
								</div>
							</div>

							<div className="w-full flex justify-between px-[0.25vmin] gap-[1.5vmin]">
								<div className="w-[8.5vmin]  gap-[0.5vmin] justify-between flex ">
									<div className="w-[4vmin]">BLK</div>{" "}
									<div>:</div>
									<input
										type="number"
										step="0.01"
										className="bg-black w-[4vmin] bg-opacity-0 text-center "
										defaultValue={weights.blocks}
										onChange={(e) => {
											weights.blocks = parseFloat(
												e.target.value
											);
										}}
									/>
								</div>
								<div className="w-[8.5vmin]  gap-[0.5vmin] justify-between flex ">
									<div className="w-[4vmin]">CLH</div>{" "}
									<div>:</div>
									<input
										type="number"
										step="0.01"
										className="bg-black w-[4vmin] bg-opacity-0 text-center "
										defaultValue={weights.colHoles}
										onChange={(e) => {
											weights.colHoles = parseFloat(
												e.target.value
											);
										}}
									/>
								</div>
							</div>
						</div>
						<div
							className="flex text-[2vmin] mts gap-[0.25vmin] duration-200 flex-col mb-[2vmin] items-center"
							style={{
								height: autp && started ? "5vmin" : "0vmin",
								overflow: "hidden",
								opacity: autp && started ? "1" : "0",
							}}>
							Speed
							<input
								type="range"
								className="w-[13vmin] opacity-0"
								defaultValue={100 - dur / 10}
								min={0}
								max={100}
								onChange={(e) => {
									setDur((100 - parseFloat(e.target.value)) * 10)
								}}
							/>
							<div className="w-[14vmin] pointer-events-none px-[1vmin] -mt-[2vmin] overflow-visible min-h-[2vmin] ">
								<div
									className="w-full h-[2vmin] pointer-events-none rounded-full border-y-[0.9vmin]"
									style={{
										backgroundColor: theme.backpop,
										borderColor: theme.background,
									}}
									
									></div>
								<div
									className="w-[12vmin] h-[0.5vmin] pointer-events-none -mt-[1.25vmin] rounded-full"
									style={{
										backgroundColor: theme.accents[4]+"99",
										width:(100 - dur / 10)*0.12	+"vmin"
									}}>
								</div>
								<div className="h-[1.5vmin] pointer-events-none -mt-[1vmin] aspect-square rounded-full"
								style={{
									backgroundColor: theme.accents[4],
									marginLeft:((100 - dur / 10)*0.12	-0.75)+"vmin"
								}}
								></div>
							</div>
						</div>

						<div className="text-[2vmin]">Time</div>
						<div className="text-[2vmin] mb-[2vmin]">
							{(min < 10 ? "0" : "") +
								min +
								":" +
								(sec < 10 ? "0" : "") +
								sec}
						</div>
						<div className="text-[2vmin]">Score</div>
						<div className="text-[2vmin]">
							{score.toLocaleString()}
						</div>
						<div className="w-full mt-[4vmin] overflow-hidden rounded-full flex h-[1.5vmin]">
							{lcRect.map((val, i) => (
								<div
									className="w-full min-w-fit duration-75 text-[1.5vmin]  text h-full flex items-center justify-center bg-white bg-opacity-50"
									style={{
										width:
											((val * (i + 1)) / linesCleared) *
												100 +
											"%",
										backgroundColor: theme.accents[i],
										paddingInline: val > 0 ? "0.5vmin" : "",
									}}>
									<div style={{ color: theme.background }}>
										{val > 0 ? val : ""}
									</div>
									<div
										className=" absolute  rotate-90"
										style={{
											marginTop:
												i % 2 == 0
													? i == 0
														? "-3vmin"
														: "-3vmin"
													: "",
											marginBottom:
												i % 2 == 1
													? i == 1
														? "-3vmin"
														: "-3vmin"
													: "",
										}}>
										{val > 0 ? "-" : ""}
									</div>
									<div
										className=" absolute "
										style={{
											marginTop:
												i % 2 == 0
													? i == 0
														? "-6vmin"
														: "-6vmin"
													: "",
											marginBottom:
												i % 2 == 1
													? i == 1
														? "-6vmin"
														: "-6vmin"
													: "",
										}}>
										{val > 0
											? [
													"Single",
													"Double",
													"Triple",
													"Tetris",
											  ][i]
											: ""}
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default App;
