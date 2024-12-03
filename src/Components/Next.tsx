import { useAtom } from "jotai";
import { nextShapeAtom, themeAtom } from "../atoms";
import { shapeGrid } from "../constants";
import Rect from "./Rect";

function Next() {
    const [theme] = useAtom(themeAtom);
    const [nextShape] = useAtom(nextShapeAtom);
 	return (
		<>
			<div
				className="w-full aspect-square border border-bcol rounded-[2vmin] flex flex-col items-center justify-evenly"
				style={{
					borderColor: theme.text,
				}}>
				<div className="w-full flex flex-col h-2/3 items-center fadein justify-center" key={"next"+nextShape}>
					{shapeGrid[nextShape].split(" ").map((row,i) => {
						return (
							<div className="w-full h-[4vmin] flex justify-center " key={"nextblock"+i}>
								{row.split("").map((cell,i) =>
									cell !== "0" ? (
										<svg
											key={"nextblock2 "+i}
											xmlns="http://www.w3.org/2000/svg"
											className=" w-[4vmin] h-[4vmin] tms duration-200  mb-0 "
											viewBox="0 0 105 105"
											fill="none">
											<Rect
												x={-520}
												y={5}
												fill={
													theme.accents[
														nextShape
													]
												}
											/>
										</svg>
									) : (
										<div 
										key={"nextblock2 "+i}
										className="w-[4vmin] aspect-square "></div>
									)
								)}
							</div>
						);
					})}
				</div>
				<label className=" text-[1.5vmin]">Next</label>
			</div>
		</>
	);
}

export default Next;
