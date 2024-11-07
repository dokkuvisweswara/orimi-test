'use client'
import { useEffect, useRef, useState } from 'react';
import DeletePlaylist from './deletePlaylist';
import AddToThisPlaylistPopup from './addToThisPlaylistPopup';
import AddToQue from './addToQue';
import Favourite from './favourite';
import EditPlayList from './editPlayList';
import ViewArtist from './viewArtist';
import SocialShare from './socialShare';
import AddToPlayList from './addToPlaylist';
import RemoveFromRecentlyPlay from './removeFromRecentlyPlayed';
import RemoveFromThisPlaylist from './removeFromThisPlaylist';

export default function MoreOption({id, contentData, type, invisible, lang, position, whereIamFrom, idplaylist, moreOptioDisable, albumSongsData}: any) {
    const [enableOptions, setEnableOptions] = useState<any>(false);
    const wrapperRef: any = useRef(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const togglePopup = () => {
        setIsPopupOpen(prevState => !prevState); // Toggle between true and false
    };

    
    useEffect(() => {  
        function handleClickOutside(event: MouseEvent) {
            
            if (wrapperRef?.current && !wrapperRef?.current?.contains(event.target)) {
                setEnableOptions(false)
            }
            const target = event.target as Element;

            if (target?.classList?.contains('more-option')) {
                setEnableOptions(false)
            }
                         
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [wrapperRef]); ; // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        setEnableOptions(false);
    }, [moreOptioDisable]); // eslint-disable-line react-hooks/exhaustive-deps
    
    const EnableOption = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        event.stopPropagation(); 
        setEnableOptions(!enableOptions);
    }
    const handleSetOpen = ()=> {
        setEnableOptions(false)
    }
    const handleSetOpenPlaylist = () => {
        setEnableOptions(true)
    }

    return (
        <>
        <div className={`relative ${invisible ? 'invisible' : ''} more-option group hover:block`} ref={wrapperRef}>
        <button className="w-8 h-full" onClick={EnableOption} title='More Options'>
            <svg width={`${whereIamFrom === 'detailConentbar' ? '26' : '24'}`} height={`${whereIamFrom === 'detailConentbar' ? '6' : '4'}`} viewBox={`0 0 16 4`} fill="none" xmlns="http://www.w3.org/2000/svg" className='mb-1 fav-ico hover:scale-125'>
                <path d="M16 2C16 2.55 15.8042 3.02083 15.4125 3.4125C15.0208 3.80417 14.55 4 14 4C13.45 4 12.9792 3.80417 12.5875 3.4125C12.1958 3.02083 12 2.55 12 2C12 1.45 12.1958 0.979167 12.5875 0.5875C12.9792 0.195833 13.45 0 14 0C14.55 0 15.0208 0.195833 15.4125 0.5875C15.8042 0.979167 16 1.45 16 2ZM10 2C10 2.55 9.80417 3.02083 9.4125 3.4125C9.02083 3.80417 8.55 4 8 4C7.45 4 6.97917 3.80417 6.5875 3.4125C6.19583 3.02083 6 2.55 6 2C6 1.45 6.19583 0.979167 6.5875 0.5875C6.97917 0.195833 7.45 0 8 0C8.55 0 9.02083 0.195833 9.4125 0.5875C9.80417 0.979167 10 1.45 10 2ZM4 2C4 2.55 3.80417 3.02083 3.4125 3.4125C3.02083 3.80417 2.55 4 2 4C1.45 4 0.979167 3.80417 0.5875 3.4125C0.195833 3.02083 0 2.55 0 2C0 1.45 0.195833 0.979167 0.5875 0.5875C0.979167 0.195833 1.45 0 2 0C2.55 0 3.02083 0.195833 3.4125 0.5875C3.80417 0.979167 4 1.45 4 2Z" fill="white"/>
            </svg>
        </button>
        <div className={`absolute fadeAminationZoom ${enableOptions ? 'block': 'hidden'} ${position == 'left' ? 'right-12' : 'left-10'} ${type == 'recentplay' ? 'top-[-100%]' : 'top-[-200%]'} z-40`}>
            {
                type === 'recentplay' ?
                <ul className='flex flex-col py-2 mt-1 list-none bg-[#0A0B0B] rounded-md shadow-md w-72 top-full shadow-slate-500/10'>
                    <li className='p-2 px-5 transition-colors duration-300 text-ordinaryItemColor cursor-pointer hover:bg-[#232323]' key={'opt_AddToThisPlaylistPopup'}>
                        <RemoveFromRecentlyPlay contentId={id} contentData={contentData} lang={lang} handleSetOpen ={handleSetOpen}></RemoveFromRecentlyPlay >
                    </li>
                </ul>
            :
            <ul className='flex flex-col py-2 mt-1 list-none bg-[#0A0B0B] rounded-md shadow-md w-72 top-full shadow-slate-500/10 divide-gridTagsonhoverColor divide-y text-ordinaryItemColor'>
                {type === 'playList' && <li className='p-2 px-5 transition-colors duration-300 text-ordinaryItemColor border-[#232323] cursor-pointer hover:bg-[#232323]' key={'opt_AddToThisPlaylistPopup'}>
                    <AddToThisPlaylistPopup itemId={id} lang={lang} handleSetOpen ={handleSetOpenPlaylist}></AddToThisPlaylistPopup>
                </li>}
                {type === 'playList' && 
                <li className='p-2 px-5 transition-colors duration-300 text-ordinaryItemColor border-selectedBGSecondaryColor cursor-pointer hover:bg-selectedBGSecondaryColor' key={'opt_Edit_playlist'}>
                    <button onClick={togglePopup} className='text-left w-full h-full'>{lang?.edit_playlist}</button>
                    {isPopupOpen && <EditPlayList contentId={id} contentData={contentData} onClose={() => setIsPopupOpen(false)} lang={lang}/>}
                </li>
                }
                {type === 'songslist' && whereIamFrom === 'playlistSongslist' && 
                <li className='p-2 px-5 transition-colors duration-300 text-ordinaryItemColor border-selectedBGSecondaryColor cursor-pointer hover:bg-selectedBGSecondaryColor' key={'opt_Edit_playlist'}>
                    <RemoveFromThisPlaylist playlistId={idplaylist} objectId={id} lang={lang} handleSetOpen ={handleSetOpen}></RemoveFromThisPlaylist>
                </li>
                }
                <li  className='p-2 px-5 transition-colors duration-300 text-ordinaryItemColor border-selectedBGSecondaryColor cursor-pointer hover:bg-selectedBGSecondaryColor' key={'opt_Add_to_Queue'}>
                    <AddToQue contentId={id} contentData={contentData} lang={lang}  handleSetOpen ={handleSetOpen} albumSongsData={albumSongsData}></AddToQue>
                </li>
                {/* <li  className='p-2 px-5 transition-colors duration-300 text-ordinaryItemColor border-selectedBGSecondaryColor cursor-pointer hover:bg-selectedBGSecondaryColor' key={'opt_play_next'}>
                    <PlayNext contentId={id} contentData={contentData}></PlayNext>
                </li> */}
                {type !== 'playList' && <li  className='p-2 px-5 transition-colors duration-300 text-ordinaryItemColor border-selectedBGSecondaryColor cursor-pointer hover:bg-selectedBGSecondaryColor' key={'opt_add_to_library'}>
                    <Favourite id={id} whereIamFrom={'moreOption'} contentData={contentData} type={type} lang={lang} handleSetOpen ={handleSetOpen}></Favourite>
                </li>}
                {type !== 'playList' && <li  className='p-2 px-5 transition-colors duration-300 text-ordinaryItemColor border-selectedBGSecondaryColor cursor-pointer hover:bg-selectedBGSecondaryColor' key={'opt_Add_to_playlist'}>
                    <AddToPlayList id={id} whereIamFrom={'moreOption'} contentData={contentData} lang={lang} handleSetOpen ={handleSetOpen}></AddToPlayList>
                </li>}
                {/* {type === 'playList' && <li  className='p-2 px-5 transition-colors duration-300 text-ordinaryItemColor border-selectedBGSecondaryColor cursor-pointer hover:bg-selectedBGSecondaryColor' key={'opt_Add_to_other_playlist'}>
                    <button className='w-full h-full text-left'>Add to other playlist</button>
                </li>} */}
                {/* {type !== 'playList' && <li  className='p-2 px-5 transition-colors duration-300 text-ordinaryItemColor border-selectedBGSecondaryColor cursor-pointer hover:bg-selectedBGSecondaryColor' key={'opt_View_album'}>
                    <button>View album</button>
                </li>} */}
                {(type == 'single' || type === 'album' || type === 'songslist') && <li  className='p-2 px-5 transition-colors duration-300 text-ordinaryItemColor border-selectedBGSecondaryColor cursor-pointer hover:bg-selectedBGSecondaryColor' key={'opt_View_artists'}>
                    <ViewArtist contentData={contentData} lang={lang}></ViewArtist>
                </li>}
                <li  className='p-2 px-5 transition-colors duration-300 text-ordinaryItemColor border-selectedBGSecondaryColor cursor-pointer hover:bg-selectedBGSecondaryColor' key={'opt_share'}>
                    <SocialShare id={id} whereIamFrom={'moreOption'} lang={lang}  handleSetOpen ={handleSetOpen}></SocialShare>
                </li>
                {type === 'playList' && <li  className='p-2 px-5 transition-colors duration-300 text-ordinaryItemColor cursor-pointer hover:bg-[#232323]' key={'opt_DeletePlaylist'}>
                    <DeletePlaylist itemId={id} lang={lang}/>
                </li>}
            </ul>
            }
        </div>
        </div>
        </>
    )
}