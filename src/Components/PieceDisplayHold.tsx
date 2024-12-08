import { useAtom } from "jotai";
import { holdShapeAtom, suggestHoldAtom, themeAtom } from "../atoms";
import { shapeGrid } from "../constants";
import ElementTetrisBlock from "./ElementTetrisBlockSVG";

function PieceDisplayHold() {
	const [theme] = useAtom(themeAtom);
	const [holdShape] = useAtom(holdShapeAtom);
	const [suggestHold] = useAtom(suggestHoldAtom);
	return (
		<>
			<div
				className="w-full aspect-square border rounded-[2vmin] flex flex-col items-center justify-evenly "
				style={{
					borderColor: suggestHold ? theme.accents[4] : theme.text,
					animation: suggestHold
						? "wgl 0.35s  cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite"
						: "none",
				}}>
				<div
					className="w-full flex flex-col h-2/3 items-center justify-center"
					key={"held" + holdShape}>
					{shapeGrid[holdShape].split(" ").map((row, i) => {
						return (
							<div
								key={"holdblock1" + i}
								className="w-full h-[4vmin] fadein flex justify-center ">
								{row.split("").map((cell, i) =>
									cell !== "0" ? (
										<svg
											key={"holdblock2 " + i}
											xmlns="http://www.w3.org/2000/svg"
											className=" w-[4vmin] h-[4vmin] tms duration-200  mb-0 "
											viewBox="0 0 105 105"
											fill="none">
											<defs>
												<linearGradient
													id={"grad"}
													x1="0%"
													x2="100%"
													y1="0%"
													y2="100%">
													<stop
														offset="0%"
														stopColor={
															theme.accents[
																holdShape
															] + "FF"
														}
													/>
													<stop
														offset="100%"
														stopColor={
															theme.accents[
																holdShape
															] + "66"
														}
													/>
												</linearGradient>
											</defs>
											<ElementTetrisBlock
												x={-520}
												y={5}
												fill={"url(#grad)"}
											/>
										</svg>
									) : (
										<div
											key={"holdblock2 " + i}
											className="w-[4vmin] aspect-square "></div>
									)
								)}
							</div>
						);
					})}
				</div>
				<label className="text-[1.5vmin]">Hold</label>
			</div>
		</>
	);
}

export default PieceDisplayHold;
