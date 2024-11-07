'use client'
import Image from 'next/image'
import ActionContainer from './actionContainer';
import { formatDurationInWords, getPoster } from '@/utils/content';
import CollaboratorsListView from '@/components/v1/collaboratorsListView';
export default function DetailsContentBar({contentData, type, contentId, lang, playListSongsCount, contentDuration, subscriberId}: any){
    return(
        <>
        <section className='w-full h-60 max-xs:h-[23rem]'>
            <div className="rounded-md shadow-md flex items-center bg-gradient-to-r from-neutral-700  via-stone-700 to-zinc-950 w-full max-md:w-full lg:h-full xl:w-full xxl:w-full max-xs:flex-col max-xs:w-full max-xs:h-full max-xs:bg-gradient-to-b">
                <div className="pl-2 pr-6 max-lg:pt-2 max-lg:pb-2">                
                    <Image className="w-[14rem] max-md:w-52 max-md:mt-2  max-xs:mt-2 aspect-square  max-sm:aspect-square  rounded-xl bg-[#232323]" src={getPoster(contentData, 'SQUARE', 'HD', 'POTRAIT')} alt={''} width={200} height={200}/>
                </div>
                <div className="flex-1 flex flex-col justify-between">
                    <div className="">
                        <p className="text-lg font-bold pt-4 text-primaryColor mb-1">{contentData?.title}</p>
                        {contentData?.castncrew && <p className="text-[0.8rem] text-secondaryItemColor">
                            {contentData?.castncrew?.cast.map((item:any, i:number) => {
                                return(
                                    <span key={i} >{item.name}</span>
                                )
                            })
                            }
                        </p>
                        }
                        {type === 'playList' ?
                            <ul className='dotul flex text-[0.8rem] mt-0 text-ordinaryItemColor'>
                                {contentData?.playlistaccess && <li className='playlistaccess'><span>{contentData?.playlistaccess === 'PRIVATE'? lang?.PRIVATE:lang?.PUBLIC}</span></li>}
                                {playListSongsCount ? (<li className='playListSongsCount'><span>{playListSongsCount} {lang?.songs}</span></li>) : "" }
                                {contentData?.productionyear && <li className='productionyear'><span>{contentData?.productionyear}</span></li>}
                                {contentData?.totalduration && <li className='totalduration'><span>{formatDurationInWords(contentData?.totalduration, lang)}</span></li>}
                                {contentDuration>0 && <li className='totalduration'><span>{formatDurationInWords(contentDuration,lang)}</span></li>}
                                {contentData?.trackcount && <li className='trackcount'><span>{contentData?.trackcount}</span></li>}
                            </ul> :
                            <ul className='dotul flex text-[0.8rem] mt-0 text-ordinaryItemColor'>
                                <li><span className='uppercase'>{(lang && lang[type]) || type}</span></li>
                                {contentData?.productionyear && <li><span>{contentData?.productionyear}</span></li>}
                                {contentData?.totalduration && <li><span>{formatDurationInWords(contentData?.totalduration,lang)}</span></li>}
                                {contentData?.trackcount && <li><span>{contentData?.trackcount} {lang?.songs}</span></li>}
                            </ul>
                        }
                        {
                            type === 'playList' && <CollaboratorsListView playlistId={contentId} contentData={contentData}></CollaboratorsListView>
                        }
                        <ActionContainer type={type} contentId={contentId} contentData={contentData} lang={lang} subscriberId={subscriberId}></ActionContainer>
                    </div>

                </div>
            </div>
        </section>
        </>
    )
}