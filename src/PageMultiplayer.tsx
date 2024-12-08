import { useAtom } from "jotai";
import GameBoardUser from "./Components/GameBoardUser";
import { pageAtom, stateAtom } from "./atoms";
import PanelSpeedLvAndLine from "./Components/PanelSpeedLvAndLine";
import PieceDisplayHold from "./Components/PieceDisplayHold";
import PieceDisplayNext from "./Components/PieceDisplayNext";
import PanelTimeScoreAndLineCounter from "./Components/PanelTimeScoreAndLineCounter";

function PageMultiplayer() {
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
					<PieceDisplayHold />
				</div>
				<div className="h-full w-full flex flex-col items-center justify-center ">
					<PanelSpeedLvAndLine />
				</div>
			</div>

			<div
				className="w-[95.26vmin] pointer-events-none ml-[-23.7vmin] mr-[-23.7vmin] h-[100vmin] mt-[3.6vmin] duration-500 flex items-center justify-center"
				style={{
					opacity: page == "multi" || state == "play" ? 1 : 0,
				}}>
				<GameBoardUser />
			</div>
			
            <div
				className="h-full w-[18vmin]  flex flex-col duration-500 justify-center items-center  "
				style={{
					opacity: page == "multi" ? 1 : 0,
					marginTop: page == "multi" ? "0" : "10vmin",
				}}>
				<div className="h-full w-full flex flex-col items-center justify-center ">
					<PieceDisplayNext />
				</div>
				<div className="h-full w-full flex flex-col items-center justify-center ">
					<div id="scrf" className=" text-[1.9vmin] text-center mb-[2vmin] duration-300">
						Score Finalized. Wait for opponent to finish.
					</div>
					<PanelTimeScoreAndLineCounter />
				</div>
			</div>
		</>
	);
}

export default PageMultiplayer;
