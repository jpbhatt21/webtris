import { useAtom } from "jotai";
import { allStatsAtom, themeAtom } from "../atoms";

function SpeedLvAndLine() {
    const [theme] = useAtom(themeAtom);
    const [[level,,lines]] = useAtom(allStatsAtom);
	return (
		<>
			<div className="text-[2vmin]">Speed Lv. {level + 1}</div>
			<div className="w-full text-[3vmin] mt-[2vmin] flex flex-col items-center justify-center aspect-square">
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
								(10 - (lines + 10 * Math.floor(lines / 10)))) /
							10
						}
						fill="transparent"
						strokeDasharray="596.68px"
					/>
				</svg>
				<div className="w-fit h-fit flex flex-col items-center justify-center">
					<div>{lines}</div>
					<div className="w-full h-[1px] bg-white"></div>
					<div>{(level + 1) * 10}</div>
				</div>
			</div>
		</>
	);
}

export default SpeedLvAndLine;
