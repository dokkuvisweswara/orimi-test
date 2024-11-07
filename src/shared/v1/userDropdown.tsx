"use client"

import React, { useState, useEffect, useRef } from "react"
import Link from "next/link";
import Image from 'next/image';
import usericon from '../../../public/user.svg';
import { getAccessTokenObj } from "@/services/helpers/init.helper";
import { actLogOut } from "@/services/actions/user.actions";
import { getCookie, removeCookie } from "@/hooks/client.cookie";
import { logoutUtil } from "@/utils/logout";
import { useCurrentProfileDetails, useStoreUser, useSubscriberDetails } from "@/store/init";
import Spinner from "@/loaders/spinner/spinner";
import { Popup, PopupBody } from "@/popup/commonPopup";
import { useRouter } from 'next/navigation';
import { MULTI_PROFILE_ENABLE } from "@/constants/appConfig";
import { logOutEvent } from "@/utils/firebaseAnalytics";

export default function UserDropdownIcon({lang}: any) {
    
    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef: any = useRef(null);
    const getUserDetails= useStoreUser((state : any) => state.userDetails)
    const [userLoad, setUserLoad] = useState<any>(false);
    const router = useRouter();
    const [profileDetails, setProfileDetails] = useState<any>(null);
    const [subscriberData, setSubscriberData] = useState<any>(null);

    useEffect(() => {   
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef?.current && !wrapperRef?.current?.contains(event.target)) {
                setIsOpen(false)
            }
            const target = event.target as Element;

            if(target?.classList?.contains('modal-content')){
                setIsOpen(false)
            }
                         
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [wrapperRef])

    useEffect(() => {
        let subscriber: any = (typeof localStorage !== 'undefined') && localStorage.getItem('subscriberDetail');
        let subscriberProfileDetails: any = localStorage.getItem('subscriberProfileDetails');
        subscriberProfileDetails = subscriberProfileDetails && JSON.parse(subscriberProfileDetails);
        setProfileDetails(subscriberProfileDetails);
        subscriber = subscriber && JSON.parse(subscriber);    
        setSubscriberData(subscriber);
    },[]);

    useEffect(() => {        
        let unsubscribe = useCurrentProfileDetails.subscribe((state: any) => {
            setProfileDetails(state?.updateProfileData);
        });
        return () => unsubscribe();
    },[]);

    useEffect(() => {        
        let unsubscribe = useSubscriberDetails.subscribe((state: any) => {
            setSubscriberData(state?.subscriberData);
        });
        return () => unsubscribe();
    },[])


    const logOut = async () => {
        setUserLoad(true);
        setIsOpen(false)
        let logOutRes = await actLogOut(getAccessTokenObj());
        let data:any={
            status: "SUCCESS",
        }
        logOutEvent(data);
        logoutUtil();            
    }

    const SwitchProfileFun = async () => {
        localStorage?.setItem("whereIamFrom", 'switchprofilebtn');
        setIsOpen(false)
    }
    return (
        <>
                <div className="relative inline-flex"
                    ref={wrapperRef}>
                    <button
                        className="inline-flex items-center justify-center gap-2 text-sm font-medium tracking-wide text-primaryColor transition duration-300 rounded whitespace-nowrap z-[9999]"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-expanded={isOpen ? "true" : "false"}
                    >
                        <div className="p-1 h-6 w-6 rounded-full" id='headerPrifilePicture'>
                            {ProfilePic(profileDetails)}
                        </div>
                        <span className="text-sm text-primaryColor max-lg:hidden" id='userName'>{profileDetails?.profilename}</span>
                        <div className="max-lg:hidden mx-1">
                            <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg" >
                                <path d="M5.57539 4.1748L1.67539 0.274805C1.49206 0.0914712 1.25872 -0.000195503 0.97539 -0.000195503C0.692058 -0.000195503 0.458724 0.0914712 0.275391 0.274805C0.0920572 0.458138 0.000390053 0.691471 0.000390053 0.974804C0.000390053 1.25814 0.0920572 1.49147 0.275391 1.6748L4.87539 6.2748C4.97539 6.3748 5.08372 6.44564 5.20039 6.4873C5.31706 6.52897 5.44206 6.5498 5.57539 6.5498C5.70872 6.5498 5.83372 6.52897 5.95039 6.4873C6.06706 6.44564 6.17539 6.3748 6.27539 6.2748L10.8754 1.6748C11.0587 1.49147 11.1504 1.25814 11.1504 0.974804C11.1504 0.691471 11.0587 0.458138 10.8754 0.274805C10.6921 0.0914712 10.4587 -0.000195503 10.1754 -0.000195503C9.89206 -0.000195503 9.65872 0.0914712 9.47539 0.274805L5.57539 4.1748Z" fill="white" fillOpacity="0.6" />
                            </svg>
                        </div>
                    </button>

                    <div id="profile-detail" className={`${isOpen ? "flex" : "hidden"} FadeupPopupAnimation absolute top-[2.9rem] z-10 mt-1 w-72 list-none flex-col rounded bg-secondaryBgColor rounded-lg shadow-md shadow-BadgeringColor right-1`}>
                        <div className="fixed inset-0 bg-[rgba(0,0,0,0.7)] z-[999] overflow-y-scroll modal-content flex justify-end">
                            <div className="text-primaryColor flex flex-col bg-secondaryBgColor mt-16 mr-4 max-content">
                                <div className="flex flex-row py-4 px-4">
                                    <div id="profile-icon-show" className="py-2 px-3 w-20 h-20">
                                        {ProfilePic(profileDetails)}
                                    </div>
                                    <div className="py-2">
                                        <p className="text-lg">{profileDetails?.profilename}</p>
                                        <p className="text-secondaryItemColor text-sm font-semibold ellipsis"> {subscriberData?.email ? subscriberData?.email?.substring(0, 25) + " ..." : subscriberData?.mobileno} </p>
                                        <div className="py-1" onClick={() => setIsOpen(false)}>
                                            <Link href='/profile' className="text-selectedBGPrimaryColor text-sm p-1 slow-underline hover:text-primaryColor"> {lang?.my_profile} </Link>
                                        </div>
                                    </div>
                                </div>
                                <hr className="h-px bg-primaryItemColor border-0 dark:bg-detailsbordercolor" />
                                <div className="flex flex-col py-1">
                                 
                                    {MULTI_PROFILE_ENABLE && <div onClick={() => SwitchProfileFun()} className="py-2 px-3 cursor-pointer text-secondaryItemColor hover:bg-selectedBGSecondaryColor w-full h-full">
                                        <Link href='/switchprofile'><p className="w-full h-full text-left">{lang?.Switch_Profile}</p></Link>
                                    </div>}
                                    <button className="text-left py-3 px-5 cursor-pointer text-selectedBGPrimaryColor hover:bg-selectedBGSecondaryColor"
                                        onClick={() => logOut()}>
                                        <p className="text-sm font-semibold">{lang?.log_out}</p>
                                    </button>
                                </div>
                            </div>
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
        </>
    )
}

export const ProfilePic = (profileDetails: any) => {
    return(
        <div>
            {profileDetails?.picture ? (
                <Image
                src={profileDetails?.picture}
                alt="User"
                className="w-full h-full aspect-square rounded-full"
                priority
                objectFit="cover" 
                width={160}
                height={160}
                />
            ) : (
                <Image src={usericon} alt="User" className="w-full h-full aspect-square rounded-full" priority objectFit="cover"  width={60} height={60}/>
            )} 
        </div>
    )
}
 