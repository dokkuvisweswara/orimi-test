"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import User from "../../../public/user-icon.svg"
import { getCookie } from "@/hooks/client.cookie";

export default function SwitchProfileCard({profileData,lang}:any) {
  const subscriberId = getCookie("subscriberId")
  return (
    <>
          <div className="py-4 w-full h-full">
            <figure className="flex justify-center items-center px-[35%] pt-[15%]">

              {
                profileData.picture ? 
                <Image src={profileData.picture} alt="User" className="w-full h-full rounded-full aspect-square" priority width={200} height={200}/> 
                : 
                <Image src={User} alt="User" className="w-full h-full" priority width={80} height={80}/>
              }
                
              {/* )} */}
            </figure>

            <div className="pt-4">
              <p className="pb-4 px-2 text-sm font-bold text-secondaryItemColor">{profileData?.profilename}</p>
              { profileData.profileid === subscriberId && 
                <p className="uppercase p-1 text-primaryColor inline-flex items-center justify-center rounded-md profile-badge font-semibold text-sm bg-selectedBGPrimaryColor">{lang?.admin}</p> 
              }
              { profileData.kidsmode === 'YES' && 
                <p className="uppercase p-1 text-secondaryItemColor inline-flex items-center justify-center rounded-sm profile-badge font-semibold text-sm">{lang?.kids}</p>
              }
            </div>
          </div>
    </>
  );
}
