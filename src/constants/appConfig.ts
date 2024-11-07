/**
 * The base URL for the API.
 * @constant
 */

import { ENV } from "./v1/constants";

interface BaseURLs {
    vCHARGE: string;
    vCMS: string;
    vCRM: string;
    vDRM: string;
    vSMS: string;
}

export const DEFAULT_LANGUAGE: String = 'en';
export let BASEURLS: BaseURLs = (ENV == 'PROD')  ?  {"vCHARGE": "https://vcharge.mobiotics.com/prodv4/",
"vCMS": "https://vcms.mobiotics.com/prodv3/",
"vCRM": "https://vcrm.mobiotics.com/prodv3/",
"vDRM": "https://vdrm.mobiotics.com/prodv3/",
"vSMS": "https://vsms.mobiotics.com/prodv3/" }:{"vCHARGE": "https://vcharge.mobiotics.com/betav1/", "vCMS": "https://vcms.mobiotics.com/betav1/", "vCRM": "https://vcrm.mobiotics.com/betav1/", "vDRM": "https://vdrm.mobiotics.com/betav1/", "vSMS": "https://vsms.mobiotics.com/betav1/"};
export let APPCONFIG: any = null;
export let DEVICE_TOKEN: any = '';
export let AVAIBILITYLIST: any = '';
export let defaultPage: number = 1;
export let defaultPageSize: number = 15;


export const DEVICE_TOKEN_PATHNAME = 'subscriberv2/v1/device/register/';
export const LOOK_USER_ENDPOINT = 'subscriberv2/v1/verifyuser/';
export const LOGIN_ENDPOINT = 'subscriberv2/v1/login/';
export const SIGNUP_ENDPOINT = 'subscriberv2/v1/subscriber';
export const LOGOUT_ENDPOINT = 'subscriberv2/v1/logout';
export const REFRESH_ENDPOINT = 'subscriberv2/v1/refreshtoken';

export const AVAIBILITY_ENDPOINT = 'subscriberv2/v1/availability';
export const PACKAGE_ENDPOINT = 'subscriber/v1/content/package';
export const DRM_ENDPOINT ='subscriber/v1/content/drmtoken';
export const PACKAGE_DRMTOKEN_ACCESS_ENDPOINT ='subscriber/v2/content/drmtoken';



export const PAYMENTINIT_ENDPOINT = 'subscriber/v1/payment/init/adyen';
export const PAYMENTINIT_ENDPOINT_QPAY = 'subscriber/v1/payment/init/qpay';
export const PAYMENTINIT_GATEWAY_ENDPOINT = 'subscriber/v1/gateway';
export const PLANLIST_ENDPOINT = 'subscriberv2/v1/plan';
export const PAYMENTDETAIL_ENDPOINT = 'subscriber/v1/payment';
export const LIST_SUBSCRIPTION_ENDPOINT = 'subscriberv2/v1/subscription';

export const GOOGLE_ID = (ENV == 'PROD')  ?  '316096270418-vciouctviq5tnm3lkvhr3klilr07c0bi.apps.googleusercontent.com' : '455307967853-0o7gatlodv38dgokbl4fj29j6a82i5jk.apps.googleusercontent.com';
export const FACEBOOK_ID = '475071024764869';

export const TICKET_ENDPOINT = 'subscriber/v1/request';
export const PLAYLIST_ENDPOINT = 'subscriber/v1/playlist';

export const CONTENT_ENDPOINT = 'subscriber/v1/content/'
export const FORGOTPASS_ENDPOINT = 'subscriberv2/v1/forgotpassword';
export const EMAILUPDATE_ENDPOINT = 'subscriberv2/v1/subscriber/emailconfirm';
export const MOBILE_UPDATE_ENDPOINT = 'subscriberv2/v1/subscriber';

export const DECKING_ENDPOINT = 'subscriber/v1/deckingconfig';

export const COUNTRY_ENDPOINT = 'subscriberv2/v1/getcountry'

export const SWITCH_PROFILE_ENDPOINT = 'subscriberv2/v1/profile'
export const SWITCH_PROFILE_CONFIRMRESETPIN_ENDPOINT = 'subscriberv2/v1/profile/confirmresetpin'
export const SWITCH_PROFILE_RESETPIN_ENDPOINT = 'subscriberv2/v1/profile/resetpin'
export const UPLOAD_IMAGE_ENDPOINT = "image/v1/upload"

export const COLLABORATOR_ENDPOINT ='subscriber/v1/playlist/collaborator'


export const AGE_RANGE:any = [{range:"<13", age:"12"},{range:"13-17", age:"13"},{range:"18-30", age:"18"},{range:"31-45", age: "31"},{range:"45+", age: "46"}];
export const MULTI_PROFILE_ENABLE: any = true;





export const SET_DEVICE_TOKEN = (Token: any) => {
    DEVICE_TOKEN = Token;
}

export const GET_DEVICE_TOKEN = () => {
    return DEVICE_TOKEN;
}

export const CONFIG_UPDATE = (updatedConfig: any) => {
    APPCONFIG = updatedConfig;
}

export const AVAIBILITY_UPDATE = (availability: any) => {
    AVAIBILITYLIST = availability;
}




let STORE_DECKING: any = "";

export const GET_STATIC_CODE_STORE_DECKING = () => {
    return STORE_DECKING;
}

export const SET_STATIC_CODE_STORE_DECKING = (decking: any) => {
    STORE_DECKING = decking;
}