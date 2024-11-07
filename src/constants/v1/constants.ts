/**
 * The base URL for the API.
 * @NOTE used Base on provider
 * @CONFIG_URL is {String} - it is handle platfom
 */
export const ENV: string = 'PROD';

export const CONFIG_URL: string = ENV == 'PROD'? 'https://d2xowqqrpfxxjf.cloudfront.net/orimedia/orimi-v1.json' : 'https://orimedia-audio-default-rtdb.firebaseio.com/testv1.json';
export const THEME_COLOR = '#007bff';
export const PRODIVER_ID = 'orimedia';
export const DEFAULT_LANGUAGE_SETUP = 'mn';

export const CLIENT_KEY = ENV == 'PROD'? 'M4DDY41OZHjnXjwA' : 'TkpdehsIVC5n96K6';
export const APP_VERSION = ENV == 'PROD'? 'v2.0.7' : 'v1.0.0';
export const LICENSE_SERVER =  ENV == 'PROD'? 'https://vdrm.mobiotics.com/prod/proxy/v1/license/widevine' : 'https://vdrm.mobiotics.com/betav1/proxy/v1/license/widevine';
export const LICENSE_SERVER_FAIRPLAY =  ENV == 'PROD'? 'https://vdrm.mobiotics.com/prod/proxy/v1/license/fairplay' : 'https://vdrm.mobiotics.com/betav1/proxy/v1/license/fairplay';

export const SUBTITEBASEURL =  ENV == 'PROD'? 'https://d1twwl5im4sryx.cloudfront.net/': 'https://d2dpgifhjosriw.cloudfront.net/';

export const AUTH_TOKEN = 'Bearer EHEv4c3CdY1+OaTVSvFMlgx0A8V8VqARiPWC4gmqi1w=';
export const META_API_URL = 'https://vcms.mobiotics.com/prodv3/provider/v1/objectseo/';
export const SOCIAL_LINK = {
    facebook: 'https://www.facebook.com/OriTVApp/',
    instagram: 'https://www.instagram.com/ori.llc/',
    youtube: 'https://www.youtube.com/@ORIAPP',
    twitter: 'https://twitter.com/MONGOLTV'
}
export const APP_LINK = {
    android: 'https://play.google.com/store/apps/details?id=com.orimi.android&hl=en_US&pli=1',
    ios: 'https://apps.apple.com/in/app/ori-mi-music/id6478581640'
}
export const forceCache = {
    cache: 'force-cache', // Or 'no-cache' or 'default'
    revalidate: '120'
  };
