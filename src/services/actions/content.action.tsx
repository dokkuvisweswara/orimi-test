
import { makeQueryStringDync} from '@/services/helpers/init.helper';
import  { actSectionDataMiddleware, actContentDataMiddleware } from '@/services/middlewares/init.middleware'
import { BASEURLS, CONTENT_ENDPOINT } from '@/constants/appConfig';
import { httpGet, httpPost } from '@/services/actions/http';
import { actGetCurrentLanguage } from '../../utils/accessCurrentLang';
import { checkMpegRequired } from '@/services/helpers/player.helper';

export async function actSectionData (sectionData: any, TokenObj: {}) {
    let langSelected: any = await actGetCurrentLanguage()
    sectionData.params.displaylanguage = langSelected == "en"? "eng" : "mon";
    let filteredParams = makeQueryStringDync(sectionData.params);
   
    let url = `${BASEURLS.vCMS}${sectionData.endpoint}${filteredParams}`
    let mpegtspackage = await checkMpegRequired();
    if (mpegtspackage == true) {
        url = url + '&mpegtspackage=YES';
    }
	let response = await httpGet(url, TokenObj, '');


    return actSectionDataMiddleware(response);
}
export async function actContentData (contentData: any, TokenObj: {}) {
    let langSelected: any = await actGetCurrentLanguage()
    langSelected = langSelected == "en"? "eng" : "mon";
  
    let url = `${BASEURLS.vCMS}${contentData.endpoint}${contentData.id}?displaylanguage=${langSelected}`;
    let mpegtspackage = await checkMpegRequired();
    if (mpegtspackage == true) {
        url = url + '&mpegtspackage=YES';
    }
    let response = await httpGet(url, TokenObj , '');
    return actContentDataMiddleware(response);
}
export async function actRecentlyPlayedContentData (params: any, TokenObj: {}) {
    let langSelected: unknown = await actGetCurrentLanguage()
    langSelected = langSelected == "en"? "eng" : "mon";
    if (params) {
        params.displaylanguage = langSelected

    }

    let filteredParams = makeQueryStringDync(params);
    

    let url = `${BASEURLS.vCMS}${CONTENT_ENDPOINT}${filteredParams}`;
    let response = await httpGet(url, TokenObj , '');
    return actContentDataMiddleware(response);
}
export async function actRelatedContentData(payload:any,  TokenObj: {}) {
    let langSelected: any = await actGetCurrentLanguage()
    langSelected = langSelected == "en"? "eng" : "mon";
    let url = `${BASEURLS.vCMS}${payload.endpoint}?displaylanguage=${langSelected}`;
    let response = await httpGet(url, TokenObj, '');
    return actContentDataMiddleware(response);
}
export async function actEpisodesData (sectionData: any, TokenObj: {}) {
    let filteredParams = makeQueryStringDync(sectionData.params);
    let url = `${BASEURLS.vCMS}${sectionData.endpoint}${filteredParams}`
    
	let response = await httpGet(url, TokenObj, '');
	    // Log response details
    return actContentDataMiddleware(response);
}
export async function actChaptersData (sectionData: any, TokenObj: {}) {
    let filteredParams = makeQueryStringDync(sectionData.params);
    let url = `${BASEURLS.vCMS}${sectionData.endpoint}${filteredParams}`
    
	let response = await httpGet(url, TokenObj, '');
    return actContentDataMiddleware(response);
}