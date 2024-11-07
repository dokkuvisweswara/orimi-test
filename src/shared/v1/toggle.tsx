'use client'

import React, { useState } from 'react';

const Toggle = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleToggle = () => {
    setIsChecked((prev) => !prev);
  };
const theme = {
    dark: 'Dark Theme',
    light: 'Light Theme'
} 
  return (
    <>
        <div className="flex items-center justify-between w-full">                
            <span className="ms-3 text-sm font-medium text-primaryColor dark:text-primaryItemColor">{ isChecked ? theme.dark : theme.light }</span>
            <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" value="" className="sr-only peer" 
                checked={isChecked}
                onChange={handleToggle}/>
            <div className="h-8  w-14 bg-primaryItemColor peer-focus:outline-none rounded-full peer dark:bg-detailsbordercolor peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-primaryColor after:content-[''] after:absolute after:top-[0.27rem] after:start-[4px] after:bg-primaryColor after:border-primaryItemColor after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-detailsbordercolor peer-checked:bg-selectedBGPrimaryColor"></div>
            </label>

          {/* <label htmlFor="toggle" className="flex items-center cursor-pointer">        
            <div className="ml-3 text-detailsbordercolor font-medium">Toggle</div>
            <div className="relative">
              <input
                type="checkbox"
                id="toggle"
                className="sr-only"
                checked={isChecked}
                onChange={handleToggle}
              />
              <div className="block bg-gray-600 w-14 h-8 rounded-full"></div>
              <div
                className={`${
                  isChecked ? 'bg-blue-500 translate-x-full' : 'bg-white'
                } absolute left-0 top-0 w-8 h-8 rounded-full transform transition-transform duration-300 ease-in-out`}
              ></div>
            </div>
          </label> */}
        </div>
    </>
  );
};

export default Toggle;