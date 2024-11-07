import { getPoster, bandorartist }  from '@/utils/content'
import { getCookie } from '@/hooks/client.cookie';
import { defaultPageSize, defaultPage } from '@/constants/appConfig';

export const determineContentPlanDetails = (contentItem : any, availabilityList: any) => {
    let contentAvailabilityList = contentItem.contentdetails;
    let filteredAvailabilityList: any = [];
    let filteredPackageList: any = [];

    if (!contentAvailabilityList) {
      return { availabilityList: '', packageList: {} };
    }

    let temporaryVideoTag = document.createElement("video");
    let hasNativeHlsSupport = temporaryVideoTag.canPlayType("application/vnd.apple.mpegurl");

    let isAndroid = navigator.userAgent.includes("Android");

    availabilityList.every((availability: any) => {
      contentAvailabilityList.every((element: any) => {
        let isPackageFound = false;
        if (element.availabilityset.includes(availability.availabilityid)) {
          if (!isAndroid && hasNativeHlsSupport != "") {
            if (element.drmscheme[0] == "FAIRPLAY" || (element.drmscheme[0] == "NONE" && element.streamtype == "HLS")) {
              filteredAvailabilityList.push(availability);
              filteredPackageList.push(element);
              isPackageFound = true;
            } 
          } else if (element.drmscheme[0] == "WIDEVINE" || (element.drmscheme[0] == "NONE" && element.streamtype == "DASH")) {
            filteredAvailabilityList.push(availability);
            filteredPackageList.push(element);
            isPackageFound = true;
          }
        }
        if (isPackageFound) {
          return false;
        } else {
          return true;
        }
      });
      return true;
    });

    return { availabilityList: filteredAvailabilityList, packageList: filteredPackageList };
}
export const filterContentdataSet = (content: any, orderNumber: number) => {
  interface FILTEREDCONTENT {
    title: string,
    poster: string,
    objectid: string,
    objecttype: string,
    category: string,
    genre: string,
    productionyear: number,
    contentdetails: any,
    orderNumber: number,
    bandorartist: any,
    albumid: any,
    track: any,
    albumname: any
  }

  let filteredContent: FILTEREDCONTENT = { 
     title: content.title,
     track: content.track,
     albumid: content.albumid,
     poster: getPoster(content, 'SQUARE', 'LOW', 'PORTRAIT'),
     objectid: content.objectid,
     objecttype: content.objecttype,
     category: content.category,
     genre: content.genre,
     productionyear: content.productionyear,
     contentdetails: content.contentdetails,
     orderNumber: orderNumber,
     bandorartist: bandorartist(content),
     albumname: content.albumname
  };

  return filteredContent;



}
export const getPurchaseListCode = (content: any, purchaseList: any) => {
  for(let list of purchaseList) { 

   if ( (list.objectid).toLowerCase() == (content.objectid).toLowerCase()) {
        return true;
   }  
  }
  return false;
}
export const checkAvailabilityAllowsPlayback = (contentItem: any, availabilityList: any, packageList: any) => {

  let isPlaybackAllowed: any = false;
  let contentPlaybackInformation: any = {};
  // let rentPurchasedActive = getPurchaseListCode();
  let rentPurchasedActive:any = null;  // No Purchase or rent

  let subscriberid: any = getCookie('sessionToken');
  let subscribeItem: any = localStorage.getItem('subscriptionDetails');
  let subscriptions: any = subscribeItem ? JSON.parse(subscribeItem) : [];


  availabilityList.every((availability: any) => {
    if (subscriberid && (availability.pricemodel == "RENTAL" || availability.pricemodel == "PAID")) {
      if (rentPurchasedActive) {
        
        contentPlaybackInformation.isDrmContent = true;
        contentPlaybackInformation.videoType = "Content";

        contentPlaybackInformation.playback_details = {
          packageid: packageList[0].packageid,
          availabilityid: availability.availabilityid,
          drmscheme: packageList[0].drmscheme[0],
          objectid: contentItem.objectid
        };

        isPlaybackAllowed = true;
        return false;

      }
  
  }
   else if (availability.pricemodel === "PLAN") {
      if (subscriberid && subscriptions.length > 0) {

         subscriptions.every((subscription : any) => {
          if (getDateForPlayback(subscription.nextbilling) >= getTodaysDate()) {
            if (subscription.availabilityset.includes(availability.availabilityid)) {
              contentPlaybackInformation.isDrmContent = true;
              contentPlaybackInformation.videoType = "Content";

              contentPlaybackInformation.playback_details = {
                packageid: packageList[0].packageid,
                availabilityid: availability.availabilityid,
                drmscheme: packageList[0].drmscheme[0],
                objectid: contentItem.objectid

              };

              isPlaybackAllowed = true;
              return false;
            }
          }
          return true;
        });
      }   
      else if (subscriberid && subscriptions.length === 0) {
        isPlaybackAllowed = false;
        contentPlaybackInformation.playback_details = null;
      	return false;
      }
    } else if (availability.pricemodel == "FREE") {
      contentPlaybackInformation.isDrmContent = true;
      contentPlaybackInformation.videoType = "Content";

      contentPlaybackInformation.playback_details = {
        packageid: packageList[0].packageid,
        availabilityid: availability.availabilityid,
        drmscheme: packageList[0].drmscheme[0],
        objectid: contentItem.objectid

      };

      isPlaybackAllowed = true;
      return true;
    }

    if (isPlaybackAllowed == true) {
      return true;
    } else {
      return true;
    }
  })

  return  { isPlaybackAllowed, contentPlaybackInformation };
}
const getDateForPlayback = (currentDate: any) => {
    if (currentDate) {
      return new Date(
        `${new Date(currentDate).getFullYear()}/${new Date(currentDate).getMonth() + 1}/${new Date(
          currentDate
        ).getDate()} 23:59:59 UTC`
      );
    } else {
      return false;
    }
}
const getTodaysDate = () => {
    return new Date(Date.now());
}
export const getContentInformation = (filteredPlayerObj: any) => {
  let availabilities: any = localStorage.getItem('availabilities');
    availabilities = availabilities ? JSON.parse(availabilities) : '';

  if (!availabilities)   return { isPlaybackAllowed: false, contentPlaybackInformation: {} };
  const { availabilityList, packageList}: any = determineContentPlanDetails(filteredPlayerObj, availabilities);

  if (!availabilityList)   return { isPlaybackAllowed: false, contentPlaybackInformation: {} };

  const { isPlaybackAllowed, contentPlaybackInformation }: any = checkAvailabilityAllowsPlayback( filteredPlayerObj, availabilityList, packageList);
  return { isPlaybackAllowed: isPlaybackAllowed, playback_details: contentPlaybackInformation.playback_details };

}

export const getAlbumPagePayload = (ID: any, isAlbum: boolean, extra: any = null) => {
  
 
  let obj: any =  {
      id: ID,
      endpoint: 'subscriber/v1/content/'
    }

    if (isAlbum) {
      obj.params = {
        albumid: ID,
        objecttype: 'CONTENT',
        orderby: {
            track: 'ASC'
        },
        page:defaultPage,
        pagesize: defaultPageSize
    }

  } else {
    obj.params = {
      objecttype: 'CONTENT',
      page: defaultPage,
      pagesize: defaultPageSize,
      seasonnum: 1,
      seriesid: ID
    }
  }
  if (extra) {
    obj.params = {...obj.params , ...extra}
  }

  return obj;
}