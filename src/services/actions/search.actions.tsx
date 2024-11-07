import { makeQueryStringDync } from "../helpers/init.helper";
import { httpGet } from "./http";
import  {getSearchMiddleware} from '@/services/middlewares/user.middleware'
import { BASEURLS } from "@/constants/appConfig";

//search content in add to this playlist
export async function searchContent(params: any, TokeObj: {}) {
    let queryParams = makeQueryStringDync(params);
    const header = {};
    const url = `${BASEURLS.vCMS}subscriber/v1/content/search${queryParams}`;
    let response = await httpGet(url, TokeObj, 'deviceToken');
    return getSearchMiddleware(response);
}

export async function actPopularSearch(params:any, TokeObj:{}) {
    let queryParams = makeQueryStringDync(params);
    const header = {};
    const url = `${BASEURLS.vCMS}subscriber/v1/content/${queryParams}`;
    let response = await httpGet(url, TokeObj, 'deviceToken');
    return getSearchMiddleware(response);
}
