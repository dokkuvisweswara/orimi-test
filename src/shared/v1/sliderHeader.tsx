'use client'
import { DEFAULT_LANGUAGE_SETUP } from "@/constants/v1/constants";
import { getCookie } from "@/hooks/client.cookie";
import { contentlistUtil, itemListUtil } from "@/utils/deckingSectionUtil";
import { widthArray } from "@/utils/sliderConfig";
import Link from "next/link";
import { useEffect, useState } from "react";


export default function SliderHeader(props: any){     
    let IS_PREV = props?.swiperInstance?.isBegain;
    let IS_NEXT = props?.swiperInstance?.isEnd;
    
    const [showIcon, setShowIcon] = useState<any>(true) 

    const setSeeAllConfigData = () => {
        let APIStruc: any = props?.apiCallData;
        let configList: any = props?.config;




        if (configList && configList.sectionType === "ITEMLIST" ) {
            if (configList.itemType === "CONTENT") {
                APIStruc = contentlistUtil(props?.config);
            } else {
                APIStruc = itemListUtil(props?.config);
            }
            APIStruc.itemType = configList.itemType;

        }

        let lang = getCookie('localeLangauge');
        lang = lang == 'en' ? 'eng' : 'mon'

        if (!configList) {
            configList = {};
            configList.title = {};
            configList.title[lang] = props?.itemlist.titleheader
        } 
        if (APIStruc?.data) {
            APIStruc = APIStruc.data;
            configList = {};
            configList.title = {};
            configList.title[lang] = (props?.apiCallData.title) ? props?.apiCallData.title : props?.itemlist?.title;
        }

        localStorage.setItem('title-see-all', JSON.stringify(configList));

  
        localStorage.setItem('getSeeAllSectionConfig', APIStruc ? JSON.stringify(APIStruc) : JSON.stringify(props.sectionData));

        (window as any).getSeeAllSectionData = props.sectionData;

    }
    const makeUrl = () => {
        let selectedLangLocal: any = DEFAULT_LANGUAGE_SETUP;
        if (typeof window !== 'undefined') {
          selectedLangLocal = getCookie('localeLangauge')
        }
        let title = props.title ? props.title : props.defaultTitle;
        title = title ? title : props?.itemlist?.title;
        if (props.itemlist?.engTitle) {
            title = props.itemlist.engTitle;
        }
        title = title?.toLowerCase();
        title = title?.replace(/ /g, '-');              
        return  `/${selectedLangLocal}/seeall/${title}`;
    }
    const [windowWidth,setWindowWidth]=useState<any>()

    useEffect(()=>{

        const handleResize = () =>{
                setWindowWidth(window.innerWidth) 
                handleResizeIcon(props?.sectionData?.length)
        }  
        setWindowWidth(window.innerWidth)          
        window.addEventListener('resize', handleResize);      
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    },[]); // eslint-disable-line react-hooks/exhaustive-deps


    useEffect(() => {
        handleResizeIcon(props?.sectionData?.length);
    },[props?.sectionData]); // eslint-disable-line react-hooks/exhaustive-deps

    const handleResizeIcon = (len: any) =>{
        let windowWidth = (typeof window !== 'undefined')? window.innerWidth : 100;
         widthArray.map((ele,i)=>{
            if (props?.defaultTitle=="RecentlyWatch") {
                if (ele.screenSize.min<=windowWidth && ele.screenSize.max>=windowWidth) {
                    if(len < 15 ) {
                        setShowIcon(false)
                    }
                }
            } else if(props?.whereIamFrom=='SEARCH') {
                if (len < ele.slidesPerView) {
                    setShowIcon(false)
                }
            }else if(ele.screenSize.min <=windowWidth &&  ele.screenSize.max >= windowWidth){
                if (len <= ele.slidesPerView) {
                    setShowIcon(false)
                } else if (len >= ele.slidesPerView) {
                    setShowIcon(true)
                }   
                            
            }
         })
    }
    const handlePrevButton = () => {       
        props?.handlePrevSlide(true)
    }
    const handleNextButton = () => {         
        props?.handleNextSlide(true)
    }
    return (
        <header className="mb-4">
            <div className="flex flex-wrap justify-between w-full mx-auto">
                {
                    props?.whereIamFrom =='SEARCH'?
                    <h2 className="text-2xl flex font-semibold text-[1rem] text-primaryColor">{props?.lang[props?.itemlist?.titleheader || props?.itemlist?.title] || (props?.itemlist?.titleheader || props?.itemlist?.title)}</h2>:
                    <h2 className="text-2xl flex font-semibold text-[1.2rem] text-primaryColor">{props?.itemlist?.titleheader || props?.itemlist?.title}</h2>
                }
                {
                        showIcon && 
                   ( <div className="flex gap-3 items-center">       
                        {
                            props?.isSeeAllEnable &&
                            <div className={`flex h-6 ${props?.itemlist?.titleheader === 'Genre' && 'hidden'}`} onClick={() => {setSeeAllConfigData()}}>
                                <Link href={makeUrl()} className="flex items-center text-primaryColor no-underline rounded-full border border-solid border-detailsbordercolor  text-sm px-3 pb-1 pt-[0.1rem] gap-2  hover:bg-gridTagsonhoverColor w-full h-full">
                                    <span className="uppercase">{props?.lang?.see_all}</span>
                                </Link>
                            </div>
                        }                  
                        {
                            props?.whereIamFrom=="RecentlyWatch" ?
                            <div className={`flex items-center justify-center gap-4 ${props?.itemlist?.titleheader === 'Genre' && 'hidden'}`} >
                                <div className={`inline-block text-detailsbordercolor no-underline text-1.5 mx-1 cursor-pointer`} onClick={handlePrevButton}>
                                    <svg width="7" height="12" viewBox="0 0 7 12" fill={IS_PREV?'gray':'white'} xmlns="http://www.w3.org/2000/svg" className={`RecentlyPlayed-swiper-button-prev`} >
                                        <path d="M2.46313 5.82988L6.36313 9.72988C6.54647 9.91322 6.63813 10.1465 6.63813 10.4299C6.63813 10.7132 6.54647 10.9465 6.36313 11.1299C6.1798 11.3132 5.94647 11.4049 5.66314 11.4049C5.3798 11.4049 5.14647 11.3132 4.96313 11.1299L0.363135 6.52988C0.263135 6.42988 0.192301 6.32155 0.150635 6.20488C0.108968 6.08822 0.0881348 5.96322 0.0881348 5.82988C0.0881348 5.69655 0.108968 5.57155 0.150635 5.45488C0.192301 5.33822 0.263135 5.22988 0.363135 5.12988L4.96313 0.529883C5.14647 0.346549 5.3798 0.254883 5.66314 0.254883C5.94647 0.254883 6.1798 0.346549 6.36313 0.529883C6.54647 0.713216 6.63813 0.946549 6.63813 1.22988C6.63813 1.51322 6.54647 1.74655 6.36313 1.92988L2.46313 5.82988Z"/>
                                    </svg>
                                </div>
                                <div className={`text-primaryItemColor no-underline text-1.5 mx-1 cursor-pointer`} onClick={handleNextButton}>
                                    <svg width="8" height="12" viewBox="0 0 8 12" fill={IS_NEXT?'gray':'white'} xmlns="http://www.w3.org/2000/svg" className={`RecentlyPlayed-swiper-button-next`}>
                                        <path d="M4.86157 5.82988L0.961572 9.72988C0.778239 9.91322 0.686572 10.1465 0.686572 10.4299C0.686572 10.7132 0.778239 10.9465 0.961572 11.1299C1.14491 11.3132 1.37824 11.4049 1.66157 11.4049C1.94491 11.4049 2.17824 11.3132 2.36157 11.1299L6.96157 6.52988C7.06157 6.42988 7.13241 6.32155 7.17407 6.20488C7.21574 6.08822 7.23657 5.96322 7.23657 5.82988C7.23657 5.69655 7.21574 5.57155 7.17407 5.45488C7.13241 5.33822 7.06157 5.22988 6.96157 5.12988L2.36157 0.529883C2.17824 0.346549 1.94491 0.254883 1.66157 0.254883C1.37824 0.254883 1.14491 0.346549 0.961572 0.529883C0.778239 0.713216 0.686572 0.946549 0.686572 1.22988C0.686572 1.51322 0.778239 1.74655 0.961572 1.92988L4.86157 5.82988Z"/>
                                    </svg>
                                </div>
                            </div> :  
                            <div className={`flex items-center justify-center gap-4 ${props?.itemlist?.titleheader === 'Genre' && 'hidden'}`} >
                                <div className={`inline-block text-detailsbordercolor no-underline text-1.5 mx-1 cursor-pointer`}>
                                    <svg width="7" height="12" viewBox="0 0 7 12" fill={IS_PREV?'gray':'white'} xmlns="http://www.w3.org/2000/svg" className={`${props?.defaultTitle}-swiper-button-prev`}>
                                        <path d="M2.46313 5.82988L6.36313 9.72988C6.54647 9.91322 6.63813 10.1465 6.63813 10.4299C6.63813 10.7132 6.54647 10.9465 6.36313 11.1299C6.1798 11.3132 5.94647 11.4049 5.66314 11.4049C5.3798 11.4049 5.14647 11.3132 4.96313 11.1299L0.363135 6.52988C0.263135 6.42988 0.192301 6.32155 0.150635 6.20488C0.108968 6.08822 0.0881348 5.96322 0.0881348 5.82988C0.0881348 5.69655 0.108968 5.57155 0.150635 5.45488C0.192301 5.33822 0.263135 5.22988 0.363135 5.12988L4.96313 0.529883C5.14647 0.346549 5.3798 0.254883 5.66314 0.254883C5.94647 0.254883 6.1798 0.346549 6.36313 0.529883C6.54647 0.713216 6.63813 0.946549 6.63813 1.22988C6.63813 1.51322 6.54647 1.74655 6.36313 1.92988L2.46313 5.82988Z"/>
                                    </svg>
                                </div>
                                <div className={`text-primaryItemColor no-underline text-1.5 mx-1 cursor-pointer`}>
                                    <svg width="8" height="12" viewBox="0 0 8 12" fill={IS_NEXT?'gray':'white'} xmlns="http://www.w3.org/2000/svg" className={`${props?.defaultTitle}-swiper-button-next`}>
                                        <path d="M4.86157 5.82988L0.961572 9.72988C0.778239 9.91322 0.686572 10.1465 0.686572 10.4299C0.686572 10.7132 0.778239 10.9465 0.961572 11.1299C1.14491 11.3132 1.37824 11.4049 1.66157 11.4049C1.94491 11.4049 2.17824 11.3132 2.36157 11.1299L6.96157 6.52988C7.06157 6.42988 7.13241 6.32155 7.17407 6.20488C7.21574 6.08822 7.23657 5.96322 7.23657 5.82988C7.23657 5.69655 7.21574 5.57155 7.17407 5.45488C7.13241 5.33822 7.06157 5.22988 6.96157 5.12988L2.36157 0.529883C2.17824 0.346549 1.94491 0.254883 1.66157 0.254883C1.37824 0.254883 1.14491 0.346549 0.961572 0.529883C0.778239 0.713216 0.686572 0.946549 0.686572 1.22988C0.686572 1.51322 0.778239 1.74655 0.961572 1.92988L4.86157 5.82988Z"/>
                                    </svg>
                                </div>
                            </div>
                        }
                    </div>
                   )
                }
            </div>
        </header>
    )}
    