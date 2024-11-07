"use client";

import { useState } from "react";
import PrimaryButton from "@/shared/v1/primary-button";
import SquareInputBox from "@/shared/v1/pinInputBox";
import CloseIcon from "@/shared/v1/close-icon";
import Link from "next/link";
import OtpInputBox from "@/shared/v1/otpInputBox";
import AgeRange from "@/containers/agerange";
import { profileUpdate, resetProfilePin, sendProfilePinOTP, switchProfile } from "@/services/actions/user.actions";
import { getAccessTokenObj } from "@/services/helpers/init.helper";
import { userJourney } from "@/utils/userjourney";
import { useRouter } from "next/navigation";
import { useCurrentProfileDetails } from "@/store/init";
import { notify } from "@/(layout)/v1/ToasterComponent";
import Image from "next/image";
import v20 from "../../../public/closeicon.svg";
import Spinner from "@/loaders/spinner/spinner";
import { Popup, PopupBody } from "@/popup/commonPopup";
import { errors_message } from "@/constants/errors_constants";

export default function SwitchPin({ profile, isSetNewPin, callBackFromSwitchPin, callBackModalClose, lang}: any) {
  let buttonName = {
    buttonName: lang?.submit,
    type: "submit",
    usedKey: "pinButton",
  };

  const forgotPassHandler = () => {
    // alert("Forgot password");
  };

  const [pin, setPin] = useState<any>();
  const [dob, setDob] = useState<any>();
  const [selectedAge, setSelectedAge] = useState<any>(18);
  const [activeLoader, setActiveLoader] = useState<any>(false);
  const setUpdateProfileData = useCurrentProfileDetails((state: any) => state?.setUpdateProfileData);
  let subscriberDetail: any = localStorage?.getItem('subscriberDetail');
  subscriberDetail = JSON.parse(subscriberDetail);
  const router = useRouter();
  const pinCallback = (val: any) => {
    setPin(val);
  };

  const callBackAge = async (data: any) => {
    setDob(data?.dob);
    setSelectedAge(data?.selected);
  };

  const callbackButton = async (data: any) => {
    if (isSetNewPin) {
      if (pin?.length < 4) {
        // notify("please enter valid pin", 'error');
        notify(errors_message.PLEASE_ENTER_VALID_PIN, 'error')
        setActiveLoader(Math.random());
      }
      const profilePayload = {
        profileid: profile.profileid,
        profilepin: pin,
        dob: dob,
      };
      let res = await profileUpdate(profilePayload, getAccessTokenObj());
      if (res?.isSuccessful) {
        callBackFromSwitchPin(true);
        setLocalProfileData();
        setActiveLoader(Math.random());
      } else {
        notify(res.result.reason, "error");
        setActiveLoader(Math.random());
      }
    } else {
      if (pin?.length < 4) {
        notify(errors_message.PLEASE_ENTER_VALID_PIN, 'error')
        setActiveLoader(Math.random());
        return '';
      }
      const profilePayload = {
        profileid: profile.profileid,
        pin: {
          profilepin: pin,
        },
      };
      
      switchProfile(profilePayload, getAccessTokenObj())
        .then((response: any) => {
          if (response?.isSuccessful) {
            userJourney(response, "switchprofile").then((res: any) => {
              localStorage.setItem( "subscriberProfileDetails", JSON.stringify(profile));
              router.push("/");
            });
          } else {
            notify(response.result.reason, "error");
            setActiveLoader(Math.random());
          }
        })
        .catch((err: any) => {
          setActiveLoader(Math.random());
        });
    }
  };

  const setLocalProfileData = async () => {
    let profileDetails: any = localStorage?.getItem("subscriberProfileDetails");

    if (profileDetails) {
      profileDetails = JSON.parse(profileDetails);
      profileDetails.profilepin = "ENABLED";
      localStorage?.setItem("subscriberProfileDetails", JSON.stringify(profileDetails));
    }
  };

  // Forgot pin
  const [otp, setOTP] = useState<any>("");
  const [newPin, setNewPin] = useState<any>("");
  const [isTimer, setIsTimer] = useState<any>(false);
  const [seconds, setSeconds] = useState<any>(15);
  const [switchToForgotPin, setSwitchToForgotPin] = useState<any>(false);
  const [userLoad, setUserLoad] = useState<any>(false);
  const selctForgOtporResendOtp = async (type: any) => {
    setIsTimer(true);
    setUserLoad(true);
    setSeconds(15);
    countTime();
    let payload ={
      profileid: profile.profileid
    }
    let res = await sendProfilePinOTP(payload, getAccessTokenObj());
    if(res?.isSuccessful){
      setUserLoad(false);
      if(type == 'resend'){
        notify(errors_message.OTP_SENT_ON_REGISTERED_EMAIL_MOBILE, "error");
      } else {
        setSwitchToForgotPin(true);
      }
    }else {
      notify(res?.result?.reason, 'error')
    }
  };

  // Otp Box
  const otpcallback = (val: any) => {
    setOTP(val);
  };
  // newPinCallBack
  const newPinCallBack = (val: any) => {
    setNewPin(val);
  };

  // Timer
  
  const countTime = () => {
    let prevSeconds = seconds;
    const intervalId = setInterval(() => {
      if (prevSeconds > 0) {
        prevSeconds--;
        setSeconds(prevSeconds);
      } else {
        clearInterval(intervalId);
        setIsTimer(false);
      }
    }, 1000);
    return () => clearInterval(intervalId);
  };

  const closeModal = () => {
    callBackModalClose(false);
  };

  const handleResetPin = async () => {
    if(otp.length == 6){

    }
    let payload = {
      otp: otp,
      pin: newPin
    }
    let res = await resetProfilePin(payload, getAccessTokenObj());
    if(res?.isSuccessful){
      setSwitchToForgotPin(false);
    }else {
      notify(res?.result?.reason, 'error');
      setSwitchToForgotPin(true);
    }
  };

  const getUserEmailorMobileNum = () => {
    if (!(subscriberDetail && subscriberDetail)) return '';
    let id =  subscriberDetail && subscriberDetail?.mobileno ? hideMobile(subscriberDetail?.mobileno) : hideEmail(subscriberDetail?.email);
    return id;
  }

  const hideEmail = (email: any) => {
    const atIndex = email.indexOf("@");
    const username = email.substring(0, atIndex);
    const hiddenUsername = `${username.substring(0, 2)}******${username.substring(atIndex - 2)}`;
    const domain = email.substring(atIndex);
    return `${hiddenUsername}${domain}`;
  };

  const hideMobile = (mobileNumber: any) => {
    const hidden = `${mobileNumber.substring(0, 2)}******${mobileNumber.substring(mobileNumber.length - 2)}`;
    return `${hidden}`;
  };

  return (
    <>
      <div className="bg-primaryBgColor py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto sm:text-center pb-0 bg-neutral-950 rounded-xl min-w-md md:max-w-sm sm:max-w-lg">
            <div className="bg-zinc-900 rounded-3xl rounded-b-xl">
              <div
                className="float-right p-4 cursor-pointer"
                onClick={closeModal}
              >
                <Image src={v20} width={25} height={25} alt={"logo"} />
              </div>
              {!switchToForgotPin ? (
                <div className="py-6 bg-zinc-900 rounded-md px-4 sm:px-14 md:px-6 lg:px-6">
                  <p className="text-primaryColor font-bold text-lg py-2">
                    {isSetNewPin ? `${lang?.setup_profile_pin}` : `${lang?.pin_switch_profile}`}
                  </p>
                  <div className="">
                    {/* <p className="text-planprimaryItemColor">Profile</p> */}
                    <p className="text-ordinaryItemColor font-normal">
                      {profile?.profilename}
                    </p>
                  </div>
                  <small className="flex justify-between text-xs py-2">
                    <span className="text-secondaryItemColor font-medium">
                      {lang?.enter_pin}
                    </span>
                  </small>
                  {/* <SquareInputBox value={pin} onChange={handlePinChange}/> */}
                  <OtpInputBox length={4} otpcallback={pinCallback} autoFocus={true} uniquekey="profilepin"/>
                  {!isSetNewPin && (
                    <small className="flex justify-between text-xs py-2">
                      <span className="text-pink-300 cursor-pointer font-medium" onClick={() => selctForgOtporResendOtp('forget')}>
                        {lang?.forgot_pin}
                      </span>
                    </small>
                  )}
                  {isSetNewPin && (
                    <div className="my-3">
                      <p className="text-secondaryItemColor py-2">
                        {lang?.select_agerange}
                      </p>
                      <AgeRange callBackAge={callBackAge}></AgeRange>
                    </div>
                  )}
                  <PrimaryButton
                    textPayload={buttonName}
                    callbackButton={callbackButton}
                    activeLoader={activeLoader}
                  />
                </div>
              ) : (
                <div className={`p-8 text-lg font-semibold text-primaryItemColor text-center`}>
                  <p className="font-semibold text-xl">{lang?.set_new_pin}</p>
                  <p className="">{lang?.please_enter_the_otp_sent_to_the}</p>
                  <p className="planprimaryItemColor text-sm">{getUserEmailorMobileNum()}</p>
                  {/* OTP BOX */}
                  <div className="py-4 font-normal">
                    <OtpInputBox length={6} otpcallback={otpcallback} autoFocus={true} uniquekey="otp"/>
                    <div className="text-slate-500 flex text-sm py-2 justify-center">
                      {lang?.did_not_recive_otp}?
                      <div className={`${isTimer ? "" : "hidden"}`}>
                        <p className="text-rose-500 pl-2 font-bold">
                          {seconds} {lang?.second}{" "}
                        </p>
                      </div>
                      <div className={`${!isTimer ? "" : "hidden"}`} onClick={() => selctForgOtporResendOtp('resend')}>
                        <p className="text-slate-200 pl-2 font-bold cursor-pointer">
                          {" "}{lang?.resend}{" "}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="pb-4 font-normal text-left">
                    <p className="py-2 text-sm text-planprimaryItemColor">{lang?.set_new_pin}</p>
                    <OtpInputBox length={4} otpcallback={newPinCallBack} autoFocus={true} uniquekey="newpin"/>
                  </div>
                  <div className="mt-2">
                    <PrimaryButton
                      textPayload={buttonName}
                      callbackButton={handleResetPin}
                      activeLoader={activeLoader}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        {userLoad && 
            <Popup>
                <PopupBody>
                    <Spinner></Spinner>
                </PopupBody>
            </Popup>
            }
      </div>
    </>
  );
}
