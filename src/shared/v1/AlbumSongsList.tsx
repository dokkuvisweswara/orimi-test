
'use client'

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { actSectionData } from '@/services/actions/content.action';
import { getPoster, formatPublisDate, formatTime, formatDateInWords, redirectUrl } from '@/utils/content';
import { getAccessTokenObj } from '@/services/helpers/init.helper';
import PlayContent from './playContent';
import MoreOption from './moreOption';
import Favourite from './favourite';
import { useStoreContent, useStoreLanguageDataset, useStoreMakeSaveDetailLists } from '@/store/init';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import ArtistName from '@/containers/artistName';
import PlayListSkeleton from '@/containers/skeleton/playListSkeleton';

export default function AlbumSongsList(props: any) {
  const [albumSongsData, setAlbumsSongsData] = useState<any>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(1);

  
  const setContentData = useStoreContent((state: any) => state.setContentData);

  const setDetailListSave = useStoreMakeSaveDetailLists((state: any) => state.setDetailListSave);



  const router = useRouter();

  let contentPayload = {
    id: props.albumId,
    endpoint: 'subscriber/v1/content/',
    params: {
      albumid: props.albumId,
      objecttype: 'CONTENT',
      orderby: {
        track: 'ASC',
      },
      page: currentPage,
      pagesize: 15,
    },
  };

  useEffect(() => {
    songsListApicall();
    return () => {
      (window as any).DETAILPAGELISTTRACKS = ""
      setDetailListSave(null)
    }
  }, [currentPage]); // eslint-disable-line react-hooks/exhaustive-deps



  // useEffect(() => {
  //   songsListApicall();
  // }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {

    let itemTarget: any = document.getElementById(`lazyLoadSectionAlbumSongs`);
    if (!itemTarget) return;
    let observer: any = {};
    const observerCallback = (entries: any) => {
      const [entry] = entries;
      if ( totalCount <= albumSongsData.length && albumSongsData.length >= 1) {
        itemTarget.style.display = 'none';
        observer.unobserve(itemTarget);
        observer.disconnect();
        return;
      }
      if (entry.isIntersecting) {
        setCurrentPage(currentPage + 1);
      }
    };

    let options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };
    
    observer = new IntersectionObserver(observerCallback, options);
    observer.observe(itemTarget);
    return () => {
			if (itemTarget) {
				observer.unobserve(itemTarget);
        observer.disconnect();
			}
		};
  }, [albumSongsData]);

  const songsListApicall = async () => {
    const albumData = await actSectionData(contentPayload, getAccessTokenObj());
    if (albumData && albumData.data) {
      let updatedSongsList = [...albumSongsData, ...albumData.data]
      setAlbumsSongsData(updatedSongsList);
      setDetailListSave(updatedSongsList);

      (window as any).DETAILPAGELISTTRACKS = updatedSongsList
    }
    setTotalCount(albumData.totalcount)
    // albumData && setAlbumsSongsData([...albumData.data]);
  };


  const redirectDetailPage = (Event: any, item: any) => {
    Event.preventDefault();
    setContentData({ ...item });
    const url = redirectUrl(item);
    router.push(url);
  }

  return (
      <div className="w-full mt-4">
        {!albumSongsData
          ?
          (
            <PlayListSkeleton></PlayListSkeleton>
          )
          :
          (<>
            <div id='maincontent'>
            {albumSongsData && albumSongsData.length > 0 ? (
              albumSongsData.map((item: any, i: number) => {
                const songCount = i + 1; // Calculate the count based on the index
                const isLastItem = i === albumSongsData.length - 1;

                return (
                  <div key={i} className={`group flex items-center justify-between hover:bg-[#2A2A2A] ${isLastItem ? '' : 'border-b border-detailsbordercolor'} rounded-sm hover:rounded-md songsList-${i}`} id={`songsList-${i}`}>
                    <div className="flex items-center">
                      <div className="p-2 max-md:hidden w-10">
                        <div className='w-3'>
                          <span className='group-hover:hidden'>{songCount}</span>
                          <span className='group-hover:block hidden' id={`songsList-${i}-play`}>
                            <PlayContent contentData={item} whereIamFrom="songsList" uniqueFlag={`songsList-${i}`} />
                          </span>
                        </div>
                      </div>
                      <div className="pb-2 p-2 text-primaryItemColor text-sm flex flex-col w-60 overflow-hidden">
                        <p className='hover:underline hover:text-primaryColor cursor-pointer overflow-hidden whitespace-nowrap overflow-ellipsis' onClick={(Event: any) => redirectDetailPage(Event, item)} title={item.title}>{item.title}</p>
                        <p className='flex cursor-pointer hover:underline text-sm text-secondaryItemColor'>
                          {(item?.castncrew || item?.bandorartist)
                            ? <ArtistName data={item}></ArtistName>
                            : ''
                          }
                        </p>
                      </div>
                    </div>
                    <div className="pb-2 text-secondaryItemColor text-sm max-md:hidden">{item.albumname}</div>
                    <div className="text-secondaryItemColor text-sm max-md:hidden">{formatDateInWords(item.publishtime, props?.lang)}</div>
                    <div className="text-secondaryItemColor text-right">
                      <div className='flex gap-4 justify-end items-center pr-3'>
                        <div className='group-hover:visible  max-md:visible invisible mr-4'>
                          <Favourite id={item.objectid} contentData={item} whereIamFrom={'songslist'}></Favourite>
                        </div>
                        <div className='text-sm'>
                          {formatTime(item.duration, props?.lang)}
                        </div>
                        <div className='group-hover:visible invisible max-md:visible'>
                          <MoreOption id={item.objectid} contentData={item} type={'songslist'} invisible={false} position={'left'} lang={props?.lang}></MoreOption>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="py-2 px-2">
                {props?.no_songs_available}
              </div>
            )}
          </div>
          {albumSongsData && albumSongsData.length > 0 && (<div id="lazyLoadSectionAlbumSongs">
            <PlayListSkeleton></PlayListSkeleton>  
          </div>)
          }
    
          </>
        )
        }
      </div>
  );
}

