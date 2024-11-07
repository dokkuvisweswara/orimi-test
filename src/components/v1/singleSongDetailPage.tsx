'use client'
import { actContentData } from "@/services/actions/content.action";
import DetailsContentBar from "@/shared/v1/detailsContentBar";
import SongsList from "@/shared/v1/songsList";
import { getAccessTokenObj } from  "@/services/helpers/init.helper";
import { useEffect, useState } from "react";
import { useStoreContent } from "@/store/init";
import RelatedSection from "@/shared/v1/relatedSection";
import { scrollToTop } from "@/utils/basicHelper"
import { formatDurationInWords } from "@/utils/content";
import { Helmet } from "react-helmet";


export default function SingleSongDetailPage(props: any) {
    const [songData, setSongData] = useState<any>(false);
    const getContentData = useStoreContent((state : any) => state.contentData);

    useEffect(() => {
        scrollToTop()
        if(getContentData){
            setSongData({...getContentData});
        } else {
            callApiToGetSingleSongData();
        }
    }, [getContentData]); // eslint-disable-line react-hooks/exhaustive-deps

    const callApiToGetSingleSongData = async () => {
        let contentPayload = {
            id: props.songId,
            endpoint: 'subscriber/v1/content/'
        };
        const responseDataData = await actContentData(contentPayload, getAccessTokenObj());
        setSongData({...responseDataData});
    };
    return (
        <>
            <Helmet>
                <title>{`Listen ${songData?.title || ''} on ORI MI`}</title>
                <meta name="description" content={ `Listen ${songData?.title || '' } on ORI MI`} />
            </Helmet>

            <section className="w-full sub-container fadeAmination">
                <div className="bg-primaryBgColor  text-primaryColor">
                    <div className="mx-auto">
                        <DetailsContentBar contentData={songData} type="track" contentId={props.songId} lang={props.lang}></DetailsContentBar>
                    </div>
                    <div className="py-1">
                        {songData && <SongsList contentData={songData} type="track" lang={props.lang}></SongsList> }
                    </div>
                     
                    <div className="songInfo-license p-2 text-checkboxBeforeColor">
                        <div>
                            <p><span>1 {props?.lang && props?.lang.songs}</span>&nbsp;&nbsp;<span className="bullet-dot">&#x2022;</span>&nbsp;&nbsp;<span>{formatDurationInWords(songData.duration, props.lang)}</span></p>
                        </div>
                        {songData && songData.objectowner &&
                            <div className="license">
                                <p>{songData.objectowner}</p>
                            </div>
                        }
                    </div>
                    <RelatedSection songId={props.songId} lang={props.lang}></RelatedSection>
                </div>
            </section>
        
        </>
      
    )
}