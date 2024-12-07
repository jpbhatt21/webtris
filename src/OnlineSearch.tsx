import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import {
	autoplayAtom,
	bagAtom,
	nextBagAtom,
	pageAtom,
	resetAtom,
	stateAtom,
	themeAtom,
	timerAtom,
	userAtom,
} from "./atoms";
import { socket, svg } from "./constants";
const tetrisFacts = [
	"Tetris was created in 1984 by Soviet engineer Alexey Pajitnov, the inventor of Tetris.",
	"The name 'Tetris' combines 'tetra' (four) with Pajitnov's love of tennis, reflecting the Tetris game design.",
	"Tetris was originally programmed on a Soviet Electronika 60 computer.",
	"Nintendo's Game Boy Tetris version sold over 35 million copies.",
	"The Tetris theme song is based on a Russian folk song 'Korobeiniki'.",
	"Tetris is recognized by Guinness World Records as the most ported video game.",
	"Playing Tetris has been proven to help reduce PTSD symptoms and improve brain efficiency.",
	"Tetris creator Pajitnov didn't receive royalties until 1996 due to Soviet regulations.",
	"The 'Tetris effect' causes players to see Tetris blocks falling in real life.",
	"The first version of Tetris took only six weeks to create.",
	"Tetris was played in space by Russian cosmonauts.",
	"The longest theoretical Tetris game could last 18,432 years.",
	"Professional Tetris competitions exist with cash prizes.",
	"The original Tetris source code was written in Russian.",
	"A unique version of Tetris was created to be played on bacteria.",
	"Tetris has been used in studies of brain plasticity and cognitive skills.",
	"A Tetris version was adapted for blind players using sound-based gameplay.",
	"A 'perfect clear' is extremely rare in competitive Tetris play.",
	"The Tetris Company strictly controls worldwide Tetris licensing.",
	"Tetris has been translated into over 50 languages.",
	"Classic Tetris features seven unique block shapes (tetrominoes).",
	"Google created a playable Tetris Doodle in 2010.",
	"Tetris' fastest players can place pieces in milliseconds.",
	"The highest possible score in classic Tetris is 999,999 points.",
	"Nintendo Switch features Tetris 99, a Tetris battle royale version.",
	"Playing Tetris can improve brain efficiency and increase gray matter.",
	"The original Tetris was entirely black and white.",
	"Tetris has been used in psychological research for spatial cognition.",
	"Some Tetris players can play the game completely blindfolded.",
	"The Tetris theme has been remixed in numerous music genres.",
	"Tetris has been studied by computer scientists for mathematical complexity.",
	"Tetris is used in corporate training for decision-making skills.",
	"Playing Tetris helps reduce food cravings and addictive behaviors.",
	"Tetris was banned in some schools for being too addictive.",
	"Tetris was one of the first games to demonstrate simple, addictive gameplay.",
	"Multiple documentaries have been made about the Tetris legal history.",
	"Tetris is used in team-building exercises for problem-solving.",
	"A Tetris version was adapted for people with color blindness.",
	"Some Tetris versions can be played with multiple upcoming piece previews.",
	"Tetris has been studied as a potential treatment for lazy eye syndrome.",
	"Tetris transcends cultural boundaries with its global appeal.",
	"Tetris has influenced the design of many modern video games.",
	"Tetris was first commercially released on Electronika 60 in 1985.",
	"Tetris is used in educational programs to teach spatial reasoning.",
	"Some Tetris versions increase speed to nearly impossible levels.",
	"A Tetris world championship is held annually.",
	"Tetris can be strategically complex despite simple rules.",
	"Multiple Tetris spin-off and themed versions exist.",
	"Tetris is used in cognitive therapy and rehabilitation.",
	"Tetris was the first game bundled with Nintendo Game Boy.",
	"Psychological research shows Tetris can reduce intrusive thoughts.",
	"Tetris was created during the later years of the Soviet Union.",
	"Tetris has been ported to nearly every gaming platform.",
	"Tetris demonstrates how simple game mechanics can be engaging.",
	"Tetris has been studied for its impact on decision-making processes.",
	"Tetris combines puzzle-solving with quick reflexes.",
	"Tetris is one of the most recognizable video games in history.",
	"Tetris continues to have a strong global fanbase.",
	"Tetris represents a milestone in video game design and popularity.",
	"Tetris proves that great games don't need complex graphics.",
	"Tetris is a testament to innovative and elegant game design.",
];
let inter: any = null;
let localUser = {
	name: "Guest",
	sid: "-1",
	count: "-",
	room: "",
	opponent: "",
};
function OnlineSearch() {
	const [selected, setSelected] = useState(0);
	const [tried, setTried] = useState(false);
	const [theme] = useAtom(themeAtom);
	const setAutoplay = useAtom(autoplayAtom)[1];
	const reset = useAtom(resetAtom)[1];
	const [state, setState] = useAtom(stateAtom);
	const [page, setPage] = useAtom(pageAtom);
	const setBag = useAtom(bagAtom)[1];
	const [user, setUser] = useAtom(userAtom);
	const setNextBag = useAtom(nextBagAtom)[1];
	const [factTimer, setFactTimer] = useState(0);
	const setTimer = useAtom(timerAtom)[1];
	useEffect(() => {
		if (!socket.connected) {
			socket.connect();

			socket.on("initUser", (data: any) => {
				if (data.name == "Guest") {
					socket.disconnect();
				} else {
					localUser = { ...localUser, ...data };
					setUser(localUser);
					socket.emit("online");
				}
				setTried(true);
			});
			socket.on("online", (data: any) => {
				setUser(data);
			});
			socket.on("joinRoom", (data: any) => {
				setTimeout(() => {
					localUser.room = data.room;
					if (data.users[0] == localUser.name) {
						localUser.opponent = data.users[1];
					} else {
						localUser.opponent = data.users[0];
					}
					setUser(localUser);
					setTimeout(() => {
						setAutoplay(false);
						setBag(data.bag);
						setNextBag(data.nextBag);
						setPage("multi");
						reset(false);
						setTimeout(() => {
							setTimer(3);
							setTimeout(() => {
								setState("play");
							}, 4000);
						}, 500);
					}, 500);
				}, 1000);
				// if(data.users[0]==localUser.name){
				//     socket.emit("roomCom",data)
				// }
			});
		}
	}, []);
	useEffect(() => {
		if (state != "onlineSearch") {
			socket.emit("leaveQueue");
			clearInterval(inter[0]);
			clearInterval(inter[1]);
			setFactTimer(0);
			// console.log(state);
			setTried(false);
		} else if (localUser.room == "") {
			if (inter) inter.map((x: any) => clearInterval(x));
			inter = [
				setInterval(() => {
					setFactTimer((timer) => timer + 1);
				}, 1000),
				setInterval(() => {
					setSelected(Math.floor(Math.random() * tetrisFacts.length));
				}, 5000),
			];
			socket.emit("joinQueue");
		}
		localUser = user;
	}, [state, user]);
	return (
		<>
			{state == "onlineSearch" && (
				<>
					<div
						className="w-[60vmin] h-fit  flex flex-col  prt  duration-500 absolute items-center py-[2vmin]"
						style={{
							opacity: page != "multi" ? "1" : "0",
							marginLeft:
								state == "onlineSearch" ? "70vmin" : "20vmin",
						}}>
						{user.name !== "Guest" ? (
							<>
								<div className="text-[5vmin] fadein">
									{"In Queue".split("").map((x, i) => (
										<span
											key={"QUE" + i}
											className="duration-100"
											onMouseEnter={(e) => {
												e.currentTarget.style.transitionDuration =
													"0.25s";
												e.currentTarget.style.color =
													theme.accents[i % 7];
											}}
											onMouseLeave={(e) => {
												e.currentTarget.style.transitionDuration =
													"5s";
												e.currentTarget.style.color =
													"";
												setTimeout(() => {
													e.currentTarget.style.transitionDuration =
														"0.25s";
												}, 7000);
											}}>
											{x}
										</span>
									))}
								</div>
								<div className="flex fadein flex-col items-center justify-between mt-[1.5vmin] h-[15vmin]">
									<div className="flex flex-col w-full items-center justify-center gap-[1vmin]">
										<div className=" h-[5vmin] w-[5vmin]">
											{svg.loader}
										</div>
										<div className=" mts text-[2vmin] roboto">
											{(parseInt(
												(factTimer / 60).toFixed(0)
											) < 10
												? "0"
												: "") +
												(factTimer / 60).toFixed(0) +
												":" +
												(factTimer % 60 < 10
													? "0"
													: "") +
												(factTimer % 60)}
										</div>
									</div>
									<div
										key={"sel" + selected}
										className="fadeinout mts min-w-fit text-center w-full">
										{tetrisFacts[selected]}
									</div>
								</div>
							</>
						) : (
							tried && (
								<>
									<div className="text-[5vmin]">
										{"Server is Full"
											.split("")
											.map((x, i) => (
												<span
													key={"server" + i}
													className="duration-100"
													onMouseEnter={(e) => {
														e.currentTarget.style.transitionDuration =
															"0.25s";
														e.currentTarget.style.color =
															theme.accents[
																i % 7
															];
													}}
													onMouseLeave={(e) => {
														e.currentTarget.style.transitionDuration =
															"5s";
														e.currentTarget.style.color =
															"";
														setTimeout(() => {
															e.currentTarget.style.transitionDuration =
																"0.25s";
														}, 7000);
													}}>
													{x}
												</span>
											))}
									</div>
									<div className="fadein mt-[2vmin] mts min-w-fit text-center w-full">
										Please Try Again Later
									</div>
								</>
							)
						)}
					</div>
				</>
			)}
		</>
	);
}

export default OnlineSearch;
