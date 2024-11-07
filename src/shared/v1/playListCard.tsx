import Image from 'next/image';
import Placeholder from '../../../public/placeHolder.svg';
import MoreOption from './moreOption';

export default function PlayListCard(props:any){    
    return (
        <>
            <section className='w-full'>
                <figure className="flex gap-2 items-center">
                    <div id='slider-poster bg-gray-600'>
                        <Image className="rounded-sm" width="40" height="40" priority src={props.itemlist.icon ? props.itemlist.icon : Placeholder} alt={'poster'} />
                    </div>
                    <figcaption className="flex-col gap-1 justify-center">
                        <p className="text-xsm font-semibold text-primaryItemColor">{props.itemlist.title}</p>
                        {/* <p className=" font-thin text-xsm opacity-80">{props.itemlist.artist}</p> */}
                    </figcaption>
                    {
                        props.moreOption && <MoreOption id={props.itemlist.idplaylist} contentData={props.itemlist} type={'playList'} invisible={false} position={'left'}></MoreOption>
                    }
                </figure>
            </section>
        </>
    )}