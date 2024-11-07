'use client'

import { getAccessTokenObj } from "@/services/helpers/init.helper";
import Description from "@/shared/v1/description";
import DetailsContentBar from "@/shared/v1/detailsContentBar";
import { useStoreContent } from "@/store/init";
import { formatDateInWords, formatTime } from "@/utils/content";
import { useEffect, useState } from "react";
import { scrollToTop } from "@/utils/basicHelper"
import { actContentData } from "@/services/actions/content.action";
import { actGetCurrentLanguage } from "@/utils/accessCurrentLang";
import { getDictionary } from "@/i18n/dictionaries";

export default function PodcastEpisodeDetailPage(props: any) {
    const [episodeData, setEpisodeData] = useState<any>(false);
    const [descriptionData, setDescriptionData] = useState<any>(false);
    const getContentData = useStoreContent((state: any) => state.contentData);
    const [lang, setLang] = useState<any>(null);

    useEffect(() => {
        scrollToTop()
        if(getContentData){
            setEpisodeData({...getContentData});
            let description = getContentData?.shortdescription ? getContentData?.shortdescription : getContentData?.longdescription;
            setDescriptionData(description)
        } else {            
            callApiToGetSingleSongData();
        }
    }, [getContentData]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if ((window as any).setStoreLanguageDataset) {
            setLang((window as any).setStoreLanguageDataset)
          } else {
            actGetCurrentLanguage().then((langSelected) => {
              getDictionary(langSelected).then((language: any) => {
                setLang(language);
              })
            })
          }
    }, []);
    const callApiToGetSingleSongData = async () => {
        let contentPayload = {
            id: props.episodeId,
            endpoint: 'subscriber/v1/content/'
        };
        const responseDataData = await actContentData(contentPayload, getAccessTokenObj());
        setEpisodeData({...responseDataData});
        let description = responseDataData?.shortdescription ? responseDataData?.shortdescription : responseDataData?.longdescription;
        setDescriptionData(description)
    };


    return (
            <section className='w-full sub-container fadeAmination'>
                <div className="bg-primaryBgColor  text-primaryColor">
                    <div className="mx-auto">
                        <DetailsContentBar contentData={episodeData} type="episode" lang={lang}></DetailsContentBar>         
                    </div>
                    <div className="flex gap-4 mt-4 px-6">
                        <div className="flex gap-2 items-center text-lg  pt-4 opacity-80">
                            {episodeData?.episodenum && (
                            <div>
                                <span>{lang?.E_letter}{episodeData?.episodenum}</span>
                            </div>
                            )}
                            {formatDateInWords(episodeData?.releasedate, lang) && (
                            <>
                                <div className="w-[4px] h-[8px] bg-dotsLoaderBgColor rounded-sm"></div>
                                <div><span>{formatDateInWords(episodeData?.releasedate, lang)}</span></div>
                                <div className="w-[4px] h-[8px] bg-dotsLoaderBgColor rounded-sm"></div>
                            </>
                            )}

                            <div><span>{formatTime(episodeData?.duration, lang)}</span></div>
                        </div>
                    </div>
                    <div className="description p-4">
                        <Description description={descriptionData} lang={lang}></Description>
                    </div>
                </div>
            </section>
    )
}