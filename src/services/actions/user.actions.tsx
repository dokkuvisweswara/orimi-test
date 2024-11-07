
import  { userlookupMiddleware,subscriberUserMiddleware,userFeedbackMiddleware,profileUpdateMiddleware, logOutMiddleware,mobileVerifyMiddleware, resendOTPMiddleware, getForgotPassMiddleware,userFileUploadMiddleware, switchProfileMiddleware, uploadPictureFileMiddleware} from '@/services/middlewares/user.middleware'
import { BASEURLS, LOOK_USER_ENDPOINT, LOGOUT_ENDPOINT, FORGOTPASS_ENDPOINT, SIGNUP_ENDPOINT, EMAILUPDATE_ENDPOINT, MOBILE_UPDATE_ENDPOINT, SWITCH_PROFILE_ENDPOINT, SWITCH_PROFILE_CONFIRMRESETPIN_ENDPOINT, SWITCH_PROFILE_RESETPIN_ENDPOINT, UPLOAD_IMAGE_ENDPOINT} from '@/constants/appConfig';
import { httpDelete, httpGet,httpPost,httPut} from '@/services/actions/http';
import { makeQueryFormDataDyn, makeQueryStringDync, setHeaderContentType } from  "@/services/helpers/init.helper"

export async function lookupUser (lookupPayload:any,TokenObj: {}) {
    let filterQuery = makeQueryStringDync(lookupPayload);
    let url = `${BASEURLS.vSMS}${LOOK_USER_ENDPOINT}${filterQuery}`
    let response = await httpGet(url, TokenObj, '');
    return userlookupMiddleware(response);
}

export async function subscriberUser(TokenObj: {}){
    // let filterQuery = makeQueryStringDync(subscriberPayload);
    let url = `${BASEURLS.vSMS}subscriberv2/v1/subscriber`
    const header = {};
    const response = await httpGet(url,TokenObj,'');
    return subscriberUserMiddleware(response);
}

export async function submitFeedback (payload:any, TokenObj: {}) {

    let url = `${BASEURLS.vCRM}subscriber/v1/feedback`
    var urlencoded = toFormUrlEncoded(payload);
    var headers = setHeaderContentType('formUrl');
    headers = {...headers, ...TokenObj}
    let response = await httpPost (url, headers,urlencoded);
    return userFeedbackMiddleware(response);
}
export async function fileUpload (payload:any, TokenObj: {}) {
    let url = `${BASEURLS.vSMS}image/v1/upload`
    var urlencoded = toFormUrlEncoded(payload);
    var headers = setHeaderContentType('formUrl');
    headers = {...headers, ...TokenObj}
    let response = await httpPost (url, headers,urlencoded);
    return userFileUploadMiddleware(response);
}

export async function profileUpdate (profilePayload:any, TokenObj: {}) {
   let url = `${BASEURLS.vSMS}subscriberv2/v1/subscriber`
   const body = JSON.stringify(profilePayload);
   let header = { ...TokenObj, ...setHeaderContentType('json')};
   let response = await httPut (url, header, body);
   return profileUpdateMiddleware(response);
}
	const toFormUrlEncoded = (object:any) => {
  return Object.entries(object)
    .map(([key, value]: any) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join("&");
};
export async function actLogOut (TokenObj: {}) {
    let url = `${BASEURLS.vSMS}${LOGOUT_ENDPOINT}`;
    const response = await httpGet(url,TokenObj,'');
    return logOutMiddleware(response);
}

export async function actGetForgotPass (payload:any, TokenObj: {}) {  
    let filterQuery = (payload);
    let url = `${BASEURLS.vSMS}${FORGOTPASS_ENDPOINT}`;
    let header = { ...TokenObj, ...setHeaderContentType('json')};
    let body = filterQuery
    let response = await httPut(url, header, body);

    return getForgotPassMiddleware(response);
}
export async function actMobileVerify(payload:any,TokenObj:{}){
    let url = `${BASEURLS.vSMS}subscriberv2/v1/verifyuser`     
    var urlencoded = toFormUrlEncoded(payload);
    var headers = setHeaderContentType('formUrl');
    headers = {...headers, ...TokenObj}
    let response = await httpPost(url,headers, urlencoded)
    return mobileVerifyMiddleware(response)
}

export async function actResendOTP(payload:any, TokenObj:{}) {
    let url = `${BASEURLS.vSMS}subscriberv2/v1/resend`
    var urlencoded = toFormUrlEncoded(payload);
    var headers = setHeaderContentType('formUrl');
    headers = {...headers, ...TokenObj}
    let response = await httpPost(url,headers,urlencoded)
    return resendOTPMiddleware(response)
}

export async function actGetUpdateProfile (payload:any, TokenObj: {}) {
    
    let filterQuery = (payload);
    let url = `${BASEURLS.vSMS}${SIGNUP_ENDPOINT}`;
    let header = { ...TokenObj, ...setHeaderContentType('json')};
    let body = JSON.stringify(filterQuery);
    let response = await httPut(url, header, body);
    
    return profileUpdateMiddleware(response);
}
export async function actGetUpdateEmail (payload:any, TokenObj: {}) {

    let filterQuery = toFormUrlEncoded(payload);
    let url = `${BASEURLS.vSMS}${EMAILUPDATE_ENDPOINT}`;
    let header = { ...TokenObj, ...setHeaderContentType('formUrl')};
    let body = filterQuery
    let response = await httpPost(url, header, body);
 
    
    return profileUpdateMiddleware(response);
}
export async function actGetUpdateMobile (payload:any, TokenObj: {}) {

    let filterQuery = toFormUrlEncoded(payload);
    let url = `${BASEURLS.vSMS}${MOBILE_UPDATE_ENDPOINT}`;
    let header = { ...TokenObj, ...setHeaderContentType('formUrl')};
    let body = filterQuery
    let response = await httpPost(url, header, body);
 
    
    return profileUpdateMiddleware(response);
}

export async function profileListData(TokenObj: {}) {
    let url = `${BASEURLS.vSMS}${SWITCH_PROFILE_ENDPOINT}`;
    const response = await httpGet(url,TokenObj,'');
    return switchProfileMiddleware(response);
}

export async function addNewprofile(payload:any, TokenObj: {}) {
        let filterQuery = toFormUrlEncoded(payload);
        let url = `${BASEURLS.vSMS}${SWITCH_PROFILE_ENDPOINT}`;
        let header = { ...TokenObj, ...setHeaderContentType('formUrl')};
        let body = filterQuery;
        let response = await httpPost(url, header, body);
        return switchProfileMiddleware(response);
}

export async function switchProfile(payload:any, TokenObj:{}) {
    let url = `${BASEURLS.vSMS}${SWITCH_PROFILE_ENDPOINT}/${payload.profileid}`;
    let header = { ...TokenObj, ...setHeaderContentType('json')};
    let body = payload.pin ? JSON.stringify(payload.pin) : "";
    let response = await httPut(url, header, body);    
    return profileUpdateMiddleware(response);
}

export async function resetProfilePin(payload: any, TokenObj:{}) {
    let url = `${BASEURLS.vSMS}${SWITCH_PROFILE_CONFIRMRESETPIN_ENDPOINT}`;
    let header = { ...TokenObj, ...setHeaderContentType('formUrl')};
    let body = toFormUrlEncoded(payload);;
    let response = await httpPost(url, header, body);
    return profileUpdateMiddleware(response);
}
export async function sendProfilePinOTP(payload: any, TokenObj:{}) {
    let url = `${BASEURLS.vSMS}${SWITCH_PROFILE_RESETPIN_ENDPOINT}`;
    let header = { ...TokenObj, ...setHeaderContentType('formUrl')};
    let body = toFormUrlEncoded(payload);
    let response = await httpPost(url, header, body);
    return profileUpdateMiddleware(response);
}
export async function deleteProfileAction(profileId: any, TokenObj:{}) {
    let url = `${BASEURLS.vSMS}${SWITCH_PROFILE_ENDPOINT}/${profileId}`;
    let header = { ...TokenObj};
    let response = await httpDelete(url, header);
    return profileUpdateMiddleware(response);
}
export async function uploadPictureFileAction(payload: any, TokenObj:{}) {
    let url = `${BASEURLS.vSMS}${UPLOAD_IMAGE_ENDPOINT}`;
    let header = { ...TokenObj };
    let body = makeQueryFormDataDyn(payload);
    let response = await httpPost(url, header, body);
    return uploadPictureFileMiddleware(response);
}