'use client'

import { useEffect, useState } from 'react';
import EpisodeSection from './episodeSection';
import MoreLikeThisSection from './moreLikeThisSection';
import { actRelatedContentData, actEpisodesData, actChaptersData } from '@/services/actions/content.action';
import { getAccessTokenObj } from '@/services/helpers/init.helper';
import ChapterSection from './ChapterSection';
import { actGetCurrentLanguage } from '@/utils/accessCurrentLang';

export default function ProdcastTabsSection({contentData, contentId, tabsList, lang}: any) {
    const [activeTab, setAtiveTab] = useState<string>('EPISODE');
    const [relatedData, setRelatedData] = useState<any>(null);
    const [episodesData, setEpisodesData] = useState<any>(null);
    const [chaptersData, setChaptersData] = useState<any>(null);
    const [seasonnum, setSeasonnum] = useState<any>(1);
    const [getSeeAllSectionConfig, setSeeAllSectionConfig] = useState<any>(false);

    function selectTab(currentTab: string) {
        setAtiveTab(currentTab);
    }
    useEffect(() => {
        setAtiveTab(tabsList[0].tabId);
        const includesEpisode = tabsList?.some((item: any) => item.tabId === 'EPISODE');
        const includesChapter = tabsList?.some((item: any) => item.tabId === 'CHAPTER');
        if(includesEpisode) {
            // actEpisodeListing();
        }
        if(includesChapter) {
            actChapterListing();
        }
        actMoreLikeThis();
    }, []);  // eslint-disable-line react-hooks/exhaustive-deps
    
    const actMoreLikeThis = async () => {
        let relatedPayload = {
            endpoint: 'subscriber/v1/content/related/' + contentId,
            params: {type: 'related'}
        };
        setSeeAllSectionConfig(relatedPayload);
        
        const moreLikeThisData = await actRelatedContentData(relatedPayload, getAccessTokenObj());
        setRelatedData(moreLikeThisData);
    }
    const actEpisodeListing = async () => {
        let langSelected: any = await actGetCurrentLanguage()
        let displaylanguage: string = langSelected == "en"? "eng" : "mon";
        let episodePayload = {
            endpoint: 'subscriber/v1/content/',
            params: {
                objecttype: 'CONTENT',
                page: 1,
                pagesize: 15,
                seasonnum: seasonnum,
                seriesid: contentId,
                displaylanguage
            }
        };
        const EpData = await actEpisodesData(episodePayload, getAccessTokenObj());
        setEpisodesData(EpData);
    }
    const actChapterListing = async () => {
        let langSelected: any = await actGetCurrentLanguage()
        let displaylanguage: string = langSelected == "en"? "eng" : "mon";
        let episodePayload = {
            endpoint: 'subscriber/v1/content/',
            params: {
                category: 'AUDIOBOOK',
                objecttype: 'CONTENT',
                page: 1,
                pagesize: 15,
                albumid: contentId,
                orderby: {"track":"ASC"},
                displaylanguage
            }
        };
        const chapData = await actChaptersData(episodePayload, getAccessTokenObj());
        setChaptersData(chapData);
    };
    const seasonCallBack = async (num: any) => {
        setSeasonnum(num);
        // actEpisodeListing();
    }
    return (
        <div>
            <div className="text-sm font-medium text-center text-primaryItemColor ml-5">
                <ul className="flex flex-wrap gap-1 items-center border-b border-detailsbordercolor">
                 {tabsList.map((item:any, i:number) => {
                    return(
                        <li key={i}>
                            <button className={`inline-block p-4 font-bold border-b-2 -mb-px ${activeTab === item.tabId ? 'border-selectedBGPrimaryColor rounded-t-lg active dark:border-selectedBGPrimaryColor' : 'hover:text-detailsbordercolor  hover:border-secondaryItemColor'}`}
                             aria-current="page"
                             onClick={() => {selectTab(item.tabId)}}
                             >{lang && lang[item.title]}</button>
                        </li>
                    )
                 })}
                </ul>
            </div>
            <div className='selected-section'>
      {activeTab === 'EPISODE' && <EpisodeSection contentId={contentId} contentData={episodesData} lang={lang} seasonCallBack={seasonCallBack} currentSeasonNum={seasonnum} seasonCount={contentData?.seasoncount}></EpisodeSection>}
      {activeTab === 'CHAPTER' && <ChapterSection contentId={contentId} contentData={chaptersData} lang={lang}></ChapterSection>}
      {(activeTab === 'RELATED' && relatedData) && <MoreLikeThisSection contentId={contentId} contentData={relatedData} lang={lang}></MoreLikeThisSection>}
    </div>
    </div>
    )
}