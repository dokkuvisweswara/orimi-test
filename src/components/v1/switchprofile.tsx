"use client";
import { useEffect, useState } from "react";
import { getAccessTokenObj } from "@/services/helpers/init.helper";
import { addNewprofile, profileListData, switchProfile } from "@/services/actions/user.actions";
import SwitchProfileCard from "./switchProfileCard";
import AddUser from "../../../public/plus-icon.svg";
import Image from "next/image";
import PlanSkeletonCard from "./planListSkeleton";
import { useRouter } from "next/navigation";
import Modal from "@/components/v1/modelbox";
import SwitchPin from "./switchProfilePin";
import { userJourney } from "@/utils/userjourney";
import { useCurrentProfileDetails } from "@/store/init";
import Spinner from "@/loaders/spinner/spinner";
import { Popup, PopupBody } from "@/popup/commonPopup";
import { getCookie } from "@/hooks/client.cookie";
import { notify } from "@/(layout)/v1/ToasterComponent";
import { errors_message } from "@/constants/errors_constants";


export default function SwitchProfile({lang}:any) {
  const router = useRouter();
  const [subscriberProfileDetail, setSubscriberProfileDetail] = useState<any>(null);

  const [profileInfo, setProfileInfo] = useState<any>(null);
  const [showSetOrVerifyProfilePin, setShowSetOrVerifyProfilePin] = useState<any>(false);
  const [isSetNewPin, setIsSetNewPin] = useState<any>(false);
  const [selectedProfile, setSelectedProfile] = useState<any>(null);
  const setUpdateProfileData = useCurrentProfileDetails((state: any) => state?.setUpdateProfileData);
  const [userLoad, setUserLoad] = useState<any>(false); 
  const [whereIamFrom, setWhereIamFrom] = useState<any>(null);
  const noOfUserProfilesLimit:any  = 4;
  const subscriberId= getCookie("subscriberId");
  
  useEffect(() => {
    let profileDetail: any = localStorage?.getItem('profileList');
    let IamFrom: any = localStorage?.getItem('whereIamFrom');
    setWhereIamFrom(IamFrom)
    profileDetail = JSON.parse(profileDetail);
    let LocalSubscriberProfileDetails: any = localStorage?.getItem('subscriberProfileDetails');    
    LocalSubscriberProfileDetails = JSON.parse(LocalSubscriberProfileDetails);
    setSubscriberProfileDetail(profileDetail[0]);
    if(profileDetail && LocalSubscriberProfileDetails) {
      setSubscriberProfileDetail(LocalSubscriberProfileDetails);
      setProfileInfo(profileDetail);
    } else {
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
          setProfileInfo(sorteddata);
          setSubscriberProfileDetail(sorteddata.data[0]);
          localStorage.setItem('profileList', JSON.stringify(sorteddata));
          localStorage.setItem('subscriberProfileDetails', JSON.stringify(sorteddata[0])); 
        } 
      })
      .catch((error) => {
        console.error("Error fetching subscriber information:", error);
      });
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const redirectToAddProfile = async () => {
    if(subscriberProfileDetail?.profilepin === "ENABLED"){
      router.push('/addprofile');
    } else {
      // router.push('/addprofile');
      // notify("Your profile pin is disabled!", "warn");
      notify(errors_message.YOUR_PROFILE_PIN_IS_DISABLED, 'warn')
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

  const selectProfile = async (profile: any) => {
    setUserLoad(true);
    if(profile?.profilepin === "ENABLED") {
      setUserLoad(false);
      setShowSetOrVerifyProfilePin(true);
      setEmailModal(true)
      setIsSetNewPin(false);
      setSelectedProfile(profile);
    } else {
      const profilePayload = {
        profileid: profile.profileid,
      };

      switchProfile(profilePayload, getAccessTokenObj())
          .then((response: any) => {
            if (response?.isSuccessful) {
                  userJourney(response, 'switchprofile').then((res: any) => {
                  localStorage.setItem("subscriberProfileDetails", JSON.stringify(profile));
                  setUpdateProfileData(profile);
                  router.push('/');
              })
            } else {
              setUserLoad(false);
            }
          })
          .catch((err: any) => {    
            setUserLoad(false);        
          });
    }
  }

  const [emailModal, setEmailModal] = useState(false);
  const callBackModalCloseEmail = (data: any) => {
    setEmailModal(data);
    setShowSetOrVerifyProfilePin(data);
  };

  useEffect(() => { 
    document.body.style.cssText = "overflow: hidden; position:fixed;";
    return () => {
      document.body.style.cssText = "overflow: auto; position:auto;";
    }    
  },[]); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <>
        <div className="flex flex-col justify-center items-center w-[100vw] lg:pb-0 md:pb-20 sm:pb-20 pb-20">
          <div className="">
            <p className="text-primaryColor font-semibold text-2xl py-5">
              {lang?.whos_watching}
            </p>
          </div>
          { profileInfo && profileInfo.length > 0 
            ? 
              <div className="flex gap-4 flex-wrap justify-center px-2">
                {/* {renderCard()} */}
                {profileInfo && profileInfo.map((profile:any, i:any) =>{ 
                    return(
                      <div key={i} className="h-[220px] text-center bg-[#232323] hover:bg-[#383838] rounded-md text-secondaryItemColor cursor-pointer  md:max-w-[25%] sm:max-w-[30%] max-w-[40%]" onClick={() => selectProfile(profile)}>
                        <SwitchProfileCard profileData={profile} lang={lang}/>
                      </div>
                    )
                  })
                }
                { (subscriberId === subscriberProfileDetail?.profileid && profileInfo.length < noOfUserProfilesLimit && !(whereIamFrom == 'login')) &&
                <div className="h-[220px] text-center bg-[#232323] hover:bg-[#383838] rounded-md text-secondaryItemColor cursor-pointer  md:max-w-[25%] sm:max-w-[30%] max-w-[40%]" id="new-user" onClick={() => {redirectToAddProfile()}}>
                  <figure className="flex justify-center items-center px-[40%] pt-[25%]">
                    <Image src={AddUser} alt="Add User" className="" priority />
                  </figure>              
                  <div className="pt-4">
                    <p className="pb-4 px-2 text-sm font-bold text-secondaryItemColor uppercase">{lang?.add_profile}</p>
                  </div>              
                </div>
                }
              </div>
            : 
              <>
                <PlanSkeletonCard/>
              </>
          }
        </div>
        {showSetOrVerifyProfilePin &&
          <div id="setProfilePin">
            <Modal
              isVisible={showSetOrVerifyProfilePin}
              onClose={() => setEmailModal(false)}
              AllClass={"w-full lg:w-[96%] lg:mx-[2%] my-2"}
            >
                <SwitchPin lang={lang} profile={isSetNewPin ? subscriberProfileDetail : selectedProfile} isSetNewPin={isSetNewPin} callBackFromSwitchPin={callBackFromSwitchPin} callBackModalClose={callBackModalCloseEmail}></SwitchPin>
            </Modal>
          </div>
        }
        {userLoad && 
            <Popup>
                <PopupBody>
                    <Spinner></Spinner>
                </PopupBody>
            </Popup>
            }
    </>
  );
}
