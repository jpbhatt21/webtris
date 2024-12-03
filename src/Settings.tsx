import { useState } from "react";
import ThemeScreen from "./Components/Theme";
import { useAtom } from "jotai";
import { stateAtom, themeAtom } from "./atoms";
import ControlsScreen from "./Components/Controls";

function SettingsScreen() {
    const [selected,setSelected] = useState(0);
    const [theme] = useAtom(themeAtom);
    const [state] = useAtom(stateAtom);
	return (
		<>
			<div
				className="bg -blank border  duration-200 pointer-events-none border-r-0 border-l-0 shadow-lg w-[48vmin] absolute "
				style={{
                    backgroundColor: theme.background,
                    borderColor: theme.text,
					opacity: state=="settings" ? "0.75" : "0",
					height: state=="settings" ? "50vmin" : "0",
					marginTop: state=="settings" ? "-12.5vmin" : "25vmin",
                    pointerEvents:state=="settings"?"auto":"none"
				}}></div>
			<div
				className="w-full h-[46vmin] mt-[-10.5vmin] flex flex-col pointer-ev ents-none  duration-200 absolute items-center py-[2vmin]"
				style={{
					opacity: state=="settings" ? "1" : "0",
                    pointerEvents:state=="settings"?"auto":"none"

				}}>
                    <div className="text-[3vmin]">
                        Settings
                    </div>
                    <div className="w-full flex mt-[2vmin] gap-[0.75vmin] text-[1.5vmin] items-center justify-around ">
                        
                        {
                            ["Controls","Gameplay","Theme"].map((v,i)=>{
                                return <div className="flex flex-col justify-between cursor-pointer gap-[0.25vmin]   duration-200 py-[0.75vmin] px-[1.5vmin] items-center"
                                onClick={()=>setSelected(i)}
                                >
                                    <div className="pointer-events-none  select-none">{v}</div>
                                    <div className="w-full duration-200 rounded-full h-[0.1vmin]" 
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
                    <div className="w-full h-[32vmin] mt-[2vmin] px-[4vmin]">
                        {selected === 0 && <ControlsScreen />}
                        {selected === 2 && <ThemeScreen />}
                    </div>
                </div>
		</>
	);
}

export default SettingsScreen;
