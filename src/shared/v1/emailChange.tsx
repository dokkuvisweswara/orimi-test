"use client";
import v20 from "../../../public/closeicon.svg";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { actGetUpdateProfile, actGetUpdateEmail } from "@/services/actions/user.actions";
import { getAccessTokenObj } from "@/services/helpers/init.helper";
import FormValidator from "@/utils/validation-utils";
import { notify } from "@/(layout)/v1/ToasterComponent";
import OtpInputBox from "@/shared/v1/otpInputBox";
import Success from "../../../public/success.svg";
import PrimaryButton from "@/shared/v1/primary-button";
import { errors_message } from "@/constants/errors_constants";

export default function EmailChange({lang,callBackModalClose,subscriberInfo}:any) {
  const validator = new FormValidator();
  const [email, setEmail] = useState("");
  const [oldemail, setOldEmail] = useState(subscriberInfo.email);
  const [otp, setOTP] = useState("");
  const [seconds, setSeconds] = useState(15);
  const [isTimer, setIsTimer] = useState(true)
  const [mainDiv, setMainDiv] = useState(true)
  const [otpDiv, setOtpDiv] = useState(false)
  const [successDiv, setSuccessDiv] = useState(false)
  const [activeLoader, setActiveLoader] = useState<any>(false);


  const closeModal = () => {
    callBackModalClose(false)
  }
  
  const handleSubmit = async (e: any) => { 
    // e.preventDefault();
    try {
      if (validator.validateEmail(email)) {         
        let payload = { email: email };
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

  const handleOTPSubmit = async (e: any) => {
    // e.preventDefault();
    try {
      if (validator.validateNewOtp(otp)) {
        let payload = { 
          otp: otp,
          email: email
        };
        let response = await actGetUpdateEmail(payload, getAccessTokenObj());
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

  // Button Component
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

  return (
    <div className="relative flex flex-col items-center justify-center overflow-hidden">
      <div className="lg:w-4/12 md:w-10/12 sm:w-10/12 w-11/12 bg-selectedBGSecondaryColor rounded-md shadow-md lg:max-w-xl lg:mt-[5%] md:mt-[5%] sm:mt-[5%] mt-[50%]">
        <div className="float-right p-4 cursor-pointer" onClick={closeModal}>
          <Image src={v20} width={25} height={25} alt={"logo"} />
        </div>
        <div className={`${mainDiv ? "" : "hidden" } p-8`}>
          <p className="text-lg font-bold mt-4 text-primaryColor">
           {lang?.change_your_email_id}
          </p>
            <div>
              <div className="py-4">
                <label className="block text-sm text-secondaryItemColor">{lang?.your_existing_mail_id}</label>
                <input
                  type="text"
                  readOnly
                  className="block w-full text-primaryItemColor text-md font-semibold  bg-selectedBGSecondaryColor  border-secondaryItemColor rounded-sm focus:outline-none"
                  value={oldemail}
                />
              </div>
            </div> 
            <div className="">
              <label
                htmlFor="mailid"
                className="block text-sm  text-secondaryItemColor"
              >
                {lang?.enter_your_new_email_id} <span className="text-primaryErrorColor">*</span>
              </label>
              <input
                id="title"
                type="text"
                className="block w-full px-4 py-2 mt-2 text-primaryColor  bg-selectedBGSecondaryColor border border-secondaryItemColor rounded-sm focus:border-white outline-none"
                // value=""
                onChange={(e) => setEmail(e.target.value)}
                maxLength={100}
                name="email"
              />
            </div>
            <div className="py-4">
              <PrimaryButton
                textPayload={buttonName}
                callbackButton={handleSubmit}
                activeLoader = {activeLoader}
              />
            </div>            
        </div>

        {/* Email Update OTP Box     */}

        <div className={`${otpDiv ? "" : "hidden" } p-8 text-lg font-semibold mt-8 text-primaryItemColor text-center`} >
          <p className=""> {lang?.please_enter_otp_sent_to} </p>
          <p className="">{email}</p>  
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
            {/* <button
              type="submit"
              onClick={handleOTPSubmit}
              className="w-full px-4 py-2 tracking-wide text-primaryColor transition-colors duration-200 transform bg-selectedBGPrimaryColor rounded-md hover:bg-[#BA0B5D] focus:outline-none focus:bg-[#BA0B5D]"
            >
            CONTINUE
            </button> */}
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
            <p className="font-semibold"> {lang?.we_have_successfully_updated_your_email_id} </p>  
           
            <div className="mt-8 px-4">
                {/* <button onClick={closeModal}
                    className="w-full py-2 tracking-wide text-primaryColor transition-colors duration-200 transform bg-selectedBGPrimaryColor rounded-md hover:bg-[#BA0B5D] focus:outline-none focus:bg-[#BA0B5D]"
                >
                    DONE
                </button> */}
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
