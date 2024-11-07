import UAParser from 'ua-parser-js'
import { actGetCurrentLanguage } from './accessCurrentLang';
import { getCookie } from '@/hooks/client.cookie';
export function getPlatform() {
    const parser :any = new UAParser();
    const result = parser.getResult();
    const deviceType = result.device.type;
    if (deviceType === 'mobile') {
      return "MobWeb";
    } else {
      return "Web";
    }
  }

export const playedObject = (contentData:any, currentTime:any,duration:any)=>{
  let content = contentData
  let playerPositionPerecentage = currentTime? Math.floor((currentTime /duration) * 100):0;

  let data= {
    content_id: content.albumid,
    crew_id:"",
    object_id: content.objectid ? content.objectid : "",
    content_title: content.defaulttitle ? content.defaulttitle : content.title,
    content_type: content.objecttype,
    content_genre: content.defaultgenre ? content.defaultgenre : content.genre,
    content_language: '',
    listen_time: currentTime,
    content_duration: duration,
    content_price: "",
    episode_number: content.episodenum ? content.episodenum : "",
    playback_type: "Streaming",
    season_number: content.seasonnum ? content.seasonnum : "",
    streamed_upto_25perc: playerPositionPerecentage <= 25 ? "TRUE" : "FALSE",
    streamed_upto_50perc: playerPositionPerecentage > 25 && playerPositionPerecentage <= 50 ? "TRUE" : "FALSE",
    streamed_upto_75perc: playerPositionPerecentage > 50 ? "TRUE" : "FALSE",
    finished_streaming: playerPositionPerecentage >= 90 ? "TRUE" : "FALSE",    
    network_type: "WIFI",
    start_position: "",
    source: '',
    country: getCookie("currentCountry"),
    day_of_week: getCurrentDayOfTheWeek(),
    time_of_day: getCurrentTimeFrame(),
    audio_language: '',	
    Lyrics_language: '',
    display_language: getCurrentDisplayLanguage(),    
  }
  return data
}

export const getCurrentTimeFrame = () => {
  let now = new Date();
  // let utcTime = new Date(now.toUTCString());
  // let hours = utcTime.getHours();

  let hours = now.getUTCHours();

  let properTime;

  if (hours >= 0 && hours < 3) {
    properTime = "12am-3am";
  } else if (hours >= 3 && hours < 6) {
    properTime = "3am-6am";
  } else if (hours >= 6 && hours < 9) {
    properTime = "6am-9am";
  } else if (hours >= 9 && hours < 12) {
    properTime = "9am-12pm";
  } else if (hours >= 12 && hours < 15) {
    properTime = "12pm-3pm";
  } else if (hours >= 15 && hours < 18) {
    properTime = "3pm-6pm";
  } else if (hours >= 18 && hours < 21) {
    properTime = "6pm-9pm";
  } else if (hours >= 21 && hours < 24) {
    properTime = "9pm-12am";
  }
  return properTime;
}

export const getCurrentDayOfTheWeek = ()=> {
  const now = new Date();

  const date = now.getUTCDay();

  var gsDayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  return gsDayNames[date];
}

export const getCurrentDisplayLanguage =()=>{
  let lang=''
  actGetCurrentLanguage().then((langSelected:any)=>lang=langSelected)
  return lang
}