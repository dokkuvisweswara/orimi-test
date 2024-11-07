"use client";
import LoginHeader from "@/shared/v1/login-header";
import PrimaryButton from "@/shared/v1/primary-button";
import PrimaryTextInput from "@/shared/v1/primary-text-input";
import { actMobileVerify, lookupUser, subscriberUser } from "@/services/actions/user.actions"
import { getAccessTokenObj } from '@/services/helpers/init.helper';
import FormValidator from  "@/utils/validation-utils"
import React, { useEffect, useState } from 'react';
import RadioButton from "@/shared/v1/radioButton";
import OTPBox from "@/shared/v1/otpBox";
import { notify } from '@/(layout)/v1/ToasterComponent';
import { getCookie, setCookie } from "@/hooks/client.cookie";
import { actSaveToken, userJourney } from "@/utils/userjourney";
import { listSubscription } from "@/services/actions/payment.action";
import { useStoreUser } from "@/store/init";
import { useRouter } from "next/navigation";
import {errors_message}  from "@/constants/errors_constants"


export default function LookUpPage(props:any) {
  
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isActive, setActive] = useState(false);
  const [payloadEmail, setPayloadEmail] = useState<any>('');
  const [passwordType, setPasswordType] = useState('otp')  
  const [otp, setOtp] = useState<any>([]);
  const [inputTextEnter, setInputTextEnter] = useState<any>({});
  const [isDisabledPart, setIsDisabledPart] = useState<any>('inactive');

  const [activeLoader, setActiveLoader] = useState<any>(false);
  const setIsUserPresent = useStoreUser((state: any) => state.setIsUserPresent);
  const setUserDetails = useStoreUser((state: any) => state?.setUserDetails);
  const settingSubscriptionDetails = useStoreUser((state: any) => state?.setSubscriptionDetails);  


  let countryCode = '+976';
  const router = useRouter();

  const validator = new FormValidator();

  let buttonName = {
    buttonName: props.lang?.continue,
    type: "submit",
    usedKey: "loginButton",
  };

  useEffect(() => {
    setPayloadEmail(props.emailPayloadLookup)
    setInputTextEnter(props.emailPayloadLookup.val? props.emailPayloadLookup.val: "")
    if(props.emailPayloadLookup.typeofProcess == 'SIGNUP-DONE') {
      setIsDisabledPart('active')
    }
  }, [props]); // eslint-disable-line react-hooks/exhaustive-deps

  const callbackText = (val:any) => {
    setInputTextEnter(val);
    setErrorMessage(null);
  };
   
  const callbackButton = async () => {
    try { 

      let data = {
        email: inputTextEnter,
        mobile: inputTextEnter,
      };
      if(payloadEmail.loginBy=='mobile'){
        const otpWithoutCommas = otp.join('')
        if(!validator.validateOTP(otpWithoutCommas)){
          setErrorMessage(validator.formError);
          setTimeout(()=>{setErrorMessage(null);setActive(true);},4000)
          return
        }
        let payload = { 
          mobileno: data.mobile,
          otp:otpWithoutCommas
        };
        let response: any = await actMobileVerify(payload, getAccessTokenObj());
        if (response.isSuccessful) {
           
          userJourney(response);
          setIsUserPresent(true);
          actSaveToken(response?.result.sessiontoken);
          let subscriberDetails:any = await subscriberUser(getAccessTokenObj())
          if (subscriberDetails) {
            localStorage.setItem('subscriberDetail', JSON.stringify(subscriberDetails));  
            setUserDetails(JSON.stringify(subscriberDetails))     
            setCookie("subscriberId",subscriberDetails.subscriberid, null)         
            setCookie("ProfileId",subscriberDetails.profileid, null)         
          }
          let subscriptionDetails:any = await listSubscription(getAccessTokenObj())
          if (subscriptionDetails.isSuccessful) {
            localStorage.setItem('subscriptionDetails', JSON.stringify(subscriptionDetails.result.data));
            settingSubscriptionDetails(subscriptionDetails.result.data)
          }
    
          setTimeout(()=>{
            router.push('/');
          },200)

        } else {
          setActiveLoader(Math.random())
          notify(response.result.reason , 'error')
        }  
      } else {        
        if(isNaN(inputTextEnter)){
          if (validator.validateEmail(data.email)) {            
            let payload = { email: data.email };
            let response = await lookupUser(payload, getAccessTokenObj());            
              if(response.isSuccessful) {                
                setActiveLoader(Math.random())
                props.actGetUserExits(response.result.success, inputTextEnter, 'email');          
              } else {
                setActiveLoader(Math.random())
                notify(response.result.reason, 'error')             
              }
            } else {
            setActiveLoader(Math.random())
          }
        }else if(validator.validateMobileno(data.mobile)) {
          let payload = { mobileno:  countryCode+data.mobile };
          let currentCountry = getCookie('currentCountry');
       
          if(countryCode !== '+976'){
            notify(errors_message.MOBILE_NUMBER_NOT_AVAILABLE, 'error');
            setActiveLoader(Math.random());
            return
          }
          let response = await lookupUser(payload, getAccessTokenObj());
          setActiveLoader(Math.random())
          if(response.isSuccessful){
            response.isSuccessful
              ? props.actGetUserExits(response.result.success, inputTextEnter,'mobile',countryCode) : setErrorMessage(response.result.reason);          
          }else{
            setActiveLoader(Math.random())
            notify(response.result.reason , 'error')

          }
        }  else {
            setActiveLoader(Math.random())
        }

      }
          
    } catch (error) {
      console.error("Error during API call:", error);
    }
  };

  const handleCallBackCountryCode = (data:any) =>{
    countryCode = data
  }

  useEffect(() => {     
   if (props.emailPayloadLookup) {
    setPayloadEmail(props.emailPayloadLookup);
   }
  },[]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleotpChange = (index: any, value: any) => {
    const newotp = [...otp];
    newotp[index] = value;
    setOtp(newotp);    
  };   
  
  const changeBtnCallBack =(data:any)=>{    
    setPasswordType('') 
    setPayloadEmail({
      placeholder: "Email ID / Mobile Number",
      type: "text",
      usedKey: "emailmobile",
      val:  '', 
      loginBy: ''           
    })  
  }

  return (
        <div className="sm:text-center pb-0 min-h-80 min-w-md md:max-w-md sm:max-w-lg my-[10%] sm:my-[2%] md:my-[2%] lg:my-[2%]">
          <LoginHeader />
          <div className="py-6 text-gray-200 text-lg bg-[#151617] rounded-b-md px-8 sm:px-14 md:px-12 lg:px-16">
            <PrimaryTextInput
              textPayload={payloadEmail}
              callbackText={callbackText} 
              callBackCountryCode = {handleCallBackCountryCode}    
              changeBtnCallBack={changeBtnCallBack} 
              lang={props.lang}
              isDisabledPart={isDisabledPart}                             
            />
 
          {
            payloadEmail.loginBy=='mobile' &&   passwordType === 'otp'  &&              
                  <>                  
                    <OTPBox value={otp} onChangeOTP={handleotpChange} OTPPayload={inputTextEnter} />
                  </>            
          }
            <PrimaryButton
              textPayload={buttonName}
              callbackButton={callbackButton}
              isActive={isActive}
              activeLoader = {activeLoader}
            />
          </div>

        </div>
  );
}
