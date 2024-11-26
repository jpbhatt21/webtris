import { useState } from "react";
import ControlsScreen from "./Controls";

function SettingsScreen({ props }: any) {
    const [selected,setSelected] = useState(0);
	return (
		<>
			<div
				className="bg-blank border border-bcol duration-200 pointer-events-none border-r-0 border-l-0 shadow-lg w-[50vmin] absolute "
				style={{
					opacity: props.show ? "0.5" : "0",
					height: props.show ? "50vmin" : "0",
					marginTop: props.show ? "-12.5vmin" : "25vmin",
				}}></div>
			<div
				className="w-full h-[46vmin] mt-[-10.5vmin] flex flex-col pointer-ev ents-none text-white duration-200 absolute items-center py-[2vmin]"
				style={{
					opacity: props.show ? "1" : "0",
				}}>
                    <div className="text-[3vmin]">
                        Settings
                    </div>
                    <div className="w-full flex mt-[2vmin] gap-[0.75vmin] text-[1.5vmin] items-center justify-around ">
                        
                        {
                            ["Controls","Gameplay","Theme"].map((v,i)=>{
                                return <div className="flex justify-between cursor-pointer bg-bcol duration-200 py-[0.75vmin] px-[1.5vmin] rounded-md items-center"
                                onClick={()=>setSelected(i)}
                                style={{
                                    backgroundColor:selected===i?"#93939335":"#93939300"
                                }}>
                                    <div className="pointer-events-none select-none">{v}</div>
                                    
                                </div>
                            })
                        }
                    </div>
                    <div className="w-full h-full mt-[2vmin] px-[4vmin]">
                        {selected === 0 && <ControlsScreen />}
                    </div>
                </div>
		</>
	);
}

export default SettingsScreen;
