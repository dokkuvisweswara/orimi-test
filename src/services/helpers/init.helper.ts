
import { getCookie } from '@/hooks/client.cookie'
import { DEVICE_TOKEN , APPCONFIG} from '@/constants/appConfig';


export const makeQueryStringDync = (dataObj: any) => {
  let queryStr = "?";
  if (dataObj && dataObj.category) { 
    dataObj =  JSON.parse(JSON.stringify(dataObj))

  }
    if (dataObj && dataObj.category) {
      dataObj.category = encodeURI(JSON.stringify([dataObj.category]));
    }
    if (dataObj && dataObj.orderby) {
      dataObj.orderby = encodeURI(JSON.stringify(dataObj.orderby));
    }
    for (let item in dataObj) {
      queryStr += `${item}=${(dataObj[item])}&`;
    }
    queryStr = queryStr.substring(0, queryStr.length - 1);
    return queryStr;
};

export const toFormUrlEncoded = (object: any) => {
  return Object.entries(object)
  .map(([key, value]: any) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
  .join("&");
}
export const setHeaderContentType = (contentType: any) => {
  const header: any = {};

  if (contentType === "json") {
    header["Content-Type"] = "application/json";
  } else if (contentType === "formUrl") {
    header["Content-Type"] = "application/x-www-form-urlencoded";
  }
  return header;
};
export const getAccessTokenObj =  (tokenType: any = null) => {
    const header: any = {};

    if (tokenType == 'REFRESH') {
      header["Authorization"] = `Bearer ${getCookie('refreshToken')}`;
      return header;
    }

  let deviceToken = DEVICE_TOKEN;

  let sessionToken = getCookie('sessionToken');
  if (!DEVICE_TOKEN) {
    deviceToken = getCookie('deviceToken')
  } 

  if (sessionToken && tokenType != "deviceToken") {
    header["X-SESSION"] = `${sessionToken}`;
  } else if (deviceToken) {
    header["Authorization"] = `Bearer ${deviceToken}`;
  }  else {
    return '';
  }

  return header;
};
export const getEndPoint = (screen: any) =>{
  const sectionType = screen.sectionType;
  const itemType = screen.itemType;
  if (sectionType == "FILTER" || itemType == "CONTENT") {
    return "subscriber/v1/content"
  } else if (itemType == "TRAILERS") {
    return "subscriber/v1/metadata/trailer"
  } else if (itemType == "CASTNCREW") {
    return "subscriber/v1/metadata/castncrew"
  } else if (itemType == "PLANS") {
    return "subscriberv2/v1/plan"
  } else if (itemType == "GENRES" || itemType == "LANGUAGES") {
    return "subscriber/v1/metadata/poster"
  }
}

export const makeQueryFormDataDyn = (dataObj: any) => {
  if (!Object.keys(dataObj).length) return false;
  let obj = new FormData();
  for (let data in dataObj) {
    obj.append(data, dataObj[data]);
  }
  return obj;
};

