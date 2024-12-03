import { useAtom } from "jotai";
import { holdShapeAtom, themeAtom } from "../atoms";
import { shapeGrid } from "../constants";
import Rect from "./Rect";

function Hold() {
	const [theme] = useAtom(themeAtom);
	const [holdShape] = useAtom(holdShapeAtom);

	return (
		<>
			<div
				className="w-full aspect-square border  rounded-[2vmin] flex flex-col items-center justify-evenly "
				style={{
					borderColor: theme.text,
				}}>
				<div className="w-full flex flex-col h-2/3 items-center justify-center" key={"held"+holdShape}>
					{shapeGrid[holdShape].split(" ").map((row) => {
						return (
							<div className="w-full h-[4vmin] fadein flex justify-center "
							
							>
								{row.split("").map((cell) =>
									cell !== "0" ? (
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className=" w-[4vmin] h-[4vmin] tms duration-200  mb-0 "
											viewBox="0 0 105 105"
											fill="none">
											<Rect
												x={-520}
												y={5}
												fill={
													theme.accents[
														holdShape
													]
												}
											/>
										</svg>
									) : (
										<div className="w-[4vmin] aspect-square "></div>
									)
								)}
							</div>
						);
					})}
				</div>
				Hold
			</div>
		</>
	);
}

export default Hold;
