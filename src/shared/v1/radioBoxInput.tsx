"use client"
import React, { useState } from "react";

export default function RadioBox({ payload, onClick, checked }: any) {
  const onValueChange = () => {
    onClick();
  };

  return (
    <>
      <div className="relative flex items-center">
        <input
          className="w-5 h-5 transition-colors bg-slate-300 border-2 rounded-full appearance-none cursor-pointer peer border-slate-100 checked:border-white checked:bg-[#e80d75] checked:hover:border-whitw checked:hover:bg-[#e80d75] focus:outline-none checked:focus:border-white checked:focus:bg-[#e80d75] focus-visible:outline-none disabled:cursor-not-allowed disabled:border-slate-100 disabled:bg-slate-50"
          type="radio"
          checked={checked}
          onChange={onValueChange}
        />
        <svg
          className="absolute left-0 w-4 h-4 transition-all duration-300 scale-50 opacity-0 pointer-events-none fill-[#e80d75] peer-checked:scale-100 peer-checked:opacity-100 peer-disabled:cursor-not-allowed"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-labelledby="title-1 description-1"
          role="graphics-symbol"
        >
          <circle cx="8" cy="8" r="4" />
        </svg>
      </div>
    </>
  );
}