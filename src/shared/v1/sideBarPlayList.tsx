'use client'


import PlayListCard from "./playListCard";

import { MouseEventHandler, useEffect, useState } from "react";
import CreatePlayList from "./createPlaylist";
import {getListOfPlaylists} from '@/services/actions/playlist.actions';
import { useStoreContent, useStore, useStoreRecallPlaylist } from '@/store/init'
import { useRouter, usePathname } from "next/navigation";
import { getAccessTokenObj } from "@/services/helpers/init.helper";
import { getDictionary } from "@/i18n/dictionaries";
import { actGetCurrentLanguage } from "@/utils/accessCurrentLang";
import { getCookie } from "@/hooks/client.cookie";

interface PlaylistItem {
    idplaylist: string;
    title: string;
    icon: string;
    playlistaccess:string;
    totalContent: number
}

export default function SideBarPlayList() {    
    const router = useRouter();
    const [lang, setLang] = useState<any>(null);
    const [activeTab, setActiveTab] = useState<any>(null);
    const [listOfPlaylistData, setListOfPlaylistData] = useState<PlaylistItem[]>([]);
    const setAllPlaylistData = useStore((state : any) => state.setAllPlaylistData);
    const getAllPlaylistData = useStore((state : any) => state.allPlaylistData);
    const setContentData = useStoreContent((state : any) => state.setContentData);
    const getCounter = useStore((state : any) => state.counter);
    const pathname = usePathname()

    useEffect(() => {
        const unsubscribe = useStoreRecallPlaylist.subscribe((state: any) => {
            getPlayListsData();
        });
        getPlayListsData();
        return () => unsubscribe();
    }, []);  // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if ((window as any).setStoreLanguageDataset) {
            setLang((window as any).setStoreLanguageDataset)
          } else {
            actGetCurrentLanguage().then((langSelected) => {
              getDictionary(langSelected).then((language: any) => {
                setLang(language);
              })
            })
          }      
          setActiveTab(pathname) 
        const unsubscribe = useStore.subscribe((state: any) => {
            // getPlayListsData()
            setListOfPlaylistData([...state?.allPlaylistData]);
        });
        
        return () => unsubscribe();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
    
    async function getPlayListsData() {
        if (getCookie('sessionToken')) {
            const playlistData:any = await getListOfPlaylists(getAccessTokenObj());
            setAllPlaylistData([...playlistData]);
        }

    }

    function selectPlaylist(playList: any) {        
        setContentData({...playList});         
        setTimeout(() => {
            router.push(`/playlist/${playList.idplaylist}`);
        }, 200)
    }

    return (
        <ul  className="space-y-2 mt-2 mb-[1.5rem]">
            <li id="newPlayList" className="flex items-center justify-center"
                key={'createPlaylist'}>                
                {lang && <CreatePlayList lang={lang}  />}
            </li>
            {
                listOfPlaylistData.map((item:PlaylistItem, i:number) => {
                    return (
                    <li key={i}>
                        <button className={`flex items-center p-2  rounded-lg dark:text-primaryColor hover:bg-selectedBGSecondaryColor dark:hover:bg-selectedBGSecondaryColor group w-full ${(activeTab?.includes("/"+item?.idplaylist)) ? 'bg-[#232323]  text-selectedBGPrimaryColor font-bold text-lg' : ''}`} onClick={() => {selectPlaylist(item)}}>
                            <PlayListCard itemlist={item}></PlayListCard>
                        </button>
                    </li>
                    )
                })
            }
        </ul>
    )
}


