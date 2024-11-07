'use client'

import { notify } from '@/(layout)/v1/ToasterComponent';
import {getPlaylistSongsAction, actRemoveFromThisPlaylist} from '@/services/actions/playlist.actions';
import { getAccessTokenObj } from '@/services/helpers/init.helper';
import { useStoreContent, useStoreUpdatePlayListSongs } from '@/store/init';
import {errors_message}  from "@/constants/errors_constants"

export default function RemoveFromThisPlaylist({objectId, playlistId, lang,handleSetOpen}: any) {
    const setUpdatePlayListSongs = useStoreUpdatePlayListSongs((state : any) => state.setUpdatePlayListSongs);
    const updatePlayListSongs = useStoreUpdatePlayListSongs((state : any) => state.updatePlayListSongs);
    
    const removeFromThisPlaylist = async() => {
        handleSetOpen && handleSetOpen(false)
        let params = {
                        playListId: playlistId,
                        objectId: objectId
                    }
        const removeResponce = await actRemoveFromThisPlaylist(params, getAccessTokenObj());
        if(removeResponce.success) {
            notify(errors_message.REMOVE_FROM_PLAYLIST, 'success');
            const newArray = updatePlayListSongs.filter((item: any) => item.objectid !== objectId);
            setUpdatePlayListSongs(newArray);
        } else if(removeResponce.reason){
            notify(removeResponce.reason, 'error');
        }
    }
    return(
        <>
        <button
            className="w-full h-full text-left"
            onClick={() => {removeFromThisPlaylist()}}>
            <span className='text-secondaryItemColor'>{lang?.remove_from_Playlist}</span>
            {/* <span role="tooltip" id="tooltip-01" className="invisible absolute bottom-full left-1/2 z-10 mb-2 w-36 -translate-x-1/2 rounded bg-slate-700 p-1 text-sm text-primaryColor opacity-0 transition-all before:invisible before:absolute before:left-1/2 before:top-full before:z-10 before:mb-2 before:-ml-2 before:border-x-8 before:border-t-8 before:border-x-transparent before:border-t-slate-700 before:opacity-0 before:transition-all before:content-[''] group-hover:visible group-hover:block group-hover:opacity-100 group-hover:before:visible group-hover:before:opacity-100">remove from Playlist</span> */}
        </button>
        </>
    )
}