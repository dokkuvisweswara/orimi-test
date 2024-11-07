import { removeCookie, setCookie } from "@/hooks/client.cookie";
import { decodeJWT } from "./auth";
import { listSubscription } from "@/services/actions/payment.action";
import { subscriberUser, profileListData } from "@/services/actions/user.actions";
import { getAccessTokenObj } from "@/services/helpers/init.helper";
import "firebase/database";


export const userJourney = async (response: any, switchType: any = 'login') => {
   return new Promise ((resolve, reject) =>  {
      actSaveToken(response?.result);
      subscriberUser(getAccessTokenObj()).then((subscriberDetails: any) => {
         if (subscriberDetails) {
            removeCookie("subscriberId")         
            removeCookie("ProfileId");
            localStorage.setItem('subscriberDetail', JSON.stringify(subscriberDetails)); 
            setCookie("subscriberId", subscriberDetails.subscriberid, null);        
            setCookie("ProfileId", subscriberDetails.profileid, null);
            if(switchType)
            profileListData(getAccessTokenObj()).then(async (subscriberProfileDetail: any) => {
               if(subscriberProfileDetail?.isSuccessful) {
                  let sorteddata: any = subscriberProfileDetail?.result?.data;
                  let adminIndex: any;
                  sorteddata.map((item: any, i: number) => {
                    if(item?.profileid === subscriberDetails?.subscriberid){
                      adminIndex = i;
                    }
                  });
                  let adminArr = sorteddata.splice(adminIndex, 1);
                  sorteddata = [...adminArr, ...sorteddata]
                  localStorage.setItem('profileList', JSON.stringify(sorteddata));
                  localStorage.setItem('subscriberProfileDetails', JSON.stringify(sorteddata[0]));
                  let subscriptionsLists = await listOfSubscriptions();
                  if(subscriberProfileDetail?.result?.data?.length > 1) {
                     resolve({profileType: 'multiple', orderInfo: subscriptionsLists, switchType: switchType});
                  } else {
                     resolve({profileType: 'single', orderInfo: subscriptionsLists, switchType: switchType});
                  }
               }              
            });            
          }          
      }).catch((error: any) => {
         reject(error);
      }).catch((err: any) => {
         reject(err);
      })      
  });
}


export const actSaveToken = ({ success, refreshtoken }: any) => {
   removeCookie('sessionToken');
   removeCookie('refreshToken');
   let sessionTokenInfo = decodeJWT(success);
   let refreshtokenInfo = decodeJWT(refreshtoken);

   setCookie('sessionToken', success, sessionTokenInfo.exp)
   setCookie('refreshToken', refreshtoken, refreshtokenInfo.exp)
 }

 export const  listOfSubscriptions = async () => {
   let subscriptionDetails:any = await listSubscription(getAccessTokenObj())
   if (subscriptionDetails.isSuccessful) {
     localStorage.setItem('subscriptionDetails', JSON.stringify(subscriptionDetails.result.data));
     return subscriptionDetails.result.data;
   } else {
      return [];
   }
 }