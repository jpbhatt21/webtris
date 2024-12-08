import { useAtom } from "jotai";
import { autoplayAtom, pageAtom, stateAtom } from "./atoms";
import Hold from "./Components/Hold";
import SpeedLvAndLine from "./Components/SpeedLvAndLine";
import Next from "./Components/Next";
import Autoplay from "./Components/Autoplay";
import TimeScoreAndLineCounter from "./Components/TimeScoreAndLineCounter";
import MainBoard from "./Components/MainBoard";
import { svg } from "./constants";
import SuggestMoves from "./Components/SuggestMoves";

function Single() {
	const [state, setState] = useAtom(stateAtom);
	const [page] = useAtom(pageAtom);
	const [autoplay] = useAtom(autoplayAtom);

	return (
		<>
			<div
				className="h-full w-[18vmin] duration-500 flex flex-col justify-center items-center  "
				style={{
					opacity: page == "single" ? 1 : 0,
					marginTop: page == "single" ? "0" : "10vmin",
					marginLeft:
						page == "single"
							? "0"
							: state == "play"
							? "70vmin"
							: "125vmin",
				}}>
				<div className="h-full w-full flex flex-col items-center justify-center ">
					<div
						onClick={() => {
							// console.log("click");
							setState("pause");
						}}
						className="h-[4vmin] text-[2vmin] cursor-pointer select-none gap-[0.5vmin] -mt-[8vmin] mb-[4vmin] flex items-center justify-center">
						<div className="h-[2vmin] flex items-center justify-center w-[2vmin]">
							{svg.pause}
						</div>
						<label className="">Pause</label>{" "}
					</div>
					<Hold />
				</div>
				<div className="h-full w-full flex flex-col items-center justify-evenly ">
					<div className="w-[18vmin] h-[18vmin] duration-300 flex flex-col items-center justify-end"
					style={{
						opacity:autoplay?0:1
					}}
					>
						<SuggestMoves />
					</div>
					<div className="w-[18vmin]  h-[20vmin] flex flex-col items-center justify-center">
						<SpeedLvAndLine />
					</div>
				</div>
			</div>
			<div
				className="w-[95.26vmin] pointer-events-none ml-[-23.7vmin] mr-[-23.7vmin] h-[100vmin] mt-[3.6vmin] duration-500 flex items-center justify-center"
				style={{
					opacity: page == "single" || state == "play" ? 1 : 0,
				}}>
				<MainBoard />
			</div>
			<div
				className="h-full w-[18vmin]  flex flex-col duration-500 justify-center items-center  "
				style={{
					opacity: page == "single" ? 1 : 0,
					marginTop: page == "single" ? "0" : "10vmin",
				}}>
				<div className="h-full w-full flex flex-col items-center justify-center ">
					<Next />
				</div>
				<div className="h-full w-full flex flex-col items-center justify-evenly ">
					<div className="w-[18vmin] h-[18vmin] flex flex-col items-center justify-end">
						<Autoplay />
					</div>
					<div className="w-[18vmin]  h-[20vmin] flex flex-col items-center justify-center">
						<TimeScoreAndLineCounter />
					</div>
				</div>
			</div>
		</>
	);
}

export default Single;
