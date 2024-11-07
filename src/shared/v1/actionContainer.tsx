'use client'
import MoreOption from './moreOption';
import PlayContent from './playContent';
import Favourite from './favourite';
import SocialShare from './socialShare';
import Colabicon from '@/components/v1/Colabicon';

export default function ActionContainer({type, contentData, contentId, lang, subscriberId}: any) {
 
    return (
        <>
            <section>
                <div className="flex items-center mt-2 gap-6">
                    {type === "podcast" ? "" : <PlayContent id={contentId} contentData={contentData} whereIamFrom={'detailPage'} lang={lang}></PlayContent>}
                    {type === "playList" ? "" : <Favourite id={contentId} contentData={contentData} whereIamFrom={'detailPage'} lang={lang}></Favourite>}
                    {(type === 'playList' && contentData  && (contentData.playlistowner === subscriberId)) ? <Colabicon id={contentId} contentData={contentData}></Colabicon > : ""}
                    {(type === "episode" || type === "podcast") ? <SocialShare id={contentId} whereIamFrom={'detailPage'} lang={lang} type={'bottom'}></SocialShare> : ""}
                    {type === "podcast" ? "" : <MoreOption id={contentId} contentData={contentData} type={type} invisible={false} lang={lang} position={'right'} whereIamFrom={'detailConentbar'}></MoreOption>}
                </div>
            </section>
        </>
    )
}