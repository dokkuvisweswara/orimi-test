"use client";
import v20 from "../../../public/closeicon.svg";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Mypins from "@/shared/v1/pinInputBox";
import Link from "next/link";
import Modal from "@/components/v1/modelbox";
import EmailChange from "./emailChange";
import MobileNoUpdate from "./mobileUpdate";
import { actGetUpdateProfile, profileListData } from "@/services/actions/user.actions";
import { getAccessTokenObj } from "@/services/helpers/init.helper";
import FormValidator from "@/utils/validation-utils";
import { notify } from "@/(layout)/v1/ToasterComponent";
import CountryDropDown from "@/components/v1/countryCodeDropDown";
import { AGE_RANGE } from "@/constants/appConfig";
import OtpInputBox from "./otpInputBox";
import PrimaryButton from "./primary-button";
import AgeRange from "@/containers/agerange";
import {errors_message}  from "@/constants/errors_constants";
import { getCookie } from "@/hooks/client.cookie";
import { useCurrentProfileDetails, useStoreProfileListData } from "@/store/init";
import ImageUpload from "@/containers/imageUpload";

export default function EditProfileform({
  lang,
  callBackModalClose,
  subscriberInfo,
  subscriberProfileDetail,
}: any) {
  const validator = new FormValidator();

  const [name, setName] = useState(subscriberProfileDetail.profilename);
  const [selectedOption, setSelectedOption] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("Shireesha KB");
  const [file, setFile] = useState(null);
  const [dob, setDob] = useState<any>(null);
  const [gender, setGender] = useState(""); // Default to male
  const [countryCode, setCountryCode] = useState("");
  // const [ageRange, setAgeRange] = useState();
  // const [age, setAge] = useState(AGE_RANGE);
  const [ageSelect, setAgeSelect] = useState(2)
  const [pin, setPin] = useState("");
  const [activeLoader, setActiveLoader] = useState<any>(false);
  const [selectedAge, setSelectedAge] = useState<any>(18);  
  const subscriberId= getCookie("subscriberId");
  const setUpdateProfileData = useCurrentProfileDetails((state: any) => state?.setUpdateProfileData);
  const [profilePic, setProfilePic] = useState<any>(null);
  const setProfileListDataData = useStoreProfileListData((state: any) => state?.setProfileListDataData)

  // const handleAgeClick = (item:any, i:any) => {    
  //   setAgeSelect(i);
  //   setAgeRange(item)
  // };

  // Pin Box
  const pinCallback = (val: any) => {
    setPin(val);
  };

  const handleDropdownChange = (event: { target: { value: any } }) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
  };

  const handleTitleChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setTitle(event.target.value);
  };

  const handleDobChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setDob(event.target.value);
  };

  const getTodaysDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // January is 0
    const day = String(today.getDate()).padStart(2, '0');
  
    return `${year}-${month}-${day}`;
  };

  const handleGenderChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setGender(event.target.value);
  };
  const handleSubmit = async (e: any) => {
    // e.preventDefault();

    if (validator.validateUpdateProfile(name)) {
      let payload:any = {
        subscribername: name,
        profileid: subscriberProfileDetail?.profileid,
        // kidsmode: subscriberInfo.kidsmode        
      };
      if( gender !== "") {
        payload.gender = gender
      }
      if( dob !== "") {
        payload.dob = dob
      }
      if( pin !== "NaN" && pin !== "") {
        payload.profilepin = pin
      }      
      if(profilePic){
        payload.picture = profilePic;
      }
      let response = await actGetUpdateProfile(payload, getAccessTokenObj());
      if (response.result.success) {
        callBackModalClose(false, "updateProfile");
        notify(errors_message.PROFILE_UPDATED, "success");
        profileListData(getAccessTokenObj()).then((subscriberProfileData: any) => {
          if(subscriberProfileData.isSuccessful) {
             let sorteddata: any = subscriberProfileData?.result?.data;
             let adminIndex: any;
             sorteddata.map((item: any, i: number) => {
               if(item.profileid === subscriberId){
                 adminIndex = i;
               }
             });
             let adminArr = sorteddata.splice(adminIndex, 1);
             sorteddata = [...adminArr, ...sorteddata]
             localStorage.setItem('profileList', JSON.stringify(sorteddata));
             setProfileListDataData(sorteddata);
             let profileDataStore = {};
             sorteddata?.map((data: any) => {
             if(subscriberInfo?.profileid == data?.profileid){
              profileDataStore = data;
             }});
             localStorage.setItem('subscriberProfileDetails', JSON.stringify(profileDataStore));
             setUpdateProfileData(profileDataStore);
          }
        })
        setActiveLoader(Math.random());
      } else {
        setActiveLoader(Math.random())
        notify(response.result.reason, "error");
      }
    } else {
      setActiveLoader(Math.random())
    }
  };

  const closeModal = () => {
    callBackModalClose(false);
  };

  const [mobileNoModal, setMobileNoModal] = useState(false);
  const [emailModal, setEmailModal] = useState(false);
  const mobileModalHamdel = () => {
    // props.callBackModalClose(false)
    setMobileNoModal(true);
  };
  const emailModalHamdel = () => {
    setEmailModal(true);
    // props.callBackModalClose(false)
  };
  const callBackModalCloseEmail = (data: any) => {
    setEmailModal(data);
  };
  const callBackModalCloseMobile = (data: any) => {
    setMobileNoModal(data);
  };

  useEffect(() => {
    setGender(subscriberProfileDetail?.gender ? subscriberProfileDetail?.gender : "MALE");
    // setAgeRange(subscriberInfo.dob);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleCountryCode = (data:any)=>{
    setCountryCode(data)
  }
  
  let buttonName = {
    buttonName: lang?.update,
    type: "submit",
    usedKey: "updateProfile",
  };
  const callBackAge = async (data: any) => {
    setDob(data?.dob);
    setSelectedAge(data?.selected)
  }
  
  // Image callBack
  const updatedImageCallBack = (val: any) => {
    if(val){
      setProfilePic(val);
    }
  }
  return (
    <div className="relative flex flex-col items-center justify-center overflow-hidden">
      <div className="w-full sm:w-8/12 md:w-6/12 lg:w-4/12 bg-selectedBGSecondaryColor rounded-md shadow-md lg:max-w-xl lg:mt-[1%] md:mt-[1%] sm:mt-[2%] mt-[5%]">
        <div className="float-right cursor-pointer p-2" onClick={closeModal}>
          <Image src={v20} width={25} height={25} alt={"logo"} />
        </div>
        <div className="p-8">
          <p className="text-xl font-bold mt-2 text-primaryColor pb-2">
            {lang?.edit_profile}
          </p>
          {/* <form className="mt-3" onSubmit={handleSubmit}> */}
          <div className="" id="profilePic">
            <ImageUpload filedata={subscriberProfileDetail?.picture ? subscriberProfileDetail?.picture : null} updatedImageCallBack={updatedImageCallBack}></ImageUpload>
          </div>
          { subscriberId === subscriberProfileDetail?.profileid &&
            <div id="emailUpdate">
              <div className="py-1">
                <label className="block text-sm text-gray-400">
                  {lang?.email}:
                </label>
                <input
                  type="text"
                  readOnly
                  className="block w-full px-4 py-2 mt-2 text-secondaryItemColor text-md bg-transparent border border-secondaryItemColor rounded-sm outline-none cursor-default lg:text-base md:text-base sm:text-base text-sm"
                  value={subscriberInfo.email}
                />
              </div>
              <div
                onClick={emailModalHamdel}
                className="relative float-right bottom-8 mr-2 text-selectedBGPrimaryColor cursor-pointer font-medium text-xs bg-transparent"
              >
                {lang?.change}
              </div>
              <Modal
                isVisible={emailModal}
                onClose={() => setEmailModal(false)}
                AllClass={"w-full lg:w-[96%] lg:mx-[2%] my-2"}
              >
                <EmailChange
                  lang={lang}
                  callBackModalClose={callBackModalCloseEmail}
                  subscriberInfo={subscriberInfo}
                />
              </Modal>
            </div>
          }
          { subscriberId === subscriberProfileDetail?.profileid &&
            <div id="mobileNumUpdate">
              <div className="py-1">
                <label className="block text-sm text-secondaryItemColor">
                  {lang?.mobile_number}:
                </label>
                <div className="flex items-center mt-2 text-md relative gap-0.5 text-primaryColor">
                  <div className="border border-secondaryItemColor rounded-sm outline-none py-0.5 pr-2">
                    <CountryDropDown countryCode={handleCountryCode} />             
                  </div>
                  <input
                    type="text"
                    className="block text-primaryColor w-full h-11 px-4 py-2 text-secondaryItemColor bg-transparent border border-secondaryItemColor rounded-sm outline-none cursor-default lg:text-base md:text-base sm:text-base text-sm"
                    value={subscriberInfo.mobileno}                    
                    maxLength={10}
                    readOnly
                    onChange={handleTitleChange}
                  />
                </div>
              </div>
              <div
                onClick={mobileModalHamdel}
                className="relative float-right bottom-8 mr-2 text-selectedBGPrimaryColor cursor-pointer font-semibold text-xs"
              >
                {lang.update}
              </div>
              <Modal
                isVisible={mobileNoModal}
                onClose={() => setMobileNoModal(false)}
                AllClass={"w-full lg:w-[96%] lg:mx-[2%] my-2"}
              >
                <MobileNoUpdate lang={lang} callBackModalClose={callBackModalCloseMobile} subscriberInfo={subscriberInfo}/>
              </Modal>
            </div>
          }
          <div className="py-1" id="editProfileUserName">
            <label className="block text-sm text-gray-400">
              {lang?.name}:
            </label>
            <input
              type="text"
              className="block w-full px-4 py-2 mt-2 text-primaryColor text-md bg-transparent border border-secondaryItemColor rounded-sm focus:border-white outline-none focus:rounded-sm"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="py-1" id="editProfileAgeRange">
            <label className="block text-sm text-secondaryItemColor">
              {lang?.age}
            </label>
            <AgeRange callBackAge={callBackAge} selectedAge={subscriberProfileDetail?.dob}></AgeRange>
          </div>
          <div id="editProfileGenre"> 
            <label className="block text-sm text-secondaryItemColor py-1">
              {lang?.gender}
            </label>
            <fieldset className="flex gap-4">
              <div className="relative flex items-center">
                <input
                  className="w-4 h-4 transition-colors bg-transparent border-2 rounded-full appearance-none cursor-pointer peer border-white checked:border-slate-200 checked:bg-transparent checked:hover:border-slate-600 checked:hover:bg-white focus:outline-none checked:focus:border-slate-200 checked:focus:bg-transparent focus-visible:outline-none disabled:cursor-not-allowed disabled:border-slate-100 disabled:bg-slate-50"
                  type="radio"
                  value="MALE"
                  checked={gender === 'MALE'}
                  id="password"
                  name="male"
                  onChange={handleGenderChange}
                />
                <label
                  className="pl-1 text-sm cursor-pointer text-slate-200 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400"
                  htmlFor="password"
                >
                  {lang?.male}
                </label>
                <svg
                  className="absolute left-0 w-4 h-4 transition-all duration-300 scale-50 opacity-0 pointer-events-none fill-white peer-checked:scale-100 peer-checked:opacity-100 peer-disabled:cursor-not-allowed"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-labelledby="title-1 description-1"
                  role="graphics-symbol"
                >
                  <circle cx="8" cy="8" r="4" />
                </svg>
              </div>
              <div className="relative flex items-center">
                <input
                  className="w-4 h-4 transition-colors bg-transparent border-2 rounded-full appearance-none cursor-pointer peer border-white checked:border-slate-200 checked:bg-transparent checked:hover:border-slate-600 checked:hover:bg-white focus:outline-none checked:focus:border-slate-200 checked:focus:bg-transparent focus-visible:outline-none disabled:cursor-not-allowed disabled:border-slate-100 disabled:bg-slate-50"
                  type="radio"
                  value="FEMALE"
                  checked={gender === 'FEMALE'}
                  id="otp"
                  name="female"
                  onChange={handleGenderChange}
                />
                <label
                  className="pl-1 text-sm cursor-pointer text-slate-200 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400"
                  htmlFor="otp"
                >
                  {lang?.female}
                </label>
                <svg
                  className="absolute left-0 w-4 h-4 transition-all duration-300 scale-50 opacity-0 pointer-events-none fill-white peer-checked:scale-100 peer-checked:opacity-100 peer-disabled:cursor-not-allowed"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-labelledby="title-2 description-2"
                  role="graphics-symbol"
                >
                  <circle cx="8" cy="8" r="4" />
                </svg>
              </div>
            </fieldset>            
          </div>
          {selectedAge >=18 &&
            <div className="text-primaryColor" id="editProfileSetPinBox">
              <label className="block text-sm text-secondaryItemColor py-2">
                {lang?.set_pin}
              </label>
              <OtpInputBox length={4} otpcallback={pinCallback}  autoFocus={false}/>
            </div>
          }
          <div className="mt-4" id="editProfileSubmitForm">
            <PrimaryButton
              textPayload={buttonName}
              activeLoader = {activeLoader}
              callbackButton={handleSubmit}
            />
          </div>
          {/* </form> */}
        </div>
      </div>
    </div>
  );
}
