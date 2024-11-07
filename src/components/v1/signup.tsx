import LoginHeader from "@/shared/v1/login-header";
import PrimaryButton from "@/shared/v1/primary-button";
import PrimaryTextInput from "@/shared/v1/primary-text-input";
import { signupUser } from "@/services/actions/signup.action";
import { getAccessTokenObj } from '@/services/helpers/init.helper';
import { useRouter } from "next/navigation";
import { useState } from "react";
import FormValidator from "@/utils/validation-utils"
import { notify } from '@/(layout)/v1/ToasterComponent';
import { signUpEvent } from "@/utils/firebaseAnalytics"; 

export default function SignUpPage(props: any) {
  
  const [payloadEmail, setPayloadEmail] = useState<any>(props.emailPayloadLookup);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copyInputName, setCopyInputName] = useState<string | null>(null);
  const [copyInputPassword, setCopyInputPassword] = useState<string | null>(null);
  const [activeLoader, setActiveLoader] = useState<any>('');
  const [typeofProcess, setTypeofProcess] = useState<any>('');

  const router = useRouter();
  const validator = new FormValidator();

  let inputTextName = "";
  let inputTextEnter = "";
  let passwordEnter = "";

  let payloadName = {
    placeholder:props.lang?.name,
    type: "text",
    usedKey: "name",
  };

  let payloadPassword = {
    placeholder: props.lang?.password,
    type: "password",
    usedKey: "password",
  };
  let buttonName = {
    buttonName: props.lang?.signup,
    type: "submit",
    usedKey: "loginButton",
  };

  let disabled = true;

  const callbackTextName = (val: any) => {
    inputTextName = val;
    setCopyInputName(val)
  };
  const callbackPassword = (val: any) => {
    passwordEnter = val;
    setCopyInputPassword(val)
  };
  const callbackButton = async (data: any) => {     
    try {
      let passwordEnterd :any = passwordEnter?passwordEnter:copyInputPassword; 
      let inputTextNamed :any = inputTextName?inputTextName:copyInputName;
      if (!validator.validateName(inputTextNamed)) {
        setErrorMessage(validator.formError);
        setActiveLoader(Math.random())
        setTimeout(() => setErrorMessage(null), 5000);
        return;      
      }
      if (!validator.validatePassword(passwordEnterd)) {
        setErrorMessage(validator.formError);
        setActiveLoader(Math.random())
        setTimeout(() => setErrorMessage(null), 5000);        
        return;
      }

      let data: any = {};
      let payload: any = {
        subscribername : inputTextNamed,
        // email: props.userinput,
        password: passwordEnterd,
      }
      if(props.loginBy === 'email') {
        payload['email'] = props.userinput
      } else {
        payload['mobileno'] = props.userinput
      } 
      let response = await signupUser(payload, getAccessTokenObj());
      if (response.isSuccessful) {   
        let mailSuccessMessage = props.lang?.verification_link_sent;
        let mobileNoSuccesMessage = props.land?.otp_sent         
        const successMessage = payload.email ? mailSuccessMessage : mobileNoSuccesMessage;
        notify(successMessage, 'success');

        setTypeofProcess('SIGNUP-DONE')

        if (payload.email) {
          data.sign_up_mode = "Email";
          data.status = "Success";
          data.email = payload.email
          props.getEmailIdCB(payload.email,"email", 'SIGNUP-DONE')
        }
        else if(payload.mobileno){
          data.sign_up_mode = "Mobile";
          data.status = "Success";
          data.email = payload.mobileno
          props.getEmailIdCB(payload.mobileno,"mobile")
        }
        setActiveLoader(Math.random())

      } else {
        notify(response.result.reason, 'error');
        data.sign_up_mode = props.loginBy === "Mobile" ? "Mobile" : "Email";
        data.status = "Failed";
        data.error_reason = response.response.reason;
        // data.Subscriber_ID = payload.response.success;
        data.email = props.userinput;
        data.mobile = props.userinput;
        setActiveLoader(Math.random())
      }       
      signUpEvent(data)
    } catch (error) {
      setActiveLoader(Math.random())
      console.error("Error during API call:", error);
    }
  };

  const changeBtnCallBack = (data:any) => {    
    props.changeBtnCallBackLogin(data);
  };
  

  return (
        <div className="sm:text-center pb-0 min-h-80">
          <LoginHeader />
          <div className="py-6 text-primaryItemColor text-lg bg-loginSecondaryBgColor rounded-b-md px-8 sm:px-14 md:px-12 lg:px-16 pb-10">
            <PrimaryTextInput
              textPayload={payloadName}
              callbackText={callbackTextName}              
            />
            <PrimaryTextInput
              textPayload={payloadEmail}
              test={props.userinput}
              disabled={disabled}
              changeBtnCallBack={changeBtnCallBack}
            />
            <PrimaryTextInput
              textPayload={payloadPassword}
              callbackText={callbackPassword}
            />
            <PrimaryButton
              textPayload={buttonName}
              callbackButton={callbackButton}
              activeLoader = {activeLoader}
            />
             {errorMessage && (
                <small className="text-xs text-pink-500">{errorMessage}</small>
              )}
            <div className="py-0 mb-4 w-fullabsolute content-center">
              <div className="flex text-xs text-secondaryItemColor text-center justify-center items-center">
                <p className="text-secondaryItemColor">
                  {" "}
                  {props.lang?.tc_pp_agreement} <br />
                  <span className="text-primaryItemColor cursor-pointer text-sm font-semibold">
                    {" "}
                   {props.lang?.terms_of_use}  {" "}
                  </span>
                  and
                  <span className="text-primaryItemColor cursor-pointer text-sm font-semibold">
                    {" "}
                   {props.lang?.privacy_policy} {" "}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
  );
}
