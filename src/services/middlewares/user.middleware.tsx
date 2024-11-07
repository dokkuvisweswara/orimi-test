
export const userlookupMiddleware = (response: any) => {
  return response;
  
}
export const subscriberUserMiddleware = (response: any) => {
    if (response.isSuccessful) {
        return response.result;
    }

}

export const userFeedbackMiddleware = (response: any) => {
    return response;
}

export const getSearchMiddleware = (response: any) => {
    return response.result;
}

export const profileUpdateMiddleware = (response: any) => {   
    return response 
}

export const logOutMiddleware = (response: any) => {

    return response.result;
}

export const getForgotPassMiddleware = (response: any) => {
    return response;
}
export const mobileVerifyMiddleware = (response: any) => {
    return response
}

export const resendOTPMiddleware = (response: any) =>{
    return response
}
export const userFileUploadMiddleware = (response: any) =>{
    return response
}

export const switchProfileMiddleware = (response: any) => {    
    return response;
}

export const uploadPictureFileMiddleware = (response: any) => {    
    return response;
}