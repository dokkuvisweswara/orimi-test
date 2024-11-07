'use client'
import React, { useState } from "react"

export default function   InputBox() {
  const [state, setState] = useState({
    "name": "",
  })

  const [type, setType] = useState('text')
  const [width, setWidth] = useState('w-full')

  const handleChange = (evt:any) => {    
    const value = evt.target.value
    setState({
      ...state,
      [evt.target.name]: value,
    })
    
  }

  const typeChange = () => {
    setType('date')
    setWidth('w-52')
  }

  return (
    <>
      <div className="relative my-2">
        <input
          id="name"
          type="text"
          name="name"
          placeholder="your name"
          value={state["name"]}
          className={`w-full peer relative h-12 rounded-sm border border-gray-600 px-8 text-sm
          text-slate-200 placeholder-transparent outline-none transition-all autofill:bg-transparent
          invalid:border-pink-500 invalid:text-pink-500 focus:border-pink-600 focus:outline-none
          invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed focus:cursor-text
          disabled:bg-slate-50 disabled:text-slate-400 bg-transparent ${width}`}        
          onChange={handleChange}
        />
        <label
          htmlFor="name"
          className="absolute left-2 -top-2 z-[1] cursor-text px-2 text-xs text-slate-400 
          transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block 
          before:h-full before:w-full before:bg-[#0A0B0B] before:transition-all 
          peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-autofill:-top-2
          peer-required:after:text-pink-500 peer-required:after:content-['\00a0*']
          peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:cursor-default 
         peer-focus:text-xs peer-focus:text-pink-500 peer-invalid:peer-focus:text-pink-500
         peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
        >
          Your name
        </label>
      </div>
      <div className="relative my-2">
        <input
          id="dob"
          type={type}
          name="dob"
          placeholder="Date of Birth"          
          className={`peer relative h-12 rounded-sm border border-gray-600 px-8 text-sm
          text-slate-200 placeholder-transparent outline-none transition-all autofill:bg-transparent
          invalid:border-pink-500 invalid:text-pink-500 focus:border-pink-600 focus:outline-none
          invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed focus:cursor-text
          disabled:bg-slate-50 disabled:text-slate-400 bg-transparent ${width}`}
          onClick={typeChange}
        />
        <label
          htmlFor="dob"
          className="absolute left-2 -top-2 z-[1] cursor-text px-2 text-xs text-slate-400 
          transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block 
          before:h-full before:w-full before:bg-[#0A0B0B] before:transition-all 
          peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-autofill:-top-2
          peer-required:after:text-pink-500 peer-required:after:content-['\00a0*']
          peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:cursor-default 
         peer-focus:text-xs peer-focus:text-pink-500 peer-invalid:peer-focus:text-pink-500
         peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
        >
          Date of Birth
        </label>
      </div>
      
    </>
  )
}
