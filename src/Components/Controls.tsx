import { useEffect, useState } from "react";
import { settingsKeys, svg } from "../constants";
import { useAtom } from "jotai";
import { settingsAtom } from "../atoms";

let maxScroll=0
function ControlsScreen() {
  const [key,setKey]=useState(0)
  const [settings,setSettings]=useAtom(settingsAtom)
  const [state]=useAtom(settingsAtom)
  const titles=[
    "Pause",
    "Close Menu",
    "Move Left",
    "Move Right",
    "Soft Drop",
    "Hard Drop",
    "Hold",
    "Rotate CW"
  ]
  const [scrollHeight,setScrollHeight]=useState(0)  
  
  useEffect(()=>{
    setTimeout(()=>{
        let e=document.getElementById("controls")
        if(e)
        {
            maxScroll=e.scrollHeight-e.clientHeight
            setScrollHeight(e.scrollTop)
        }
    },10)
    },[])
  return (
    <>
      <div className="w-full h-full flex flex-col items-center fadein bg -black   mb-[-1.75vmin]">
      <div className=" w-[1vmin] h-[1vmin] rotate-180 -mb-[1vmin]  duration-200"
      style={{
        opacity:0!=scrollHeight?"1":"0",
      }}
      >{
        svg.downChev
      }</div>
      <div
      id="controls"
      onScroll={(e)=>setScrollHeight(e.currentTarget.scrollTop)}
      
      key={key} className="w-full h-full overflow-y-scroll hscb justify-center py-[0.5vmin] px-[0.5vmin] flex flex-wrap gap-[0.75vmin] text-[2vmin] items-center ">
        {
          titles.map((x,i)=><div className="flex justify-between items-center w-full">
          {x}
          <input
            defaultValue={settings[settingsKeys[i]]}
            className="h-[3.5vmin] w-[10vmin] text-[1.7vmin] cursor-pointer focus:cursor-none duration-200 outline outline-1 outline-[#0000] active:outline-none caret-transparent focus:outline-none focus:border-colors-green bg-bdark bg-opacity-20 border border-[#0000] text-center rounded-[0.5vmin]"
            type="text"
            style={{
              outlineColor:settings.clash.includes((settings[settingsKeys[i]]).toString())?"#bf616a":""
            }}
            onFocus={(e) => {
                if(i==1 || state!=="settings")
                    e.currentTarget.blur()
            }}
            onChange={(e) => {
              e.currentTarget.value = (settings[settingsKeys[i]]).toString();
            }}
            onKeyDown={(e) => {
              setSettings((prevSettings: any) => {
                prevSettings[settingsKeys[i]]=e.key !== " " ? e.key.toUpperCase() : "␣";
                return prevSettings
              });
              e.currentTarget.value = e.key; 
              e.currentTarget.blur();
              setKey(prev=>prev+1)
            }}
          />
        </div>)
        }
      </div>
      <div className=" w-[1vmin] h-[1vmin] -mt-[1vmin] duration-200"
      style={{
        opacity:maxScroll-scrollHeight>2?"1":"0",
      }}
      >{
        svg.downChev
      }</div>
      </div>
    </>
  );
}

export default ControlsScreen;
