
import  {userLoginMiddleware} from '@/services/middlewares/login.middleware'
import  {getForgotPassMiddleware} from '@/services/middlewares/user.middleware'
import { BASEURLS, LOGIN_ENDPOINT, FORGOTPASS_ENDPOINT} from '@/constants/appConfig';
import { httpGet, httpPost } from '@/services/actions/http';
import { makeQueryStringDync, toFormUrlEncoded, setHeaderContentType } from  "@/services/helpers/init.helper"


export async function loginUser (loginPayload:any,TokenObj: {}) {
    let filterQuery = makeQueryStringDync(loginPayload);
    let url = `${BASEURLS.vSMS}${LOGIN_ENDPOINT}${filterQuery}`
    let response = await httpGet(url, TokenObj,'');
    return userLoginMiddleware(response);
}

export async function actGetForgotPass (payload:any, TokenObj: {}) {
    let filterQuery = toFormUrlEncoded(payload);
    let url = `${BASEURLS.vSMS}${FORGOTPASS_ENDPOINT}`;
    let header = { ...TokenObj, ...setHeaderContentType('formUrl')};
    let body = filterQuery
    let response = await httpPost(url, header, body);

    return getForgotPassMiddleware(response);
}
export async function fetchCountryCode() {     
    try {
        const response = await fetch('https://d1v8zxa9gk5f.cloudfront.net/COMMONFILES/country-phone.json',{ cache: 'force-cache' });
        const data = await response.json();
        return data       
      } catch (error) {
        console.error('Error fetching data:', error);
        return error
      }
}
