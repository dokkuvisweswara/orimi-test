import { BASEURLS, PAYMENTINIT_ENDPOINT, PLANLIST_ENDPOINT, PAYMENTDETAIL_ENDPOINT , LIST_SUBSCRIPTION_ENDPOINT, PAYMENTINIT_ENDPOINT_QPAY, PAYMENTINIT_GATEWAY_ENDPOINT} from '@/constants/appConfig';
import { paymentGatewayMiddleware, paymentMiddleware } from '@/services/middlewares/payment.middleware'
import { httPut, httpGet, httpPost } from '@/services/actions/http';
import { toFormUrlEncoded, setHeaderContentType, makeQueryStringDync } from  "@/services/helpers/init.helper"

    export async function paymentInitiation (payload:any, TokenObj: {}) {
        let body = toFormUrlEncoded(payload.params);
        let url = `${BASEURLS.vCHARGE}/${PAYMENTINIT_ENDPOINT}`
        let header = { ...TokenObj, ...setHeaderContentType('formUrl')};
        let response = await httpPost(url, header, body);
        return paymentMiddleware(response);
    }
    export async function paymentInitiationForQpay (payload:any, TokenObj: {}) {
        let body = toFormUrlEncoded(payload.params);
        let url = `${BASEURLS.vCHARGE}/${PAYMENTINIT_ENDPOINT_QPAY}`
        let header = { ...TokenObj, ...setHeaderContentType('formUrl')};
        let response = await httpPost(url, header, body);
        return paymentMiddleware(response);
    }
    export async function PaymentGateway (payload:any, TokenObj: {}) {
        let data = makeQueryStringDync(payload);
        let url = `${BASEURLS.vCHARGE}/${PAYMENTINIT_GATEWAY_ENDPOINT}${data}`
        let header = { ...TokenObj, ...setHeaderContentType('formUrl')};
        let response = await httpGet(url, header);
        return response.result;
    }
    export async function getPlansList (TokenObj: {}) {
        let url = `${BASEURLS.vSMS}/${PLANLIST_ENDPOINT}`
        let header = { ...TokenObj, ...setHeaderContentType('formUrl')};
        let response = await httpGet(url, header);
        return paymentMiddleware(response);
    }
    export async function paymentDetail (payload:any, TokenObj: {}) {
        let url = `${BASEURLS.vCHARGE}/${PAYMENTDETAIL_ENDPOINT}/${payload.referenceid}`
        let header = { ...TokenObj, ...setHeaderContentType('formUrl')};
        let response = await httpGet(url, header);
        return paymentMiddleware(response);
    }
    export async function listSubscription (TokenObj: {}) {
        let url = `${BASEURLS.vSMS}/${LIST_SUBSCRIPTION_ENDPOINT}`
        let header = { ...TokenObj, ...setHeaderContentType('formUrl')};
        let response = await httpGet(url, header);
        return paymentMiddleware(response);
    }
    export async function cancelSubscription(payload: any, TokenObj: {}) {
        let url = `${BASEURLS.vSMS}/${LIST_SUBSCRIPTION_ENDPOINT}/${payload.planId}`;
        let body = JSON.stringify(payload.params);
        let header = { ...TokenObj, ...setHeaderContentType('json')};
        let response = await httPut(url, header, body);
        return paymentMiddleware(response);
    }
