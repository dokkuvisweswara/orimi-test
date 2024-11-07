
import { CONFIG_UPDATE , SET_DEVICE_TOKEN} from '@/constants/appConfig';

export const configMiddleware = (response: any) => {
    if (response.isSuccessful) {
        CONFIG_UPDATE(response.result)
        return response
    }
}
export const deckingConfigMiddleware = (response: any) => {
    if (response.result.isSuccessful) {
        return response.result.success;
    } else {
        return '';
    }
}

export const deviceTokenMiddleware = (response: any) => {
    if (response.isSuccessful) {
        SET_DEVICE_TOKEN(response.result.success)
        return response.result.success;
    } else {
        SET_DEVICE_TOKEN('')

        return '';
    }
}

export const refreshTokenMiddleware = (response: any) => {
    return response; 
}

export const actSectionDataMiddleware = (response: any) => {
    if (response.isSuccessful) {
        return response.result;
    }
}

export const actContentDataMiddleware = (response: any) => {
    return response.result;
}

export const getCountryMiddleware = (response: any) => {
    if (response.isSuccessful) {
        return response.result.CountryCode;
    } else {
        return '';
    }

}

export const MetaDataMiddleware = (response: any) => {
    return response.result;
}