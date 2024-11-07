"use client";

import { useEffect, useState } from 'react';
import Google from '../../../public/google.svg'
import Image from 'next/image';
import { loginUser } from '@/services/actions/login.action';
import { getAccessTokenObj } from '@/services/helpers/init.helper';
import { useRouter } from 'next/navigation';
import { actSaveToken, userJourney } from '@/utils/userjourney';
import { useCurrentProfileDetails, useFirebaseLoginStore, useStoreUser, useSubscriberDetails} from '@/store/init';
import { subscriberUser } from '@/services/actions/user.actions';
import { getCookie, setCookie } from '@/hooks/client.cookie';
import { getDeviceOS } from '@/utils/device';
import { GOOGLE_ID } from '@/constants/appConfig'; 
import Script from 'next/script';
import { signupUser } from '@/services/actions/signup.action';
import { notify } from '@/(layout)/v1/ToasterComponent';
import Spinner from '@/loaders/spinner/spinner';
import { firebaseAnonymousLogin } from '@/utils/firebaseSignInAnonymously';
import { listSubscription } from '@/services/actions/payment.action';

export default function GoogleIcon() {
  const [isSignedIn, setIsSignedIn] = useState(false);   
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isgoogleLoginProcess, setIsgoogleLoginProcess] = useState(false); 
  const router = useRouter();
  const setIsUserPresent = useStoreUser((state: any) => state.setIsUserPresent);   
  const setUserDetails = useStoreUser((state: any) => state?.setUserDetails);
  const setFirebaseLogin = useFirebaseLoginStore((state:any) => state.setIsFirebaseLogin);
  const settingSubscriptionDetails = useStoreUser((state: any) => state?.setSubscriptionDetails); 
  const setUpdateProfileData = useCurrentProfileDetails((state: any) => state?.setUpdateProfileData);
  const setSubscriberData = useSubscriberDetails((state : any) => state.setSubscriberData);



  useEffect(() => {
  
      const loadGapi = async () => {
        // debugger
        try {
          await new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = 'https://apis.google.com/js/api.js';
            script.async = true;
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
          });
  
          // Load the 'client:auth2' library
          await new Promise((resolve, reject) => {
            window.gapi.load('client:auth2', {
              callback: resolve,
              onerror: reject,
            });
          });
  
          // Initialize the 'auth2' library
          await window.gapi.auth2.init({
            client_id: GOOGLE_ID,              
            plugin_name:'web-orimedia-preprod'                 
          });
  
        } catch (error) {
          console.error('Error loading Google API:', error);
        }
      };
  
      loadGapi();
  }, []);

  const googleHandler = async () => {    
    const auth2 =  window.gapi.auth2.getAuthInstance();
      try {
        const googleUser = await auth2.signIn();    
        if (googleUser) {  
          setIsgoogleLoginProcess(true);    
          const accessToken = googleUser.getAuthResponse(true).access_token;  
          const idToken = googleUser.getAuthResponse(true).id_token     
          const name = googleUser.getBasicProfile().getName()
          let payload = {
            devicetype: 'PC',
            deviceos: getDeviceOS(),
            gtoken: idToken,
            country: getCookie("currentCountry")
          }
          let response = await loginUser(payload, getAccessTokenObj());          
          if (response.isSuccessful) {
            // userJourney(response);
            loginJourny(response);
            setIsUserPresent(true);
    
          } else {
            if (response.result.errorcode == 6001) {
              let response = await signupUser(payload, getAccessTokenObj());
              if (response.isSuccessful) {   
                let response = await loginUser(payload, getAccessTokenObj());          
                if (response.isSuccessful) {
                  loginJourny(response);
                  setIsUserPresent(true);
                }
              } else {
                setIsgoogleLoginProcess(false);    

                notify(response.result.reason, 'error');
              }
            } else {
              setIsgoogleLoginProcess(false);    

              notify(response.result.reason, 'error');

              setTimeout(() => setErrorMessage(null), 5000);
            }
          

          }
        }        
      } catch (error) {
        setIsgoogleLoginProcess(false);    

        console.error('Google Sign-In Error:', error);
      }
  };

  const loginJourny = async (response: any) => {
    userJourney(response).then((res: any) => {
      // listOfSubscriptions();
      settingSubscriptionDetails(res?.orderInfo);
      let subscriberProfileDetails: any = localStorage.getItem('subscriberProfileDetails');
      subscriberProfileDetails = JSON.parse(subscriberProfileDetails);
      setUpdateProfileData(subscriberProfileDetails);
      let subscriberDetail: any = (typeof localStorage !== 'undefined') && localStorage.getItem('subscriberDetail'); 
      setSubscriberData(JSON.parse(subscriberDetail));
      setUserDetails(JSON.stringify(subscriberDetail))
      subscriberDetail = JSON.parse(subscriberDetail);
      setIsgoogleLoginProcess(false);
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
  }
    return (
      <>
        {/* <div className="hover:scale-125 transition-all duration-1000 cursor-pointer"> */}         
        <Script src="https://apis.google.com/js/api.js" async defer />
        <Script src="https://accounts.google.com/gsi/client" async defer /> 

        <div onClick={googleHandler} className="flex content-center  border border-zinc-500 rounded my-4 mx-10 sm:mx-20 md:mx-15 lg:mx-20 p-3 justify-center gap-2 cursor-pointer">
          <div className='flex'>
            {isgoogleLoginProcess && <Spinner></Spinner> }

            <Image src={Google} alt="Google"></Image>
          </div>
            <span className="text-sm">Continue with Google</span>

        </div>
      </>   
      
    );
  }
  