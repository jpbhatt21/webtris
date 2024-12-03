import { useAtom } from "jotai";
import {  pageAtom, stateAtom } from "./atoms";
import Hold from "./Components/Hold";
import SpeedLvAndLine from "./Components/SpeedLvAndLine";
import Next from "./Components/Next";
import Autoplay from "./Components/Autoplay";
import TimeScoreAndLineCounter from "./Components/TimeScoreAndLineCounter";
import MainBoard from "./Components/MainBoard";

function Single() {
    const [state, setState] = useAtom(stateAtom);
    const [page] = useAtom(pageAtom);
    
	return (
		<>
			<div
				className="h-full w-[18vmin] duration-500 prt flex flex-col justify-center items-center  "
				style={{
					opacity: page=="single" ? 1 : 0,
					marginTop: page=="single" ? "0" : "10vmin",
					marginLeft: page=="single" ? "0" :state!=="settings"?"80vmin":"125vmin",
				}}>
				<div className="h-full w-full flex flex-col items-center justify-center ">
					<div
						onClick={() => {
							setState("pause")
                            
						}}
						className="h-[4vmin] cursor-pointer select-none gap-[0.5vmin] -mt-[8vmin] mb-[4vmin] flex items-center justify-center">
						<div className="h-[2vmin] flex items-center justify-center w-[2vmin]">
							||{/* {svg.settings} */}
						</div>
						<label className="">Pause</label>{" "}
					</div>
					<Hold/>
				</div>
				<div className="h-full w-full flex flex-col items-center justify-center ">
					<SpeedLvAndLine/>
				</div>
			</div>
			<div className="w-[45vmin] h-[90vmin] duration-500 flex items-center justify-center"
			style={{
				marginLeft:  page=="single" || state!=="settings" ? "0" : "0vmin",
				opacity: page=="single" || state!=="settings" ? 1 : 0,

			}}
			>
				<MainBoard/>
			</div>
			<div
				className="h-full w-[18vmin] prt  flex flex-col duration-500 justify-center items-center  "
				style={{
					opacity: page=="single" ? 1 : 0,
					marginTop: page=="single" ? "0" : "10vmin",



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
