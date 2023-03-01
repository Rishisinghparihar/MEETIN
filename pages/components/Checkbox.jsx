import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";

const Checkbox = () => {
  const {theme, setTheme} = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(()=>setMounted(true),[])

  if(!mounted) return null

  return (
    <div  className="flex mr-[3.75rem] ml-15 select-none">
        <p className="mr-2 uppercase dark:text-white pt-1 select-none">{theme === 'light' ? 'dark' : 'light'} Mode</p>
        <label htmlFor="mode"  className="bg-black relative w-12 h-6 rounded-full dark:bg-white select-none" >
         <input onClick={()=>setTheme(theme==='light'? 'dark': 'light')} type="checkbox" id="mode" className="sr-only peer" />
         <span className="w-2/5 h-[70%] bg-white absolute rounded-full left-[3px] top-[3.2px]  dark:bg-black transition-all duration-300 peer-checked:left-6" ></span>
        </label>
    </div>


  );
};

export default Checkbox;
