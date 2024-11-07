"use client";
import PrimaryButton from "@/shared/v1/primary-button";
import PrimaryTextInput from "@/shared/v1/primary-text-input";
import { useState } from "react";
import OTPBox from "@/shared/v1/otpBox";
import { getAccessTokenObj } from '@/services/helpers/init.helper';
import FormValidator from "@/utils/validation-utils"
import { actMobileVerify } from "@/services/actions/user.actions";
import { notify } from '@/(layout)/v1/ToasterComponent';
import { errors_message } from "@/constants/errors_constants";

export default function MobileVerification(props: any) {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isActive, setActive] = useState(false);
  const [activeLoader, setActiveLoader] = useState<any>(false);
  const validator = new FormValidator();
  let userinputdisabled = true;

  let payloadEmail = {
    placeholder: props.loginBy === 'email' ? props.lang?.email_id : props.lang?.mobile_number,
    type: "text",
    usedKey: "emailmobile",
  };
  let buttonName = {
    buttonName: props.lang?.verify,
    type: "submit",
    usedKey: "loginButton",
  };

  const callbackButton = async (data: any) => {
        mobileVerficationOTP();
  };

  // OTP Login
  const [otp, setOtp] = useState<any>([]);

  const handleotpChange = (index: any, value: any) => {
    const newotp = [...otp];
    newotp[index] = value;
    setOtp(newotp);    
  };

  const changeBtnCallBack = (data:any) => {    
    props.changeBtnCallBackLogin(data);
  };

  const mobileVerficationOTP = async () =>{
    const otpWithoutCommas = otp.join('')
    if(!validator.validateOTP(otpWithoutCommas)){
      setErrorMessage(validator.formError);
      setTimeout(()=>{setErrorMessage(null);setActive(true);},4000)
      return
    }
    let payload = { 
      mobileno: props.userinput,
      otp:otpWithoutCommas
    };
    let response: any = await actMobileVerify(payload, getAccessTokenObj());
    if(response.isSuccessful){
        notify(errors_message.OTP_HAS_BEEN_SENT_TO_YOUR_MOBILE_NUMBER, 'success');
        props.callBackMobileVerification(true);
    } else {
        notify(response.result.reason, 'error');
    }
}

  return (
      <>
        <div className="py-6 text-gray-200 text-lg bg-[#151617] rounded-b-md px-8 sm:px-14 md:px-12 lg:px-16">
        <PrimaryTextInput
            textPayload={payloadEmail}
            test={props.userinput}
            disabled={userinputdisabled}
            changeBtnCallBack={changeBtnCallBack}
        />
        <OTPBox value={otp} onChangeOTP={handleotpChange}  OTPPayload={props.userinput}/>

        <PrimaryButton
            textPayload={buttonName}
            callbackButton={callbackButton}
            isActive={isActive}
            activeLoader = {activeLoader}
        />
        </div>
      </>
  );
}