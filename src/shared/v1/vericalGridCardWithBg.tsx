'use Client'
import Image from 'next/image';
import CardDetails from './cardDetails';
import { getPoster, redirectUrl }  from '@/utils/content'
import HoverCardActionContainer from './hoverActionButtonActions';
import { useStoreContent } from '@/store/init';
import Link from 'next/link';
export default function VerticalGridCardBg({itemlist, displayType, lang}: any){    
    const setContentData = useStoreContent((state : any) => state.setContentData);

    const cardClickHandle = async(Event: any) => {
        setContentData({...itemlist});
      }
    
    return (
        <>
            <div className=" h-auto gap-0.2 group flex flex-col items-start hover:cursor-pointer rounded p-2 bg-gradient-to-b from-stone-600 from-10% via-zinc-800 to-primaryBgColor shadow-current" onClick={(Event: any) => cardClickHandle(Event)} >
                <div className="w-full h-full">
                    <figure className="max-w-40 m-auto max-md:max-w-41 w-41 h-full  relative">
                    <Link shallow href={redirectUrl(itemlist)} className='min-w-[150px] min-h-[150px]'>
                        <Image loading="lazy" width={150} height={150}  className={`rounded-sm w-full aspect-square group-hover:brightness-50 max-md:brightness-50" `} src={getPoster(itemlist, 'PORTRAIT', 'LOW', 'SQUARE')}  alt={itemlist.title}  />
                    </Link>
                        <div className='bottom-20 gap-3 incent-0 group-hover:flex max-md:flex w-full h-1/4 top-1/2 transform -translate-y-1/2 absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-700 group-hover:opacity-100 max-md:opacity-100 z-20'> 
                            <HoverCardActionContainer contentId={itemlist.objectid} contentData={itemlist} whereIamFrom={'sliderCard'} lang={lang}></HoverCardActionContainer>
                        </div>
                    </figure>
                    <CardDetails itemlist={itemlist} displayType={displayType} lang={lang}></CardDetails>
                </div>
            </div>
        </>
    )
}