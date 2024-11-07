import {  AVAIBILITY_UPDATE } from '@/constants/appConfig';

export const getAvailabilityMiddleware = (response: any) => {
    if (response.isSuccessful) {
        AVAIBILITY_UPDATE(response.result.data)
        return response.result.data
    } else {
        return '';
    }
}

export const getSingleAvailabilityMiddleware = (response: any) => {
    if (response.isSuccessful) {
        let { licenseduration, priceclassdetail } = response.result;

        return {licenseduration, priceclassdetail } 
    } else {
        return '';
    }
}

export const getPackageMiddleware = (response: any) => {
    if (response.isSuccessful) {
        return response.result;
    } else {
        return '';
    }
}

export const getDRMMiddleware = (response: any) => {
    if (response.isSuccessful) {
        return response.result.success;
    } else {
        return response.result;
    }
}

export const getAccessDRMPackageMiddeware= (response: any) => {
    if (response.isSuccessful) {
        return response.result;
    } else {
        return response.result;
    }
}


