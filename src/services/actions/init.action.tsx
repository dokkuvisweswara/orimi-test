import { AUTH_TOKEN, CONFIG_URL, META_API_URL } from '@/constants/v1/constants';
import  { configMiddleware, deviceTokenMiddleware, refreshTokenMiddleware, deckingConfigMiddleware, getCountryMiddleware, MetaDataMiddleware } from '@/services/middlewares/init.middleware'
import { BASEURLS, DEVICE_TOKEN_PATHNAME ,REFRESH_ENDPOINT,DECKING_ENDPOINT, COUNTRY_ENDPOINT} from '@/constants/appConfig';
import { httpGet, httpGetStatic, httpPost, httpGetRefreshToken } from '@/services/actions/http';
import { encryptDeviceInfo } from '@/utils/device';


export async function actConfig () {
  let response = await httpGetStatic(CONFIG_URL);
  return configMiddleware(response);
}
export async function getDeckingConfig (TokenObj: {}) {
  let url = `${BASEURLS.vCMS}${DECKING_ENDPOINT}`
  let response = await httpGet(url, TokenObj);
  // console.log("++++++++response", response.isSuccessful)

  if (response.isSuccessful) {
    let deckingResponse = await httpGetStatic(response.result.success);
    // console.log("++++++++deckingResponse", deckingResponse)

    return deckingResponse.result;
  }
  
   return deckingConfigMiddleware(response);
}

export async function actGetDeviceToken () {
  const deviceInformation = encryptDeviceInfo();
  let url = `${BASEURLS.vSMS}${DEVICE_TOKEN_PATHNAME}${deviceInformation.providerid}?hash=${deviceInformation.hash}`
  let body = deviceInformation.enc
  let response = await httpPost(url, null, body);
  return deviceTokenMiddleware(response);
}

export async function actGetRefreshToken (TokenObj: {}) {
  let url = `${BASEURLS.vSMS}${REFRESH_ENDPOINT}`
  let response = await httpGetRefreshToken(url, TokenObj);
  return refreshTokenMiddleware(response);
}

export async function getcountry(TokeObj: {}) {
  const header = {};
  const url = `${BASEURLS.vSMS}${COUNTRY_ENDPOINT}`;
  let response = await httpGet(url, TokeObj);
  return getCountryMiddleware(response);
}

export async function fetchgGenresList() {     
  try {
      const response: any = await httpGetStatic('https://d1v8zxa9gk5f.cloudfront.net/COMMONFILES/genres_orimi_v1.json');
      return response;
    } catch (error) {
      return error
    }
}

export async function actGetMetaData(payload: any){
  let header = {
    "Authorization": AUTH_TOKEN
  }
  let response = await httpGet(`${META_API_URL}${payload.id}`, header);
  return MetaDataMiddleware(response);
}


