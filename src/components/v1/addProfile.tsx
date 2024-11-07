'use client'
import { useEffect, useRef, useState } from "react";
import AgeRange from "@/containers/agerange";
import { addNewprofile, profileListData } from "@/services/actions/user.actions";
import { getCookie } from "@/hooks/client.cookie";
import { getAccessTokenObj } from "@/services/helpers/init.helper";
import OtpInputBox from "@/shared/v1/otpInputBox";
import { notify } from "@/(layout)/v1/ToasterComponent";
import Spinner from "@/loaders/spinner/spinner";
import { Popup, PopupBody } from "@/popup/commonPopup";
import { useRouter } from "next/navigation";
import FormValidator from "@/utils/validation-utils";
import { errors_message } from "@/constants/errors_constants";
import ImageUpload from "@/containers/imageUpload";



export default function AddProfile({lang}:any) {
  const validator = new FormValidator();
  const [name, setName] = useState<any>('');
  const [dob, setDob] = useState<any>();
  const localDisplayLang = getCookie('currentCountry') ? getCookie('currentCountry') : 'EN';
  const [selectedAge, setSelectedAge] = useState<any>(18);
  const [isPinBox, setIsPinBox] = useState(true);
  const [pin, setPin] = useState<any>();
  const [loading, setLoading] = useState<any>(false);
  const router = useRouter();
  const subscriberId= getCookie("subscriberId");
  const inputRef = useRef<HTMLInputElement>(null);
  const [profilePic, setProfilePic] = useState<any>(null);

  useEffect(() => {
    inputRef.current?.focus(); // Focus on the first input field on mount
  }, []);

  const handleChangeName = async (Event: any) => {
    setName(Event.target.value);
  }

  const handleSubmit = async (Event: any) => {
    Event.preventDefault();
    setLoading(true);
    if(validator.validateUpdateProfile(name)){
      let payload:any = {
        kidsMode: selectedAge < 13 ? "YES" : "NO",
        profilename: name,
        dob: dob,
        displaylanguage: localDisplayLang === 'EN' ? 'eng' : 'mon'
      };
      if(pin !== '' && isPinBox && pin !== undefined){
        payload.profilepin = pin
      }
      if(profilePic){
        payload.picture = profilePic;
      }
      let res = await addNewprofile(payload, getAccessTokenObj());
      if (res.result.success) {
        notify(errors_message?.PROFILE_CRETE_SUCCESSFULLY, "success");
        setLoading(false);
        profileListData(getAccessTokenObj()).then((subscriberProfileDetail: any) => {
          if(subscriberProfileDetail.isSuccessful) {
             let sorteddata: any = subscriberProfileDetail?.result?.data;
             let adminIndex: any;
             sorteddata.map((item: any, i: number) => {
               if(item.profileid === subscriberId){
                 adminIndex = i;
               }
             });
             let adminArr = sorteddata.splice(adminIndex, 1);
             sorteddata = [...adminArr, ...sorteddata]
             localStorage.setItem('profileList', JSON.stringify(sorteddata));
             router.push('/switchprofile');
          }
        })
      } else {
        setLoading(false);
        notify(res.result.reason, "error");
      }
    } else {
      setLoading(false);
    }
  }

  const callBackAge = async (data: any) => {
    setDob(data?.dob);
    setSelectedAge(data?.selected)
  }

  // Pin Box
  const pinCallback = (val: any) => {
    if(val !== "NaN" && val !== '') {
      setPin(val);
    }
  };

  // Image callBack
  const updatedImageCallBack = (val: any) => {
    if(val){
      setProfilePic(val);
    }
  }

  return (
    <>
      <div className="flex min-h-screen flex-col items-center bg-[#0A0B0B] p-6">       
        <div className="">
          <p className="text-slate-100 font-semibold text-xl">{lang?.ADD_PROFILE}</p>
        </div>
        <div className="lg:w-[30%] md:[50%] sm:[70%] w-full">
          <form onSubmit={handleSubmit}>          
            <div className="flex gap-8 flex-wrap justify-center py-2">
              <ImageUpload updatedImageCallBack={updatedImageCallBack}></ImageUpload>
            </div>
            <div className="relative my-2">
              <input
                ref={inputRef}
                id="name"
                type="text"
                name="name"
                placeholder="Name"
                value={name}
                className={`peer relative h-12 rounded-sm border border-gray-600 px-8 text-sm
                text-slate-200 placeholder-transparent outline-none transition-all autofill:bg-transparent
                invalid:border-pink-500 invalid:text-pink-500 focus:border-pink-600 focus:outline-none
                invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed focus:cursor-text
                disabled:bg-slate-50 disabled:text-slate-400 bg-transparent w-full`}        
                onChange={handleChangeName}
              />
              <label
                htmlFor="name"
                className="absolute left-2 -top-2 z-[1] cursor-text px-2 text-xs text-slate-400 
                transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block 
                before:h-full before:w-full before:bg-[#0A0B0B] before:transition-all 
                peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-autofill:-top-2
                peer-required:after:text-pink-500 peer-required:after:content-['\00a0*']
                peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:cursor-default 
              peer-focus:text-xs peer-focus:text-pink-500 peer-invalid:peer-focus:text-pink-500
              peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
              >
                 {lang?.name}
              </label>
            </div>
            <div className="py-1">
              <label
                htmlFor="age"
                className="text-secondaryItemColor px-1"
              >
                {lang?.age}
              </label>
              <AgeRange callBackAge={callBackAge}></AgeRange>
            </div>
            { selectedAge >=18 && <>

            <div className="py-2 float-end mt-2">
                <div className="relative flex flex-wrap items-center">
                  <input
                    className="peer relative h-4 w-8 cursor-pointer appearance-none rounded-lg bg-slate-300 transition-colors after:absolute after:top-0 after:left-0 after:h-4 after:w-4 after:rounded-full after:bg-slate-500 after:transition-all checked:bg-selectedBGPrimaryColor checked:after:left-4 checked:after:bg-white hover:bg-slate-400 after:hover:bg-slate-600 checked:hover:bg-selectedBGPrimaryColor checked:after:hover:bg-white focus:outline-none checked:focus:bg-selectedBGPrimaryColor checked:after:focus:bg-white focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-200 disabled:after:bg-slate-300 focus"
                    type="checkbox"
                    value=""
                    checked={isPinBox}
                    id="id-c01"
                    onChange={() => {setIsPinBox(!isPinBox)}}
                  />                
                </div>
              </div>              
              <label className="block text-sm text-secondaryItemColor py-2 mt-2">
                {/* {lang?.set_pin} */} {lang?.PIN}
              </label> 
              { isPinBox ?  
                <div className="text-primaryColor">             
                  <OtpInputBox length={4} otpcallback={pinCallback} autoFocus={false}/>
                </div> : ""
              }
              </>
            }

            <div className="mt-5">
              <button
              type="submit"    
              className="hover:shadow-form w-full rounded-md bg-selectedBGPrimaryColor py-3 px-8 text-center text-base font-semibold text-white outline-none">
                {lang?.create}
              </button>
            </div>
          </form>
        </div>
        
      </div>
      {
        loading && 
        <Popup>
        <PopupBody>
            <Spinner></Spinner>
        </PopupBody>
        </Popup>
      }
    </>
  );
}
