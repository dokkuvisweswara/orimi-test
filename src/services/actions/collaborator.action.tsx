import { BASEURLS, COLLABORATOR_ENDPOINT } from "@/constants/appConfig";
import { httpDelete, httpGet, httpPost } from "./http";
import { addcollaboratorMiddleware, collaboratorlistMiddleware, removecollaboratorMiddeware } from "../middlewares/collaborator.middelware";
import { setHeaderContentType, toFormUrlEncoded } from "../helpers/init.helper";

export async function actCollaboratorList(payload:any,TokenObj:{}) {

    let url = `${BASEURLS.vCMS}${COLLABORATOR_ENDPOINT}/${payload.playlistId}?pagesize=15&page=0`;
    let response = await httpGet(url,TokenObj,"");
    return collaboratorlistMiddleware(response);
}

export async function actAddcollaborator(payload:any, TokenObj:{}) {
    let url = `${BASEURLS.vCMS}${COLLABORATOR_ENDPOINT}/${payload.playlistId}`;
    var urlencoded = toFormUrlEncoded(payload?.userData);
    var headers = setHeaderContentType('formUrl');
    headers = {...headers, ...TokenObj}
    let response = await httpPost (url, headers,urlencoded);
    return addcollaboratorMiddleware(response);
}

export async function actremoveCollaborator(payload: any, TokenObj:{}) {
    const body = JSON.stringify(payload?.userData);
   let header = { ...TokenObj, ...setHeaderContentType('json')};
    let url = `${BASEURLS.vCMS}${COLLABORATOR_ENDPOINT}/${payload.playlistId}`;
    let response = await httpDelete(url, header, body);
    return removecollaboratorMiddeware(response);
}
