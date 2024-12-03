import { useAtom } from "jotai";
import { pageAtom, scaleAtom, stateAtom, themeAtom } from "./atoms";
import StartScreen from "./Components/Start";
import Single from "./Single";
import SettingsScreen from "./Settings";
import { useEffect } from "react";
import PauseScreen from "./Pause";

function App() {
	const [theme] = useAtom(themeAtom);
	const [state, setState] = useAtom(stateAtom);
	const[page]=useAtom(pageAtom)
	const [scale, setScale] = useAtom(scaleAtom);
	useEffect(() => {}, []);
	return (
		<>
			<div
				className="fixed lexend gap-[2vmin] w-full h-full flex items-center justify-center "
				style={{
					color: theme.text,
					backgroundColor: theme.background,
				}}>
				<div className="fixed lexend gap-[2vmin] duration-300 w-full h-full flex items-center justify-center"
				style={{
					transform: page=="single"  ? "scale("+scale+")" : "scale(1)",
				}}
				onWheel={(e) => {
					if (page=="single" && state=="play") {
						if (e.deltaY > 0) {
							if (scale > 0.5) setScale(scale - 0.1);
						} else {
							if (scale < 1.0) setScale(scale + 0.1);
						}
					}
				}}
				>
				<Single />
				</div>
				<div className="w-full absolute pointer-events-none h-full flex items-center justify-center">
					<div
						className="w-full bg-black h-full top-0 left-0 fixed flex items-center duration-200 justify-center "
						style={{
							pointerEvents: state != "play"  ? "all" : "none",
							backgroundColor:
								"#000000" + (state != "play" && page=="single" ? "95" : "00"),
						}}
						id="dismiss"
						onClick={() => {
							if (state === "game over") 
								return
							if (state == "settings" && page=="single") 
								setState("pause");
							else
								setState("play");
							
						}}
					/>
					<PauseScreen />
					<SettingsScreen />
					<StartScreen />
				</div>
			</div>
		</>
	);
}

export default App;
