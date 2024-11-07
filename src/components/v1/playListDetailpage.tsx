'use client'

import DetailsContentBar from '@/shared/v1/detailsContentBar';
import { getPlaylistData } from '@/services/actions/playlist.actions';
import PlaylistSongsList from '@/shared/v1/playlistSongsList';
import PlayListSuggetion from '@/shared/v1/playListSuggetion';
import { useEffect, useState } from 'react';
import { usePlayListSongsCount, useStoreContent, useStoreUpdatePlayListSongs, useStoreUser } from '@/store/init';
import { getAccessTokenObj } from '@/services/helpers/init.helper';
import { scrollToTop } from "@/utils/basicHelper"
import { useRouter } from 'next/navigation';
import DetailsContentBarSkeleton from '@/containers/skeleton/detailsContentBarSkeleton';
import { getCookie } from '@/hooks/client.cookie';

export default function PlayListDetailspage(props: any){
    const [playListData, setPlayListData] = useState<any>(false)
    const getContentData = useStoreContent((state : any) => state.contentData);
    const getIsUserPresent = useStoreUser((state: any) => state.isUserPresent);
    const [playListSongsCount, setPlayListSongsCount] = useState(0);
    const [contentDuration, setContentDuration] = useState<any>(null)
    const [playListPoster, setPlayListPoster] = useState(null);
    const [subscriberId, setSubscriberId] = useState(false);
    const router = useRouter();

    useEffect(() => {  
        scrollToTop(); 
        if(getContentData){
            setPlayListData({...getContentData});
        } else {
            callApiToGetPlayListData();
        }
    },[getContentData]); // eslint-disable-line react-hooks/exhaustive-deps

    const callApiToGetPlayListData = async () => {
        const apiPlaylistData = await getPlaylistData(props.playlistId, getAccessTokenObj());
        setPlayListData({...apiPlaylistData});
    }

    useEffect(() => {
        let unsubscribe = usePlayListSongsCount.subscribe((state:any) => {
            setPlayListSongsCount(state.playListSongsCount);
            setContentDuration(state.playListSongsDuration) ;
        });
        return () => unsubscribe()
    },[]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() =>{

        let subscriberid:any = getCookie("subscriberId");

        setSubscriberId(subscriberid)

        let unsubscribe = useStoreUpdatePlayListSongs.subscribe((state:any) => {
            let x = state?.updatePlayListSongs;
            let data: any = {};
            data = playListData || getContentData;
            if(!(state?.updatePlayListSongs && state?.updatePlayListSongs[0])){
                return
            }
            setPlayListData(state?.updatePlayListSongs[0]);

            if(state?.updatePlayListSongs.length > 0 && data){
                if(state?.updatePlayListSongs[0]?.poster) {
                    data.poster = state?.updatePlayListSongs[0]?.poster;
                } else if(state?.updatePlayListSongs[0]?.thumbnail) {
                    data.thumbnail = state?.updatePlayListSongs[0]?.thumbnail;
                }       
                setPlayListData(data);
            } 
        });
        return () => unsubscribe()
    },[playListData]); // eslint-disable-line react-hooks/exhaustive-deps

    return(
        <section className='w-full sub-container'>
            <div className="bg-primaryBgColor  text-primaryColor w-full h-full">
                <div className="mx-auto">
                    {playListData && subscriberId ?
                     <DetailsContentBar contentData={playListData} type="playList" contentId={props.playlistId} lang={props.lang} playListSongsCount={playListSongsCount} contentDuration={contentDuration} subscriberId={subscriberId}></DetailsContentBar>
                    :
                    <DetailsContentBarSkeleton></DetailsContentBarSkeleton>
                    }
                    {playListData && <PlaylistSongsList playlistId={props.playlistId} lang={props.lang}></PlaylistSongsList> }
                    <PlayListSuggetion playlistId={props.playlistId} lang={props.lang}></PlayListSuggetion>
                </div>
            </div>
        </section>
    )
}