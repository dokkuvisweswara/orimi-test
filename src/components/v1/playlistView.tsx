import MoreOption from "@/shared/v1/moreOption";
import Image from "next/image"; 
import Placeholder from '../../../public/placeHolder.svg';

export function PlayListView({listOfPlaylistData, lang, handlePlayList}: any) {    
    interface PlaylistItem {
        idplaylist: string;
        title: string;
        icon: string;
        playlistaccess:string;
        totalContent: number
    }

    const selectPlaylist = (playList: any) => {
        handlePlayList(playList)       
    }
    return (
        <div className="min-w-52 bg-[#0A0B0B] text-primaryColor">
            <ul  className="space-y-2 mt-2">
                <li id="newPlayList" className="flex items-center justify-center px-4"
                    key={'createPlaylist'}>
                    {/* <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11 13H6C5.71667 13 5.47917 12.9042 5.2875 12.7125C5.09583 12.5208 5 12.2833 5 12C5 11.7167 5.09583 11.4792 5.2875 11.2875C5.47917 11.0958 5.71667 11 6 11H11V6C11 5.71667 11.0958 5.47917 11.2875 5.2875C11.4792 5.09583 11.7167 5 12 5C12.2833 5 12.5208 5.09583 12.7125 5.2875C12.9042 5.47917 13 5.71667 13 6V11H18C18.2833 11 18.5208 11.0958 18.7125 11.2875C18.9042 11.4792 19 11.7167 19 12C19 12.2833 18.9042 12.5208 18.7125 12.7125C18.5208 12.9042 18.2833 13 18 13H13V18C13 18.2833 12.9042 18.5208 12.7125 18.7125C12.5208 18.9042 12.2833 19 12 19C11.7167 19 11.4792 18.9042 11.2875 18.7125C11.0958 18.5208 11 18.2833 11 18V13Z" fill="white" fillOpacity="0.9"/>
                    </svg>
                    <span className="ms-1 font-thin text-sm">New playlist</span> */}
                    {/* <CreatePlayList contentId={contentData.objectid}/> */}
                </li>
                {
                    listOfPlaylistData?.map((item:PlaylistItem, i:number) => {
                        return (
                            <li key={i}>
                                <button className="flex items-center p-2  rounded-lg dark:text-primaryColor hover:bg-selectedBGSecondaryColor dark:hover:bg-selectedBGSecondaryColor group w-full" onClick={() => {selectPlaylist(item)}}>
                                <section className='w-full'>
                                    <figure className="flex gap-2 items-center justify-between">
                                        <div id='slider-poster' className="flex items-center gap-3">
                                            <Image className="rounded-sm" width="40" height="40" priority src={item.icon ? item.icon : Placeholder} alt={'poster'} />                        
                                            <figcaption className="flex-col gap-1 text-primaryColor">
                                                <p className="text-xsm font-semibold text-left">{item.title}</p>
                                                <p className="font-thin text-xsm opacity-80 text-left">{lang[item.playlistaccess]} {item.totalContent}</p>
                                            </figcaption>
                                        </div>
                                        {
                                            <MoreOption id={item.idplaylist} contentData={item} type={'playList'} invisible={false} position={'left'} lang={lang}></MoreOption>
                                        }
                                    </figure>
                                </section>
                                </button>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}