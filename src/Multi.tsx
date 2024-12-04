import { useAtom } from "jotai";
import MainBoard from "./Components/MainBoard";
import { pageAtom, stateAtom } from "./atoms";
import SpeedLvAndLine from "./Components/SpeedLvAndLine";
import Hold from "./Components/Hold";
import Next from "./Components/Next";
import TimeScoreAndLineCounter from "./Components/TimeScoreAndLineCounter";

function Multi() {
	const [state] = useAtom(stateAtom);
	const [page] = useAtom(pageAtom);
	return (
		<>
			<div
				className="h-full w-[18vmin] duration-500 flex flex-col justify-center items-center  "
				style={{
					opacity: page == "multi" ? 1 : 0,
					marginTop: page == "multi" ? "0" : "10vmin",
					marginLeft:
						page == "multi"
							? "0"
							: state == "play"
							? "70vmin"
							: "125vmin",
				}}>
				<div className="h-full w-full flex flex-col items-center justify-center ">
					<Hold />
				</div>
				<div className="h-full w-full flex flex-col items-center justify-center ">
					<SpeedLvAndLine />
				</div>
			</div>

			<div
				className="w-[95.26vmin] pointer-events-none ml-[-23.7vmin] mr-[-23.7vmin] h-[100vmin] mt-[3.6vmin] duration-500 flex items-center justify-center"
				style={{
					opacity: page == "multi" || state == "play" ? 1 : 0,
				}}>
				<MainBoard />
			</div>
			
            <div
				className="h-full w-[18vmin]  flex flex-col duration-500 justify-center items-center  "
				style={{
					opacity: page == "multi" ? 1 : 0,
					marginTop: page == "multi" ? "0" : "10vmin",
				}}>
				<div className="h-full w-full flex flex-col items-center justify-center ">
					<Next />
				</div>
				<div className="h-full w-full flex flex-col items-center justify-center ">
					
					<TimeScoreAndLineCounter />
				</div>
			</div>
		</>
	);
}

export default Multi;
