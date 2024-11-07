'use client'

import DetailsContentBar from '@/shared/v1/detailsContentBar';
import { actContentData } from '@/services/actions/content.action';
import ALbumSongsList from '@/shared/v1/AlbumSongsList';
import { getAccessTokenObj } from '@/services/helpers/init.helper';
import { useStoreContent } from '@/store/init';
import { useEffect, useState } from 'react';
import { scrollToTop } from "@/utils/basicHelper";
import PlayListSkeleton from '@/containers/skeleton/playListSkeleton';
import DetailsContentBarSkeleton from '@/containers/skeleton/detailsContentBarSkeleton';
import { Helmet } from "react-helmet";

export default function AlbumDetailspage(props: any){
    const getContentData = useStoreContent((state : any) => state.contentData);
    const [albumData, setAlbumData] = useState<any>(null);
    
    useEffect(() => {
        scrollToTop();   
        if(getContentData){
            setAlbumData({...getContentData});
        } else {
            callApiToGetAlbumData();
        }
    },[getContentData]); // eslint-disable-line react-hooks/exhaustive-deps

    const callApiToGetAlbumData = async () => {
        const payload = {
            id: props.albumId,
            endpoint: 'subscriber/v1/content/'
        };
        const responseData = await actContentData(payload, getAccessTokenObj());
        setAlbumData({...responseData});
    }
    return(
    <>
       <Helmet>
        <title>{`Listen ${albumData?.title || ''} on ORI MI`}</title>
        <meta name="description" content={ `Listen ${albumData?.title || '' } on ORI MI`} />
      </Helmet>
        <section className='w-full sub-container fadeAmination'>
            {albumData ?
            <div className="bg-primaryBgColor  text-primaryColor w-full">
                <div className="mx-auto">
                    <DetailsContentBar contentData={albumData} type="album" contentId={props.albumId} lang={props.lang}></DetailsContentBar>
                <div className="px-2 py-1 bg-primaryBgColor mt-1">
                    <ALbumSongsList albumId={props.albumId} lang={props.lang}></ALbumSongsList>
                </div>
                </div>
            </div>
            :
            <div className='skeleton'>
                <DetailsContentBarSkeleton></DetailsContentBarSkeleton>
                <div className='mt-4'>
                    <PlayListSkeleton></PlayListSkeleton>
                </div>
            </div>
            }
        </section>
    </>
    )
}