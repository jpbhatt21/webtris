import { useAtom } from "jotai";
import {
	autoplayAtom,
	messageAtom,
	pageAtom,
	resetAtom,
	stateAtom,
	themeAtom,
	userAtom,
} from "./atoms";
import { socket } from "./constants";

function PauseScreen() {
	const [theme] = useAtom(themeAtom);
	const [state, setState] = useAtom(stateAtom);
	const [, setPage] = useAtom(pageAtom);
	const setAutoplay = useAtom(autoplayAtom)[1];
	const setReset = useAtom(resetAtom)[1];
	const reset = useAtom(resetAtom)[1];
	const [user, setUser] = useAtom(userAtom);
	const [message, setMessage] = useAtom(messageAtom) as [
		{ active: boolean; heading: string; body: string },
		any
	];
	return (
		<>
			<div
				className="w-fit h-fit flex flex-col duration-500 absolute items-center justify-center py-[2vmin]"
				style={{
					opacity:
						state == "pause" || state == "game over" ? "1" : "0",
					pointerEvents:
						state == "pause" || state == "game over"
							? "all"
							: "none",
				}}>
				<div className="text-[5vmin]  prt  cursor-default ">
					{" "}
					{state == "game over" && !message.active
						? "Game Over".split("").map((x, i) => (
								<span
									key={"gameover" + i}
									className="duration-100"
									onMouseEnter={(e) => {
										e.currentTarget.style.transitionDuration =
											"0.25s";
										e.currentTarget.style.color =
											theme.accents[5];
									}}
									onMouseLeave={(e) => {
										e.currentTarget.style.transitionDuration =
											"5s";
										e.currentTarget.style.color = "";
									}}>
									{x}
								</span>
						  ))
						: message.active
						? message.heading.split("").map((x, i) => (
								<span
									key={"paused" + i}
									className="duration-100"
									onMouseEnter={(e) => {
										e.currentTarget.style.transitionDuration =
											"0.25s";
										e.currentTarget.style.color =
											theme.accents[message.heading=="Defeat"?5:message.heading=="Victory"?4:i];
									}}
									onMouseLeave={(e) => {
										e.currentTarget.style.transitionDuration =
											"5s";
										e.currentTarget.style.color = "";
									}}>
									{x}
								</span>
						  ))
						: "Paused".split("").map((x, i) => (
								<span
									key={"paused" + i}
									className="duration-100"
									onMouseEnter={(e) => {
										e.currentTarget.style.transitionDuration =
											"0.25s";
										e.currentTarget.style.color =
											theme.accents[i];
									}}
									onMouseLeave={(e) => {
										e.currentTarget.style.transitionDuration =
											"5s";
										e.currentTarget.style.color = "";
									}}>
									{x}
								</span>
						  ))}
				</div>
				<div className="w-full text-center mts mb-[1.5vmin] text-[2vmin]">
					{message.body}
				</div>
				<div className="w-full flex flex-col text-[2.5vmin] mt-[1.5vmin]  items-center justify-center">
					<button
						//   className="bg-post cursor-pointer rounded-sm duration-100 select-none brt hover:text-colors-bloo text-colors-yellow w-[10vmin] h-[3.25vmin] py-[0.5vmin] text-center"
						className="`cursor-pointer duration-300 select-none  h-fit w-fit py-[0.5vmin] text-center"
						onClick={() => {
							if (state == "play") return;
							setState("play");
						}}
						style={{
							display:
								state == "game over" || message.active
									? "none"
									: "block",
						}}
						onMouseEnter={(e) => {
							e.currentTarget.style.color = theme.accents[4];
						}}
						onMouseLeave={(e) => {
							e.currentTarget.style.color = "";
						}}>
						Resume
					</button>
					<button
						//   className="bg-post cursor-pointer rounded-sm duration-100 select-none brt hover:text-colors-bloo text-colors-yellow w-[10vmin] h-[3.25vmin] py-[0.5vmin] text-center"
						className=" cursor-pointer duration-300 select-none   h-fit w-fit py-[0.5vmin] text-center"
						onClick={() => {
							if (state == "play") return;
							if (message.active) {
								
								setUser({
									room: ""
								});
								socket.emit("joinQueue")
								setAutoplay(true);
								setReset();
								setMessage({
									active: false,
									heading: "",
									body: "",
								});
								setPage("home");
								setState("onlineSearch");
								
								return;
							}
							reset();
						}}
						onMouseEnter={(e) => {
							e.currentTarget.style.color = theme.accents[2];
						}}
						onMouseLeave={(e) => {
							e.currentTarget.style.color = "";
						}}>
						{message.active ? "Play Again" : "Restart"}
					</button>
					<button
						//   className="bg-post cursor-pointer rounded-sm duration-100 select-none brt hover:text-colors-bloo text-colors-yellow w-[10vmin] h-[3.25vmin] py-[0.5vmin] text-center"
						className=" cursor-pointer duration-300 select-none  h-fit w-fit py-[0.5vmin] text-center"
						style={{
							color: state == "settings" ? theme.accents[0] : "",
							display:
								state == "game over" || message.active
									? "none"
									: "block",
						}}
						onClick={() => {
							if (state == "play") return;
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
					<button
						//   className="bg-post cursor-pointer rounded-sm duration-100 select-none brt hover:text-colors-bloo text-colors-yellow w-[10vmin] h-[3.25vmin] py-[0.5vmin] text-center"
						className=" cursor-pointer duration-300 select-none  h-fit w-fit py-[0.5vmin] text-center"
						onClick={() => {
							if (state == "play") return;
							if (user.name !== "Guest") {
								setUser({
									room: "",
								});
								setAutoplay(true);
								setReset();
								setMessage({
									active: false,
									heading: "",
									body: "",
								});
								
							}
							setPage("home");
							setAutoplay(true);
							setReset();
						}}
						onMouseEnter={(e) => {
							e.currentTarget.style.color = theme.accents[5];
						}}
						onMouseLeave={(e) => {
							e.currentTarget.style.color = "";
						}}>
						Return Home
					</button>
				</div>
			</div>
		</>
	);
}

export default PauseScreen;
