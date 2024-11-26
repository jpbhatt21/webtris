import { useState } from "react";

type SettingsKeys = keyof typeof settings;
import { setSettings, settings } from "./Helper";

function ControlsScreen() {
  const [key,setKey]=useState(0)
  const kList = Object.keys(settings) as SettingsKeys[];
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
  return (
    <>
      <div className="w-full h-full fadein">
      <div key={key} className="w-full h-full overflow -y-scroll justify-center flex flex-wrap gap-[0.75vmin] text-[1.5vmin] items-center ">
        {
          titles.map((x,i)=><div className="flex justify-between items-center w-full">
          {x}
          <input
            defaultValue={settings[kList[i]]}
            className="h-[2.5vmin] w-[10vmin] cursor-pointer focus:cursor-none duration-200 outline outline-1 outline-[#0000] active:outline-none caret-transparent focus:outline-none focus:border-colors-green bg-bdark bg-opacity-20 border border-[#0000] text-center rounded-[0.5vmin]"
            type="text"
            style={{
              outlineColor:settings.clash.includes((settings[kList[i]]).toString())?"#bf616a":""
            }}
            onChange={(e) => {
              e.currentTarget.value = (settings[kList[i]]).toString();
            }}
            onKeyDown={(e) => {
              setSettings((prevSettings: any) => {
                prevSettings[kList[i]]=e.key !== " " ? e.key.toUpperCase() : "␣";
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
      </div>
    </>
  );
}

export default ControlsScreen;
