import { useAtom } from "jotai";
import {
	autoplayAtom,
	pageAtom,
	resetAtom,
	stateAtom,
	themeAtom,
} from "../atoms";

function StartScreen() {
	const [theme] = useAtom(themeAtom);
	const [page, setPage] = useAtom(pageAtom);
	const setAutoplay = useAtom(autoplayAtom)[1];
	const [state, setState] = useAtom(stateAtom);
	const [, setReset] = useAtom(resetAtom);
	return (
		<>
			<div
				className="w-fit h-fit flex flex-col  duration-200 absolute items-center justify-evenly py-[2vmin]"
				style={{
					opacity: page == "home" ? "1" : "0",
					pointerEvents: page == "home" ? "all" : "none",
					marginLeft: page == "home" ? "-70vmin" : "-80vmin",
				}}>
				<div className="text-[7.5vmin] cursor-default prt">
					{" "}
					{"WEBTRIS".split("").map((x, i) => (
						<span
							key={"webtris" + i}
							className="duration-100"
							onMouseEnter={(e) => {
								e.currentTarget.style.transitionDuration =
									"0.25s";
								e.currentTarget.style.color = theme.accents[i];
							}}
							onMouseLeave={(e) => {
								e.currentTarget.style.transitionDuration = "5s";
								e.currentTarget.style.color = "";
								setTimeout(() => {
									
									if(e.currentTarget)
									e.currentTarget.style.transitionDuration =
										"0.25s";
								}, 5000);
							}}>
							{x}
						</span>
					))}
				</div>
				<div className="w-full  h-[18vmin]  flex flex-col text-[3vmin] mt-[2vmin] items-center justify-center">
					<button
						//   className="bg-post cursor-pointer rounded-sm duration-100 select-none brt hover:text-colors-bloo text-colors-yellow w-[10vmin] h-[3.25vmin] py-[0.5vmin] text-center"
						className="cursor-pointer duration-300 w-fit select-none h-fit py-[0.5vmin]"
						onClick={() => {
							if (page !== "home") return;
							setAutoplay(false);
							setReset();
							setPage("single");
						}}
						onMouseEnter={(e) => {
							e.currentTarget.style.color = theme.accents[4];
						}}
						onMouseLeave={(e) => {
							e.currentTarget.style.color = "";
						}}>
						Singleplayer
					</button>
					<button
						//   className="bg-post cursor-pointer rounded-sm duration-100 select-none brt hover:text-colors-bloo text-colors-yellow w-[10vmin] h-[3.25vmin] py-[0.5vmin] text-center"
						className=" cursor-pointer duration-300 select-none w-fit h-fit py-[0.5vmin] "
						style={{
							color: state == "onlineSearch" ? theme.accents[2] : "",
						}}
						onClick={() => {
							if (page !== "home") return;
							setState("onlineSearch");
							//props.setPaused(false);
						}}
						onMouseEnter={(e) => {
							e.currentTarget.style.color = theme.accents[2];
						}}
						onMouseLeave={(e) => {
							e.currentTarget.style.color = state == "onlineSearch" ? theme.accents[2] : "";
						}}>
						Multiplayer
					</button>
					<button
						//   className="bg-post cursor-pointer rounded-sm duration-100 select-none brt hover:text-colors-bloo text-colors-yellow w-[10vmin] h-[3.25vmin] py-[0.5vmin] text-center"
						className=" cursor-pointer  duration-300 select-none w-fit h-fit  py-[0.5vmin]"
						style={{
							color: state == "settings" ? theme.accents[0] : "",
						}}
						onClick={() => {
							if (page !== "home") return;
							if (state == "settings") {
								setState("play");
							} else setState("settings");
						}}
						onMouseEnter={(e) => {
							e.currentTarget.style.color = theme.accents[0];
						}}
						onMouseLeave={(e) => {
							e.currentTarget.style.color =
								state == "settings" ? theme.accents[0] : "";
						}}>
						Settings
					</button>
				</div>
			</div>
		</>
	);
}

export default StartScreen;
