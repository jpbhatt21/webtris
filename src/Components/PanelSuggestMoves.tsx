import { useAtom } from "jotai";
import { pageAtom, suggestMovesAtom, themeAtom } from "../atoms";

function PanelSuggestMoves() {
    const [theme] = useAtom(themeAtom);
    const [suggestMoves,setSuggestMoves]=useAtom(suggestMovesAtom);
    const [page]=useAtom(pageAtom);
	return (
		<>
			<div
				className="text-[2vmin] h-[4vmin] duration-200 "
				>
				Suggest Moves
			</div>
			<div
				className="bg-post mb-[2vmin] h-[3vmin] duration-200 rounded-[1vmin]  p-[0.25vmin] border aspect-video"
				style={{
					backgroundColor:
						suggestMoves && page == "single"
							? // && started
							  theme.accents[4] + "22"
							: theme.accents[5] + "22",
					borderColor:
						suggestMoves && page == "single"
							? // && started
							  theme.accents[4] + "35"
							: theme.accents[5] + "35",
				}}
				onClick={() => {
					setSuggestMoves(!suggestMoves);
				}}>
				<div
					className="h-full pointer-events-none aspect-square bg-bcol rounded-[0.8vmin]  duration-200"
					style={{
						marginLeft:
							suggestMoves && page == "single"
								? // && started
								  "50%"
								: "0",
						backgroundColor:
							suggestMoves && page == "single"
								? // && started
								  theme.accents[4]
								: theme.accents[5],
					}}></div>
			</div>
		</>
	);
}

export default PanelSuggestMoves;
