"use client";
import LoginHeader from "@/shared/v1/login-header";
import PrimaryButton from "@/shared/v1/primary-button";
import PrimaryTextInput from "@/shared/v1/primary-text-input";
import { loginUser, actGetForgotPass } from "@/services/actions/login.action";
import { useRouter } from "next/navigation";
import { setCookie, getCookie } from '@/hooks/client.cookie';
import { useStoreContent, useStore, useStoreUser, useCurrentProfileDetails, useFirebaseLoginStore, useSubscriberDetails} from '@/store/init';
import { useState } from "react";
import RadioButton from "@/shared/v1/radioButton";
import OTPBox from "@/shared/v1/otpBox";
import { getAccessTokenObj } from '@/services/helpers/init.helper';
import { actSaveToken, userJourney } from "@/utils/userjourney"
import FormValidator from "@/utils/validation-utils"
import { actResendOTP, profileListData, subscriberUser } from "@/services/actions/user.actions";
import { listSubscription } from "@/services/actions/payment.action";
import { notify } from '@/(layout)/v1/ToasterComponent';
import Modal from "@/components/v1/modelbox";
import ForgotPassword from "./forgotPassword";
import { getDeviceOS } from "@/utils/device";
import type { Metadata } from 'next'
import { logInEvent } from "@/utils/firebaseAnalytics";

import { firebaseAnonymousLogin } from "@/utils/firebaseSignInAnonymously"
import MobileVerification from "./mobileVerfication";
import { errors_message } from "@/constants/errors_constants";

export default function LongInPage(props: any) {
  const setCounter = useStore((state: any) => state.setCounter);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isActive, setActive] = useState(false);
  const setUserDetails = useStoreUser((state: any) => state?.setUserDetails);
  const settingSubscriptionDetails = useStoreUser((state: any) => state?.setSubscriptionDetails);  
  const router = useRouter();
  const validator = new FormValidator();
  const setIsUserPresent = useStoreUser((state: any) => state.setIsUserPresent);
  const [copyPassword,setCopyPassword]=useState<any>(null)
  const [activeLoader, setActiveLoader] = useState<any>(false);
  const setUpdateProfileData = useCurrentProfileDetails((state: any) => state?.setUpdateProfileData);
  const setFirebaseLogin = useFirebaseLoginStore((state:any) => state.setIsFirebaseLogin);
  const setSubscriberData = useSubscriberDetails((state : any) => state.setSubscriberData);
  const [mobileVerficationFailed, setMobileVerficationFailed] = useState<any>(false);
 
  // either Static metadata
 
  let passwordEnter = "";
  let userinputdisabled = true;

  let payloadEmail = {
    placeholder: props.loginBy === 'email' ? props.lang?.email_id : props.lang?.mobile_number,
    type: "text",
    usedKey: "emailmobile",
  };
  let payloadPassword = {
    placeholder: props.lang?.password,
    type: "password",
    usedKey: "password",
  };
  let buttonName = {
    buttonName: props.lang?.LOGIN,
    type: "submit",
    usedKey: "loginButton",
  };

  const callbackPassword = (val: any) => {
    passwordEnter = val;
    setCopyPassword(val)
  };


  const actInitLoginFlowBuild = async (payload: any) => {
    let data : any = {}
    let response = await loginUser(payload, getAccessTokenObj());
    if (response.isSuccessful) {
      setIsUserPresent(true);
      userJourney(response, 'login').then((res: any) => {
        settingSubscriptionDetails(res?.orderInfo);
        let subscriberProfileDetails: any = localStorage.getItem('subscriberProfileDetails');
        subscriberProfileDetails = JSON.parse(subscriberProfileDetails);
        setUpdateProfileData(subscriberProfileDetails);
        let subscriberDetail: any = (typeof localStorage !== 'undefined') && localStorage.getItem('subscriberDetail'); 
        setSubscriberData(JSON.parse(subscriberDetail));
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
      
      
    } else {
      setActiveLoader(Math.random())      
      notify(response.result.reason, 'error');
      setTimeout(() => setErrorMessage(null), 4000);
      data.login_mode = props.loginBy === "mobile" ? "Mobile" : "Email";
      data.status = "Failed";
      data.error_reason = response.reason;
      if(response.result.errorcode == 6110 || response.result.reason == "Email Verification Pending") {
        if(props.loginBy === "mobile"){
          setMobileVerficationFailed(true);
          await mobileVerficationOTP();
        }
      }
    }
    // Firebase Analytics 
    logInEvent(data)
  }
  const callbackButton = async (dat: any) => {
    try {
      if(passwordType == 'otp'){
        const otpWithoutCommas = otp.join('')
        if(!validator.validateOTP(otpWithoutCommas)){
          setErrorMessage(validator.formError);
          setTimeout(()=>{setErrorMessage(null);setActive(true);},4000)
          setActiveLoader(Math.random())
          return
        }
      }else{       
        if (!validator.validatePassword(copyPassword)) {
          setErrorMessage(validator.formError);
          setTimeout(() =>{setErrorMessage(null);setActive(true);} ,4000); 
          setActiveLoader(Math.random())
          return;
        }
      }
      let payload: any = {}

      if (passwordType == 'otp') {
        const otpWithoutCommas = otp.join('')
        payload['otp']= otpWithoutCommas
      } else {
        payload['password']= copyPassword
      }

      if (props.loginBy === 'email') {
        payload['email'] = props.userinput
      } else {
        payload['mobileno'] = props.userinput
      }

      actInitLoginFlowBuild(payload);

    } catch (error) {
      setActiveLoader(Math.random())
    }
  };
  
  const listOfSubscriptions = async () => {
    let subscriptionDetails:any = await listSubscription(getAccessTokenObj())
    if (subscriptionDetails.isSuccessful) {
      localStorage.setItem('subscriptionDetails', JSON.stringify(subscriptionDetails.result.data));
      settingSubscriptionDetails(subscriptionDetails.result.data)
    }
  }
  const[showModal, setShowModal] = useState(false);
  const [isforgotPass, setIsForgotPass] = useState(false);

  async function forgotPassHandler() {
    let payload = {
      email: props.userinput
    }
    let response = await actGetForgotPass(payload, getAccessTokenObj());
    response.isSuccessful
      ? (setIsForgotPass(true), setShowModal(true)) : notify(response.result.reason, 'error');      
      setActiveLoader(Math.random())
  }
  const modalClose = async () => {
    setShowModal(false);
  }

  // OTP Login
  const [otp, setOtp] = useState<any>([]);

  const handleotpChange = (index: any, value: any) => {
    const newotp = [...otp];
    newotp[index] = value;
    setOtp(newotp);    
  };

  const [passwordType, setPasswordType] = useState('');
  
  const callbackRadioOption = (logintype: any) => {
    setPasswordType(logintype);
    if (logintype == 'otp') {
      actOTPBasedInitCall();
    }
  }

  const changeBtnCallBack = (data:any) => {    
    props.changeBtnCallBackLogin(data);
  };
  const actOTPBasedInitCall = () => {
    let payload: any = {};
    payload.devicetype = "PC";
    payload.deviceos = getDeviceOS();
    payload.mobileno = props.userinput;
    payload.country = getCookie("currentCountry");
    actInitLoginFlowBuild(payload);
  }

  const mobileVerficationOTP = async () =>{
    let payload = {
        mobileno:props.userinput
    }
    let response = await actResendOTP(payload, getAccessTokenObj());
    if(response.isSuccessful){
        notify(errors_message.OTP_HAS_BEEN_SENT_TO_YOUR_MOBILE_NUMBER, 'success');
    } else {
        notify(response.result.reason, 'error');
    }
}

const callBackMobileVerification = (data: any) => {
  setMobileVerficationFailed(false);
}

  return (
      <>
        <div className="sm:text-center pb-0 min-h-80">
          <LoginHeader />
          {
            !mobileVerficationFailed ?
            <div className="py-6 text-gray-200 text-lg bg-[#151617] rounded-b-md px-8 sm:px-14 md:px-12 lg:px-16">
            <PrimaryTextInput
              textPayload={payloadEmail}
              test={props.userinput}
              disabled={userinputdisabled}
              changeBtnCallBack={changeBtnCallBack}
            />
            {
              props?.loginBy=='mobile' && 
              <RadioButton callbackRadio={callbackRadioOption}/>
            }
            {passwordType && passwordType === 'otp' ?
              <>
                <OTPBox value={otp} onChangeOTP={handleotpChange}  OTPPayload={props.userinput}/>
              </>
              : <>
                <PrimaryTextInput
                  textPayload={payloadPassword}
                  callbackText={callbackPassword}
                  
                />

                <div className="flex justify-between text-xs text-slate-400 transition peer-invalid:text-pink-500 mb-3 ">
                  <span
                    className="text-dotsLoaderBgColor cursor-pointer hover:underline hover:text-primaryColor font-medium"
                    onClick={forgotPassHandler}
                  >
                    {/* Forgot Password? */}
                    {props.lang?.forgot_password}
                  </span>
                </div>
              </>
            }
            <PrimaryButton
              textPayload={buttonName}
              callbackButton={callbackButton}
              isActive={isActive}
              activeLoader = {activeLoader}
            />
          </div>
          :
          <MobileVerification lang={props.lang} userinput={props.userinput}  loginBy={props.loginBy} callBackMobileVerification={callBackMobileVerification}/>
          }
          
          
        </div>
        <Modal onClose={() => modalClose()} isVisible={showModal} AllClass={"w-[90%] sm:w-[70%] md:w-[50%] lg:w-[40%] xl:w-[30%] mx-[5%] sm:mx-[15%] md:mx-[25%] lg:mx-[30%] xl:mx-[35%] absolute my-[15%] sm:my-[15%] md:my-[10%] lg:my-[5%]"}>
             { isforgotPass === true && (<ForgotPassword modalClose = {modalClose} loginBy={props.userinput} lang={props.lang} />) }
        </Modal>
      </>
  );
}