import { useAtom } from "jotai";
import { pageAtom, stateAtom, themeAtom } from "./atoms";
import StartScreen from "./Components/Start";
import Single from "./Single";
import SettingsScreen from "./Settings";
import { useEffect } from "react";
import PauseScreen from "./Pause";

function App() {
	const [theme] = useAtom(themeAtom);
	const [state, setState] = useAtom(stateAtom);
	const[page]=useAtom(pageAtom)
	useEffect(() => {}, []);
	return (
		<>
			<div
				className="fixed mts gap-[2vmin] w-full h-full flex items-center justify-center "
				style={{
					color: theme.text,
					backgroundColor: theme.background,
				}}>
				<Single />
				<div className="w-full mt-[-5vmin] absolute pointer-events-none h-full flex items-center justify-center">
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
