"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useSearchParams } from 'next/navigation'
import { getCookie } from "@/hooks/client.cookie";
 
export default function SideBarNavList({ showTab, sideBarNavPayload }: any) {

  const [activeTab, setActiveTab] = useState(0);
  const [currentURL, setCurrentURL] = useState('');
  const [currentLang, setCurrentLang] = useState<any>('eng');

  const handleTabClick = (index: any) => {   
    setActiveTab(index);
  };
  const pathname = usePathname()
  useEffect(() => {
    let lang: string = 'eng';
    if (getCookie('localeLangauge') == 'mn') {
      lang = 'mon'
    } else if (getCookie('localeLangauge') == 'en') {
      lang = 'eng'
    }

    setCurrentLang(lang)
    setCurrentURL(pathname);
    
    // handleSideNavData()
  }, [pathname, activeTab])



  let upLineData: any = [];
  let belowLineData: any = [];

 
    sideBarNavPayload?.forEach((element:any) => {
      if (element.id != 'Discover') {
        if (element.id.includes('Home') || element.id.includes('Library')) {
          upLineData.push(element);
        } else {
          belowLineData.push(element)
        }
      }
    });

  const actGetPackageURL = (id: string) => {
    let url: any;
    if(id.includes('Home')){
      url = '/'
    } else {
      url = id.split("-")[1]
    }
    return url?.toLowerCase();
  }

  return (
    <>
      <ul className="space-y-2">
        {upLineData && upLineData.map((top: any, i: any) => (

            <li
              key={i}
              onClick={() => handleTabClick(i)}
              className={`${
                (activeTab === i || currentURL.includes('/'+top.id.split("-")[1]?.toLowerCase())) &&  (currentURL === '/' || activeTab !== i)
                ?                
                "bg-[#232323] text-selectedBGPrimaryColor font-bold text-lg" : ""
              } ${showTab === true ? "flex justify-center" : ""} rounded-lg  hover:bg-[#232323] dark:hover:bg-[#232323]`}
            >
              <Link
                href={`${top.key === "Home" ? "/" : "/" + actGetPackageURL(top.id)}`}
                className={`${showTab === true ? "" : "flex py-1"}  opacity-90`}
              >
                <Image
                  src={top?.menuIcon?top?.menuIcon:top?.icon}
                  alt={top?.id}
                  className={`${showTab === true ? "m-auto" : ""} transform scale-80`}
                  priority
                  width={35}
                  height={15}
                />
                <span className={`${showTab === true ? "text-xs" : "ms-3 py-1"}`}>
                  {/* {top.titles[currentLang]} */}
                  {currentLang == 'eng'? top.title.eng : top.title.mon}
                </span>
              </Link>
            </li>
          ))}
        <li id="breakLine">
          <span className="flex items-center p-2  transition duration-75">
            <svg width="157" height="2" viewBox="0 0 157 2" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line y1="1" x2="157" y2="1" stroke="#232323" strokeWidth="2" />
            </svg>
          </span>
        </li>

        {belowLineData && belowLineData.map((top: any, id: any) => (
            <li
              key={id}
              onClick={() => handleTabClick(id + upLineData.length)}
              className={`${
                (activeTab === id + upLineData.length || currentURL.includes('/'+top.id.split("-")[1]?.toLowerCase())) && (activeTab === id || currentURL.includes('/'+top.id.split("-")[1].toLowerCase())) ?                
                "bg-[#232323]  text-selectedBGPrimaryColor font-bold text-lg" : ""
              } ${showTab === true ? "flex justify-center" : ""} rounded-lg  hover:bg-[#232323] dark:hover:bg-[#232323]`}
            >
              <Link
                href={`${top.key === "Home" ? "/" : "/" + actGetPackageURL(top.id)}`}
                className={`${showTab === true ? "" : "flex py-1 "}opacity-90`}
              >
                <Image
                  src={top?.menuIcon?top?.menuIcon:top.icon}
                  alt={top.id}
                  className={`${showTab === true ? "m-auto" : ""} scale-75 brightness-200`}
                  priority
                  width={35}
                  height={15}
                />
                <span className={`${showTab === true ? "text-xs" : " ms-3 py-1"}`}>
                  {/* {top.titles[currentLang]} */}
                  {currentLang == 'eng'? top.title.eng : top.title.mon}
                </span>
              </Link>
            </li>
          ))}
        <li id="breakLine">
          <span className="flex items-center p-2  transition duration-75">
            <svg width="157" height="2" viewBox="0 0 157 2" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line y1="1" x2="157" y2="1" stroke="#232323" strokeWidth="2" />
            </svg>
          </span>
        </li>
      </ul>
    </>
  );
}
