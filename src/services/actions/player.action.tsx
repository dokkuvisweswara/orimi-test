import { getAvailabilityMiddleware, getPackageMiddleware, getDRMMiddleware, getAccessDRMPackageMiddeware, getSingleAvailabilityMiddleware } from '@/services/middlewares/player.middleware'
import { BASEURLS, AVAIBILITY_ENDPOINT, PACKAGE_ENDPOINT, DRM_ENDPOINT, PACKAGE_DRMTOKEN_ACCESS_ENDPOINT} from '@/constants/appConfig';
import { httpGet, httpPost } from '@/services/actions/http';
import { makeQueryStringDync, toFormUrlEncoded, setHeaderContentType } from  "@/services/helpers/init.helper"
import { checkMpegRequired } from '@/services/helpers/player.helper';

export async function actGetAvailability (payload:any, TokenObj: {}) {

    let filterQuery = makeQueryStringDync(payload);
    let url = `${BASEURLS.vSMS}/${AVAIBILITY_ENDPOINT}${filterQuery}`
    let response = await httpGet(url, TokenObj);
    return getAvailabilityMiddleware(response);
}

export async function actGetSingleAvailability (payload:any, TokenObj: {}) {

  let url = `${BASEURLS.vSMS}/${AVAIBILITY_ENDPOINT}/${payload}`
  let response = await httpGet(url, TokenObj);
  return getSingleAvailabilityMiddleware (response);
}

export async function actGetPackageURL (payload:any, TokenObj: {}) {

    let constuctObj: any = {
        contentid: payload.objectid,
        params: {
          availabilityid: payload.availabilityid,
          packageid: payload.packageid,
        },
      };

      let mpegtspackage = await checkMpegRequired();
     
      if (mpegtspackage == true) {
        constuctObj.params.mpegtspackage="YES";
      }
    let filterQuery = toFormUrlEncoded(constuctObj.params);
    let url = `${BASEURLS.vCMS}${PACKAGE_ENDPOINT}/${constuctObj.contentid}`;

    let header = { ...TokenObj, ...setHeaderContentType('formUrl')};
    let body = filterQuery
    let response = await httpPost(url, header, body);


    return getPackageMiddleware(response);
}

export async function actGetDRMToken (payload:any, TokenObj: {}) {

    let constuctObj = {
        contentid: payload.objectid,
        packageid: payload.packageid,
        drmscheme: payload.drmscheme,
        availabilityid: payload.availabilityid,
        seclevel: 'SW'
    };

    let filterQuery = toFormUrlEncoded(constuctObj);
    let url = `${BASEURLS.vCMS}${DRM_ENDPOINT}`;

    let header = { ...TokenObj, ...setHeaderContentType('formUrl')};
    let body = filterQuery
    let response = await httpPost(url, header, body);


    return getDRMMiddleware(response);
}

export async function actGetAccessDRMPackageAPI (payload:any, TokenObj: {}) {

  let filterQuery = toFormUrlEncoded(payload);
  let url = `${BASEURLS.vCMS}${PACKAGE_DRMTOKEN_ACCESS_ENDPOINT}`;

  let header = { ...TokenObj, ...setHeaderContentType('formUrl')};
  let body = filterQuery
  let response = await httpPost(url, header, body);

  return getAccessDRMPackageMiddeware(response);
}


