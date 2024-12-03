import { useAtom } from "jotai";
import { nextShapeAtom, themeAtom } from "../atoms";
import { shapeGrid } from "../constants";

function Next() {
    const [theme] = useAtom(themeAtom);
    const [nextShape,setNextShape] = useAtom(nextShapeAtom);
 	return (
		<>
			<div
				className="w-full aspect-square border border-bcol rounded-[2vmin] flex flex-col items-center justify-evenly"
				style={{
					borderColor: theme.text,
				}}>
				<div className="w-full flex flex-col h-2/3 items-center justify-center">
					{shapeGrid[nextShape].split(" ").map((row) => {
						return (
							<div className="w-full h-[4vmin] flex justify-center ">
								{row.split("").map((cell) =>
									cell !== "0" ? (
										<div
											className="w-[4vmin] aspect-square rounded-[0.4vmin] border"
											style={{
												backgroundColor:
													theme.accents[nextShape],
												borderColor: theme.background,
											}}></div>
									) : (
										<div className="w-[4vmin] aspect-square "></div>
									)
								)}
							</div>
						);
					})}
				</div>
				<label className="">Next</label>
			</div>
		</>
	);
}

export default Next;
