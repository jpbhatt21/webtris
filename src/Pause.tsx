import { useAtom } from "jotai";
import { gameOverAtom, resetAtom, stateAtom, themeAtom } from "./atoms";

function PauseScreen() {
  const [theme] = useAtom(themeAtom);
    const [state,setState] = useAtom(stateAtom);
    const [gameOver] = useAtom(gameOverAtom);
    const reset=useAtom(resetAtom)[1];
    return ( <>
            <div
              className=" border border-bcol duration-200 border-r-0 border-l-0 shadow-lg w-[48vmin] absolute "
              style={{
                backgroundColor: theme.background,
                borderColor: theme.text,
                opacity: state=="pause" || state=="game over" ? "0.75" : "0",
                height: state=="pause" || state=="game over" ? "20vmin" : "0",
                marginTop:
                  state=="pause" || state=="game over" ? "0vmin" : "10vmin",
                pointerEvents:
                  state=="pause" || state=="game over" ? "all" : "none",
              }}
            ></div>
            <div
              className="w-full h-full flex flex-col duration-200 absolute items-center justify-evenly py-[2vmin]"
              style={{
                opacity: state=="pause" || state=="game over" ? "1" : "0",
                pointerEvents:
                  state=="pause" || state=="game over" ? "all" : "none",
              }}
            >
              <div className="text-[3.5vmin] ">
                {" "}
                {state=="game over" ? "Game Over" : "Paused"}
              </div>
              <div className="w-full flex text-[1.5vmin] items-center justify-evenly">
                <div
                  
                  onClick={() => {
                    setState("play");
                    // setPaused(false);
                  }}
                  className="bg-post cursor-pointer rounded-[0.25vmin] active:scale-x-[0.975] active:scale-y-[0.92] active:outline-[0.35vmin] hover:outline-blue-300  duration-100 select-none outline outline-[0.1vmin]  w-[10vmin] h-[3.25vmin] py-[0.5vmin] text-center"
						style={{
							outlineColor: theme.accents[4],
							backgroundColor: theme.accents[4]+"10",
                            display:state=="game over"?"none":"block"
						}}
                >
                  Resume
                </div>
                <div
                  className="bg-post cursor-pointer rounded-[0.25vmin] active:scale-x-[0.975] active:scale-y-[0.92] active:outline-[0.35vmin] hover:outline-blue-300  duration-100 select-none outline outline-[0.1vmin]  w-[10vmin] h-[3.25vmin] py-[0.5vmin] text-center"
                  style={{
                      outlineColor: theme.accents[5],
                      backgroundColor: theme.accents[5]+"10",
                  }}
                  onClick={() => {
                    reset()
                    // props.setGameOver(false);
                    // props.setBoard(
                    //   Array.from({ length: 20 }, (_) =>
                    //     Array.from({ length: 10 }, (_) => ({
                    //       occupied: false,
                    //       active: false,
                    //       color: props.bgcol,
                    //     }))
                    //   )
                    // );
                    // clearInterval(props.inter);
                    // props.setInter(null)
                    // props.setRestart(new Date().getTime());
                    // props.setPaused(false);
                  }}
                 
                >
                  Restart
                </div>
              </div>
            </div>
    </> );
}

export default PauseScreen;