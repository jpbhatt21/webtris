import { useEffect, useState } from "react";
import { controlsKeys, svg } from "../constants";
import { useAtom } from "jotai";
import { controlsAtom, stateAtom } from "../atoms";

let maxScroll=0
function SubsettingPageGameplay() {
  const [key,setKey]=useState(0)
  const [controls,setControls]=useAtom(controlsAtom)
  const [state]=useAtom(stateAtom)
  const titles=[
    "Pause",
    "Move Left",
    "Move Right",
    "Soft Drop",
    "Hard Drop",
    "Hold",
    "Rotate CW",
    "Rotate CCW",
    "Close Menu",
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
          titles.map((x,i)=>{return <div key={"contTitles"+i} className="flex justify-between items-center w-full">
          {x}
          <input
            defaultValue={controls[controlsKeys[i]]}
            className="h-[3.5vmin] w-[10vmin] text-[1.7vmin] cursor-pointer focus:cursor-none duration-200 outline outline-1 outline-[#0000] active:outline-none caret-transparent focus:outline-none focus:border-colors-green bg-bdark bg-opacity-20 border border-[#0000] text-center rounded-[0.5vmin]"
            type="text"
            style={{
              outlineColor:controls.clash.includes((controls[controlsKeys[i]]).toString())?"#bf616a":"#bf616a00",
              opacity:i==8?"0.5":""
            }}
            onFocus={(e) => {
              // console.log(state)
                if(i==8 || state!=="settings")
                    e.currentTarget.blur()
            }}
            onChange={(e) => {
              e.currentTarget.value = (controls[controlsKeys[i]]).toString();
            }}
            onKeyDown={(e) => {
              setControls((prevControls: any) => {
                prevControls[controlsKeys[i]]=e.key !== " " ? e.key.toUpperCase() : "SPACE";
                return prevControls
              });
              e.currentTarget.value = e.key; 
              e.currentTarget.blur();
              setKey(prev=>prev+1)
            }}
          />
        </div>})
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

export default SubsettingPageGameplay;
