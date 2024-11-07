"use client";

import Favourite from "@/shared/v1/favourite";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import Spinner from "@/loaders/spinner/spinner";
import "./miniPlayer.css";
import PlayContent from "@/shared/v1/playContent";
import MoreOption from "@/shared/v1/moreOption";
import { actGetCurrentLanguage } from "@/utils/accessCurrentLang";
import { getDictionary } from "@/i18n/dictionaries";
import ArtistName from '@/containers/artistName';
import { redirectUrl } from "@/utils/content";
import Link from "next/link";
import { useStoreContent } from "@/store/init";
import PlayListSkeleton from "@/containers/skeleton/playListSkeleton";


 function MiniPlayer({ isPlaying, onPlayPause, onNextTrack, onPrevTrack, duration, currentTime, onSeek, volume, onVolumeChange, formattedTime, contentData, isContentLoaded, trackPosition, myPlaylist, actRepeatEnabled, actShuffleWork, myQueuePlaylist, isMute, getVTT, isReplayActive, onReplay, speedOption, onHandleSelectSpeed, activeSpeedTab, speedOptionEnabled, paginationPayload, onEventPagination, primaryPlayListLocalStatex }: any) {
  let { title, poster, category, albumname } = contentData;
  let prevSetVolumn = 0.5;

  const [iconLoaderActive, setIconLoaderActive] = useState(true);
  const [flagEnabled, setFlagEnabled] = useState<any>(false);
  const [exitFullScreen, setExitFullScreen] = useState<any>(false);

  const [isRepeatEnabled, setRepeatEnabled] = useState<any>('rept-off');
  const [shuffleIcon, setShuffleIcon] = useState<any>(true);
  const [lang, setLang] = useState<any>(null);
  const [primaryPlayListLocalStateLength, setPrimaryPlayListLocalStateLength] = useState<number>(0);

  const [showSpeed, setSpeedShow] = useState<any>(false);
  const wrapperRef: any = useRef(null);
  const setContentData = useStoreContent((state : any) => state.setContentData);


  const onQueuemusic = () => {
    setFlagEnabled((prev: any) => {
      let original = !prev;
      if (original) {
        setExitFullScreen(false)
      }
      return original;
    });

  };
  const actScreenChange = () => {
    setExitFullScreen((prev: any) => {
      let original = !prev;
      if (original) {
        setFlagEnabled(false)
      }
      return original;
    })

  }

  const onRepeatProcess = (rept: any) => {
  
    setRepeatEnabled(rept);
    actRepeatEnabled(rept);

  };
  const actShuffle = () => {
    setShuffleIcon(!shuffleIcon);
    setTimeout(() => {
      actShuffleWork(shuffleIcon);
    }, 200);
  };
  const actBackPlayer = () => {
    actScreenChange();
  }




  useEffect(() => {
    setIconLoaderActive(!isContentLoaded);
  }, [isContentLoaded]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if ((window as any).setStoreLanguageDataset) {
      setLang((window as any).setStoreLanguageDataset)
    } else {
      actGetCurrentLanguage().then((langSelected) => {
        getDictionary(langSelected).then((language: any) => {
          setLang(language);
        })
      })
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const onSelectSpeed =(speed:any)=>{  
    onHandleSelectSpeed(speed)
    setSpeedShow(false)
  }
  const actSelectSpeed = () =>{     
    setSpeedShow((prevState:any) => !prevState)
  }
  const actClearCacheARedirect = (item: any) => {
    setContentData(null);
  }


  




  useEffect(() => {
    

    if(!flagEnabled) return

    let itemTarget: any = document.getElementById(`lazyLoadSectionPlayerPlaylist`);
    if (!itemTarget) return;
    let observer: any = {};
    const observerCallback = (entries: any) => {
      const [entry] = entries;

      console.log("paginationPayload", paginationPayload.totalcount, primaryPlayListLocalStatex.length)

      if ( (paginationPayload.totalcount <= primaryPlayListLocalStatex.length) || paginationPayload.totalcount <= 15 || !paginationPayload.totalcount) {
        itemTarget.style.display = 'none';
        observer.unobserve(itemTarget);
        observer.disconnect();
        return;
      }
      if (entry.isIntersecting) {
        onEventPagination('success');
        
      }
    };

    let options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };
    
    observer = new IntersectionObserver(observerCallback, options);
    observer.observe(itemTarget);
    return () => {
			if (itemTarget) {
				observer.unobserve(itemTarget);
        observer.disconnect();
			}
		};
  }, [flagEnabled, primaryPlayListLocalStatex]);


  useEffect(()=>{
    function handleClickOutside(event:MouseEvent){
      if (wrapperRef?.current && !wrapperRef?.current?.contains(event.target)) {
        setSpeedShow(false)
    }
     const target = event.target as Element;
      if(target?.classList?.contains('divAminations')){
            setSpeedShow(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
       document.removeEventListener("mousedown", handleClickOutside)
    }
 },[wrapperRef]); // eslint-disable-line react-hooks/exhaustive-deps
  
  const actgetTemplateReady = (i: any, item: any, type: boolean) => {

    return (<div
      className="flex justify-between px-6  items-center text-primaryItemColor hover:bg-[#2A2A2A] hover:rounded-md"
      key={i}
    >
      <div className="flex">
        <div className="p-4 ">
          <div className="mt-2 w-5">
            <p className="group-hover:hidden ">{i + 1}</p>
            <div className="hidden group-hover:inline">
              <span className="group-hover:block hidden ">
                <PlayContent
                  contentData={item}
                  whereIamFrom="playlist"
                  selectedIndex={i}
                ></PlayContent>
              </span>
            </div>
          </div>
        </div>
        <div className=" my-2 ">
          <Image
            className="mx-auto p-1 aspect-square"
            width={50}
            height={50}
            src={item.poster}
            alt={item.title}
          />
        </div>
        <div className="pb-2 flex max-md:hidden mx-2 mt-4">
          <span>
            <p className="text-sm font-semibold text-primaryColor w-40 overflow-ellipsis truncate hover:cursor-pointer hover:underline">
              {item.title}
            </p>
            <p className="text-xs font-medium text-secondaryItemColor hover:underline">
              {(item?.bandorartist?.castncrew || item?.bandorartist?.bandorartist) ? <ArtistName data={item?.bandorartist} actCallbackBackPlayer={actScreenChange}></ArtistName> : '' }                                
            </p>
          </span>
        </div>
      </div>

      <div className="max-md:hidden">
        <p className="text-ordinaryItemColor text-sm">
          {item.category}
        </p>
      </div>
      <div className="flex gap-4 justify-end items-center pr-3">
        <div className="group-hover:visible invisible mr-4">
          <Favourite
            id={item.objectid}
            contentData={item}
            whereIamFrom={"songslist"}
          ></Favourite>
        </div>

        <div className=" hello text-sm max-md:hidden  ml-4 text-secondaryItemColor">
          <p className="text-secondaryItemColor text-xxl w-5">
            {item.productionyear}
          </p>
        </div>

        <div className="group-hover:visible invisible" >
          <MoreOption
            id={item.objectid}
            contentData={item}
            type={"songslist"}
            invisible={type}
            lang={lang}
            position={'left'}
          ></MoreOption>
        </div>
      </div>
    </div>)
  }

  return (
    <div
      className={`fixed bg-secondaryBgColor overflow-x-hidden divAminations ${flagEnabled ? "queue" : "queue-off"
        }`}
        ref={wrapperRef}
    >
      {exitFullScreen &&
        (<div className=" h-screen overflow-hidden  text-primaryColor divAminations">

          <div className="top-0 right-0 p-12 ">
            <div className="absolute cursor-pointer top-[7rem] left-[1rem]">
              <Image
                src={'/assests/back.svg'}
                height={25}
                width={25}
                alt="back arrow"
                onClick={actBackPlayer}
                className="rounded-md aspect-square cursor-pointer"
                title="Back Arrow"
              ></Image>
            </div>
              <div className="flex flex-col mt-28">
                <div className="mt-7 text-sm">{lang?.PLAYING_FROM_PLAYLIST}</div>
                <div className="mb-2 text-xs">{albumname || title}</div>
                
                <div className="flex flex-col max-md:items-center">
                  <div className="mt-4 w-56 h-56 rounded-lg bg-detailsbordercolor">
                    <Image src={poster} alt="poster Logo" width={100} height={100} className="object-cover w-full h-full rounded-md"></Image>
                  </div>
                  
                  <div className="mt-4 max-md:justify-items-start">
                    <h1 className="font-bold text-xl">{title}</h1>
                    <p className="text-xs">{category}</p>
                  </div>
                </div>
              </div>

              <div className=" ">
              <div className="text-md mt-[-18rem] mr-10 flex flex-col w-[30rem] h-[20rem] overflow-auto fixed right-0 max-md:mt-8 max-md:h-20 max-md:w-auto max-md:m-2 max-md:text-xs ">
                {getVTT &&
                  getVTT.map((vtt: any, i: number) => (
                    <p
                      className="my-5 text-subtitleNotSelectedColor"
                      key={i}
                      id={`subtitle${i}`}
                    >
                      {vtt}
                    </p>
                  ))}
              </div>
            </div>
            </div>
          </div>
       
        )
      }


      <div className={`flex h-auto items-center  text-primaryColor  bg-[#292727]  px-3 py-3 justify-between w-full  max-md:mb-[1.3rem]  border-b-1 border-[#2A2A2A] transition duration-850 ease-out max-md:h-20 max-md:px-4 hover:ease-in ${flagEnabled ? "flxed" : ""}`}>
        <div className="flex items-center gap-10 relative">
          <div className="song-data flex items-center gap-3 w-[15rem] max-w-[20rem] max-md:contents">            
            <div className="bg-dotsLoaderBgColor w-18 max-md:w-[4rem] rounded-md">
              <Image
                src={poster}
                height={100}
                width={100}
                alt="poster Logo"
                className="rounded-md aspect-square"
              ></Image>
            </div>
            <div className="song-details max-md:ml-[-1.5rem]">
              <Link onClick={actClearCacheARedirect} href={redirectUrl(contentData)} > 
              <p className="text-sm font-semibold text-primaryColor w-40 overflow-ellipsis truncate hover:cursor-pointer hover:underline">{title}</p>
              </Link>
              {contentData?.bandorartist && (<p className="text-xs font-medium text-secondaryItemColor hover:underline">
              {(contentData?.bandorartist?.castncrew || contentData?.bandorartist?.bandorartist) ? <ArtistName data={contentData?.bandorartist}></ArtistName> : '' }                                

              </p>)
              }
              <p className="text-xs font-medium text-secondaryItemColor">
                {lang?.[category]}
              </p>
            </div>
          </div>
          <div id="favourity" className="max-md:hidden">
            <Favourite
              id={contentData.objectid}
              whereIamFrom={"player"}
              contentData={contentData}
            ></Favourite>
          </div>
        </div>
        <div className="w-6/12">
          <div className="flex justify-between w-full">
            <div className="flex gap-4 w-full items-center justify-center">
              <div className="relative group">
                {
                  showSpeed &&
                  <div className="absolute block bg-black shadow-md left-1/2 transform -translate-x-1/2 -translate-y-1/2 py-4 px-4 mt-2 mb-[-4rem] -bottom-full rounded  w-[15vw]">               
                    <div className="text-[0.9rem]">{lang?.playback_speed}</div>                    
                      {
                        speedOption?.map((item:any,i:any)=>{
                          return <div key={i} className="flex items-center justify-between">
                              <div key={i} className={`text-[0.8rem] cursor-pointer ${activeSpeedTab==item?'text-selectedBGPrimaryColor':'text-ordinaryItemColor'} mt-2`} onClick={()=>onSelectSpeed(item)}>{ item + 'x'} </div>
                              {
                                activeSpeedTab== item &&
                              <Image
                                className="relative cursor-pointer hover:scale-110 hover:text-detailsbordercolor focus:text-detailsbordercolor max-md:hidden"
                                src="/assests/done_FILL0_wght400_GRAD0_opsz24.svg"
                                alt="speed btn"
                                width={20}
                                height={20}                  
                                priority
                              />
                              }
                          </div> 
                        })
                      }
                      
                  </div>
                }
                { speedOptionEnabled && <div
                  className="relative cursor-pointer hover:scale-110 focus:text-detailsbordercolor max-md:hidden "                
                  onClick={actSelectSpeed}
                >{activeSpeedTab}x</div>
                }

              </div>

              {isRepeatEnabled == 'rept-all' && (
                 <div className="relative custom-tooltip" aria-describedby="tooltip-Repeat track">
                <Image
                  className="relative cursor-pointer hover:scale-110 hover:text-detailsbordercolor focus:text-detailsbordercolor"
                  src="/assests/repeat-all.svg"
                  alt="rept-off"
                  width={20}
                  height={20}
                  onClick={() => onRepeatProcess('rept-off')}
                  priority
                />
                <span className="tooltip-text w-28 text-xs ml-[-3rem]">{lang?.Repeat_track}</span>
                </div>
              )}
              {isRepeatEnabled == 'rept-off' && (
               <div className="relative custom-tooltip" aria-describedby="tooltip-Repeat track">
               <Image
                  className="relative cursor-pointer hover:scale-110 hover:text-detailsbordercolor focus:text-detailsbordercolor"
                  src="/assests/repeat-off.svg"
                  alt="Next.js Logo"
                  width={20}
                  height={20}
                  onClick={() => onRepeatProcess('rept-one')}
                  priority
                />
                <span className="tooltip-text w-28 text-xs ml-[-3rem]">{lang?.Repeat_track}</span>
                </div>
              )}
                {isRepeatEnabled == 'rept-one' && (
                <div className="relative custom-tooltip" aria-describedby="tooltip-Repeat track">
                <Image
                  className="relative cursor-pointer hover:scale-110 hover:text-detailsbordercolor focus:text-detailsbordercolor"
                  src="/assests/repeat-one.svg"
                  alt="rept all"
                  width={20}
                  height={20}
                  onClick={() => onRepeatProcess('rept-all')}
                  priority
                />
                <span className="tooltip-text w-auto text-xs">{lang?.Repeat_track}</span>
                </div>
              )}
              {trackPosition != 0 && (
                <div className="relative custom-tooltip" aria-describedby="tooltip-Skip to the previous track">
                <Image
                  className="relative cursor-pointer hover:scale-110 hover:text-detailsbordercolor focus:text-detailsbordercolor"
                  src="/assests/skipprevious.svg"
                  alt="Previous Logo"
                  width={20}
                  height={20}
                  onClick={onPrevTrack}
                  priority
                  title="Skip to the previous track"
                />
                <span className="tooltip-text w-40 text-xs ml-[-4rem]">{lang?.Skip_to_the_previous_track}</span>
                </div>
              )}

              {!(trackPosition != 0) && (
                <div className="relative custom-tooltip" aria-describedby="tooltip-Skip to the previous track">
                <Image
                  className="relative  hover:text-detailsbordercolor focus:text-detailsbordercolor opacity-10"
                  src="/assests/skipprevious.svg"
                  alt="Previous Logo"
                  width={20}
                  height={20}
                  // onClick={onPrevTrack}
                  priority
                />
                <span className="tooltip-text w-40 text-xs ml-[-4rem]">{lang?.Skip_to_the_previous_track}</span>
                </div>
              )}

              {isPlaying && !iconLoaderActive && !isReplayActive && (
                 <div className="relative custom-tooltip" aria-describedby="tooltip-Play">
                <Image
                  className="relative cursor-pointer hover:scale-110 hover:text-detailsbordercolor focus:text-detailsbordercolor max-md:w-15 max-md:h-20 "
                  src="/assests/play.svg"
                  alt="play Logo"
                  width={40}
                  height={40}
                  onClick={onPlayPause}
                  priority
                />
                <span className="tooltip-text w-auto text-xs">{lang?.play}</span>
                </div>
              )}
              {!isPlaying && !iconLoaderActive && !isReplayActive && (
                <div className="relative custom-tooltip" aria-describedby="tooltip-pause">
                <Image
                  className="relative cursor-pointer hover:scale-110 hover:text-detailsbordercolor focus:text-detailsbordercolor"
                  src="/assests/pause.svg"
                  alt="Pause Logo"
                  width={40}
                  height={40}
                  onClick={onPlayPause}
                  priority
                />
                <span className="tooltip-text w-auto text-xs">{lang?.pause}</span>
                </div>
              )}
               { !iconLoaderActive && isReplayActive && (
               <div className="relative custom-tooltip" aria-describedby="tooltip-replay">
               <Image
                  className="relative cursor-pointer hover:scale-110 hover:text-detailsbordercolor focus:text-detailsbordercolor"
                  src="/assests/replay.svg"
                  alt="Replay Logo"
                  width={40}
                  height={40}
                  onClick={onReplay}
                  priority
                />
                <span className="tooltip-text w-auto text-xs">Replay</span>
                </div>
              )}

              {iconLoaderActive && <Spinner></Spinner>}
              {myPlaylist.length - 1 > trackPosition && (
                <div className="relative custom-tooltip" aria-describedby="tooltip-Skip to the next">
                <Image
                  className="relative cursor-pointer hover:scale-110 hover:text-detailsbordercolor focus:text-detailsbordercolor"
                  src="/assests/skipnxt.svg"
                  alt="Next.js Logo"
                  width={20}
                  height={20}
                  onClick={onNextTrack}
                  priority
                />
                <span className="tooltip-text w-28 text-xs ml-[-4rem]">{lang?.Skip_to_the_next_track}</span>
                </div>
              )}
              {!(myPlaylist.length - 1 > trackPosition) && (
                <div className="relative custom-tooltip" aria-describedby="tooltip-Skip to the next">
                <Image
                  className="relative  hover:text-detailsbordercolor focus:text-detailsbordercolor opacity-10"
                  src="/assests/skipnxt.svg"
                  alt="Next.js Logo"
                  width={20}
                  height={20}
                  // onClick={onNextTrack}
                  priority
                />
                 <span className="tooltip-text  w-28 text-xs ml-[-4rem]">{lang?.Skip_to_the_next_track}</span>
               </div>
              )}
              {shuffleIcon && (
                <div className="relative custom-tooltip" aria-describedby="tooltip-Shuffle">
                <Image
                  className="relative cursor-pointer hover:scale-110 hover:text-detailsbordercolor focus:text-detailsbordercolor"
                  src="/assests/shuffle.svg"
                  alt="shuffle"
                  width={20}
                  height={20}
                  onClick={actShuffle}
                  priority
                />
                <span className="tooltip-text w-auto text-xs">{lang?.Shuffle}</span>
               </div>
              )}
              {!shuffleIcon && (
                <div className="relative custom-tooltip" aria-describedby="tooltip-Shuffle">
                <Image
                  className="relative cursor-pointer hover:scale-110 hover:text-detailsbordercolor focus:text-detailsbordercolor "
                  src="/assests/shuffleActive.svg"
                  alt="shuffle"
                  width={20}
                  height={20}
                  onClick={actShuffle}
                  priority
                />
                <span className="tooltip-text w-auto text-xs">{lang?.Shuffle}</span>
            </div>
              )}
            </div>
          </div>
          <div className="flex items-center mt-1 max-md:hidden">
            <span className="text-sm text-dotsLoaderBgColor mr-2">
              {formattedTime(currentTime)}
            </span>

            <input
              type="range"
              min="0"
              title="seek bar"
              max={duration || 0}
               step="1"
              value={currentTime || 0}
              onChange={(e) => onSeek(parseFloat(e.target.value))}
              className="w-full cursor-pointer bg-gray-300 h-1 rounded-full focus:outline-none "
            />
            <span className="text-sm text-dotsLoaderBgColor ml-2 ">
              {formattedTime(duration)}
            </span>
            <div className="ml-2"></div>
          </div>
        </div>
        <div className="flex items-center  gap-4">

          {flagEnabled ? (
            <div className="relative custom-tooltip" aria-describedby="tooltip-Queue Music">
            <svg width="18" height="18" viewBox="0 0 15 9" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={actScreenChange}>
          <path d="M7.48514 6.39427L12.7746 1.10482C12.9538 0.925565 13.1643 0.830903 13.406 0.820833C13.6476 0.810764 13.8541 0.896354 14.0252 1.0776C14.2065 1.24878 14.2971 1.45521 14.2971 1.69687C14.2971 1.93854 14.2082 2.1483 14.0303 2.32614L8.08931 8.26719C7.99868 8.35781 7.90655 8.42578 7.8129 8.47109C7.71925 8.51641 7.61101 8.53906 7.48816 8.53906C7.36531 8.53906 7.25606 8.51641 7.1604 8.47109C7.06474 8.42578 6.96656 8.35781 6.86587 8.26719L0.955035 2.35635C0.787258 2.17851 0.698335 1.97378 0.688266 1.74219C0.678196 1.51059 0.758752 1.3092 0.929932 1.13802C1.11118 0.95677 1.32264 0.866146 1.56431 0.866146C1.80597 0.866146 2.0114 0.955774 2.18059 1.13503L7.48514 6.39427Z" fill="white"/>
          </svg>
            <span className="tooltip-text text-xs ">{lang?.Minimise}</span>
            </div>
          ) : (
            <div className="relative custom-tooltip" aria-describedby="tooltip-Queue Music">
              <Image
              className="relative cursor-pointer hover:scale-110 max-md:hidden"
              src="/assests/queuemusic.svg"
              alt="queuemusic"
              width={20}
              height={20}
              onClick={onQueuemusic}
              priority
            />
            <span className="tooltip-text text-xs ml-[-4rem]">{lang?.Queue_Music}</span>
            </div>
            
          )
          }

          {getVTT ? (
          <div className="relative custom-tooltip" aria-describedby="tooltip-lyrics">
          <Image
            className="relative cursor-pointer hover:scale-110 max-md:h-6 max-md:w-6 "
            src="/assests/lyrics.svg"
            alt="lyrics"
            width={20}
            height={20}
            onClick={actScreenChange}
            priority
            

          />
            <span className="tooltip-text w-auto text-xs">{lang?.Lyrics}</span>
          </div>
          ) : (
            <div className="relative custom-tooltip" aria-describedby="tooltip-lyrics">
          <Image
            className="relative max-md:hidden"
            src="/assests/lyricsdisable.svg"
            alt="lyrics"
            width={20}
            height={20}
            priority
          />
            <span className="tooltip-text w-auto text-xs">{lang?.Lyrics}</span>
          </div>
          )
          }


          {isMute ? (
          <div className="relative custom-tooltip" aria-describedby="tooltip-Sound">
          <Image
            className="relative cursor-pointer hover:scale-110 max-md:hidden"
            src="/assests/mute.png"
            alt="mute"
            width={20}
            height={20}
            onClick={() => onVolumeChange(prevSetVolumn)}
            priority
          />
          <span className="tooltip-text w-auto text-xs">{lang?.Sound}</span>
          </div>
          ) : (
            <div className="relative custom-tooltip" aria-describedby="tooltip-Sound">
          <Image
            className="relative cursor-pointer hover:scale-110 max-md:hidden"
            src="/assests/sound.svg"
            alt="Next.js Logo"
            width={20}
            height={20}
            onClick={() => onVolumeChange(0)}
            priority
          />
          <span className="tooltip-text w-auto text-xs">{lang?.Sound}</span>
          </div>
          )

          }
          <div className="relative custom-tooltip" aria-describedby="tooltip-Volumn Bar">
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={(e) => {
              prevSetVolumn = parseFloat(e.target.value);
              onVolumeChange(parseFloat(e.target.value))
            }
            }
            className="w-full cursor-pointer bg-gray-300 h-1 mt-2 rounded-full focus:outline-none max-md:hidden "
          />
           <span className="tooltip-text w-auto text-xs ml-[-5rem]">{lang?.Volume}</span>
          </div>

          {exitFullScreen ? (
           <div className="relative custom-tooltip" aria-describedby="tooltip-Full Screen">
          <Image
            className="relative hover:scale-110 max-md:hidden cursor-pointer "
            src="/assests/Vectormute.svg"
            alt="Full Screen"
            width={20}
            height={20}
            priority
            onClick={actScreenChange}
          />
          <span className="tooltip-text w-16 text-xs">{lang?.Full_screen}</span>
          </div>
          ) : (
          <div className="relative custom-tooltip" aria-describedby="tooltip-Full Screen">
          <Image
            className="relative hover:scale-110 max-md:hidden cursor-pointer "
            src="/assests/readytofullscreen.png"
            alt="Full Screen"
            width={20}
            height={20}
            priority
            onClick={actScreenChange}
          />
          <span className="tooltip-text w-32 text-xs ml-[-5rem]">{lang?.Full_screen}</span>
          </div>
          )
          }
        </div>

      </div>
      {flagEnabled && (
    
        <div className="divAminations  overflow-x-hidden h-[80vh] mx-2">
          {myQueuePlaylist.length > 0 && <h3 className="text-primaryColor ml-4 my-4">{lang?.Next_in_Queue}</h3>}
          <div className="w-full group  hover:rounded-md mb-6">
            <div className=" bg-primaryBgColor mt-4">
              {myQueuePlaylist?.map((item: any, i: number) => {
                return (actgetTemplateReady(i, item, true));
              })}
            </div>
          </div>


          <h3 className="text-primaryColor ml-4 my-4">Next From: {title}</h3>
          {/* {primaryPlayListLocalStateLength} */}
          <div className="w-full group  hover:rounded-md mb-6">
            <div className="bg-primaryBgColor mt-4">
              {myPlaylist?.map((item: any, i: number) => {
                return (actgetTemplateReady(i, item, false));
              })}     
              
              (<div id="lazyLoadSectionPlayerPlaylist">
                <PlayListSkeleton></PlayListSkeleton>  
              </div>)

          
            </div>
          </div>
        </div>
      )}

 
    </div>
  );
}


export default React.memo(MiniPlayer);
