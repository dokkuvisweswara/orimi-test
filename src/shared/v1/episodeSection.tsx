'use client'


import v10 from '../../../public/played.svg';
import Image from 'next/image';
import { formatTime, formatDateInWords, redirectUrl } from '@/utils/content';
import { useStoreContent } from '@/store/init';
import PlayContent from './playContent';
import SocialShare from './socialShare';
import MoreOption from './moreOption';
import Favourite from './favourite';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getAccessTokenObj } from '@/services/helpers/init.helper';
import { actEpisodesData } from '@/services/actions/content.action';
import PlayListSkeleton from '@/containers/skeleton/playListSkeleton';

export default function EpisodeSection({contentId, contentData, lang, seasonCallBack, currentSeasonNum, seasonCount}: any) {
    const setContentData = useStoreContent((state: any) => state.setContentData);
    const [episodesData, setEpisodesData] = useState<any>([]);
    const [isOldest, setIsOldest] = useState<any>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalCount, setTotalCount] = useState<number>(1);


    useEffect(() => {

        let itemTarget: any = document.getElementById(`lazyLoadSectionAlbumSongs`);
        if (!itemTarget) return;
        let observer: any = {};
        const observerCallback = (entries: any) => {
          const [entry] = entries;
          if ( totalCount <= episodesData.length && episodesData.length >= 1) {
            itemTarget.style.display = 'none';
            observer.unobserve(itemTarget);
            observer.disconnect();
            return;
          }
          if (entry.isIntersecting) {
            setCurrentPage(currentPage + 1);
          }
        };
    
        let options = {
          root: null,
          rootMargin: "0px",
          threshold: 0.5,
        };
        
        observer = new IntersectionObserver(observerCallback, options);
        observer.observe(itemTarget);
        return () => {
                if (itemTarget) {
                    observer.unobserve(itemTarget);
            observer.disconnect();
                }
            };
      }, [episodesData]);

      useEffect(() => {
        actEpisodeListing();
        return () => {
        //   (window as any).DETAILPAGELISTTRACKS = ""
        //   setDetailListSave(null)
        }
      }, [currentPage]); 

    const actEpisodeListing = async () => {
        let langSelected: any = lang;
        let displaylanguage: string = langSelected == "en"? "eng" : "mon";
        let episodePayload = {
            endpoint: 'subscriber/v1/content/',
            params: {
                objecttype: 'CONTENT',
                page: currentPage,
                pagesize: 15,
                seasonnum: currentSeasonNum,
                seriesid: contentId,
                displaylanguage
            }
        };
        const EpData = await actEpisodesData(episodePayload, getAccessTokenObj());
        if (EpData.data)  {
            setTotalCount(EpData.totalcount)
            setEpisodesData((prev: any) => {
                return [...prev, ...EpData.data]
            });
        }

    }

    const sortEpisodes = () => {
        let revrseValue = episodesData.slice().reverse();
        setEpisodesData([...revrseValue]);
        setIsOldest(!isOldest);
    }

    const selectSeason = (cb:any) => {
        seasonCallBack(cb.target.value);
    }
    return (
        <>        
        {episodesData.length > 0 &&
            <div>
            <div id="series-select">
                <div className='flex'>
                    <div>
                    <form action="/action_page.php" className="bg-primaryBgColor p-4 ml-2 rounded-xl">
                        <select name="cars" id="cars" className="border-primaryItemColor border rounded-xl text-sm px-1 py-0.5 bg-primaryBgColor text-primaryItemColor" 
                            onChange={selectSeason}>
                            {[...Array(seasonCount)].map((_, index) => (
                                <option key={index+1} value={index+1} selected={(index+1) == currentSeasonNum}>{lang && lang[`Season_${index+1}`]}</option>
                            ))}
                        </select>
                    </form>
                    </div>
                    
                    <div className='flex items-center p-4'>
                    <div className='flex items-center gap-2 cursor-pointer' onClick={() => sortEpisodes()}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 18V16H9V18H3ZM3 13V11H15V13H3ZM3 8V6H21V8H3Z" fill="white" fill-opacity="0.6"/>
                    </svg>                    
                    <div>
                        <p className='text-sm'>{isOldest ? lang?.oldest_first : lang?.newest_first}</p>
                    </div>
                    </div>
                    </div>
                </div>
            </div>
            <div id="episodes-list">
            {episodesData?.map((item: any, i: number) => {
                return (
                    <div key={i}>
                        <div className="flex-1 flex flex-col justify-between ml-4 mt-2 hover:bg-[#2B2A2B] hover:rounded-md" key={i}>
                            <div className="text-primaryItemColor">
                                <p className="text-xs pt-4 opacity-80 ml-3">{lang?.E}<span>{item?.episodenum}</span>&nbsp;&nbsp;<span>{formatDateInWords(item?.releasedate,lang)}</span></p>
                                <p className="text-md ml-3 ">{lang?.episode} &nbsp;<span>{item?.episodenum}:</span>
                                 <Link shallow href={redirectUrl(item)}>
                                    <span className='hover:underline cursor-pointer'>{item?.title}</span>
                                </Link>
                                 </p>
                                <div className="flex">
                                    <p className="text-xs mt-1 opacity-80 ml-3">{formatTime(item?.duration, lang)}</p>
                                    {item?.playlead === 'NO' ? "" :
                                        <p className='flex gap-2 items-center ml-2'>
                                            <span className='text-[#E80D74] text-sm'>Played</span>
                                            <Image src={v10} alt={item?.title} height={20} width={20} />
                                        </p>}
                                </div>
                            </div>
                            <div className="flex items-center mt-3 ml-3 gap-4">
                                <PlayContent whereIamFrom="episode" contentData={item} height={30} width={30}  lang={lang}></PlayContent>
                                <Favourite id={contentId} contentData={item} whereIamFrom={'episode'}  lang={lang}></Favourite>
                                <SocialShare id={contentId} whereIamFrom={'episode'}  lang={lang} type={'top'}></SocialShare>
                                <MoreOption id={contentId} contentData={item} type={'episode'} invisible={false} lang={lang} position={'right'}></MoreOption>
                            </div>
                            <div>
                                <p className='border-b-2 border-detailpagecontentBorderColor mt-2 '></p>
                            </div>
                        </div>
                    </div>
                );
            })}
            </div>
            </div>
        }
        {
          contentData?.reason && 
            <div className="flex mx-5">
                <p className="text-center w-full h-32 flex items-center justify-center">{lang?.no_contents_found}</p>
            </div> 
            
        }

        {episodesData && episodesData.length > 0 && (<div id="lazyLoadSectionAlbumSongs">
            <PlayListSkeleton></PlayListSkeleton>  
          </div>)
          }
        </>
    )
}