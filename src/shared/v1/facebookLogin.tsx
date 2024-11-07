"use client";

import { useEffect, useState } from 'react';
import fb from '../../../public/facebook_blue.svg'
import Image from 'next/image';
import { fbLogin, getFacebookLoginStatus, initFacebookSdk } from '@/utils/facebookUtils';
import Script from 'next/script';
import { loginUser } from '@/services/actions/login.action';
import { getAccessTokenObj } from '@/services/helpers/init.helper';
import { actSaveToken, userJourney } from '@/utils/userjourney';
import { subscriberUser } from '@/services/actions/user.actions';
import { getCookie, setCookie } from '@/hooks/client.cookie';
import { useRouter } from 'next/navigation';
import { useCurrentProfileDetails, useFirebaseLoginStore, useStoreUser, useSubscriberDetails} from '@/store/init';
import { firebaseAnonymousLogin } from '@/utils/firebaseSignInAnonymously';
import { listSubscription } from '@/services/actions/payment.action';

export default function FacebookIcon() {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const router = useRouter();
    const setIsUserPresent = useStoreUser((state: any) => state.setIsUserPresent);
    const setUserDetails = useStoreUser((state: any) => state?.setUserDetails);
    const settingSubscriptionDetails = useStoreUser((state: any) => state?.setSubscriptionDetails); 
    const setFirebaseLogin = useFirebaseLoginStore((state:any) => state.setIsFirebaseLogin); 
    const setUpdateProfileData = useCurrentProfileDetails((state: any) => state?.setUpdateProfileData);
    const setSubscriberData = useSubscriberDetails((state : any) => state.setSubscriberData);

    useEffect(() => {
      initFacebookSdk().then(() => {
        getFacebookLoginStatus().then((response) => {
          if (response == null) {
            console.log("No login status for the person");
          } else {
            console.log(response);
          }
        });
      });
    }, []);
  
    const fbHandler = async () => {

      try {
        const response:any = await fbLogin();
    
        if (response?.status === "connected") {
          const accessToken = response?.authResponse?.accessToken;    
          const payload = {
            devicetype: 'PC',
            deviceos: 'WINDOWS',
            fbtoken: accessToken,
            country: getCookie("currentCountry")
          };
    
          let result = await loginUser(payload, getAccessTokenObj());
   
          if (result.isSuccessful) {
            // userJourney(result)
            userJourney(result).then((res: any) => {
              // listOfSubscriptions();
              settingSubscriptionDetails(res?.orderInfo);
              let subscriberProfileDetails: any = localStorage.getItem('subscriberProfileDetails');
              subscriberProfileDetails = JSON.parse(subscriberProfileDetails);
              setUpdateProfileData(subscriberProfileDetails);
              let subscriberDetail: any = (typeof localStorage !== 'undefined') && localStorage.getItem('subscriberDetail'); 
              setSubscriberData(JSON.parse(subscriberDetail));
              setUserDetails(JSON.stringify(subscriberDetail))
              subscriberDetail = JSON.parse(subscriberDetail);
              firebaseAnonymousLogin(subscriberDetail?.subscriberid).then((result: any) => {
                setFirebaseLogin(result);
              })
              if(res.profileType === 'single') {
                setTimeout(()=>{
                  router.push('/');
                },200)
              } else if(res.profileType === 'multiple') {
                localStorage?.setItem("whereIamFrom", 'login');
                router.push('/switchprofile')
              }
            })
            setIsUserPresent(true);
            // actSaveToken(result?.result);

            // let subscriberDetails=await subscriberUser(getAccessTokenObj())
            // if(subscriberDetails){
            //   setUserDetails(JSON.stringify(subscriberDetails))       
            //   setCookie("subscriberId",subscriberDetails.subscriberid)         
            //   setCookie("ProfileId",subscriberDetails.profileid)         
            //   firebaseAnonymousLogin(subscriberDetails.subscriberid).then((result: any) => {
            //     setFirebaseLogin(result)
            //   })
            // }

            // let subscriptionDetails:any = await listSubscription(getAccessTokenObj())
            // if (subscriptionDetails.isSuccessful) {
            //   localStorage.setItem('subscriptionDetails', JSON.stringify(subscriptionDetails.result.data));
            //   settingSubscriptionDetails(subscriptionDetails.result.data)
            // }
            // setTimeout(()=>{
            //   router.push('/');
            // },200)            
          } else {
            setErrorMessage(result.result.reason)
            setTimeout(() => setErrorMessage(null), 5000);
          }
        } else {
          // Handle the case when the status is not 'connected'
        }
      } catch (error) {
        // Handle errors here
        console.error("Error in fbHandler:", error);
      }
    };
    return (
      <>
        <div onClick={fbHandler} className="flex border border-zinc-500 rounded my-4 mx-10 sm:mx-20 md:mx-15 lg:mx-20 p-3 justify-center gap-2 cursor-pointer">
            <div>
              <Image src={fb} alt="fb"></Image>
            </div>
            <span className="text-sm">Continue with Facebook</span>
        </div>
        <Script async defer src="https://connect.facebook.net/en_US/sdk.js" />
      </>   
      
    );
  }
  