import { useEffect, useState } from "react";
import { themeIndexAtom } from "../atoms";
import { useAtom } from "jotai";
import { svg, themeKeys, themes } from "../constants";

let maxScroll = 0;
function ThemeScreen() {

  const titles = [
    "Nord-ish",
    "Dracula",
    "Tokyo Night",
    "Solarized Dark",
    "Monokai",
    "One Dark Atom",
    "Catppuccin Mocha Dark",
    "Catppuccin Frappe Dark",
    "Gruvbox",
    "Material Ocean",
    "Ayu Dark",
    "Horizon",
    "Palenight",
    "Spacegray",
    "Oceanic Next",
    "Night Owl",
  ];
  const [scrollHeight, setScrollHeight] = useState(0);
  const [themeIndex, setThemeIndex] = useAtom(themeIndexAtom);

  useEffect(() => {
    setTimeout(() => {
      let e = document.getElementById("controls");
      if (e) {
        maxScroll = e.scrollHeight - e.clientHeight;
        setScrollHeight(e.scrollTop);
      }
    }, 10);
  }, []);
  return (
    <>
      <div className="w-full h-full flex flex-col items-center fadein bg -black   mb-[-1.75vmin]">
        <div
          className=" w-[1vmin] h-[1vmin] rotate-180 -mb-[1vmin]  duration-200"
          style={{
            opacity: 0 != scrollHeight ? "1" : "0",
          }}
        >
          {svg.downChev}
        </div>
        <div
          id="controls"
          onScroll={(e) => setScrollHeight(e.currentTarget.scrollTop)}
          
          className="w-full h-full  overflow-y-scroll hscb justify-center py-[0.5vmin] px-[0.5vmin] flex flex-wrap gap-[1vmin] text-[1.5vmin] items-center "
        >
          {titles.map((x, i) => {
            let crt = themes[themeKeys[i]];
            return (
              <div className="flex flex-col outline-[0.25vmin] duration-200 outline p-[0.5vmin] border rounded-[0.5vmin] w-full "
              style={{
                backgroundColor:crt.background,
                color:crt.text,
                borderColor:crt.backpop,
                outlineColor:crt.text+(themeIndex===i?"99":"00")
              }}
                onClick={()=>{
                    setThemeIndex(i)
                    
                }}
              >
                <div className="mx-[0.5vmin] mt-[0.5vmin]">{x}</div>
                <div className="w-full flex items-center justify-center h-[4vmin]">
                    {
                        "0000000".split("").map((_,i)=>{
                            return <div className="w-[5vmin] h-[1vmin] rounded-[0.5vmin] mx-[0.5vmin] "
                            style={{
                                backgroundColor:crt.accents[i]
                            }}></div>
                        })
                    }
                </div>
              </div>
            );
          })}
        </div>
        <div
          className=" w-[1vmin] h-[1vmin] -mt-[1vmin] duration-200"
          style={{
            opacity: maxScroll - scrollHeight > 2 ? "1" : "0",
          }}
        >
          {svg.downChev}
        </div>
      </div>
    </>
  );
}

export default ThemeScreen;
