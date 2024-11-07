'use client'

import { notify } from "@/(layout)/v1/ToasterComponent";
import { getCookie } from "@/hooks/client.cookie";
import { removeFromContinueWatch } from "@/libs/firebaseUtility";
import { useStoreRecallPlaylist } from "@/store/init";
import {errors_message}  from "@/constants/errors_constants"

export default function RemoveFromRecentlyPlay({contentData, contentId, lang,handleSetOpen}: any){
    const setRecallPlaylist = useStoreRecallPlaylist((state: any) => state.setRecallPlaylist)
    const getRecallPlaylist = useStoreRecallPlaylist((state: any) => state.recallPlaylist)
    const RemovedSong = async (e: any) => {
        handleSetOpen && handleSetOpen(false)
        e.stopPropagation();
        e.preventDefault();
        const subscriberId= getCookie("subscriberId");
        const profileId= getCookie("ProfileId");
        let removeRes = await removeFromContinueWatch(contentData, subscriberId, profileId);
        if(removeRes.success){
            setRecallPlaylist(getRecallPlaylist + 1);
            notify(errors_message.REMOVE_DATA, 'success');
        }
        if(removeRes.failed){
            notify(errors_message.FAILED_TO_REMOVE, 'error');
        }
        if(removeRes.error){
            notify(removeRes.error, 'error');
        }
    }
    return(
        <>
        <button className='w-full h-full text-left' onClick={(e) => {RemovedSong(e)}}>{lang?.remove_From_Recentlyplayed}</button>
        </>
    )
}