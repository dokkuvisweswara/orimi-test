import  {userSignupMiddleware} from '@/services/middlewares/signup.middleware'
import { BASEURLS, SIGNUP_ENDPOINT} from '@/constants/appConfig';
import { httpPost } from '@/services/actions/http';
import { makeQueryStringDync, setHeaderContentType, toFormUrlEncoded } from  "@/services/helpers/init.helper"
import { headers } from 'next/headers';
import { getCookie } from '@/hooks/client.cookie';


export async function signupUser (loginPayload:any ,TokenObj: {}) {
    let url = `${BASEURLS.vSMS}${SIGNUP_ENDPOINT}`
    // var urlencoded = new URLSearchParams();
    //  urlencoded.append("devicetype", "PC");
    //  urlencoded.append("subscribername",loginPayload.name);
    //  urlencoded.append("country", "IN");
    //  loginPayload.email && urlencoded.append("email", loginPayload.email);
    //  loginPayload.mobileno && urlencoded.append("mobileno", loginPayload.mobileno);
    //  urlencoded.append("password", loginPayload.password)
    loginPayload['devicetype'] = 'PC';
    loginPayload['country'] = getCookie("currentCountry");
    var urlencoded = toFormUrlEncoded(loginPayload);
     var headers = setHeaderContentType('formUrl');
    headers = {...headers, ...TokenObj}
    let response = await httpPost(url, headers ,urlencoded);
    return userSignupMiddleware(response);
}