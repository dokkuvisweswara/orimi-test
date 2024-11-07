"use client";

import { Popup, PopupBody, PopupHeader } from "@/popup/commonPopup";
import Image from "next/image";
import { useEffect, useState } from "react";
import v9 from "../../../public/user-icon.svg";
import closeIcon from "../../../public/closeicon.svg";
import Link from "next/link";
import { redirectUrl } from "@/utils/content";

export default function ViewArtist({ contentData, lang }: any) {
  const [enableViewArtist, setEnableViewArtist] = useState<any>(false);

  const [getArtists, setArtists] = useState<any>([]);

  useEffect(() => {
    if (contentData.castncrew ) {
      setArtists([...contentData.castncrew.cast,  ...contentData.castncrew.crew])
    }

  }, [contentData])
  return (
    <>
      <button
        onClick={() => setEnableViewArtist(true)}
        className="w-full h-full text-left"
      >
        {lang?.view_artist}
      </button>
      {enableViewArtist && (
        <Popup>
          <div className="w-[25rem] h-[12rem] pb-1 pt-2 pr-1">
            <PopupHeader>
              <div className="relative">
                <button
                  className="absolute top-1 right-1 bg-primaryBgColor rounded-full hover:bg-slate-500"
                  onClick={() => {
                    setEnableViewArtist(!enableViewArtist);
                  }}
                >
                  <Image src={closeIcon} alt="closeicon" />
                </button>
              </div>
            </PopupHeader>
            <PopupBody>
              <div>
                <ul role="list">
                  <li className="border-b-2 border-[#232323] py-2 px-3">
                    <p className="text-left font-bold text-selectedBGPrimaryColor">
                      {lang?.artist}
                    </p>
                  </li>
                  {getArtists.length > 0 ? (
                    [getArtists[0]].map((item: any, i: number) => {
                      return (
                        <li className="p-2" key={i}>
                          <Link
                            key={i}
                            href={redirectUrl(item)}
                            className="flex items-center cursor-pointer p-1 justify-arround"
                          >

                            <div className="flex ">
                              <Image
                                className="brightness-125 rounded-full"
                                width={90}
                                height={90}
                                src={item.profilepic ? item.profilepic : v9}
                                alt={item.name}
                              />
                            </div>

                            <div className="flex flex-col">
                              <div className="flex ">
                                <div className="text-md text-secondaryItemColor truncat ml-4">
                                  {lang?.artist} :
                                </div>
                                <div className="text-md text-primaryColor truncate opacity-80 ml-4 capitalize" title={item.name}>
                                  {item.name}
                                </div>
                              </div>
                              <div className="flex text-md ml-4 ">
                               <span className="text-secondaryItemColor pl-[0.5rem] pr-[0.45rem]" >{lang?.Role} :</span>  
                               { item.role && <div className="text-md text-white truncate opacity-80 ml-[0.5rem] capitalize" title={item.role}>
                                  { lang[(item.role[0]).toUpperCase()]}
                                </div>
                              }
                              </div>
                            </div>
                          </Link>
                        </li>
                      );
                    })
                  ) : (
                    <p className="text-center py-3">{lang?.no_artist_found}</p>
                  )}
                </ul>
              </div>
            </PopupBody>
          </div>
        </Popup>
      )}
    </>
  );
}
