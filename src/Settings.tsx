import { useState } from "react";
import ControlsScreen from "./Controls";
import ThemeScreen from "./Theme";

function SettingsScreen({ props }: any) {
    const [selected,setSelected] = useState(0);
	return (
		<>
			<div
				className="bg -blank border  duration-200 pointer-events-none border-r-0 border-l-0 shadow-lg w-[48vmin] absolute "
				style={{
                    backgroundColor: props.theme.background,
                    borderColor: props.theme.text,
					opacity: props.show ? "0.75" : "0",
					height: props.show ? "50vmin" : "0",
					marginTop: props.show ? "-12.5vmin" : "25vmin",
                    pointerEvents:props.show?"auto":"none"
				}}></div>
			<div
				className="w-full h-[46vmin] mt-[-10.5vmin] flex flex-col pointer-ev ents-none  duration-200 absolute items-center py-[2vmin]"
				style={{
					opacity: props.show ? "1" : "0",
                    pointerEvents:props.show?"auto":"none"

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
                                        backgroundColor:props.theme.accents[8],
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
                        {selected === 2 && <ThemeScreen setUpdate={props.setUpdate}/>}
                    </div>
                </div>
		</>
	);
}

export default SettingsScreen;
