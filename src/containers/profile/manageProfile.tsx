import { getCookie } from "@/hooks/client.cookie";
import { deleteProfileAction, profileListData } from "@/services/actions/user.actions";
import { getAccessTokenObj } from "@/services/helpers/init.helper";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import User from "../../../public/user-icon.svg"
import Link from "next/link";
import { Popup, PopupBody, PopupHeader } from "@/popup/commonPopup";
import Confirmation from "./confirmation";
import { notify } from "@/(layout)/v1/ToasterComponent";
import Spinner from "@/loaders/spinner/spinner";
import Modal from "@/components/v1/modelbox";
import SwitchPin from "@/components/v1/switchProfilePin";
import { useStoreProfileListData } from "@/store/init";
import { errors_message } from "@/constants/errors_constants";

export default function ManageProfile({subscriberInfo, lang, profileInfo}: any) {  
  const router = useRouter();
  const [subscriberProfileDetail, setSubscriberProfileDetail] = useState<any>(null);
  const [profileList, setProfileList] = useState<any>(profileInfo);
  const subscriberId= getCookie("subscriberId");
  const noOfUserProfilesLimit:any  = 4;
  const [selectedProfile, setSelectedProfile] = useState<any>(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState<any>(false);
  const [loading, setLoading] = useState<any>(false);
  const [showSetOrVerifyProfilePin, setShowSetOrVerifyProfilePin] = useState<any>(false);
  const [isSetNewPin, setIsSetNewPin] = useState<any>(false);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    let unsubscribe = useStoreProfileListData.subscribe((state: any) => {
      setProfileList(state?.profileListDataData);
    return () => unsubscribe();
    })
  },[])

  useEffect(() => {
    let currentProfileDetails:any = localStorage.getItem('subscriberProfileDetails');
    currentProfileDetails = JSON.parse(currentProfileDetails);
    setSubscriberProfileDetail(currentProfileDetails);
  },[])
  const deleteProfile = async(item: any) => {
    setSelectedProfile(item);
    setDeleteConfirmation(true);
  }

  const callBackRes = async (data: any) => {
    setLoading(true);
    if(data){
      let res: any = await deleteProfileAction(selectedProfile?.profileid, getAccessTokenObj());
      if(res?.isSuccessful){
        if(res?.result?.success){
          profileListData(getAccessTokenObj())
            .then((response) => {
              if(response.result.data) { 
                let sorteddata: any = response?.result?.data;
                let adminIndex: any;
                sorteddata.map((item: any, i: number) => {
                  if(item.profileid === subscriberId){
                    adminIndex = i;
                  }
                });
                let adminArr = sorteddata.splice(adminIndex, 1);
                sorteddata = [...adminArr, ...sorteddata]
                localStorage.setItem('profileList', JSON.stringify(sorteddata));
                // localStorage.setItem('subscriberProfileDetail', JSON.stringify(response?.result?.data[0]));   
                setProfileList(sorteddata);
                // setSubscriberProfileDetail(response?.result?.data[0]);
                notify(lang?.profile_delete_success_message, "success");
              } 
            })
            .catch((error) => {
              console.error("Error fetching subscriber information:", error);
            });
        }
      } else {
        notify(res?.result?.reason, "error");
      }
    }
    setLoading(false);
    setDeleteConfirmation(false);
  }

  const redirectToAddProfile = async () => {
    if(subscriberProfileDetail?.profilepin === "ENABLED"){
      router.push('/addprofile');
    } else {
      // router.push('/addprofile');
      // notify("Your profile pin is disabled!", "warn");
      notify(errors_message.YOUR_PROFILE_PIN_IS_DISABLED, 'warn');
      setShowSetOrVerifyProfilePin(true);
      setIsSetNewPin(true);
    }    
  } 

  const callBackFromSwitchPin = async (data: any) => {
    if(data) {
      setShowSetOrVerifyProfilePin(false);
      if(isSetNewPin){
        router.push('/addprofile');
      }
    }
  }

  const callBackModalClose = (data: any) => {
    setModal(data);
    setShowSetOrVerifyProfilePin(data);
  };
    return(
      <>
        <div className="flex items-center justify-between">
          <p className="text-primaryColor text-sm font-bold">{lang?.manage_profiles}</p>
          <div className="icon-container">
            {profileList?.length < noOfUserProfilesLimit && 
            <span onClick={redirectToAddProfile} className="hover:cursor-pointer group">
              <svg
                width="20"
                height="20"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_323_328)">
                  <path
                    d="M9.5 6.5H6.5V9.5H5.5V6.5H2.5V5.5H5.5V2.5H6.5V5.5H9.5V6.5Z"
                    fill="#ce0f6c"
                    className="alterColor"
                  ></path>
                </g>
                <defs>
                  <clipPath id="clip0_323_328">
                    <rect width="14" height="14" fill="white"></rect>
                  </clipPath>
                </defs>
              </svg>
            </span>}
          </div>
        </div>
        <div className="profiles-list my-3">
          {
           profileList && profileList?.map((profile: any, i:number) => {
              return(
                <div className="single-profile flex items-center justify-between py-1.5 hover:bg-[#2B2B2B] group p-2 hover:rounded-md" key={i}>
                <div className="flex items-center gap-4">
                  <div className="profile-pic h-8 w-8 rounded-full bg-primaryItemColor">
                  <figure className="flex justify-center items-center">
                    {
                      profile.picture ? 
                      <Image src={profile.picture} alt="User" className="w-full h-full rounded-full aspect-square" priority width={160} height={160}/> 
                      : 
                      <Image src={User} alt="User" className="" priority />
                    }
                  </figure>
                  </div>
                  <div className="profile-details text-primaryColor">
                      <p className="profile-name font-medium text-sm truncate">
                      {profile?.profilename}
                      </p>
                      { profile.profileid === subscriberId && 
                        <span className="uppercase text-selectedBGPrimaryColor inline-flex items-center justify-center rounded-md profile-badge font-bold text-[0.7rem]">{lang?.Admin}</span  > 
                      }
                      { profile.kidsmode === 'YES' && 
                        <p className="uppercase p-1 text-secondaryItemColor inline-flex items-center justify-center rounded-sm profile-badge font-semibold text-[0.7rem]">{lang?.Kids}</p>
                      }
                  </div>
                </div>
                {/* <div className="edit-profile-icon cursor-pointer relative overflow-hidden hover:overflow-visible focus-visible:outline-none" aria-describedby={`tooltip-${i}`}>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_323_325)">
                      <path
                        d="M7.03 4.51L7.49 4.97L2.96 9.5H2.5V9.04L7.03 4.51ZM8.83 1.5C8.705 1.5 8.575 1.55 8.48 1.645L7.565 2.56L9.44 4.435L10.355 3.52C10.55 3.325 10.55 3.01 10.355 2.815L9.185 1.645C9.085 1.545 8.96 1.5 8.83 1.5ZM7.03 3.095L1.5 8.625V10.5H3.375L8.905 4.97L7.03 3.095Z"
                        fill="#ce0f6c"
                        className="alterColor"
                      ></path>
                    </g>
                    <defs>
                      <clipPath id="clip0_323_325">
                        <rect width="12" height="12" fill="white"></rect>
                      </clipPath>
                    </defs>
                  </svg>
                  <span role="tooltip" id={`tooltip-${i}`} className="invisible absolute bottom-full left-1/2 z-10 mb-2 w-20 px-1 -translate-x-1/2 rounded bg-slate-700 p-1 text-sm text-white text-center opacity-0 transition-all before:invisible before:absolute before:left-1/2 before:top-full before:z-10 before:mb-2 before:-ml-2 before:border-x-8 before:border-t-8 before:border-x-transparent before:border-t-slate-700 before:opacity-0 before:transition-all before:content-[''] group-hover:visible group-hover:block group-hover:opacity-100 group-hover:before:visible group-hover:before:opacity-100">Edit Profile</span>
                </div> */}
                {(profile.profileid !== subscriberId) &&
                  <div id="deleteProfile" className="group hover:scale-125 transition-transform duration-300 ease-in-out hover:cursor-pointer" onClick={() => deleteProfile(profile)}>
                  <svg width="16" height="16" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_323_331)">
                      <path d="M8 4.5V9.5H4V4.5H8ZM7.25 1.5H4.75L4.25 2H2.5V3H9.5V2H7.75L7.25 1.5ZM9 3.5H3V9.5C3 10.05 3.45 10.5 4 10.5H8C8.55 10.5 9 10.05 9 9.5V3.5Z" fill="white" className="fill-current text-white group-hover:text-[#ce0f6c]"></path>
                    </g>
                    <defs>
                      <clipPath id="clip0_323_331">
                        <rect width="12" height="12" fill="white"></rect>
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                }
              </div>
              )
            })
          }
          {/* <div className="deleteMyAccount cursor-pointer text-center text-primaryColor">
              <p data-v-a6df0828="">Delete Account?</p>
          </div> */}
        </div>
        {deleteConfirmation && 
          <Popup>
            <div className=" max-w-[20rem] p-4">
              <PopupHeader>
                <header className="mb-4">
                  <h3 className="text-xl font-medium text-primaryColor text-center opacity-85">{lang?.delete_profile_confirmation} <span className="font-bold">{selectedProfile?.profilename}</span></h3>
                </header>
              </PopupHeader>
              <PopupBody>
                <Confirmation lang={lang} callBackRes={callBackRes}></Confirmation>
              </PopupBody>
              </div>
          </Popup>
        }
        {
        loading && 
          <Popup>
          <PopupBody>
              <Spinner></Spinner>
          </PopupBody>
          </Popup>
        }
        {showSetOrVerifyProfilePin &&
          <div id="setProfilePin">
            <Modal
              isVisible={showSetOrVerifyProfilePin}
              onClose={() => setModal(false)}
              AllClass={"w-full lg:w-[96%] lg:mx-[2%] my-2"}
            >
                <SwitchPin lang={lang} profile={isSetNewPin ? subscriberProfileDetail : selectedProfile} isSetNewPin={isSetNewPin} callBackFromSwitchPin={callBackFromSwitchPin} callBackModalClose={callBackModalClose}></SwitchPin>
            </Modal>
          </div>
        }
      </>
    )
}