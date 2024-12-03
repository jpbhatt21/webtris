import { useAtom } from "jotai";
import { stateAtom, themeAtom } from "./atoms";
import StartScreen from "./Components/Start";
import Single from "./Single";
import SettingsScreen from "./Settings";
import { useEffect } from "react";
import PauseScreen from "./Pause";

function App() {
	const [theme] = useAtom(themeAtom);
	const [state, setState] = useAtom(stateAtom);
  useEffect(()=>{},[])
	return (
		<>
			<div
				className="fixed mts gap-[2vmin] w-full h-full flex items-center justify-center "
				style={{
					color: theme.text,
					backgroundColor: theme.background,
				}}>
          <Single />
				<div className="w-[48vmin] mt-[-5vmin] absolute h-[20vmin]">
					<div
						className="w-full bg-black h-full top-0 left-0 fixed flex items-center duration-200 justify-center "
						style={{
							pointerEvents:state!="play" ? "all" : "none",
							backgroundColor:
								"#000000" +
								(state!="play" ? "6B" : "00"),
						}}
						id="dismiss"
						onClick={() => {
              if(state!=="game over")
							setState("play");
						}}
					/>
          <PauseScreen/>
          <SettingsScreen/>
          <StartScreen />
				</div>
			</div>
		</>
	);
}

export default App;
