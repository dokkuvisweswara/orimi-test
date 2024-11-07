'use client'
import Image from 'next/image';
import v6 from '../../../public/plalist.jpeg';
import { formatDateInWords, formatPublisDate, formatTime, getPoster } from '@/utils/content';
import PlayContent from './playContent';
import MoreOption from './moreOption';
import Link from 'next/link';
import ArtistName from '@/containers/artistName';

export default function SongsList(props: any) {
    const redirectToArtist = (data: any) => {
    }
    return (
        <>
            <section>
                <div className="py-1 bg-primaryBgColor mt-4">
                    <table className="w-full table-auto">  
                        <tbody className=" text-primaryColor  ">
                            <tr className='group bg-[#2B2B2B] rounded-md'>
                       
                                <td className="py-2 px-4 text-slate-50 rounded-s-md text-md">
                                    <p>{props.contentData.title}</p>
                                    <p className='flex cursor-pointer hover:underline text-sm text-secondaryItemColor'>
                                        {(props?.contentData?.castncrew || props.contentData?.bandorartist)
                                        ? 
                                        <ArtistName data={props.contentData}></ArtistName> 
                                        : 
                                        '' 
                                        }
                                    </p>
                                </td>
                                <td className=" text-sm max-md:hidden text-secondaryItemColor">{formatDateInWords(props.contentData.publishtime, props?.lang)}</td>
                                <td className=" text-sm text-secondaryItemColor">{formatTime(props.contentData.duration, props?.lang)}</td>
                                <td className="border-detailsbordercolor  text-center rounded-e-md test-sm text-secondaryItemColor"><MoreOption id={props.contentData.objectid} contentData={props.contentData} lang={props.lang} type={'songslist'} invisible={false} position={'left'}></MoreOption></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>
        </>
    )
}
