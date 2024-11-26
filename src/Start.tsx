import { getColorScheme } from "./Helper";

function StartScreen({props}:any) {
    return ( <>
    <div
              className="bg-b lank border border-bcol duration-200 border-r-0 border-l-0 shadow-lg w-[50vmin] absolute "
              style={{
                backgroundColor: props.theme.background,
                opacity: props.show ? "0.5" : "0",
                height: props.show ? "20vmin" : "0",
                marginTop:
                  props.show ? "0vmin" : "10vmin",
                pointerEvents:
                  props.show ? "all" : "none",
              }}
            ></div>
            <div
              className="w-full h-full flex flex-col text-white duration-200 absolute items-center justify-evenly py-[2vmin]"
              style={{
                opacity: props.show ? "1" : "0",
                pointerEvents:
                  props.show ? "all" : "none",
              }}
            >
              <div className="text-[3.5vmin] mts">
                {" "}
                { "WEBTRIS"}
              </div>
              <div className="w-full flex text-[1.5vmin] items-center justify-evenly">
                <button
                  className="bg-post cursor-pointer rounded-sm duration-100 select-none brt hover:text-colors-bloo text-colors-yellow w-[10vmin] h-[3.25vmin] py-[0.5vmin] text-center"
                  onClick={() => {
                    //props.setPaused(false);
                  }}
                  style={{
                    display: props.gameOver ? "none" : "block",
                    color: props.theme.accents[2]
                  }}
                >
                  <label className="text-white">Multiplayer</label>
                </button>
                <div
                  className="bg-post rounded-sm duration-200  select-none brt cursor-pointer hover:text-colors-bloo text-colors-green w-[10vmin] py-[0.5vmin] text-center"
                  style={{
                    color: props.theme.accents[4]
                  }}
                  onClick={() => {
                    props.setGameOver(false);
                    props.setBoard(
                      Array.from({ length: 20 }, (_) =>
                        Array.from({ length: 10 }, (_) => ({
                          occupied: false,
                          active: false,
                          color: props.bgcol,
                        }))
                      )
                    );
                    props.setAutp(false);
                    clearInterval(props.inter);
                    props.setInter(null)
                    props.setRestart(new Date().getTime());
                    props.setPaused(false);
                  }}
                >
                 <label className="text-white">Play</label>
                </div>
              </div>
            </div>
    </> );
}

export default StartScreen;