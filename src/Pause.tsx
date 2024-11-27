function PauseScreen({props}:any) {
    return ( <>
            <div
              className=" border border-bcol duration-200 border-r-0 border-l-0 shadow-lg w-[48vmin] absolute "
              style={{
                backgroundColor: props.theme.background,
                borderColor: props.theme.text,
                opacity: props.show ? "0.75" : "0",
                height: props.show ? "20vmin" : "0",
                marginTop:
                  props.show ? "0vmin" : "10vmin",
                pointerEvents:
                  props.show ? "all" : "none",
              }}
            ></div>
            <div
              className="w-full h-full flex flex-col duration-200 absolute items-center justify-evenly py-[2vmin]"
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
                  
                  onClick={() => {
                    props.setPaused(false);
                  }}
                  className="bg-post cursor-pointer rounded-[0.25vmin] active:scale-x-[0.975] active:scale-y-[0.92] active:outline-[0.35vmin] hover:outline-blue-300  duration-100 select-none outline outline-[0.1vmin]  w-[10vmin] h-[3.25vmin] py-[0.5vmin] text-center"
						style={{
							outlineColor: props.theme.accents[4],
							backgroundColor: props.theme.accents[4]+"10",
                            display:props.gameOver?"none":"block"
						}}
                >
                  Resume
                </div>
                <div
                  className="bg-post cursor-pointer rounded-[0.25vmin] active:scale-x-[0.975] active:scale-y-[0.92] active:outline-[0.35vmin] hover:outline-blue-300  duration-100 select-none outline outline-[0.1vmin]  w-[10vmin] h-[3.25vmin] py-[0.5vmin] text-center"
                  style={{
                      outlineColor: props.theme.accents[5],
                      backgroundColor: props.theme.accents[5]+"10",
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