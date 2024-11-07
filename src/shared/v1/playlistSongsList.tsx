'use client'
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { getPlaylistSongsAction, actRemoveFromThisPlaylist } from '@/services/actions/playlist.actions';
import { formatDateInWords, formatPublisDate, formatTime, getPoster, redirectUrl } from '@/utils/content';
import { usePlayListSongsCount, useStoreContent, useStoreUpdatePlayListSongs } from '@/store/init';
import { getAccessTokenObj } from '@/services/helpers/init.helper';
import AddToThisPlaylistPopup from './addToThisPlaylistPopup';
import PlayContent from './playContent';
import Favourite from './favourite';
import MoreOption from './moreOption';
import { useRouter } from 'next/navigation';
import ArtistName from '@/containers/artistName';
import AlbumName from '@/containers/albumName';
import PlayListSkeleton from '@/containers/skeleton/playListSkeleton';

export default function PlaylistSongsList(props: any) {
    const [songsList, setSongsList] = useState<any>(null);
    const updatePlayListSongs = useStoreUpdatePlayListSongs((state: any) => state.updatePlayListSongs);
    const setUpdatePlayListSongs = useStoreUpdatePlayListSongs((state: any) => state.setUpdatePlayListSongs);
    const setContentData = useStoreContent((state: any) => state.setContentData);
    const setPlayListSongsCount = usePlayListSongsCount((state: any) => state.setPlayListSongsCount);
    const setPlayListSongsDuration = usePlayListSongsCount((state: any) => state.setPlayListSongsDuration);
    const [moreOptionDisable, setMoreOptionDisable] = useState<any>(true)
    const router = useRouter();

    useEffect(() => {
        setUpdatePlayListSongs([]);
        const unsubscribe = useStoreUpdatePlayListSongs.subscribe((state: any) => {
            setSongsList((prevValue: any) => {
                const updatedValue = [...state?.updatePlayListSongs];
                setPlayListSongsCount(updatedValue.length);
                const totalDuration = updatedValue.reduce((accumulator: any, currentValue) => accumulator + currentValue?.duration, 0)
                setPlayListSongsDuration(totalDuration)
                return updatedValue; // Update the state with the modified array
            });
        })
        getPlaylistSongs();
        return () => unsubscribe();
    }, [props]); // eslint-disable-line react-hooks/exhaustive-deps

    async function getPlaylistSongs() {
        let payload = {
            idplaylist: props.playlistId,
            page: 1,
            pagesize: 15
        }
        const songs: any = await getPlaylistSongsAction(payload, getAccessTokenObj());
        setSongsList(songs);
        setUpdatePlayListSongs(songs);
    }

    const redirectDetailPage = (Event: any, item: any) => {
        Event.preventDefault();
        setContentData('');
        const url = redirectUrl(item);
        router.push(url);
    }
    const mouseLiving = () => {
        setMoreOptionDisable(false);
    }
    return (
        <>
            <div className="px-4 py-1 bg-primaryBgColor mt-4">
                {!songsList ?
                    <PlayListSkeleton></PlayListSkeleton>
                    :
                    <div>
                        {songsList && songsList.length > 0 ?
                            <div className="w-full">
                                {songsList.map((item: any, i: number) => {
                                    return (
                                        <div className='border-b border-detailsbordercolor group hover:bg-[#2A2A2A] hover:rounded-md' key={i} onMouseLeave={() => mouseLiving()} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0' }}>
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <div className="relative h-12 w-12">
                                                    <Image className="mx-auto group-hover:brightness-50 ml-2" src={getPoster(item, 'PORTRAIT', 'LOW', 'SQUARE')} alt={item.title} width={48} height={48} />
                                                    <div className='hidden absolute inset-0 group-hover:flex items-center justify-center w-full h-full cursor-pointer ml-2'>
                                                        <PlayContent contentData={item} whereIamFrom="songsList"></PlayContent>
                                                    </div>
                                                </div>
                                                <div className="ml-6">
                                                    <p className='mt-2 hover:underline hover:text-white cursor-pointer text-sm w-40 overflow-hidden whitespace-nowrap overflow-ellipsis' onClick={(Event: any) => redirectDetailPage(Event, item)}>{item.title}</p>
                                                    <p className='flex cursor-pointer hover:underline text-xs text-secondaryItemColor'>
                                                        {(item?.castncrew || item?.bandorartist) ? <ArtistName data={item}></ArtistName> : ''}
                                                    </p>
                                                </div>
                                            </div>
                                            {/* Adjusted margin-left here */}
                                            <div className="text-secondaryItemColor text-sm mt-1 max-md:hidden w-40 overflow-hidden whitespace-nowrap overflow-ellipsis" style={{}}>{item.albumname && <AlbumName data={item}></AlbumName>}</div>
                                            <div className="text-secondaryItemColor text-sm mt-1 mr-24 max-md:hidden w-40">{formatDateInWords(item.publishtime, props?.lang)}</div>
                                            <div className="text-secondaryItemColor text-sm text-right w-120">
                                                <div className='flex gap-2 justify-end items-center'>
                                                    <div className='group-hover:visible invisible mr-2  max-md:hidden'>
                                                        <Favourite id={item.objectid} contentData={item} whereIamFrom={'songslist'} lang={props.lang}></Favourite>
                                                    </div>
                                                    <div className='text-sm'>
                                                        {formatTime(item.duration, props?.lang)}
                                                    </div>
                                                    <div className='group-hover:visible invisible max-md:visible'>
                                                        <MoreOption id={item.objectid} contentData={item} type={'songslist'} invisible={false} lang={props.lang} position={'left'} whereIamFrom={'playlistSongslist'} idplaylist={props.playlistId} moreOptioDisable={moreOptionDisable}></MoreOption>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                            : <div className='w-full flex flex-col items-center justify-center'>
                                <p>{props?.lang?.added_any_yet}</p>
                                <button className='px-4 py-2 m-5 bg-white text-primaryBgColor text-center rounded-full'>
                                    <AddToThisPlaylistPopup itemId={props.playlistId} lang={props.lang}></AddToThisPlaylistPopup>
                                </button>
                            </div>}
                    </div>
                }

            </div>
        </>
    )
}

