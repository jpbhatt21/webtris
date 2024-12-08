import { useAtom } from "jotai";
import { allStatsAtom, themeAtom, userAtom } from "../atoms";
import { useEffect } from "react";
let lineBar=10
function PanelSpeedLvAndLine() {
    const [theme] = useAtom(themeAtom);
    const [[level,,lines]] = useAtom(allStatsAtom);
	const [user] = useAtom(userAtom);
	useEffect(() => {
		if (user.name == "Guest") {
			lineBar = 10;
		} else {
			lineBar = 10;
		}
	}, [user]);
	
	return (
		<>
			<div className="text-[2vmin] h-[2vmin]">Speed Lv. {level + 1}</div>
			<div className="w-[18vmin] h-[18vmin] text-[3vmin] mt-[2vmin] flex flex-col items-center justify-center aspect-square">
				<svg
					className="w-[18vmin] h-[18vmin] absolute"
					viewBox="0 0 200 200"
					xmlns="http://www.w3.org/2000/svg"
					style={{
						transform: "rotate(-90deg)",
					}}>
					<circle
						r={95}
						cx={100}
						cy={100}
						fill="transparent"
						stroke={theme.backpop}
						strokeWidth="10px"
						strokeDasharray="597px"
						strokeDashoffset={0}
					/>
					<circle
						r={95}
						cx={100}
						cy={100}
						className="duration-100 ease-in-out"
						stroke={theme.accents[4]}
						strokeWidth={10}
						strokeLinecap="round"
						strokeDashoffset={
							(596.68 *
								(lineBar - (lines + lineBar * Math.floor(lines / lineBar)))) /
							lineBar
						}
						fill="transparent"
						strokeDasharray="596.68px"
					/>
				</svg>
				<div className="w-fit h-fit flex flex-col items-center justify-center">
					<div>{lines}</div>
					<div className="w-full h-[1px] bg-white"></div>
					<div>{parseInt((lines/10 + 1).toString()) * lineBar}</div>
				</div>
			</div>
		</>
	);
}

export default PanelSpeedLvAndLine;
