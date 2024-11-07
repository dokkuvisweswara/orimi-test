'use client';
import Image from 'next/image';     
import { dataType, getPoster, redirectUrl }  from '@/utils/content';
import Favourite from './favourite';
import MoreOption from './moreOption';
import PlayContent from './playContent';
import ArtistName from '@/containers/artistName';
import Badge from './badge';
import { useStoreContent } from '@/store/init';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function HorizontalGridCard(props: any) {
    const setContentData = useStoreContent((state : any) => state.setContentData);
    const router = useRouter();
    let badge = dataType(props.itemlist);
    const cardClickHandle = async(Event: any) => {
        // Event.preventDefault();
        setContentData(props.itemlist);
        // const url = redirectUrl(props.itemlist);
        // router.push(url);
      }
    return (
        <div className="flex hover:cursor-pointer gap-2 group  justify-between" onClick={(Event: any) => cardClickHandle(Event)}>
            <Link shallow href={redirectUrl(props.itemlist)} className='flex gap-2 w-[80%]'>
                <div className="relative min-w-16 h-16  aspect-square">
                    <Image className="rounded-sm group-hover:brightness-50 max-md:brightness-50 object-center w-full h-full aspect-square" width={100} height={100} priority src={getPoster(props?.itemlist, 'SQUARE', 'LOW', 'PORTRAIT')} alt={props?.itemlist?.title} />
                    <div className='hidden group-hover:inline-block  max-md:inline-block absolute bottom-4 right-5 '>
                        <PlayContent className='ml-8' id={props?.itemlist.objectid} contentData={props?.itemlist} whereIamFrom={'recently'} lang={props?.lang}></PlayContent>
                    </div>
                </div>
                <div className="text-xs overflow-hidden flex-grow">
                    <p className="text-sm text-primaryItemColor font-semibold overflow-hidden overflow-ellipsis  whitespace-nowrap opacity-90 w-[15rem] group-hover:text-selectedBGPrimaryColor" title={props?.itemlist?.title} >{props?.itemlist?.title}</p>
                    <p className='flex cursor-pointer hover:underline text-[0.68rem] text-primaryColor opacity-60 mt-[0.15rem]'>
                        {(props?.itemlist?.castncrew || props.itemlist?.bandorartist) ?  <ArtistName data={props.itemlist}></ArtistName> : '' }
                    </p>
                    <p className='mt-[0.15rem]'>
                    {props.itemlist.category  && <Badge cta={badge} whereIamFrom={'horizontal'} lang={props?.lang}></Badge>}
                    {props.itemlist.genre &&  <span className="text-[0.65rem] font-medium ml-2 opacity-60">{props.itemlist.genre}</span>}
                    </p>
                </div>
            </Link>


            <div className={`flex gap-[0.2rem] items-center justify-center mx-2 text-sm font-medium text-skeletonColor dark:text-gray-300  max-lg:inline-flex group-hover:flex ml-auto`}>
                <Favourite id={props?.itemlist.objectid} contentData={props?.itemlist} whereIamFrom={'sliderCard'} lang={props?.lang}></Favourite>
                <MoreOption id={props?.itemlist.objectid} contentData={props?.itemlist} type={'recentplay'} invisible={false} lang={props?.lang} position={'left'}></MoreOption>
            </div>
        </div>
    )}
