'use client'
import { formatTime } from '@/utils/content';
import { useRouter } from 'next/navigation';
import { useStoreContent } from '@/store/init';
import PlayContent from './playContent';
import SocialShare from './socialShare';
import MoreOption from './moreOption';
import Favourite from './favourite';

export default function ChapterSection({contentId, contentData, lang}: any) {
    const setContentData = useStoreContent((state: any) => state.setContentData);
    const router = useRouter();

    const redirectToEpisodeDetails = (data: any) => {
        setContentData({...data});
        setTimeout(() => {
            router.push(`/podcast/episode/${data.objectid}`);
        }, 200);
    }
    return (
        <>        
        {contentData?.data &&
            <div>
            <div id="chapters-list">
            {contentData?.data?.map((item: any, i: number) => {
                return (
                    <div key={i}>
                        <div className="flex-1 flex flex-col justify-between ml-4 mt-2 hover:bg-[#2B2A2B] hover:rounded-md" key={i}>
                            <div className="text-primaryItemColor">
                                <p className="text-md ml-3 ">{lang?.chapter} &nbsp;<span>{item?.episodenum ? item?.episodenum : (i+1)}:</span> <span onClick={() => { redirectToEpisodeDetails(item); } } className='hover:underline cursor-pointer'>{item?.title}</span></p>
                                <div className="flex">
                                    <p className="text-xs mt-1 opacity-80 ml-3">{formatTime(item?.duration, lang)}</p>
                                </div>
                            </div>
                            <div className="flex items-center mt-3 ml-3 gap-4">
                                <PlayContent whereIamFrom="episode" contentData={item} height={30} width={30} lang={lang}></PlayContent>
                                <Favourite id={contentId} contentData={item} whereIamFrom={'episode'} lang={lang}></Favourite>
                                <SocialShare id={contentId} whereIamFrom={'episode'} lang={lang} type={'top'}></SocialShare>
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
                <p className="text-center w-full h-32 flex items-center justify-center">{lang?.['no_such_contents_found']}</p>
            </div> 
            
        }
        </>
    )
}