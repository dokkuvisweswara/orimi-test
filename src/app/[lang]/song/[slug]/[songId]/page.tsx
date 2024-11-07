'use client'
import { useEffect, useState } from "react";
import dynamic from 'next/dynamic';
const SingleSongDetailPage: any = dynamic(() => import('@/components/v1/singleSongDetailPage'));
import { actGetCurrentLanguage } from "@/utils/accessCurrentLang";
import { getDictionary } from "@/i18n/dictionaries";


export default function SongId({
    params,
  }: {
    params: { songId: string };
  }) {
    const [lang, setLang] = useState<any>(null);

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
      
    }, []);
    
    return ( <SingleSongDetailPage songId={params.songId} lang={lang}></SingleSongDetailPage>)
}