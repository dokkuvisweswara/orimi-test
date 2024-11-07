import { useState } from "react";

export default function SquareInputBox({ value, onChange }:any) {
    const handleInputChange = (e:any, index:any) => {
        const inputValue = e.target.value;
        if (/[^0-9]/.test(inputValue)) return; // Only allow numeric input
        onChange(index, inputValue);
      };

    return (
        <>
        <div className="justify-center">            
            <div className="flex my-4 gap-2">        
            {[...Array(4)].map((_, index) => (
                <input
                key={index}
                type="password"
                maxLength= {1}
                value={value[index] || ''}
                onChange={(e) => handleInputChange(e, index)}
                className="flex w-1/2 sm:w-24 md:w-16 lg:w-15 h-10 text-2xl border border-gray-300 rounded-sm text-center bg-zinc-900"
                />
            ))}
            </div>
        </div>       
        </>
    );
}