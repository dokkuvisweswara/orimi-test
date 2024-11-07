"use client";
import Image from "next/image";
import closeIcon from "../../../public/closeicon.svg";
import {
  Popup,
  PopupHeader,
  PopupBody,
  PopupFooter,
} from "@/popup/commonPopup";
import ProfileTabSelection from "@/shared/v1/profileTabSelection";
import Toggle from "@/shared/v1/toggle";
import { profileListData, subscriberUser } from "@/services/actions/user.actions";
import { useEffect, useState } from "react";
import { getAccessTokenObj } from "@/services/helpers/init.helper";
import { EditProfile } from "@/components/v1/editprofile";
import Modal from "./modelbox";
import EditProfileform from "@/shared/v1/editProfileForm";
import ManageProfile from "@/containers/profile/manageProfile";
import { useStoreUser, useCurrentProfileDetails } from "@/store/init";
import User from "../../../public/user-icon.svg";

export default function ProfilePagee({lang}: any) {
  const [subscriberInfo, setSubscriberInfo] = useState<any>();
  const [enablePopup, setEnablePopup] = useState(false);
  const setUserDetails = useStoreUser((state: any) => state?.setUserDetails);
  const [subscriberProfileDetail, setSubscriberProfileDetail] = useState<any>(null);
  const [profileInfo, setProfileInfo] = useState<any>(null);

  useEffect(() => {
    // subscriberUser(getAccessTokenObj())
    //   .then((result) => {
    //     setSubscriberInfo(result);
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching subscriber information:", error);
    //   });
    callSubscriberUserAPI();
    callProfileListData();
  }, []);

  useEffect(() => {
    let unsubscribe = useCurrentProfileDetails.subscribe((state: any) => {
    setSubscriberProfileDetail(state?.updateProfileData);
    return () => unsubscribe();
    })
  },[])
  const callSubscriberUserAPI = async() =>{
    try {
      let result = await subscriberUser(getAccessTokenObj())
      setSubscriberInfo(result);
    } catch (error) {
      console.error("Error fetching subscriber information:", error);
    }
  }

  const [showModal, setShowModal] = useState(false);
  const callBackModalClose = (data:any, updateProfile:any=null) => {     
    if(updateProfile){
      subscriberUser(getAccessTokenObj())
      .then((result) => {
        setSubscriberInfo(result);
        setUserDetails(result)
        localStorage.setItem('subscriberDetail', JSON.stringify(result)); 
      })
      .catch((error) => {
        console.error("Error fetching subscriber information:", error);
      });
    }
    setShowModal(data);
  } 

  const callProfileListData = async () => {
    let profileDetail: any = localStorage?.getItem('profileList');
    let currentProfile: any = localStorage?.getItem('subscriberProfileDetails');
    if(profileDetail && currentProfile) {
      profileDetail = JSON.parse(profileDetail);
      currentProfile = JSON.parse(currentProfile);
      setSubscriberProfileDetail(currentProfile);
      setProfileInfo(profileDetail);
    } else {
    profileListData(getAccessTokenObj())
      .then((response) => {
        if(response.result.data) { 
          localStorage.setItem('profileList', JSON.stringify(response?.result?.data));
          localStorage.setItem('subscriberProfileDetail', JSON.stringify(response?.result?.data[0]));     
          setProfileInfo(response?.result?.data);
          setSubscriberProfileDetail(response?.result?.data[0]);
        } 
      })
      .catch((error) => {
        console.error("Error fetching subscriber information:", error);
      });
    }
  }
  return (
    <>
      <section>
        <div className="grid grid-cols-12 gap-x-3 max-md:grid-row-12">
          <div className="col-span-3 max-md:col-span-12" id="profileSection">
            <div className="subscriber-details text-primaryColor bg-profilePageBgColor p-4 rounded-lg mb-2 flex flex-col gap-2">
            <div className="main-profile-pic bg-primaryItemColor w-[4rem] h-[4rem] rounded-full">
                <figure className="flex justify-center item-center">
                  {subscriberProfileDetail?.picture ? (
                    <Image
                      src={subscriberProfileDetail?.picture}
                      alt="User"
                      className="w-full h-full aspect-square rounded-full"
                      priority
                      objectFit="cover" 
                      width={160}
                      height={160}
                    />
                  ) : (
                    <Image src={User} alt="User" className="" priority objectFit="cover"  width={160} height={160}/>
                   )} 
                </figure>
              </div>
              <div className="subscriber-name flex gap-1 items-center">
                <p className="profile-name font-semibold text-sm truncate">
                  {subscriberProfileDetail?.profilename}
                </p>
                {(subscriberProfileDetail?.profileid === subscriberInfo?.subscriberid) &&
                <p className="p-1 inline-flex items-center justify-center rounded-sm profile-badge font-semibold text-[0.6rem] bg-selectedBGPrimaryColor h-3">{lang?.Admin}</p>}
                {(subscriberProfileDetail?.kidsmode === 'YES') &&
                <p className="p-1 inline-flex items-center justify-center rounded-sm profile-badge font-semibold text-[0.6rem] bg-selectedBGPrimaryColor h-3">{lang?.Kids}</p>}
              </div>
              <p className="subscriber-email truncate text-sm mt-[-0.7rem]">
                  {subscriberInfo?.email}
                </p>
              <div className="subscriber-mail-phonenum">
                
                <div className="phone-num">{subscriberInfo?.mobileno}</div>
              </div>
              <div className="edit-subscriber-details">
                {!(subscriberProfileDetail?.kidsmode === 'YES') &&
                  <span
                  // onClick={editProfile}
                  onClick={() => setShowModal(true)}
                  className="text-sm font-bold cursor-pointer slow-underline hover:text-secondaryItemColor">
                    {lang?.edit_profile}
                  </span>
                }
              </div>
            </div>
            {(subscriberProfileDetail?.profileid === subscriberInfo?.subscriberid) &&
              <div className="menage-profile bg-profilePageBgColor p-4 rounded-lg mb-2">
                <ManageProfile subscriberInfo={subscriberInfo} lang={lang} profileInfo={profileInfo}></ManageProfile>
              </div>
            }
            {/* <div className="change-theme bg-profilePageBgColor p-4 rounded-lg mb-2">
                            <div className="theme-change">
                                <Toggle></Toggle>
                            </div>
                        </div> */}
          </div>
          <div className="col-span-9 max-md:col-span-12" id="tabsSection">            
              <ProfileTabSelection  lang={lang} subscriberInfo={subscriberInfo}></ProfileTabSelection>
          </div>
          {/* profile */}

          {enablePopup && (
            <div id="createPlayListPopup">
              <Popup>
                <div className="max-w-[30rem] p-4">
                  <PopupHeader>
                    <div className="relative">
                      <button
                        className="absolute top-0 right-0 p-1 bg-primaryBgColor rounded-full hover:bg-slate-500"
                        onClick={() => {
                          setEnablePopup(!enablePopup);
                        }}
                      >
                        <Image src={closeIcon} alt="closeicon" />
                      </button>
                    </div>
                  </PopupHeader>
                  <PopupBody>
                    {" "}
                    <EditProfile subscriberInfo={subscriberInfo} subscriberProfileDetail={subscriberProfileDetail}/>{" "}
                  </PopupBody>
                </div>
              </Popup>
            </div>
          )}

          {/* profile */}
          <Modal isVisible={showModal} onClose={() => setShowModal(false)} 
              AllClass={"w-full lg:w-[96%] lg:mx-[2%] my-2"}>
              <EditProfileform lang={lang} callBackModalClose = {callBackModalClose} subscriberInfo={subscriberInfo} subscriberProfileDetail={subscriberProfileDetail}/>
          </Modal>
        </div>
      </section>
    </>
  );
}
