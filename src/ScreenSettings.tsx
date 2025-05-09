import { useState } from "react";
import SubsettingPageTheme from "./Components/SubsettingPageTheme";
import { useAtom } from "jotai";
import { pageAtom, stateAtom, themeAtom } from "./atoms";
import SubsettingPageControls from "./Components/SubsettingPageControls";

function ScreenSettings() {
    const [selected,setSelected] = useState(0);
    const [theme] = useAtom(themeAtom);
    const [state] = useAtom(stateAtom);
    const [page,] = useAtom(pageAtom);

	return (
		<>
			{/* <div
				className="bg -blank border  duration-200 pointer-events-none border-r-0 border-l-0 shadow-lg w-[48vmin] absolute "
				style={{
                    backgroundColor: theme.background,
                    borderColor: theme.text,
					opacity: state=="settings" ? "0.75" : "0",
					height: state=="settings" ? "50vmin" : "0",
					marginTop: state=="settings" ? "-12.5vmin" : "25vmin",
                    pointerEvents:state=="settings"?"auto":"none"
				}}></div> */}
			<div
				className="w-[60vmin] h-[60vmin]  flex flex-col  prt  duration-500 absolute items-center py-[2vmin]"
				style={{
					opacity: state=="settings" ? "1" : "0",
                    pointerEvents:state=="settings"?"auto":"none",
                    marginLeft: page=="single" ?"":state=="settings"?"70vmin":"20vmin"

				}}
                
                >
                    <div className="text-[5vmin]">
                        {"Settings".split("").map((x, i) => (
						<span
                            key={"settings"+i}
							className="duration-100"
							onMouseEnter={(e) => {
								e.currentTarget.style.transitionDuration =
									"0.25s";
								e.currentTarget.style.color = theme.accents[i<3?i:i-1];
							}}
							onMouseLeave={(e) => {
								e.currentTarget.style.transitionDuration = "5s";
								e.currentTarget.style.color = "";
								setTimeout(() => {
									e.currentTarget.style.transitionDuration =
										"0.25s";
								}, 5000);
							}}>
							{x}
						</span>
					))}
                    </div>
                    <div className="w-full flex mt-[2vmin] gap-[0.75vmin] text-[2vmin] lexend  items-center justify-around ">
                        
                        {
                            ["Controls","Gameplay","Theme"].map((v,i)=>{
                                return <div
                                key={"settingsHeader"+i}
                                className="flex flex-col justify-between cursor-pointer gap-[0.25vmin]   duration-200 py-[0.75vmin] px-[1.5vmin] items-center"
                                onClick={()=>setSelected(i)}
                                >
                                    <div className="pointer-events-none  select-none">{v}</div>
                                    <div className="w-full duration-200 rounded-full h-[0.25vmin]" 
                                    style={{
                                        backgroundColor:theme.accents[8],
                                        opacity:selected===i?"1":"0",
                                        width:selected===i?"100%":"0"
                                    }}
                                    />
                                    
                                </div>
                            })
                        }
                    </div>
                    <div className="w-[calc(100%-8vmin)] h-[45vmin] mts  mt-[2vmin] py-[0.5vmin] ">
                        {selected === 0 && <SubsettingPageControls />}
                        {selected === 2 && <SubsettingPageTheme />}
                    </div>
                </div>
		</>
	);
}

export default ScreenSettings;
