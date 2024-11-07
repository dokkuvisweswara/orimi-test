"use client";
import v20 from "../../../public/closeicon.svg";
import React, { useState } from "react";
import Image from "next/image";
import Mypins from "@/shared/v1/pinInputBox"
import PrimaryButton from "./primary-button";
import FormValidator from "@/utils/validation-utils";
import { notify } from "@/(layout)/v1/ToasterComponent";
import { actGetUpdateProfile, actGetUpdateMobile } from "@/services/actions/user.actions";
import { getAccessTokenObj } from "@/services/helpers/init.helper";
import CountryDropDown from "@/components/v1/countryCodeDropDown";
import OtpInputBox from "./otpInputBox";
import Success from "../../../public/success.svg";
import { errors_message } from "@/constants/errors_constants";


export default function MobileNoUpdate({lang,callBackModalClose,subscriberInfo}:any) {
  const validator = new FormValidator();
  const [activeLoader, setActiveLoader] = useState<any>(false);
  const [mobile, setMobile] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [otp, setOTP] = useState("");
  const [seconds, setSeconds] = useState(15);
  const [isTimer, setIsTimer] = useState(true)
  const [mainDiv, setMainDiv] = useState(true)
  const [otpDiv, setOtpDiv] = useState(false)
  const [successDiv, setSuccessDiv] = useState(false)
  const [oldmobile, setOldMobile] = useState(subscriberInfo.mobile);
  const [value, setValue] = useState('');


  // Timer
  let prevSeconds= seconds;
  const countTime = () => {
      const intervalId = setInterval(() => {
        if (prevSeconds > 0) {
          prevSeconds--;
          setSeconds(prevSeconds); 
        } else {
          clearInterval(intervalId);
          setIsTimer(false)
        }
      }, 1000);
      return () => clearInterval(intervalId);
  }
  // Otp Box
  const otpcallback = (val: any) => {
    setOTP(val);
  };

  const handleSubmit = async (e: any) => { 
    try {
      if (validator.validateMobileno(mobile)) {         
        let payload = { mobileno: countryCode+mobile };
        let response = await actGetUpdateProfile(payload, getAccessTokenObj());
          if(response.result.errorcode == 6220) {
            notify(response.result.reason, 'success');
            setTimeout(() => {
              setMainDiv(false)
              setOtpDiv(true)
              setSuccessDiv(false)
              countTime()
            }, 500)
            setActiveLoader(Math.random())
          } else {
            notify(response.result.reason, 'error');
            setActiveLoader(Math.random())
          }        
      } else {
        setActiveLoader(Math.random())
      }
    } catch(error) {
      // notify("Something wrong please try after sometime", "error");
      notify(errors_message.SOMETHING_WENT_WRONG_PLEASE_TRY_AFTER_SOMETIME, 'error');
      setActiveLoader(Math.random())
    }        
  };

  const handleOTPSubmit = async (e: any) => {
    // e.preventDefault();
    try {
      if (validator.validateNewOtp(otp)) {
        let payload = { 
          otp: otp,
          mobileno: mobile
        };
        let response = await actGetUpdateMobile(payload, getAccessTokenObj());
        if(response.isSuccessful) {
          setTimeout(() => {
            setMainDiv(false)
            setOtpDiv(false)
            setSuccessDiv(true)
          }, 800)
          setActiveLoader(Math.random())
        } else {
          notify(response.result.reason, 'error');
          setActiveLoader(Math.random())
        }        
      } else {
        setActiveLoader(Math.random())
      }
    } catch(error) {
      // notify("Something wrong please try after sometime", "error");
      notify(errors_message.SOMETHING_WENT_WRONG_PLEASE_TRY_AFTER_SOMETIME, 'error');
      setActiveLoader(Math.random())
    }   
  };

  const handleChange = (event:any) => {
    const inputValue = event.target.value;    
    // Check if the input value is a number
    if (!isNaN(inputValue)) {
      setValue(inputValue);
      setMobile(inputValue);
    }
  };

  const closeModal = () => {
    callBackModalClose(false)
  }

  let buttonName = {
    buttonName: lang?.continue,
    type: "submit",
    usedKey: "continueButton",
  };

  let successBtn = {
    buttonName: lang?.done,
    type: "submit",
    usedKey: "doneButton",
  }
  const handleCountryCode = (data:any)=>{
    setCountryCode(data)
  }
  

  return (
    <div className="relative flex flex-col items-center justify-center overflow-hidden">
      <div className="lg:w-4/12 md:w-10/12 sm:w-10/12 w-11/12 bg-selectedBGSecondaryColor rounded-md shadow-md lg:max-w-xl lg:mt-[5%] md:mt-[5%] sm:mt-[5%] mt-[50%]">
          <div className="float-right p-2 cursor-pointer" onClick={closeModal}>
            <Image src={v20} width={25} height={25} alt={"logo"} />
          </div>
          <div className={`${mainDiv ? "" : "hidden" } lg:px-12 md:px-12 sm:px-12 px-8 py-8 mt-2`}>
            <p className="text-lg font-bold mt-4 text-primaryColor">
              {lang.change_your_number}
            </p>
            {/* <div className="py-4">
              <label className="block text-sm text-secondaryItemColor">{lang?.your_existing_mobile_number}</label>
              <input
                type="text"
                readOnly
                className="block w-full text-primaryItemColor text-md font-semibold  bg-selectedBGSecondaryColor  border-secondaryItemColor rounded-sm focus:outline-none"
                value={oldmobile}
              />
            </div> */}
            <div className="text-slate-300">              
              <div className="py-4">
                <label className="block text-sm text-secondaryItemColor">
                  {lang?.enter_your_new_mobile_number} <span className="text-primaryErrorColor">*</span>
                </label>
                <div className="flex items-center mt-2 text-md relative gap-1">                  
                  <div className="border border-secondaryItemColor rounded-sm outline-none py-0.5 pr-2">
                    <CountryDropDown countryCode={handleCountryCode} />             
                  </div>
                  <input
                    type="text"
                    id="mobile"
                    name="mobile"
                    maxLength={10}
                    className=" block w-full px-4 py-2 text-primaryColor bg-selectedBGSecondaryColor border border-secondaryItemColor rounded-sm focus:border-white outline-none"
                    value={value}
                    // onChange={(e) => setMobile(e.target.value)}
                    onChange={handleChange}
                  />                  
                </div>
              </div>
            </div>
            <div className="py-4">
              <PrimaryButton
                textPayload={buttonName}
                callbackButton={handleSubmit}
                activeLoader = {activeLoader}
              />
            </div>
          </div>

        {/* Mobile Update OTP Box*/}

        <div className={`${otpDiv ? "" : "hidden" } p-8 text-lg font-semibold mt-8 text-primaryItemColor text-center`} >
          <p className="text-slate-300"> {lang?.please_enter_otp_sent_to} </p>
          <p className="font-bold">{mobile}</p>  
            {/* OTP BOX */}
          <div className="py-4 font-normal">
            <OtpInputBox length={6} otpcallback={otpcallback}  autoFocus={true}/>
            <div className="text-slate-500 flex text-sm py-2 justify-center">{lang?.not_received_otp} 
              <div className={`${isTimer ? "" : "hidden"}`}> 
                <p className="text-rose-500 pl-2 font-bold">{seconds} {lang?.second} </p>
              </div>
              <div className={`${!isTimer ? "" : "hidden"}`} onClick={handleSubmit}> 
                <p className="text-slate-200 pl-2 font-bold cursor-pointer"> {lang?.resend} </p>
              </div>
            </div>
          </div>
          <div className="mt-2">
            <PrimaryButton
              textPayload={buttonName}
              callbackButton={handleOTPSubmit}
              activeLoader = {activeLoader}
            />
          </div>
        </div>

        {/* Success Modal */}
        <div className={`${successDiv ? "" : "hidden" } p-8 text-lg font-semibold mt-8 text-primaryItemColor text-center`} >
            <div className="flex justify-center items-center">
                <Image src={Success} alt={"Success"} width={50} height={50} className=""/>
            </div>
            <p className="text-2xl font-bold">
               {lang?.successful}
            </p>
            <p className="font-semibold"> {lang?.successfully_updated_phone_number} </p>  
           
            <div className="mt-8 px-4">
                <PrimaryButton
                  textPayload={successBtn}
                  callbackButton={closeModal}
                  activeLoader = {activeLoader}
                />
            </div>
        </div>

      </div>
    </div>
  );
}
