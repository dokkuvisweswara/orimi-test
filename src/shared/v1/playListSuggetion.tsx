"use client";
import Image from "next/image";
import { MouseEventHandler, useEffect, useState } from "react";
import v6 from "../../../public/plalist.jpeg";
import {
  suggetionDataAction,
  addContetnToPlaylist,
} from "@/services/actions/playlist.actions";
import Placeholder from "../../../public/placeHolder.svg";
import { getAccessTokenObj } from "@/services/helpers/init.helper";
// import { toast } from 'react-hot-toast';
import { notify } from '@/(layout)/v1/ToasterComponent';
import { useStoreContent, useStoreUpdatePlayListSongs } from '@/store/init';
import ArtistName from '@/containers/artistName';
import { getPoster } from '@/utils/content';
import AlbumName from '@/containers/albumName';
import {errors_message}  from "@/constants/errors_constants"
import PlayListSkeleton from "@/containers/skeleton/playListSkeleton";

export default function PlayListSuggetion(props: any) {
  const [suggestedData, setSuggestedData] = useState<any>(null);
  const updatePlayListSongs = useStoreUpdatePlayListSongs(
    (state: any) => state.updatePlayListSongs
  );
  const setUpdatePlayListSongs = useStoreUpdatePlayListSongs(
    (state: any) => state.setUpdatePlayListSongs
  );
  useEffect(() => {
    getSuggetionData();
  }, []);

  async function getSuggetionData() {
    let category = ["MUSIC"];
    let params = {
      category: JSON.stringify(category),
      objecttype: "CONTENT",
      page: 1,
      pagesize: 15,
    };
    let sugData = await suggetionDataAction(params, getAccessTokenObj());
    setSuggestedData(sugData);
  }

  async function addSongTOPlaylist(pId: any, oId: any, indexToRemove: number) {    
    let params = {
      idplaylist: pId,
      objectId: [oId],
    };
    let addResponce = await addContetnToPlaylist(params, getAccessTokenObj());
    if (addResponce.success) {     
      notify(errors_message.ADDED_TO_PLAYLIST, 'success');
      setUpdatePlayListSongs([
        ...updatePlayListSongs,
        ...[suggestedData[indexToRemove]],
      ]);
      setSuggestedData((prevValue: any) => {
        const updatedValue = [...prevValue]; // Create a copy of the original array
        updatedValue.splice(indexToRemove, 1); // Remove element at the specified index
        return updatedValue; // Update the state with the modified array
      });
    } else if (addResponce.reason) {
      // alert(addResponce.reason)
      // toast.error(<span>{addResponce.reason}!</span>, {
      //     duration: 3000, // Duration in milliseconds
      //     position: 'bottom-center', // Toast position
      //   });
      notify(addResponce.reason, "info");
    }
    //
  }
  return (
    <div className="px-4 py-5 bg-primaryBgColor mt-4">
      {!suggestedData ? (
        <PlayListSkeleton></PlayListSkeleton>
      ) : (
        <div className="suggetion-content">
          <h2 className="p-4 text-lg">{props.lang?.suggestion}</h2>
          <div className="">
            {suggestedData &&
              suggestedData.length > 0 &&
              suggestedData.map((item: any, i: number) => {
                return (
                  <div
                    className="w-full h-16 border-b border-detailsbordercolor group hover:bg-[#2A2A2A] hover:rounded-md flex items-center my-2"
                    key={i}
                  >
                    <div className="flex items-center justify-between w-full gap-6">
                      <div className="flex">
                        <div className="relative h-12 w-12">
                          <Image
                            className="ml-2 mb-2 "
                            src={getPoster(item, "PORTRAIT", "LOW", "SQUARE")}
                            alt={item.title}
                            width={48}
                            height={48}
                          />
                        </div>
                        <div className=" pt-2 ml-6 text-primaryItemColor text-sm flex flex-col w-40 overflow-hidden">
                          <p className="text-primaryItemColor text-sm overflow-hidden whitespace-nowrap overflow-ellipsis">
                            {item.title}
                          </p>
                          <p className="text-xs text-secondaryItemColor">
                            {item?.castncrew || item?.bandorartist ? (
                              <ArtistName data={item}></ArtistName>
                            ) : (
                              ""
                            )}
                          </p>
                        </div>
                      </div>  
                      <div className="pb-2 text-secondaryItemColor text-sm max-md:hidden mt-2 ml-28">
                        {item.albumname && <AlbumName data={item}></AlbumName>}
                      </div>
                      <div className="flex items-center mr-2">
                        <button
                          className="inline-block my-5 text-primaryColor no-underline rounded-2xl border border-solid border-detailsbordercolor text-sm px-3 py-1.5 gap-2 cursor-pointer hover:border-selectedBGPrimaryColor border-2"
                          onClick={() =>
                            addSongTOPlaylist(
                              props.playlistId,
                              item.objectid,
                              i
                            )
                          }
                        >
                          {props.lang?.add}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
}
