import { useAtom } from "jotai";
import { linesAtom, lineStackAtom, scoreAtom, themeAtom, timeAtom } from "../atoms";

function PanelTimeScoreAndLineCounter() {
    const [score] = useAtom(scoreAtom)
	const [time] = useAtom(timeAtom);
	const [lineStack] = useAtom(lineStackAtom);
	const [theme] = useAtom(themeAtom);
	const [lines] = useAtom(linesAtom);
	let min = Math.floor(time / 60);
	let sec = parseInt((time % 60).toFixed(0));
	return (
		<>
			<div className="text-[2vmin]">Time</div>
			<div className="text-[2vmin] mb-[2vmin]">
				{(min < 10 ? "0" : "") +
							min +
							":" +
							(sec < 10 ? "0" : "") +
							sec}
			</div>
			<div className="text-[2vmin]">Score</div>
			<div className="text-[2vmin]">{score.toLocaleString()}</div>
			<div className="w-full mt-[4vmin] overflow-hidden rounded-full flex h-[1.5vmin]">
						{lineStack.map((val, i) => (
							<div
							key={"lineStack"+i}
								className="w-full min-w-fit duration-75 text-[1.5vmin]  text h-full flex items-center justify-center bg-white bg-opacity-50"
								style={{
									width:
										((val * (i + 1)) / lines) * 100 +
										"%",
									backgroundColor: theme.accents[i],
									paddingInline: val > 0 ? "0.5vmin" : "",
								}}>
								<div style={{ color: theme.background }}>
									{val > 0 ? val : ""}
								</div>
								<div
									className=" absolute  rotate-90"
									style={{
										marginTop:
											i % 2 == 0
												? i == 0
													? "-3vmin"
													: "-3vmin"
												: "",
										marginBottom:
											i % 2 == 1
												? i == 1
													? "-3vmin"
													: "-3vmin"
												: "",
									}}>
									{val > 0 ? "-" : ""}
								</div>
								<div
									className=" absolute "
									style={{
										marginTop:
											i % 2 == 0
												? i == 0
													? "-6vmin"
													: "-6vmin"
												: "",
										marginBottom:
											i % 2 == 1
												? i == 1
													? "-6vmin"
													: "-6vmin"
												: "",
									}}>
									{val > 0
										? [
												"Single",
												"Double",
												"Triple",
												"Tetris",
										  ][i]
										: ""}
								</div>
							</div>
						))}
					</div>
		</>
	);
}

export default PanelTimeScoreAndLineCounter;
