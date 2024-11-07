'use client'

// import CommonSidebar from "@/components/v1/CommonSidebar";
import PlayListDetailspage from "@/components/v1/playListDetailpage";
import { getDictionary } from "@/i18n/dictionaries";
import { actConfig } from '@/services/actions/init.action'
import { actGetCurrentLanguage } from "@/utils/accessCurrentLang";
import { useState, useEffect } from "react";

export default  function PlaylistId({
    params,
  }: {
    params: { playlistId: string };
  }) {
    let config: any = '';
    const [lang, setLang] = useState<any>(null);
    if (typeof localStorage !== 'undefined') {
      config = localStorage.getItem('primary-config');
    }
   
    config = config ? JSON.parse(config) : null;
    if (!config) {
       let configObj = actConfig().then((configObj) => {
        config = configObj?.result;
       })
    }

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


    return (
        <>          
        <div>
        {/* <CommonSidebar lang={lang} /> */}
          <PlayListDetailspage playlistId={params.playlistId} lang={lang}></PlayListDetailspage>
        </div>
        </>
    )
}