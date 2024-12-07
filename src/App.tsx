import { useAtom } from "jotai";
import {
	autoplayAtom,
	messageAtom,
	pageAtom,
	resetAtom,
	scaleAtom,
	stateAtom,
	themeAtom,
	timerAtom,
	userAtom,
} from "./atoms";
import StartScreen from "./Components/Start";
import Single from "./Single";
import SettingsScreen from "./Settings";
import PauseScreen from "./Pause";
import OnlineSearch from "./OnlineSearch";
import Multi from "./Multi";
import Player2Board from "./Components/Player2Board";
import { useEffect, useState } from "react";

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
	const [timerKey,setTimerKey] = useState(0);
	const [timer, setTimer] = useAtom(timerAtom);
	const [darken,setDarken] = useState(false);
	useEffect(() => {
		if(user.room!==""){
			setDarken(true);
			setTimeout(() => {
				setDarken(false);
			}, 1000);
		}
	}, [user.room]);
	useEffect(() => {
		if(timer!==0){
			if(timer==3)
				setTimerKey(timerKey+1);
			setTimeout(() => {
				setTimer(timer - 1);
			}, timer==3?1100:1000);
		}
	}, [timer]);
	// console.log(user)
	return (
		<>
			<div
				className="fixed lexend gap-[2vmin] text-[2vmin] w-full h-full flex items-center justify-center "
				style={{
					color: theme.text,
					backgroundColor: theme.background,
				}}>
				<div
					style={{
						opacity: user.name !== "Guest" ? 1 : 0,
					}}
					className=" fixed left-0 duration-300 self-start mt-[1vmin] ml-[2vmin] ">
					{user.name}
				</div>
				<div
					style={{
						opacity:
							user.name !== "Guest" && user.room == "" ? 1 : 0,
					}}
					className="fixed right-0 self-start  duration-300 mt-[1vmin] mr-[2vmin] ">
					{user.count + " player(s) online"}
				</div>
				{(
					<div
						className=" aspect-[43/60] text-[2vmin] fixed  bottom-0 right-0   h-[60vmin] flex flex-col items-center  justify-center  duration-500"
						style={{
							opacity: page == "multi" || state == "play" ? 1 : 0,
							height:	page == "multi"? 60*scale2+"vmin" : "0",
									
							pointerEvents: "none",
						}}
						>
							
						<Player2Board />
					</div>
				)}
				<div
					className="fixed lexend gap-[2vmin] duration-300 w-full h-full flex items-center justify-center"
					style={{
						transform:
							page == "single" || page == "multi"
								? "scale(" + scale + ")"
								: "scale(1) ",
								
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
						className=" aspect-[43/60] fixed  bottom-0 right-0   h-[60vmin] flex flex-col items-center  justify-center  duration-500"
						style={{
							opacity: page == "multi" || state == "play" ? 1 : 0,
							height:	page == "multi"? 60*scale2+"vmin" : "0",
									
							pointerEvents: state == "play" && page=="multi" ? "all" : "none",
						}}
						onWheel={(e) => {
							if (page == "multi" && state == "play") {
								if (e.deltaY > 0) {
									if (scale2 > 0.5) setScale2(scale2 - 0.1);
								} else {
									if (scale2 < 1.6) setScale2(scale2 + 0.1);
								}
							}
						}}>
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
										room: "",
									});
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
				<div
						className="fixed  pointer-events-none duration-500 w-full h-full  "
						style={{
							opacity: darken ? 1 : 0,
							color: theme.text,
							backgroundColor: theme.background,
						}}
					/>
				<div key={timerKey} style={{
						opacity:timer==0?0:1,
						animation:timer==0?"":"fadein 0.75s",
						backgroundColor: theme.background+"99",
					}} className="w-full pointer-events-none  text-[8vmin] duration-1000 prt fixed h-full bg-black flex items-center justify-center gap-[5vmin] bg-opacity-50">
					<div className="fadeupleft opacity-0 w-1/2 text-end">{user.name}</div>
					<div className="fadeup opacity-0 text-[6vmin] mt-[2vmin]">VS</div>
					<div className="fadeupright w-1/2  opacity-0">{user.opponent}</div>
					<div className="absolute text-[5vmin] mt-[25vmin] fadein duration-1000 "
					style={{
						opacity:timer==0?0:1,
						animationDuration:"2s"
					}}
					>{timer}</div>
				</div>
			</div>
		</>
	);
}

export default App;
