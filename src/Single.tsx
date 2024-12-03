import { useAtom } from "jotai";
import {  pageAtom, stateAtom } from "./atoms";
import {  svg } from "./constants";
import Hold from "./Components/Hold";
import SpeedLvAndLine from "./Components/SpeedLvAndLine";
import Next from "./Components/Next";
import Autoplay from "./Components/Autoplay";
import TimeScoreAndLineCounter from "./Components/TimeScoreAndLineCounter";
import MainBoard from "./Components/MainBoard";

function Single() {
    const [state, setState] = useAtom(stateAtom);
    const [page, setPage] = useAtom(pageAtom);
    
	return (
		<>
			<div
				className="h-full w-[18vmin] duration-300 flex flex-col justify-center items-center  "
				style={{
					opacity: page=="single" ? 1 : 0,
				}}>
				<div className="h-full w-full flex flex-col items-center justify-center ">
					<div
						onClick={() => {
							setState("settings")
                            
						}}
						className="h-[4vmin] cursor-pointer select-none gap-[0.5vmin] -mt-[8vmin] mb-[4vmin] flex items-center justify-center">
						<div className="h-[2vmin] flex items-center justify-center w-[2vmin]">
							{svg.settings}
						</div>
						<label className="">Settings</label>{" "}
					</div>
					<Hold/>
				</div>
				<div className="h-full w-full flex flex-col items-center justify-center ">
					<SpeedLvAndLine/>
				</div>
			</div>
			<div className="w-[45vmin] h-[90vmin] flex items-center justify-center">
				<MainBoard/>
			</div>
			<div
				className="h-full w-[18vmin]  flex flex-col duration-300 justify-center items-center  "
				style={{
					opacity: page=="single" ? 1 : 0,
				}}>
				<div className="h-full w-full flex flex-col items-center justify-center ">
					<Next/>
				</div>
				<div className="h-full w-full flex flex-col items-center justify-center ">
					
                    <Autoplay/>
					<TimeScoreAndLineCounter/>
				</div>
			</div>
		</>
	);
}

export default Single;
