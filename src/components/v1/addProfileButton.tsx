import React from "react"

export default function Button() {
  function submitProfile () {
    // alert("Submit profile data");
  }
  return (
    <>
      <button 
      onClick={submitProfile}
      className="inline-flex items-center justify-center h-10 gap-2 px-5 text-sm 
      font-medium tracking-wide text-primaryColor transition duration-300 rounded whitespace-nowrap
      bg-pink-600 focus:bg-pink-700 focus-visible:outline-none 
      disabled:cursor-not-allowed disabled:border-pink-300 
      disabled:shadow-none my-2 max-w-full w-48">
        <span className="font-semibold">CREATE</span>
      </button>
    </>
  )
}
