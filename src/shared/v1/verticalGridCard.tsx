'use client'

import Image from 'next/image';
import CardDetails from './cardDetails';
import { getPoster, redirectUrl }  from '@/utils/content';
import HoverCardActionContainer from './hoverActionButtonActions';
import { useStoreContent } from '@/store/init';
import Link from 'next/link';


export default function VerticalGridCard({itemlist, displayType, lang}: any){
    const setContentData = useStoreContent((state : any) => state.setContentData);

    const cardClickHandle = async(Event: any) => {
        Event.preventDefault();
        Event.stopPropagation();
        setContentData({...itemlist});
      }
    return (
            <div className={`flex group flex-wrap w-full gap-y-2 hover:cursor-pointer h-auto gap-0.2 flex-col items-start `} onClick={(Event: any) => cardClickHandle(Event)} >
                <figure className="max-w-50 w-30 relative min-w-36">
                 <Link shallow href={redirectUrl(itemlist)} className='min-w-[150px] min-h-[150px]'>
                    <Image loading="lazy" width={150} height={150}  className={`bg-skeletonColor  rounded-sm w-full aspect-square group-hover:brightness-100 group-hover:opacity-30  transition duration-300`} src={getPoster(itemlist, 'SQUARE', 'LOW', 'PORTRAIT')} alt={itemlist.title} />
                 </Link>

                    <div className='bottom-20 gap-3 incent-0 group-hover:flex w-full h-1/4 top-1/2 transform -translate-y-1/2 absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-700 group-hover:opacity-100  max-md:opacity-100 z-40'> 
                        <HoverCardActionContainer contentId={itemlist.objectid} contentData={itemlist} whereIamFrom={'sliderCard'} lang={lang}></HoverCardActionContainer>
                    </div>
                </figure>
                <CardDetails itemlist={itemlist} displayType={displayType} lang={lang}></CardDetails>
            </div>


    )}