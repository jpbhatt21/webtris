import { useAtom } from "jotai";
import { holdShapeAtom, themeAtom } from "../atoms";
import { shapeGrid } from "../constants";

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
				<div className="w-full flex flex-col h-2/3 items-center justify-center">
					{shapeGrid[holdShape].split(" ").map((row) => {
						return (
							<div className="w-full h-[4vmin] flex justify-center ">
								{row.split("").map((cell) =>
									cell !== "0" ? (
										<div
											className="w-[4vmin] aspect-square rounded-[0.4vmin] border"
											style={{
												backgroundColor:
													theme.accents[holdShape],
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
				Hold
			</div>
		</>
	);
}

export default Hold;
