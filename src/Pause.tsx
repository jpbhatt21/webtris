function PauseScreen({props}:any) {
    return ( <>
            <div
              className="bg-blank border border-bcol duration-200 border-r-0 border-l-0 shadow-lg w-[50vmin] absolute "
              style={{
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
              <div className="text-[3.5vmin] ">
                {" "}
                {props.gameOver ? "Game Over" : "Paused"}
              </div>
              <div className="w-full flex text-[1.5vmin] items-center justify-evenly">
                <div
                  className="bg-post cursor-pointer rounded-md border border-colors-green w-[10vmin] py-[0.5vmin] text-center bg-opacity-40"
                  onClick={() => {
                    props.setPaused(false);
                  }}
                  style={{
                    display: props.gameOver ? "none" : "block",
                  }}
                >
                  Resume
                </div>
                <div
                  className="bg-post rounded-md border cursor-pointer border-colors-red w-[10vmin] py-[0.5vmin] text-center bg-opacity-40"
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
                    clearInterval(props.inter);
                    props.setInter(null)
                    props.setRestart(new Date().getTime());
                    props.setPaused(false);
                  }}
                >
                  Restart
                </div>
              </div>
            </div>
    </> );
}

export default PauseScreen;