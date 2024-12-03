import { useAtom } from "jotai";
import { autoplayAtom, pageAtom, resetAtom, stateAtom, themeAtom } from "../atoms";

function StartScreen() {
	
	const [theme] = useAtom(themeAtom);
	const [page, setPage] = useAtom(pageAtom);
	const setAutoplay = useAtom(autoplayAtom)[1];
	const [reset,setReset]=useAtom(resetAtom);
	return (
		<>
			<div
				className="bg-b lank border  duration-200 border-r-0 border-l-0 shadow-lg w-[48vmin] absolute "
				style={{
					backgroundColor: theme.background,
					borderColor: theme.text,
					opacity: page=="home" ? "0.75" : "0",
					height: page=="home" ? "20vmin" : "0",
					marginTop: page=="home" ? "0vmin" : "10vmin",
					pointerEvents: page=="home" ? "all" : "none",
				}}></div>
			<div
				className="w-full h-full flex flex-col  duration-200 absolute items-center justify-evenly py-[2vmin]"
				style={{
					opacity: page=="home" ? "1" : "0",
					pointerEvents: page=="home" ? "all" : "none",
				}}>
				<div className="text-[5vmin] prt"> {"WEBTRIS"}</div>
				<div className="w-full flex text-[2vmin] items-center justify-evenly">
					<button
						//   className="bg-post cursor-pointer rounded-sm duration-100 select-none brt hover:text-colors-bloo text-colors-yellow w-[10vmin] h-[3.25vmin] py-[0.5vmin] text-center"
						className="prt cursor-pointer duration-300 select-none  w-[10vmin] h-[3.25vmin] py-[0.5vmin] text-center"
						onClick={() => {
							//props.setPaused(false);
						}}
						onMouseEnter={(e) => {
							e.currentTarget.style.color=theme.accents[2]
						}}
						onMouseLeave={(e) => {
							e.currentTarget.style.color=""
						}}
						>
						
							Multiplayer
					</button>
					<div
						className="prt cursor-pointer duration-100 select-none  w-[10vmin] h-[3.25vmin] py-[0.5vmin] text-center"
						
						onClick={() => {
							setAutoplay(false);
							setReset();
							setPage("single");

							// props.setGameOver(false);
							// props.setBoard(
							// 	Array.from({ length: 20 }, (_) =>
							// 		Array.from({ length: 10 }, (_) => ({
							// 			occupied: false,
							// 			active: false,
							// 			color: props.bgcol,
							// 		}))
							// 	)
							// );
							// props.setAutp(false);
							// clearInterval(props.inter);
							// props.setInter(null);
							// props.setRestart(new Date().getTime());
							// props.setPaused(false);
						}}
						onMouseEnter={(e) => {
							e.currentTarget.style.color=theme.accents[4]
						}}
						onMouseLeave={(e) => {
							e.currentTarget.style.color=""
						}}
						>
							Play
					</div>
				</div>
			</div>
		</>
	);
}

export default StartScreen;
