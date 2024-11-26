function ControlsScreen() {
    const settings={
        pause:"`",
        closeMenu:"Escape",
        moveLeft:"A",
        moveRight:"D",
        softDrop:"S",
        hardDrop:"W",
        hold:"Shift",
        rotateClockwise:"␣",
    }
    return ( <>
            
              <div className="w-full h-full fadein ov erflow-y-scroll justify-center flex flex-wrap gap-[0.75vmin] text-[1.5vmin] items-center ">
                <div className="flex justify-between items-center w-full">
                  Pause
                  <input defaultValue={settings.pause} className="h-[2.5vmin] w-[10vmin] duration-200 outline-none active:outline-none  caret-transparent focus:outline-none  focus:border-colors-green bg-bdark bg-opacity-20 border border-[#0000] text-center rounded-[0.5vmin]" type="text"
                  onChange={(e)=>{
                    e.currentTarget.value=settings.pause;
                  }}
                  onKeyDown={(e)=>{
                    settings.pause=e.key!=" "?e.key.toUpperCase():"␣";
                    e.currentTarget.value=e.key;
                  }}/>
                  
                </div>
                <div className="flex justify-between items-center w-full">
                  Close Menu
                  <input defaultValue={settings.closeMenu} className="h-[2.5vmin] w-[10vmin] duration-200 outline-none active:outline-none  caret-transparent focus:outline-none  focus:border-colors-green bg-bdark bg-opacity-20 border border-[#0000] text-center rounded-[0.5vmin]" type="text"
                  onChange={(e)=>{
                    e.currentTarget.value=settings.closeMenu;
                  }}
                  onKeyDown={(e)=>{
                    settings.closeMenu=e.key!=" "?e.key.toUpperCase():"␣";
                    e.currentTarget.value=e.key;
                  }}/>
                </div>
                <div className="flex justify-between items-center w-full">
                  Move Left
                  <input defaultValue={settings.moveLeft} className="h-[2.5vmin] w-[10vmin] duration-200 outline-none active:outline-none  caret-transparent focus:outline-none  focus:border-colors-green bg-bdark bg-opacity-20 border border-[#0000] text-center rounded-[0.5vmin]" type="text"
                  onChange={(e)=>{
                    e.currentTarget.value=settings.moveLeft;
                  }}
                  onKeyDown={(e)=>{
                    settings.moveLeft=e.key!=" "?e.key.toUpperCase():"␣";
                    e.currentTarget.value=e.key;
                  }}/>
                </div>
                <div className="flex justify-between items-center w-full">
                  Move Right
                  <input defaultValue={settings.moveRight} className="h-[2.5vmin] w-[10vmin] duration-200 outline-none active:outline-none  caret-transparent focus:outline-none  focus:border-colors-green bg-bdark bg-opacity-20 border border-[#0000] text-center rounded-[0.5vmin]" type="text"
                  onChange={(e)=>{
                    e.currentTarget.value=settings.moveRight;
                  }}
                  onKeyDown={(e)=>{
                    settings.moveRight=e.key!=" "?e.key.toUpperCase():"␣";
                    e.currentTarget.value=e.key;
                  }}/>
                </div>
                <div className="flex justify-between items-center w-full">
                  Soft Drop
                  <input defaultValue={settings.softDrop} className="h-[2.5vmin] w-[10vmin] duration-200 outline-none active:outline-none  caret-transparent focus:outline-none  focus:border-colors-green bg-bdark bg-opacity-20 border border-[#0000] text-center rounded-[0.5vmin]" type="text"
                  onChange={(e)=>{
                    e.currentTarget.value=settings.softDrop;
                  }}
                  onKeyDown={(e)=>{
                    settings.softDrop=e.key!=" "?e.key.toUpperCase():"␣";
                    e.currentTarget.value=e.key;
                  }}/>
                </div>
                <div className="flex justify-between items-center w-full">
                  Hard Drop
                  <input defaultValue={settings.moveLeft} className="h-[2.5vmin] w-[10vmin] duration-200 outline-none active:outline-none  caret-transparent focus:outline-none  focus:border-colors-green bg-bdark bg-opacity-20 border border-[#0000] text-center rounded-[0.5vmin]" type="text"
                  onChange={(e)=>{
                    e.currentTarget.value=settings.moveLeft;
                  }}
                  onKeyDown={(e)=>{
                    settings.moveLeft=e.key!=" "?e.key.toUpperCase():"␣";
                    e.currentTarget.value=e.key;
                  }}/>
                </div>
                <div className="flex justify-between items-center w-full">
                  Hold
                  <input defaultValue={settings.hold} className="h-[2.5vmin] w-[10vmin] duration-200 outline-none active:outline-none  caret-transparent focus:outline-none  focus:border-colors-green bg-bdark bg-opacity-20 border border-[#0000] text-center rounded-[0.5vmin]" type="text"
                  onChange={(e)=>{
                    e.currentTarget.value=settings.hold;
                  }}
                  onKeyDown={(e)=>{
                    settings.hold=e.key!=" "?e.key.toUpperCase():"␣";
                    e.currentTarget.value=e.key;
                  }}/>
                </div>
                <div className="flex justify-between items-center w-full">
                  Rotate Clockwise
                  <input defaultValue={settings.rotateClockwise} className="h-[2.5vmin] w-[10vmin] duration-200 outline-none active:outline-none  caret-transparent focus:outline-none  focus:border-colors-green bg-bdark bg-opacity-20 border border-[#0000] text-center rounded-[0.5vmin]" type="text"
                  onChange={(e)=>{
                    e.currentTarget.value=settings.rotateClockwise;
                  }}
                  onKeyDown={(e)=>{
                    settings.rotateClockwise=e.key!=" "?e.key.toUpperCase():"␣";
                    e.currentTarget.value=e.key;
                  }}/>
                </div>
              </div>
    </> );
}

export default ControlsScreen;