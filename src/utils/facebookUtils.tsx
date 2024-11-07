import { FACEBOOK_ID } from "@/constants/appConfig";

export const initFacebookSdk = () => {
    return new Promise((resolve:any, reject) => {
      // Load the Facebook SDK asynchronously
      window.fbAsyncInit = () => {
        window.FB.init({
          appId: FACEBOOK_ID,
          cookie: true,
          xfbml: true,
          version: 'v16.0'
        });
        // Resolve the promise when the SDK is loaded
        resolve();
      };
    })
}

export const getFacebookLoginStatus = () => {
    return new Promise((resolve, reject) => {
      window.FB.getLoginStatus((response:any) => {
        resolve(response);
      });
    });
  };

  export const fbLogin = () => {
    return new Promise((resolve, reject) => {
      window.FB.login((response:any) => {
        resolve(response)        
      })
    })
  }