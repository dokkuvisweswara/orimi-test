import { getCookie } from '@/hooks/client.cookie';
import placeholder from '../../public/placeHolder.svg';
import { DEFAULT_LANGUAGE_SETUP } from '@/constants/v1/constants';

export const getPoster = (item: any, postertype : string, quality: string, secondChoise: string=''):string => {    
    let fileName = '';
      if (typeof item === 'string') {
        return item;
      }
      try {
        let poster: any = item.poster;
        let posterArr: any = (poster.filter((item: any) => item.postertype == postertype))[0];
        if (!posterArr) {
          posterArr = (poster.filter((item: any) => item.postertype == secondChoise))[0]
        } 
        fileName = posterArr.filelist.filter((imglist: any) => imglist.quality == quality)[0].filename
      } catch(err) {
        if (item?.thumbnail) {
          fileName = item.thumbnail;
        } else if(item?.poster) {
          fileName = item.poster.square ? item.poster.square : placeholder;
        } else {
          fileName = placeholder;
        }
      } finally {
          return fileName
      }  
}

export const bandorartist = (content: any): any => {
  return {castncrew: content.castncrew, bandorartist: content.bandorartist }

}

export const getPosterRecently = (item: any, postertype : string, quality: string):string => {    
  let fileName = '';
    try {
      let poster: any = item.poster;
         let posterArr: any = (poster.filter((item: any) => item.postertype == postertype))[0];
          fileName = posterArr.filelist.filter((imglist: any) => imglist.quality == quality)[0].filename
    } catch(err) {
      if (item?.thumbnail) {
        fileName = item.thumbnail;
      } else {
        fileName = ""
      }
      
    } finally {
        return fileName
    }  
}

export const formatDate = (D: any):string => {
  if (!D) return '';
  let dateObj = new Date(D);
  const months = ["January", "February", "March", "April", "May", "June",
  	        "July", "August", "September", "October", "November", "December"]
  let myDate = String(dateObj.getUTCDate()).padStart(2, '0') + " " + (months[dateObj.getMonth()]) + " "  +(dateObj.getUTCFullYear()) + " ";
  return myDate;
}
export const formatTime = (totalSeconds: any,lang :any):string => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    let returnData:any = '';
    const formattedTime = [
      String(hours).padStart(2, '0'),
      String(minutes).padStart(2, '0'),
      String(seconds).padStart(2, '0')
    ];
    if(formattedTime[0] == '00') {
        returnData = formattedTime[1] + lang?.m + " " + formattedTime[2] + lang?.s;            
    } else {
        returnData = formattedTime[0] + lang?.hr + " " + formattedTime[1] + lang?.m + " " + formattedTime[2] + lang?.s; 
    }
    return returnData;
  }

export const formatPublisDate = (date: any):string => {
    let returnDate = date.split(' ');
    return returnDate[0];
}
export const convertToLowerCaseWithHyphens = (inputString: string): string => {
  if (!inputString) return 'orimi'

  let lowercaseString = inputString.toLowerCase();
  
  let processedString = lowercaseString.replace(/[^a-zA-Z0-9]/g, '-');
  
  return processedString;
}

export const redirectUrl = (data: any) => {
  let selectedLangLocal: any = DEFAULT_LANGUAGE_SETUP;
  if (typeof window !== 'undefined') {
    selectedLangLocal = getCookie('localeLangauge')
  }


    let url = '/';
    let slug = convertToLowerCaseWithHyphens(data.defaulttitle || data.title);
    if(data.category === "AUDIOBOOK" && data.objecttype === "ALBUM") {
      url = `/${selectedLangLocal}/audiobook/${slug}/${data.objectid}`;
    } else if(data.category === "AUDIOBOOK" && data.objecttype === "CONTENT") {
      url = `/${selectedLangLocal}/audiobook/${slug}/${data.objectid}`;
    } else if(data.category === "MUSIC" && data.objecttype === "ALBUM") {
      url = `/${selectedLangLocal}/album/${slug}/${data.objectid}`
    } else if(data.category === "MUSIC" && data.objecttype === "CONTENT") {      
      url = `/${selectedLangLocal}/song/${slug}/${data.objectid}`
    } else if(data.category === "PODCAST" && data.objecttype === "SERIES") {        
      url = `/${selectedLangLocal}/podcast/${slug}/${data.objectid}`
    } else if(data.category === "SPEECH" && data.objecttype === "CONTENT") {        
      url = `/${selectedLangLocal}/podcast/${slug}/${data.objectid}`
    } else if(data.castncrewid || data.idcastncrew) {  
      slug = convertToLowerCaseWithHyphens(data.castncrewname || data.name) 
      url = `/${selectedLangLocal}/artist/${slug}/${data.castncrewid || data.idcastncrew}`
    } 
    return url;
  }

export const dateFormater = (data:any):string => { 
  const date = new Date(data);
  const day = date.getDate();
  const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(date);
  const year = date.getFullYear();

  const formattedDate = `${day} ${month} ${year}`;
  return formattedDate;
}

export const formatDurationInWords = (durationInSeconds: any,lang :any) => {
  const hours = Math.floor(durationInSeconds / 3600);
  const minutes = Math.floor((durationInSeconds % 3600) / 60);
  const seconds = durationInSeconds % 60;

  let formattedDuration = '';

  if (getCookie('localeLangauge') == 'mn') {
    formattedDuration += `${hours} ${lang?.Hour}${hours > 1 ? (getCookie('localeLangauge') == 'mn'? ',': 's,') : ','} `;
  }

  if (hours > 0) {
    formattedDuration += `${hours} ${lang?.hours}${hours > 1 ? ',' : ','} `;
  }

  if (minutes > 0) {
    formattedDuration += `${minutes} ${lang?.Minute}${minutes > 1 ? ',' : ','} `;
  }

  if (seconds > 0 || (hours === 0 && minutes === 0)) {
    formattedDuration += `${seconds} ${lang?.Second}${seconds > 1 ? '' : ''}`;
  }

  return formattedDuration.trim();
}

export const formatDateInWords = (inputDate: any, lang: any) => {
  // Parse the input date
  if(!inputDate) {
    return '';
  }
  
  let returnDate = inputDate?.split(' ');
  returnDate = returnDate[0];
  const dateParts = inputDate?.split('-');
  const year = parseInt(dateParts[0]);
  const month = parseInt(dateParts[1]) - 1; // Months are zero-based in JavaScript
  const day = parseInt(dateParts[2]);

  // Create a Date object
  const inputDateTime = new Date(year, month, day);

  // Format the result
  const dayOfMonth = inputDateTime.getDate();
  const monthAbbrev = inputDateTime.toLocaleString('default', { month: 'short' });
  const yearValue = inputDateTime.getFullYear();
  let formattedResult = ""
  if (getCookie('localeLangauge') == 'mn') {
    formattedResult = `${yearValue}  ${lang ? lang[monthAbbrev]:monthAbbrev}  ${dayOfMonth}`;
  } else if (getCookie('localeLangauge') == 'en') {
    formattedResult = `${dayOfMonth}  ${lang ? lang[monthAbbrev]:monthAbbrev}  ${yearValue}`;
  }
  return formattedResult;
}

export const dataType = (data: any) => {
  let tag ='';
  if (!data) {
    return '';
  }
  if(data.category === "AUDIOBOOK" && data.objecttype === "ALBUM") {
    tag = `AUDIOBOOK`;
  } if(data.category === "AUDIOBOOK" && data.objecttype === "CONTENT") {
    tag = `AUDIOBOOK`;
  } else if(data.category === "MUSIC" && data.objecttype === "ALBUM") {
    tag = `ALBUM`
  } else if(data.category === "MUSIC" && data.objecttype === "CONTENT") {
    tag = `MUSIC`
  } else if(data.category === "PODCAST" && data.objecttype === "SERIES") {        
    tag = `PODCAST`
  } else if(data.category === "SPEECH" && data.objecttype === "CONTENT") {        
    tag = `EPISODE`
  } else if ( data.castncrewid && data.castncrewname) {
    tag = `ARTIST`
  } 
  return tag;
}

export const calculateDOB = (age: number): string => {
  const today: Date = new Date();
  today.setFullYear(today.getFullYear() - age);

  const year: number = today.getFullYear();
  const month: string = (today.getMonth() + 1).toString().padStart(2, '0');
  const day: string = today.getDate().toString().padStart(2, '0');

  const dob: string = `${year}-${month}-${day}`;
  return dob;
}

export const getAge = (dateString: any) => {
  var today = new Date();
  var birthDate = new Date(dateString);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
  }
  return age;
}

export const getTrackQnique = function (trackPosition: any) {

  let trackNum = trackPosition && typeof trackPosition == 'object' && trackPosition.hasOwnProperty('track')  ? trackPosition.track : trackPosition
  return trackNum
}
