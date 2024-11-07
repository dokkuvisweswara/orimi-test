'use client'

import { Popup, PopupBody } from "@/popup/commonPopup";
import { useStore, useStoreUser } from "@/store/init";
import { useRouter } from "next/navigation";
import { useState } from "react";
import CreatePlayList from "./createPlaylist";
import { addContetnToPlaylist } from "@/services/actions/playlist.actions";
import { getAccessTokenObj } from "@/services/helpers/init.helper";
import { notify } from "@/(layout)/v1/ToasterComponent";
import {errors_message}  from "@/constants/errors_constants"

interface PlaylistItem {
    idplaylist: string;
    title: string;
    icon: string;
    playlistaccess:string;
    totalContent: number
}
export default function AddToPlayList({id, whereIamFrom, contentData, lang, handleSetOpen}: any) {
    const router = useRouter();
    const [enablePopup, setEnablePopup] = useState<any>(false);
    const [listOfPlaylistData, setListOfPlaylistData] = useState<PlaylistItem[]>([]);
    const getIsUserPresent = useStoreUser((state: any) => state.isUserPresent);
    const getAllPlaylistData = useStore((state : any) => state.allPlaylistData);
    const addToPlayList = () => {
        getIsUserPresent ? setEnablePopup(!enablePopup) : router.push('/login');
        setListOfPlaylistData([...getAllPlaylistData])
    }
    const selectPlaylist = async (playlist: any) => {
        handleSetOpen && handleSetOpen(false)
        let params = {
            idplaylist: playlist.idplaylist,
            objectId: [contentData.objectid]
        }
        let addResponce = await addContetnToPlaylist(params, getAccessTokenObj());
        if(addResponce.success){
            setEnablePopup(!enablePopup)
            notify(errors_message.ADDED_TO_PLAYLIST, 'success');          
        } else if(addResponce.reason){
            setEnablePopup(!enablePopup)
            notify(addResponce.reason, 'info');
        }
    }
    return(
        <div className="relative w-full h-full">
        <button className='w-full h-full text-left' onClick={addToPlayList}>{lang?.add_to_playlist}</button>
        {
            enablePopup &&
                    <div className="min-w-52 absolute right-[16.7rem] top-0 bg-[#0A0B0B]">
                    <ul  className="space-y-2 mt-2">
                        <li id="newPlayList" className="flex items-center justify-center px-4"
                            key={'createPlaylist'}>
                            <CreatePlayList contentId={contentData.objectid} lang={lang}/>
                        </li>
                        {
                            listOfPlaylistData.map((item:PlaylistItem, i:number) => {
                                return (
                                <li key={i} className="px-4 py-2 hover:bg-selectedBGSecondaryColor dark:hover:bg-selectedBGSecondaryColor group">
                                    <button className="w-full h-full flex items-center p-2  rounded-lg dark:text-primaryColor " onClick={() => {selectPlaylist(item)}}>
                                        {item.title}
                                    </button>
                                </li>
                                )
                            })
                        }
                    </ul>
                    </div>
        }
        </div>
    )
}