"use client";
import PrimaryButton from "@/shared/v1/primary-button";
import PrimaryTextInput from "@/shared/v1/primary-text-input";
import OtpInputBox from "@/shared/v1/otpInputBox";
import FormValidator from "@/utils/validation-utils"
import { getAccessTokenObj } from '@/services/helpers/init.helper';
import { notify } from '@/(layout)/v1/ToasterComponent';
import { actGetForgotPass } from '@/services/actions/user.actions'
import { useState } from "react";
import {errors_message}  from "@/constants/errors_constants"

export default function ForgotPassword(props:any) {
  const [activeLoader, setActiveLoader] = useState<any>(false);

  const validator = new FormValidator();
    let newPasswordEnter = "";
    let userIdEnter = "";
    let otp = "";
    let payloadEmail = {
        placeholder: props.lang?.email_mobile,
        type: "text",
        usedKey: "",
        disabled: true
      };
      let payloadPassword = {
        placeholder: props.lang?.enter_new_password,
        type: "password",
        usedKey: "newPassword",
      };
      let buttonName = {
        buttonName: props.lang?.enter_new_password,
        type: "submit",
        usedKey: "forgotPassButton",
      };
      const callbackUserId = (val: any) => {
        userIdEnter = val;
      };
      const callbackPassword = (val: any) => {
        newPasswordEnter = val;
      };
      const otpcallback = (val: any) => {
        otp = val;
      };
      const callbackButton = async (val: any) => {
        if (validator.validateNewPass(otp,newPasswordEnter)) {
          let payload: any = {
            email: props.loginBy,
            otp: otp,
            password : newPasswordEnter
          };

          payload = JSON.stringify(payload);

          let response = await actGetForgotPass(payload, getAccessTokenObj());
          response.isSuccessful
          ? (notify(errors_message.USER_PASSWORD_UPDATED, 'success'), props.modalClose(false)) : notify(response.result.reason, 'error');
          setActiveLoader(Math.random())
        } else {
          setActiveLoader(Math.random())
        }
      };
    const closeModal = () => {
       props.modalClose(false)
    }
    const handleNextBoxFocus = () => {
        console.log('Last box filled!');
    };
    
    return (
        <div className="min-h-80 bg-[#151617] rounded-md">
            <div onClick={closeModal}
                className="text-2xl font-bold text-slate-200 text-right px-4 pt-2 cursor-pointer">✕</div>
            <div className="py-6 text-gray-200 text-lg px-8 sm:px-14 md:px-12 lg:px-12">
                <div className="text-slate-200 text-2xl font-bold">
                    <p> {props.lang?.please_enter_the_otp} </p>
                </div>
                <PrimaryTextInput textPayload={payloadEmail} callbackText={callbackUserId} test={props.loginBy}/>
                <div className="text-slate-300 pb-2">
                    <p className="text-xs my-2"> {props.lang?.otp} </p>
                    <OtpInputBox length={6} onNextBoxFocus={handleNextBoxFocus} otpcallback={otpcallback} autoFocus={true}/>
                </div>
                <PrimaryTextInput textPayload={payloadPassword} callbackText={callbackPassword}/>
                <PrimaryButton textPayload={buttonName} callbackButton={callbackButton} activeLoader = {activeLoader}/>
            </div>
        </div>
    );
}