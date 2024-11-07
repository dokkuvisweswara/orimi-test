'use client'
import React, { useState, useEffect, useRef } from 'react';
import MiniPlayer from "@/player/ui/v1/miniPlayer";
import { determineContentPlanDetails, getContentInformation } from '@/player/helper/playerUtility'
import { actGetPackageURL, actGetDRMToken, actGetAccessDRMPackageAPI, actGetSingleAvailability } from '@/services/actions/player.action';
import { getAccessTokenObj } from '@/services/helpers/init.helper';
import DASHPLAYER from '@/player/stream/dash'
import M3U8 from '@/player/stream/m3u8';
import { useRouter } from "next/navigation";
import { getCookie } from '@/hooks/client.cookie'
import { notify } from '@/(layout)/v1/ToasterComponent';
import { useStorePlayer, usePlayList, useStoreAddToQue, useSelectedIndexFromPlaylist } from '@/store/init';
import { updateContinueWatch } from "@/libs/firebaseUtility";
import { SUBTITEBASEURL } from '@/constants/v1/constants';
const { VttFile } = require('@polyflix/vtt-parser');
const { detect } = require('detect-browser');
import { errors_message } from "@/constants/errors_constants"
import { playedObject } from '@/utils/analyticsFunction';
import { playedEvent } from '@/utils/firebaseAnalytics';
import { dataType, getTrackQnique } from '@/utils/content';
import Image from 'next/image';

import closeIcon from "../../../public/closeicon.svg";

import RentalPurchaseFlow from '../plan/rentalPurchaseFlow';
import Modal from '@/components/v1/modelbox';

export default function BasePlayer({ currentPlaybackPosition, primaryPlayListLocalState, paginationPayload, contentData, lang, onEventPagination }: any) {
  const router = useRouter();
  const browser = detect();


  const [isPlaying, setIsPlaying] = useState(true);
  const [clearleadDuration, setClearleadDuration] = useState<number|null>(null);
  const [isClearLeadPopupEnabled, setIsClearLeadPopupEnabled] = useState<boolean>(false);


  const [currentTrack, setCurrentTrack] = useState<any>(null);
  const [isReadyToPlay, setIsReadyToPlay] = useState<any>(false);

  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [isContentLoaded, setIContentLoaded] = useState(false);
  const [isMute, setIsMute] = useState(false);
  const [isReplayActive, setReplayActive] = useState(false);

  const [trackPosition, setTrackPosition] = useState<any>(null)
  const [priceclassdetailList, setPriceclassdetailList] = useState<any>({})

  

  const [myPlaylist, setMyPlaylist] = useState<any>([])
  const [myQueuePlaylist, setMyQueuePlaylist] = useState<any>([])

  const primaryPlayList = useStorePlayer((state: any) => state.primaryPlayList);
  const [repeatType, setRepeatType] = useState<any>('');

  const [getVTT, setVTT] = useState<any>(null);
  const [subtitleData, setSubtitleData] = useState<any>(null)
  const [speedOption, setSpeedOption] = useState<any>([0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75]);
  const [activeSpeedTab, setActiveSpeedTab] = useState<any>(1);

  const [speedOptionEnabled, setSpeedOptionEnabled] = useState<boolean>(true);
  const [isRentalPurchaseActive, setIsRentalPurchaseActive] = useState<boolean>(false);

  

  const removeFromQueContent = useStoreAddToQue((state: any) => state.removeFromQueContent);


  useEffect(() => {
    let trackNum = getTrackQnique(trackPosition)
    if (trackNum != null) {
      setIContentLoaded(false)
      let track = myPlaylist[trackNum];
      actInitialization(track)
      setCurrentTrack(track);

      if (dataType(track) == 'ALBUM' || dataType(track) === 'MUSIC') {
        setSpeedOptionEnabled(false);
      } else {
        setSpeedOptionEnabled(true);
      }
    }
  }, [trackPosition]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const unsubscribe = useStoreAddToQue.subscribe((state: any) => {
      setMyQueuePlaylist([...state.addToQueContent])
    });

    return () => unsubscribe();
  }, [])

  useEffect(() => {
    setMyPlaylist(primaryPlayListLocalState);
  }, [primaryPlayListLocalState]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setTrackPosition(currentPlaybackPosition)
  }, [currentPlaybackPosition]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const unsubscribe = useSelectedIndexFromPlaylist.subscribe((state: any) => {
      let trackPosition = state.selectedIndexPlaylist
      setTrackPosition(trackPosition)
    });
    return () => unsubscribe();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps


  function reset () {

    setIsClearLeadPopupEnabled(false);
    setClearleadDuration(null);
    audioRef.current.currentTime = 0;
  }

  function connectWithPlayer(playback_details: any, drmInfo: any, packageInfo: any) {
    const playbackSetupInfo: any = {};

    playbackSetupInfo.packageid = playback_details.packageid;
    playbackSetupInfo.objectid = playback_details.objectid;
    playbackSetupInfo.drmToken = drmInfo;
    playbackSetupInfo.manifestUri = packageInfo.streamfilename
    playbackSetupInfo.packagedfilelist = packageInfo.packagedfilelist


    setIsReadyToPlay(true);
    if (browser.name === 'safari' || browser.os == 'iOS') {
      M3U8(playbackSetupInfo)
    } else {
      DASHPLAYER(playbackSetupInfo);
    }

    try {
      actVTTParser(packageInfo.packagedfilelist);
    } catch (e) { }


  }

  const audioRef: any = useRef(null);

  async function actAccessContent(filteredPlayerObj: any) {
    reset();

    const accessPayload: any = {
      contentid: filteredPlayerObj.objectid,
      ios: false,
      seclevel: 'SW'
    }
    if (browser.name === 'safari' || browser.os == 'iOS') {
      accessPayload.ios = true;
      accessPayload.mpegts = true;
    }

    const information = await actGetAccessDRMPackageAPI(accessPayload, getAccessTokenObj());

    if ((information.errorcode == 8882 || information.isAccess == false) && !(information.clearlead && information.clearlead > 0)) {

      let availabilities: any = localStorage.getItem('availabilities');
      availabilities = availabilities ? JSON.parse(availabilities) : '';


      const { availabilityList, packageList }: any = determineContentPlanDetails(filteredPlayerObj, availabilities)

      if (availabilityList.length > 0) {
        const { availabilityid, licenseduration, pricemodel } = availabilityList[0];

        if (pricemodel == "RENTAL" || pricemodel == "PAID") {
          let { priceclassdetail } : any = await actGetSingleAvailability(availabilityid, getAccessTokenObj());
          setPriceclassdetailList({priceclassdetail, pricemodel, contentData : primaryPlayListLocalState[currentPlaybackPosition.track], licenseduration})
          setIsRentalPurchaseActive(true)
        } else {
          notify(lang?.Content_accessible, 'info');
          if (getCookie('sessionToken')) {
            router.push('/subscribe');
          } else {
            router.push('/')
          }
      }
    }


      setCurrentTrack(null);
      setIsReadyToPlay(false);
    
      return;
    }

    if (information.clearlead && typeof information.clearlead === 'number' && information.isAccess == false) {
      setClearleadDuration(information.clearlead);
    }


    let playback_details: any = {
      packageid: information.packageid,
      objectid: filteredPlayerObj.objectid
    }
    let drmInfo = information?.drmToken?.success
    let packageInfo: any = {
      streamfilename: information.streamfilename,
      packagedfilelist: information.packagedfilelist
    }
    connectWithPlayer(playback_details, drmInfo, packageInfo);
  }

  async function actInitialization(filteredPlayerObj: any) {
    destroyPlayer();
    setIsPlaying(true)

    actAccessContent(filteredPlayerObj);
  }

  const actMakePause: any = () => {
    audioRef.current.pause();
  }

  const playPauseToggle: any = () => {
    if (isPlaying) {
      actMakePause();
      updateDataOnFirebase();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };
  const handleVideoEnd = () => {
    setReplayActive(false);

    if (repeatType == 'rept-one') {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    } else {
      if (myPlaylist.length > 1 || myQueuePlaylist.length > 0) {
        handleNextTrack();
      } else {
        if (repeatType == 'rept-all') {
          if (myPlaylist.length == 1) {
            setReplayActive(true);
          } else {
            setTrackPosition(0)
          }
        } else {
          setReplayActive(true);
        }
      }
    }
  };

  const actQueueActiveFPlayback = () => {
    let filterItem = myQueuePlaylist;
    let currentTrackQueue = filterItem.shift();
    removeFromQueContent();

    setIContentLoaded(false)
    actInitialization(currentTrackQueue)
    setCurrentTrack(currentTrackQueue);
  }

  const handleNextTrack = () => {
    if (myQueuePlaylist.length > 0) {
      actQueueActiveFPlayback();
      return;
    }
    let trackNum = getTrackQnique(trackPosition)

    if (myPlaylist.length - 1 != trackNum) {
      setTrackPosition((prevTrack: any) => {
        return getTrackQnique(prevTrack) + 1
      });
    } else {
      if (repeatType == 'rept-all') {
        setTrackPosition(0)
      } else {
        setReplayActive(true);
      }

    }
    setIsPlaying(true); // Auto-play next track
    updateDataOnFirebase();
  };
  const updateDataOnFirebase = () => {

    let watchedDuration = audioRef.current.currentTime;
    let watchStatus = null;
    let content = currentTrack;
    const subscriberId = getCookie("subscriberId");
    const profileId = getCookie("ProfileId");
    let percentOfContentCompeted = Math.floor((watchedDuration / audioRef.current.duration) * 100);

    if (percentOfContentCompeted >= 75) {
      watchStatus = "COMPLETED";
    } else {
      watchStatus = "INPROGRESS";
    }

    updateContinueWatch(content, watchStatus, watchedDuration, subscriberId, profileId)

  }
  const destroyPlayer = () => {
    try {
      if ((window as any).player) {
        (window as any).player.configure({ drm: {} });
        (window as any).player.unload();
        (window as any).player.destroy();
      }
    } catch (e) {
      console.log(e)
    }

  }
  const handlePrevTrack = () => {

    setTrackPosition((prevTrack: any) => {
      return getTrackQnique(prevTrack) - 1
    });
    
    setIsPlaying(true); // Auto-play previous track
  };
  const handleVolumeChange = (newVolume: any) => {
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
    if (newVolume == 0) {
      setIsMute(true)
    } else {
      setIsMute(false)
    }

  };
  const handleSeek = (seekTime: any) => {

    audioRef.current.currentTime = seekTime;
    fireClearLead(seekTime)
  };

  const fireClearLead = (currentTime: any) => {

    if ((clearleadDuration !== null) && clearleadDuration <= Math.floor(currentTime)) {
      playPauseToggle();
      setIsClearLeadPopupEnabled(true)
    }
  }

  const handleTimeUpdate = () => {
    // clearleadDuration

    let currentTime = audioRef.current.currentTime;

    fireClearLead(currentTime)


    setCurrentTime(currentTime);
    actCurrentSubtitle(currentTime)
  };
  const handleLoadUpdate = () => {
    setIContentLoaded(true);
    console.log("I am loaded")

    let trackNum = getTrackQnique(trackPosition)

    if (paginationPayload.totalcount > myPlaylist.length && (trackNum + 1) == myPlaylist.length) {
      onEventPagination("success")
     }
  };
  const onReplay = () => {
    audioRef.current.currentTime = 0;
    audioRef.current.play();
    setReplayActive(false);
  }
  const formattedTime = (given_seconds: any) => {

    given_seconds = Math.floor(given_seconds)
    const hours = Math.floor(given_seconds / 3600);
    const minutes = Math.floor((given_seconds - (hours * 3600)) / 60);
    const seconds = given_seconds - (hours * 3600) - (minutes * 60);

    return String(hours).toString().padStart(2, '0') + ':' + String(minutes).toString().padStart(2, '0') + ':' + String(seconds).toString().padStart(2, '0');
  };

  const actRepeatEnabled = (status: any) => {
    setRepeatType(status)
  }
  const shuffle = (array: any) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const actShuffleWork = (status: any) => {
    if (status) {
      setMyPlaylist(shuffle(myPlaylist))
    } else {
      setMyPlaylist(myPlaylist.sort((m: any, n: any) => {
        return (m.orderNumber - n.orderNumber);
      })
      )
    }
  }

  const actVTTParser = (packagedfilelist: any) => {
    setVTT(null)

    if (packagedfilelist && packagedfilelist.subtitle && packagedfilelist.subtitle.length > 0) {
      let subtitle = packagedfilelist.subtitle[0].filename;
      const url = SUBTITEBASEURL + subtitle;

      VttFile.fromUrl(url).then((file: any) => {
        let parsedData: any = JSON.parse(JSON.stringify(file.getBlocks()));
        let data = parseWebVtt(file.vttFileRaw)
        data.shift();
        setSubtitleData(data)
        let vtt = parsedData.map((item: any) => {
          return item.text
        })
        setVTT(vtt)
      })
    } else {
      setVTT(null)
    }
  }

  const actCurrentSubtitle = (currentTime: any) => {
    let currentIndex = 0;
    while (currentIndex < subtitleData?.length && currentTime > subtitleData[currentIndex].endTime) {
      currentIndex++;
    }

    if (subtitleData && currentIndex < subtitleData?.length && currentTime <= subtitleData[currentIndex].endTime && currentTime > subtitleData[currentIndex].startTime) {
      let currentIndexObj: any = document.getElementById(`subtitle${currentIndex}`);

      if (currentIndex >= 0 && currentIndexObj) {

        for (let i = 0; i <= subtitleData.length; i++) {
          let flag = document.getElementById(`subtitle${i}`);
          flag?.classList.remove('redText');
        }

        currentIndexObj?.classList.add('redText');
        if (currentIndex >= 4) {
          currentIndexObj.scrollIntoView({
            behavior: "smooth",
            block: "center",
          })
        }
      }
    }
  }
  function parseWebVtt(data: any) {
    const cues: any = [];
    const lines = data?.split('\n');
    let cue: any = {};

    for (let i = 0; i < lines.length; i++) {
      if (lines[i].includes('-->')) {
        const [startTime, endTime] = lines[i].split('-->');
        cue.startTime = parseTime(startTime.trim());
        cue.endTime = parseTime(endTime.trim());
      } else if (lines[i].trim() === '') {
        cues.push(cue);
        cue = {};
      } else {
        if (!cue.text) {
          cue.text = lines[i].trim();
        } else {
          cue.text += ' ' + lines[i].trim();
        }
      }
    }

    return cues;
  }

  function parseTime(timeString: any) {
    const [hours, minutes, seconds] = timeString.split(':').map(parseFloat);
    return hours * 3600 + minutes * 60 + seconds;
  }

  const handleSelectSpeed = (speed: any) => {
    setActiveSpeedTab(speed)
    if (audioRef.current) {
      audioRef.current.playbackRate = speed;
    }
  }

  const handleClosePopup = () => {
    setIsRentalPurchaseActive(false);
  }
  const handleClick = () => {
    router.push('/subscribe');
    setIsClearLeadPopupEnabled(false)
  }

  return (
    <div>
      <audio
        ref={audioRef}
        id="playback-unit"
        onTimeUpdate={handleTimeUpdate}
        onLoadedData={handleLoadUpdate}
        onEnded={handleVideoEnd}
        autoPlay={true}
        playsInline={true}
      />


{isRentalPurchaseActive && ( <Modal  
isVisible={isRentalPurchaseActive} 
AllClass={"w-[90%] sm:w-[90%] md:w-[90%] lg:w-[70%] mx-[5%] sm:mx-[5%] md:mx-[5%] lg:mx-[15%] my-[10%] sm:my-[5%] md:my-[5%] lg:my-[2%]"}>

    
          <Image src={closeIcon} alt="closeicon" onClick={() => setIsRentalPurchaseActive(false)} style={{ position: 'absolute', right: '5%', top: '3%',
    transform: 'scale(2)'}} />

       <div className=" text-primaryheadingColor bg-[#151617]">
              <RentalPurchaseFlow priceclassdetail={priceclassdetailList.priceclassdetail[0]} pricemodel={priceclassdetailList.pricemodel}  contentData={priceclassdetailList.contentData} licenseduration={priceclassdetailList.licenseduration} lang={lang}></RentalPurchaseFlow>
            </div>
    </Modal>
      )}


      {isClearLeadPopupEnabled &&  (<Modal isVisible={isClearLeadPopupEnabled}>

        <div className='clear-lead-popup'>
          <Image src={closeIcon} alt="closeicon" onClick={() => setIsClearLeadPopupEnabled(false)} className='img-close'/> 
          <Image
            className="mx-auto p-1 aspect-square"
            width={150}
            height={150}
            src={currentTrack.poster}
            alt={currentTrack.title}
          />
            <div className='clearlead-close'>
              <div className="description">{lang?.enjoy_description}</div>
              <div className='btn'>
                <button value="Subscribe Now" onClick={handleClick}> {lang?.subscribe_now} </button>
                <button value="Subscribe Now" onClick={() => setIsClearLeadPopupEnabled(false)} >{lang?.not_now} </button>
              </div>
            </div>
          
        </div>
     </Modal>)}

      {(currentTrack !== null && isReadyToPlay) && <MiniPlayer
        isPlaying={isPlaying}
        onPlayPause={playPauseToggle}
        onNextTrack={handleNextTrack}
        onPrevTrack={handlePrevTrack}
        duration={audioRef.current && audioRef.current.duration ? audioRef.current.duration : 0}
        currentTime={currentTime}
        onSeek={handleSeek}
        volume={volume}
        onVolumeChange={handleVolumeChange}
        contentData={currentTrack}
        formattedTime={formattedTime}
        isContentLoaded={isContentLoaded}
        trackPosition={getTrackQnique(trackPosition)}
        myPlaylist={myPlaylist}
        actRepeatEnabled={actRepeatEnabled}
        actShuffleWork={actShuffleWork}
        myQueuePlaylist={myQueuePlaylist}
        isMute={isMute}
        getVTT={getVTT}
        onReplay={onReplay}
        isReplayActive={isReplayActive}
        speedOption={speedOption}
        onHandleSelectSpeed={handleSelectSpeed}
        activeSpeedTab={activeSpeedTab}
        speedOptionEnabled={speedOptionEnabled}
        paginationPayload={paginationPayload}
        onEventPagination={onEventPagination}
        primaryPlayListLocalStatex={primaryPlayListLocalState}
      />
      }

    </div>
  );
};
