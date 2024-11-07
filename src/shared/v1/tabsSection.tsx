'use client'

import React, { useState, useRef, useEffect } from "react"
import Image from 'next/image'
import v14 from '../../../public/audiobook.png';

export default function TabsSection() {
  const [tabSelected, setTabSelected] = useState({
    currentTab: 1,
    noTabs: 3,
  })

  const wrapperRef = useRef(null);

  return (
    <>
      {/*<!-- Component: Basic lg sized tab with leading icon --> */}
      <section className="max-w-full">
        <ul
          className="flex items-center border-b border-primaryItemColor"
          role="tablist"
          ref={wrapperRef}
        >
          <li className="" role="presentation">
            <button
              className={`-mb-px inline-flex h-12 w-full items-center justify-center gap-2 whitespace-nowrap rounded-t border-b-2 px-6 text-sm font-medium tracking-wide transition duration-300 hover:stroke-secondaryFocusBgColor disabled:cursor-not-allowed ${
                tabSelected.currentTab === 1
                  ? "border-rose-500 stroke-secondaryFocusBgColor text-primaryColor hover:text-primaryColor  disabled:border-secondaryItemColor"
                  : "justify-self-center border-transparent stroke-secondaryItemColor text-secondaryItemColor hover:border-secondaryFocusBgColor hover:text-secondaryFocusBgColor focus:border-secondaryFocusBgColor focus:stroke-secondaryFocusBgColor focus:text-secondaryFocusBgColor disabled:text-secondaryItemColor"
              }`}
              id="tab-label-1ai"
              role="tab"
              tabIndex={tabSelected.currentTab === 1 ? 0 : -1}
              aria-controls="tab-panel-1ai"
              aria-selected={ tabSelected.currentTab === 1 ? true : false }
              onClick={() => setTabSelected({ ...tabSelected, currentTab: 1 })}
            >
              <span className="order-2 ">More Like This</span>
            </button>
          </li>
        </ul>
        <div className="">
          <div
            className={`px-1 py-4 ${
              tabSelected.currentTab === 1 ? "" : "hidden"
            }`}
            id="tab-panel-1ai"
            role="tabpanel"
            aria-labelledby="tab-label-1ai"
            tabIndex={-1}
          >
            <div className="flex">
                <div className="flex">   
                    <Image className="w-40 h-40" src={v14} alt={""} />
                </div>      
                <div className="flex ps-3">
                    <div className="text-primaryColor">
                        <p className="text-2xl text-selectedBGPrimaryColor pt-4">Comedy</p>
                        <p className="text-base font-bold">Audiobook title goes here</p>
                        <div className="inline-block">
                            <p className="text-sm opacity-80 mt-1">Lorem ipsum dolor sit consectetur adipiscing elitempor eros.</p>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </section>
      {/*<!-- End Basic lg sized tab with leading icon --> */}
    </>
  )
}