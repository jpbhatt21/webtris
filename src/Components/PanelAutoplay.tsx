import { useAtom } from "jotai";
import {
	autoplayAtom,
	autoplaySpeedAtom,
	pageAtom,
	themeAtom,
	weightsAtom,
} from "../atoms";

function PanelAutoplay() {
	const [theme] = useAtom(themeAtom);
	const [autoplay, setAutoplay] = useAtom(autoplayAtom);
	const [page] = useAtom(pageAtom);
	const [autoplaySpeed, setAutoplaySpeed] = useAtom(autoplaySpeedAtom);
	const [weights,setWeights] = useAtom(weightsAtom);
	return (
		<>
			<div
				className="text-[2vmin] h-[4vmin] duration-200 "
				style={{
					marginTop:
						!autoplay || page != "single"
							? // || !started
							  "0"
							: "-17.25vmin",
				}}>
				Autoplay
			</div>
			<div
				className="bg-post mb-[2vmin] h-[3vmin] duration-200 rounded-[1vmin]  p-[0.25vmin] border aspect-video"
				style={{
					backgroundColor:
						autoplay && page == "single"
							? // && started
							  theme.accents[4] + "22"
							: theme.accents[5] + "22",
					borderColor:
						autoplay && page == "single"
							? // && started
							  theme.accents[4] + "35"
							: theme.accents[5] + "35",
				}}
				onClick={() => {
					setAutoplay(!autoplay);
				}}>
				<div
					className="h-full pointer-events-none aspect-square bg-bcol rounded-[0.8vmin]  duration-200"
					style={{
						marginLeft:
							autoplay && page == "single"
								? // && started
								  "50%"
								: "0",
						backgroundColor:
							autoplay && page == "single"
								? // && started
								  theme.accents[4]
								: theme.accents[5],
					}}></div>
			</div>
			<div
				className="text-[1.5vmin] mst  mb-[0.75vmin] duration-200 h-0 w-[20vmin] flex flex-col"
				style={{
					height:
						autoplay && page == "single"
							? // && started
							  "12.25vmin"
							: "0vmin",
					marginBottom: autoplay && page == "single" ? "0.75vmin" : "0",
					overflow: "hidden",
					opacity:
						autoplay && page == "single"
							? // && started
							  "1"
							: "0",
				}}>
				<div className="text-[2vmin]  lexend w-full text-center">Weights</div>
				<div className="w-full flex justify-between px-[0.25vmin] gap-[1.5vmin]">
					<div className="w-[8.5vmin]  gap-[0.5vmin] justify-between flex ">
						<div className="w-[4vmin]">WB</div> <div>:</div>
						<input
							type="number"
							step="0.01"
							className="bg-black w-[4vmin] bg-opacity-0 text-center "
							defaultValue={weights.weightedBlocks}
							onChange={(e) => {
								if(!isNaN(parseFloat(e.target.value)))
								weights.weightedBlocks = parseFloat(
									e.target.value
								);
								setWeights(weights);
							}}
						/>
					</div>
					<div className="w-[8.5vmin]  gap-[0.5vmin] justify-between flex ">
						<div className="w-[4vmin]">CH</div> <div>:</div>
						<input
							type="number"
							step="0.01"
							className="bg-black w-[4vmin] bg-opacity-0 text-center "
							defaultValue={weights.connectedHoles}
							onChange={(e) => {
								if(!isNaN(parseFloat(e.target.value)))
								weights.connectedHoles = parseFloat(
									e.target.value
								);
								setWeights(weights);

							}}
						/>
					</div>
				</div>

				<div className="w-full flex justify-between px-[0.25vmin] gap-[1.5vmin]">
					<div className="w-[8.5vmin]  gap-[0.5vmin] justify-between flex ">
						<div className="w-[4vmin]">RH</div> <div>:</div>
						<input
							type="number"
							step="0.01"
							className="bg-black w-[4vmin] bg-opacity-0 text-center "
							defaultValue={weights.roughness}
							onChange={(e) => {
								if(!isNaN(parseFloat(e.target.value)))
								weights.roughness = parseFloat(e.target.value);
								setWeights(weights);
								
							}}
						/>
					</div>
					<div className="w-[8.5vmin]  gap-[0.5vmin] justify-between flex ">
						<div className="w-[4vmin]">PHP</div> <div>:</div>
						<input
							type="number"
							step="0.01"
							className="bg-black w-[4vmin] bg-opacity-0 text-center "
							defaultValue={weights.pitholePercentage}
							onChange={(e) => {
								if(!isNaN(parseFloat(e.target.value)))
								weights.pitholePercentage = parseFloat(
									e.target.value
								);
								setWeights(weights);

							}}
						/>
					</div>
				</div>

				<div className="w-full flex justify-between px-[0.25vmin] gap-[1.5vmin]">
					<div className="w-[8.5vmin]  gap-[0.5vmin] justify-between flex ">
						<div className="w-[4vmin]">CL</div> <div>:</div>
						<input
							type="number"
							step="0.01"
							className="bg-black w-[4vmin] bg-opacity-0 text-center "
							defaultValue={weights.clearAbleLines}
							onChange={(e) => {
								if(!isNaN(parseFloat(e.target.value)))
								weights.clearAbleLines = parseFloat(
									e.target.value
								);
								setWeights(weights);

								
							}}
						/>
					</div>
					<div className="w-[8.5vmin]  gap-[0.5vmin] justify-between flex ">
						<div className="w-[4vmin]">DH</div> <div>:</div>
						<input
							type="number"
							step="0.01"
							className="bg-black w-[4vmin] bg-opacity-0 text-center "
							defaultValue={weights.deepestHole}
							onChange={(e) => {
								if(!isNaN(parseFloat(e.target.value)))
								weights.deepestHole = parseFloat(
									e.target.value
								);
								setWeights(weights);

							}}
						/>
					</div>
				</div>

				<div className="w-full flex justify-between px-[0.25vmin] gap-[1.5vmin]">
					<div className="w-[8.5vmin]  gap-[0.5vmin] justify-between flex ">
						<div className="w-[4vmin]">BLK</div> <div>:</div>
						<input
							type="number"
							step="0.01"
							className="bg-black w-[4vmin] bg-opacity-0 text-center "
							defaultValue={weights.blocks}
							onChange={(e) => {
								if(!isNaN(parseFloat(e.target.value)))
								weights.blocks = parseFloat(e.target.value);
								setWeights(weights);

							}}
						/>
					</div>
					<div className="w-[8.5vmin]  gap-[0.5vmin] justify-between flex ">
						<div className="w-[4vmin]">CLH</div> <div>:</div>
						<input
							type="number"
							step="0.01"
							className="bg-black w-[4vmin] bg-opacity-0 text-center "
							defaultValue={weights.colHoles}
							onChange={(e) => {
								if(!isNaN(parseFloat(e.target.value)))
								weights.colHoles = parseFloat(e.target.value);
								setWeights(weights);

							}}
						/>
					</div>
				</div>
			</div>
			<div
				className="flex  text-[2vmin] gap-[0.25vmin] duration-200 flex-col mb- [2vmin] items-center"
				style={{
					height:
						autoplay && page == "single"
							? // && started
							  "5vmin"
							: "0vmin",
					
					overflow: "hidden",
					opacity:
						autoplay && page == "single"
							? // && started
							  "1"
							: "0",
				}}>
				Speed
				<input
					type="range"
					className="w-[13vmin] h-[2vmin] opacity-0"
					defaultValue={100 - autoplaySpeed / 10}
					min={0}
					max={100}
					onChange={(e) => {
						setAutoplaySpeed(
							(100 - parseFloat(e.target.value)) * 10
						);
					}}
				/>
				<div className="w-[14vmin] h-[2vmin] pointer-events-none px-[1vmin] -mt-[2vmin] overflow-visible  ">
					<div
						className="w-full h-[2vmin] pointer-events-none rounded-full border-y-[0.9vmin]"
						style={{
							backgroundColor: theme.backpop,
							borderColor: theme.background,
						}}></div>
					<div
						className="w-[12vmin] h-[0.5vmin] pointer-events-none -mt-[1.25vmin] rounded-full"
						style={{
							backgroundColor: theme.accents[4] + "99",
							width: (100 - autoplaySpeed / 10) * 0.12 + "vmin",
						}}></div>
					<div
						className="h-[1.5vmin] pointer-events-none -mt-[1vmin] aspect-square rounded-full"
						style={{
							backgroundColor: theme.accents[4],
							marginLeft:
								(100 - autoplaySpeed / 10) * 0.12 -
								0.75 +
								"vmin",
						}}></div>
				</div>
			</div>
		</>
	);
}

export default PanelAutoplay;
