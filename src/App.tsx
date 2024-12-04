import { useAtom } from "jotai";
import {
	autoplayAtom,
	messageAtom,
	pageAtom,
	resetAtom,
	scaleAtom,
	stateAtom,
	themeAtom,
	userAtom,
} from "./atoms";
import StartScreen from "./Components/Start";
import Single from "./Single";
import SettingsScreen from "./Settings";
import PauseScreen from "./Pause";
import OnlineSearch from "./OnlineSearch";
import Multi from "./Multi";
import Player2Board from "./Components/Player2Board";
import { useState } from "react";
import { socket } from "./constants";

function App() {
	const [theme] = useAtom(themeAtom);
	const [state, setState] = useAtom(stateAtom);
	const [,setAutoplay] = useAtom(autoplayAtom);
	const setReset = useAtom(resetAtom)[1];
	const [page,setPage] = useAtom(pageAtom);
	const [scale, setScale] = useAtom(scaleAtom);
	const [user, setUser] = useAtom(userAtom);
	const [scale2, setScale2] = useState(1);
	const [message, setMessage] = useAtom(messageAtom) as [
		{ active: boolean; heading: string; body: string },
		any
	];
	// console.log(page,state)
	return (
		<>
			<div
				className="fixed lexend gap-[2vmin] w-full h-full flex items-center justify-center "
				style={{
					color: theme.text,
					backgroundColor: theme.background,
				}}>
				<div
					style={{
						opacity: user.name !== "Guest" ? 1 : 0,
					}}
					className=" fixed left-0 duration-300 self-start mt-[1vmin] ml-[2vmin] text-[1.5vmin]">
					{user.name}
				</div>
				<div
					style={{
						opacity:
							user.name !== "Guest" && user.room == "" ? 1 : 0,
					}}
					className="fixed right-0 self-start duration-300 mt-[1vmin] mr-[2vmin] text-[1.5vmin]">
					{user.count + " player(s) online"}
				</div>
				<div
					className="fixed lexend gap-[2vmin] duration-300 w-full h-full flex items-center justify-center"
					style={{
						transform:
							page == "single" || page == "multi"
								? "scale(" + scale + ")"
								: "scale(1)",
					}}
					onWheel={(e) => {
						if (
							page == "single" ||
							(page == "multi" && state == "play")
						) {
							if (e.deltaY > 0) {
								if (scale > 0.5) setScale(scale - 0.1);
							} else {
								if (scale < 1.0) setScale(scale + 0.1);
							}
						}
					}}>
					{page != "multi" && <Single />}
					{page == "multi" && <Multi />}
				</div>

				{(
					<div
						className="w-[47vmin] fixed right-[15vmin] bottom-0  ml-[-23.7vmin] mr-[-23.7vmin] h-[50vmin] mt-[3.6vmin] duration-500 flex items-center justify-center"
						style={{
							opacity: page == "multi" || state == "play" ? 1 : 0,
							transform:
								page == "multi"
									? "scale(" + scale2 + ")"
									: "scale(1)",
						}}
						onWheel={(e) => {
							if (page == "multi" && state == "play") {
								if (e.deltaY > 0) {
									if (scale2 > 0.5) setScale2(scale2 - 0.1);
								} else {
									if (scale2 < 1.0) setScale2(scale2 + 0.1);
								}
							}
						}}>
							
						<Player2Board />
					</div>
				)}

				<div className="w-full absolute pointer-events-none h-full flex items-center justify-center">
					<div
						className="w-full bg-black h-full top-0 left-0 fixed flex items-center duration-200 justify-center "
						style={{
							pointerEvents: state != "play" ? "all" : "none",
							backgroundColor:
								"#000000" +
								(state != "play" &&
								(page == "single" || message.active)
									? "95"
									: "00"),
						}}
						id="dismiss"
						onClick={() => {
							if (state === "game over") return;
							if (message.active) {
								if (user.name !== "Guest") {
									setMessage({
										active: false,
										heading: "",
										body: "",
									});
									setUser({
										name: "Guest",
										sid: -1,
										count: "-",
										room: "",
									});
									socket.disconnect();
									setPage("home");
									setAutoplay(true);
									setReset();
								}
							}
							if (
								state == "settings" &&
								(page == "single" || message.active)
							)
								setState("pause");
							else setState("play");
						}}
					/>
					{(page == "single" || message.active) && <PauseScreen />}
					<StartScreen />
					<SettingsScreen />
					{<OnlineSearch />}
				</div>
			</div>
		</>
	);
}

export default App;
