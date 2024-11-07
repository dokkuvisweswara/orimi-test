import { removeCookie } from "@/hooks/client.cookie"
import { firebaseRemoveUser } from "./firebaseSignInAnonymously";


export const logoutUtil = () => {

    removeCookie('sessionToken');
    removeCookie('refreshToken');
    removeCookie('subscriberId');
    removeCookie('ProfileId');
    removeCookie('currentCountry');
    localStorage.removeItem("subscriberDetail");
    localStorage.removeItem("subscriptionDetails");
    localStorage.removeItem("subscriberProfileDetails");
    localStorage.removeItem("profileList");

    try {
        firebaseRemoveUser().then(() => {
            localStorage.removeItem("uid");
        }).catch(() => {
            localStorage.removeItem("uid");

        })    

    } catch(e) {}
 
    setTimeout(() => {
        (window as any).location.href = '/';
    }, 300)
    
}