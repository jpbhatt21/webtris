import { useAtom } from "jotai";
import { autoplayAtom, pageAtom, resetAtom, stateAtom, themeAtom } from "../atoms";

function StartScreen() {
	
	const [theme] = useAtom(themeAtom);
	const [page, setPage] = useAtom(pageAtom);
	const setAutoplay = useAtom(autoplayAtom)[1];
	const [state, setState] = useAtom(stateAtom);
	const [reset,setReset]=useAtom(resetAtom);
	return (
		<>
			
			<div
				className="w-fit h-f flex flex-col  duration-200 absolute items-center justify-evenly py-[2vmin]"
				style={{
					opacity: page=="home" ? "1" : "0",
					pointerEvents: page=="home" ? "all" : "none",
					marginLeft: page=="home" ? "-40vmin" : "-80vmin",
				}}>
				<div className="text-[7vmin] cursor-default prt"> {"WEBTRIS".split("").map((x,i)=><span className="duration-100" onMouseEnter={(e) => {
							e.currentTarget.style.transitionDuration="0.25s"
							e.currentTarget.style.color=theme.accents[i]
							
						}}
						onMouseLeave={(e) => {
							e.currentTarget.style.transitionDuration="5s"
							e.currentTarget.style.color=""
						}} >{x}</span>)}</div>
				<div className="w-full flex flex-col text-[3vmin] mt-[2vmin] gap-[2vmin] items-center justify-evenly">
					<button
						//   className="bg-post cursor-pointer rounded-sm duration-100 select-none brt hover:text-colors-bloo text-colors-yellow w-[10vmin] h-[3.25vmin] py-[0.5vmin] text-center"
						className="prt cursor-pointer duration-300 select-none  w-[10vmin] h-[3.25vmin] py-[0.5vmin] text-center"
						onClick={() => {
							if(page=="single")
								return
							setAutoplay(false);
							setReset();
							setPage("single");
						}}
						onMouseEnter={(e) => {
							e.currentTarget.style.color=theme.accents[2]
						}}
						onMouseLeave={(e) => {
							e.currentTarget.style.color=""
						}}
						>
						
							Start
					</button>
					<button
						//   className="bg-post cursor-pointer rounded-sm duration-100 select-none brt hover:text-colors-bloo text-colors-yellow w-[10vmin] h-[3.25vmin] py-[0.5vmin] text-center"
						className="prt cursor-pointer duration-300 select-none  w-[10vmin] h-[3.25vmin] py-[0.5vmin] text-center"
						onClick={() => {
							if(page=="single")
								return
							//props.setPaused(false);
						}}
						onMouseEnter={(e) => {
							e.currentTarget.style.color=theme.accents[2]
						}}
						onMouseLeave={(e) => {
							e.currentTarget.style.color=""
						}}
						>
						
							Online
					</button>
					<button
						//   className="bg-post cursor-pointer rounded-sm duration-100 select-none brt hover:text-colors-bloo text-colors-yellow w-[10vmin] h-[3.25vmin] py-[0.5vmin] text-center"
						className="prt cursor-pointer duration-300 select-none  w-[10vmin] h-[3.25vmin] py-[0.5vmin] text-center"
						style={{
							color:state=="settings"?theme.accents[0]:""
						}}
						onClick={() => {
							if(page=="single")
								return
							if(state=="settings"){
								setState("play")}
							else
							setState("settings")
						}}
						onMouseEnter={(e) => {
							e.currentTarget.style.color=theme.accents[0]
						}}
						onMouseLeave={(e) => {
							e.currentTarget.style.color=state=="settings"?theme.accents[0]:""
						}}
						>
						
							Settings
					</button>
					
				</div>
			</div>
		</>
	);
}

export default StartScreen;
