'use client'

import React, { useState, useRef, useEffect } from "react"
import PlansListPage from "./plansListPage";
import Tickets from "./tickets";
import Feedback from "./feedBack";

export default function ProfileTabSelection({lang,subscriberInfo}:any) {
    const [tabSelected, setTabSelected] = useState({
        currentTab: 1,
        noTabs: 3,
    })
    const wrapperRef: any = useRef(null);
    return (
        <>
            <section className="max-w-full bg-profilePageBgColor rounded-md mx-1">
                <ul className="flex flex-wrap items-center gap-2 p-3 rounded-t-lg text-primaryColor" role="tablist" ref={wrapperRef}>
                    <li role="presentation">
                        <button
                            className={`inline-flex h-8 items-center justify-center gap-2 whitespace-nowrap rounded px-6 text-sm font-semibold tracking-wide transition duration-300 focus-visible:outline-none disabled:cursor-not-allowed ${tabSelected.currentTab === 1
                                ? "bg-selectedBGPrimaryColor text-primaryColor focus:bg-selectedBGPrimaryColor "
                                : "w-full justify-self-center stroke-secondaryItemColor text-primaryColor  slow-underline hover:text-primaryColor focus:bg-primaryFocusBgColor"
                                }`}
                            id="tab-label-1ai"
                            role="tab"
                            tabIndex={tabSelected.currentTab === 1 ? 0 : -1}
                            aria-controls="tab-panel-1ai"
                            aria-selected={tabSelected.currentTab === 1 ? true : false}
                            onClick={() => setTabSelected({ ...tabSelected, currentTab: 1 })}>
                            <span className="order-2"> {lang?.plans} </span>
                        </button>
                    </li>
                    <li role="presentation"> 
                        <button
                            className={`inline-flex h-8 items-center justify-center gap-2 whitespace-nowrap rounded px-6 text-sm font-semibold tracking-wide transition duration-300 focus-visible:outline-none disabled:cursor-not-allowed ${tabSelected.currentTab === 2
                                ? "bg-selectedBGPrimaryColor text-primaryColor  focus:bg-selectedBGPrimaryColor "
                                : "w-full justify-self-center stroke-secondaryItemColor text-primaryColor  slow-underline hover:text-primaryColor focus:bg-primaryFocusBgColor"
                                }`}
                            role="tab"
                            aria-controls="tab-panel-2di"
                            tabIndex={tabSelected.currentTab === 2 ? 0 : -1}
                            aria-selected={tabSelected.currentTab === 2 ? true : false}
                            onClick={() => { setTabSelected({ ...tabSelected, currentTab: 2 }) }}
                        >
                            <span className="order-2 "> {lang?.tickets} </span>
                        </button>
                    </li>
            
                    <li role="presentation">
                        <button
                            className={`inline-flex h-8 items-center justify-center gap-2 whitespace-nowrap rounded px-6 text-sm font-semibold tracking-wide transition duration-300 focus-visible:outline-none disabled:cursor-not-allowed ${tabSelected.currentTab === 5
                                ? "bg-selectedBGPrimaryColor text-primaryColor  focus:bg-selectedBGPrimaryColor "
                                : "w-full justify-self-center stroke-secondaryItemColor text-primaryColor  slow-underline hover:text-primaryColortext-white focus:bg-primaryFocusBgColor "
                                }`}
                            id="tab-label-3di"
                            role="tab"


                            aria-controls="tab-panel-3di"
                            tabIndex={tabSelected.currentTab === 5 ? 0 : -1}
                            aria-selected={tabSelected.currentTab === 5 ? true : false}
                            onClick={() => { setTabSelected({ ...tabSelected, currentTab: 5 }) }}
                        >
                            <span className="order-2"> {lang?.feedback} </span>
                        </button>
                    </li>
                </ul>
                <div className="text-primaryColor bg-primaryBgColor mt-1 rounded-b-lg">
                    <div
                        className={`py-4 FadeupPopupAnimation ${tabSelected.currentTab === 1 ? "" : "hidden"
                            }`}
                        id="tab-panel-1di"
                        aria-hidden={tabSelected.currentTab === 1 ? true : false}
                        role="tabpanel"
                        aria-labelledby="tab-label-1di"
                        tabIndex={-1}
                    >
                        <PlansListPage lang={lang} subscriberInfo={subscriberInfo} whereIamFrom={'profile'}></PlansListPage>
                    </div>
                    <div
                        className={`py-4 FadeupPopupAnimation ${tabSelected.currentTab === 2 ? "" : "hidden"
                            }`}
                        id="tab-panel-1di"
                        aria-hidden={tabSelected.currentTab === 2 ? true : false}
                        role="tabpanel"
                        aria-labelledby="tab-label-1di"
                        tabIndex={-1}
                    >
                        <Tickets lang={lang} tabSelectedIndex={tabSelected.currentTab}></Tickets>
                    </div>
                    <div
                        className={`py-4 FadeupPopupAnimation ${tabSelected.currentTab === 3 ? "" : "hidden"
                            }`}
                        id="tab-panel-1di"
                        aria-hidden={tabSelected.currentTab === 3 ? true : false}
                        role="tabpanel"
                        aria-labelledby="tab-label-1di"
                        tabIndex={-1}
                    >
                        <p>
                            Even though there is no certainty that the expected results of our work will manifest, we have to remain committed to our work and duties; because, even if the results are slated to arrive, they cannot do so without the performance of work.
                        </p>
                    </div>
                    <div
                        className={`py-4  FadeupPopupAnimation ${tabSelected.currentTab === 4 ? "" : "hidden"
                            }`}
                        id="tab-panel-1di"
                        aria-hidden={tabSelected.currentTab === 4 ? true : false}
                        role="tabpanel"
                        aria-labelledby="tab-label-1di"
                        tabIndex={-1}
                    >
                        <p>
                            Even though there is no certainty that the expected results of our work will manifest, we have to remain committed to our work and duties; because, even if the results are slated to arrive, they cannot do so without the performance of work.
                        </p>
                    </div>
                    <div
                        className={`py-4 ${tabSelected.currentTab === 5 ? "" : "hidden"
                            }`}
                        id="tab-panel-1di"
                        aria-hidden={tabSelected.currentTab === 5 ? true : false}
                        role="tabpanel"
                        aria-labelledby="tab-label-1di"
                        tabIndex={-1}
                    >
                        <Feedback lang={lang}></Feedback>
                    </div>
                    <div
                        className={`py-4 ${tabSelected.currentTab === 6 ? "" : "hidden"
                            }`}
                        id="tab-panel-1di"
                        aria-hidden={tabSelected.currentTab === 6 ? true : false}
                        role="tabpanel"
                        aria-labelledby="tab-label-1di"
                        tabIndex={-1}
                    >
                        <p>
                            Even though there is no certainty that the expected results of our work will manifest, we have to remain committed to our work and duties; because, even if the results are slated to arrive, they cannot do so without the performance of work.
                        </p>
                    </div>
                </div>
            </section>
        </>
    )
}