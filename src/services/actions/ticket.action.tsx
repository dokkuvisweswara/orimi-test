import { BASEURLS, TICKET_ENDPOINT} from '@/constants/appConfig';
import { makeQueryStringDync,toFormUrlEncoded, setHeaderContentType } from  "@/services/helpers/init.helper"
import { httPut, httpGet, httpPost } from '@/services/actions/http';
import { getTicketMiddleware, getOpenTicketMiddleware, getCloseTicketMiddleware } from '@/services/middlewares/ticket.middleware'


export async function actGetTicketToken (payload:any, TokenObj: {}) {

    let filterQuery = toFormUrlEncoded(payload);
    let url = `${BASEURLS.vCRM}/${TICKET_ENDPOINT}`;

    let header = { ...TokenObj, ...setHeaderContentType('formUrl')};
    let body = filterQuery
    let response = await httpPost(url, header, body);

    return getTicketMiddleware(response);
}
export async function actGetOpenTicketToken (payload:any, TokenObj: {}) {
    
    let filterQuery = makeQueryStringDync(payload);
    let url = `${BASEURLS.vCRM}/${TICKET_ENDPOINT}${filterQuery}`;
    let response = await httpGet(url, TokenObj);

    return getOpenTicketMiddleware(response);
}
export async function actGetCloseTicketToken (payload:any, TokenObj: {}) {
    
    let filterQuery = makeQueryStringDync(payload);
    let url = `${BASEURLS.vCRM}/${TICKET_ENDPOINT}${filterQuery}`;
    let response = await httpGet(url, TokenObj);

    return getCloseTicketMiddleware(response);
}
export async function actViewTicketData(payload:any, TokenObj: {}) {
    let url = `${BASEURLS.vCRM}/${TICKET_ENDPOINT}/${payload?.requestid}`;
    let response = await httpGet(url, TokenObj);
    return getCloseTicketMiddleware(response);
}
export async function actUpdateTicketData(payload:any, TokenObj: {}) {
    let filterQuery = toFormUrlEncoded(payload.data);
    let url = `${BASEURLS.vCRM}/${TICKET_ENDPOINT}/${payload?.requestid}`;
    let header = { ...TokenObj, ...setHeaderContentType('formUrl')};
    let body = filterQuery
    let response = await httPut(url, header, body);
    return getTicketMiddleware(response);
}