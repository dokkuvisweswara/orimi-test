'use client'

// import CommonSidebar from "@/components/v1/CommonSidebar";
import PodcastEpisodeDetailPage from "@/components/v1/podcastEpisodeDetailPage";
import { actConfig } from "@/services/actions/init.action";
import { actGetCurrentLanguage } from "@/utils/accessCurrentLang";
import { getDictionary } from "@/i18n/dictionaries";
import { useEffect, useState } from "react";

export default function EpisodeDetailsPage({
    params,
  }: {
    params: { episodeId: string };
  }) {
    let config: any = '';
    const [lang, setLang] = useState<any>(null);

    config = localStorage.getItem('primary-config');
    config = config ? JSON.parse(config) : null;
    if (!config) {
       let configObj = actConfig().then((configObj) => {
        config = configObj?.result;
       })
    }

    useEffect(() => {
      actGetCurrentLanguage().then((langSelected:any) => {
        getDictionary(langSelected).then((language: any) => {
          setLang(language);
        })
      })
    }, [])

    return(
        <div >
          {/* <CommonSidebar  lang={lang}/> */}
            <PodcastEpisodeDetailPage episodeId={params.episodeId}></PodcastEpisodeDetailPage>
        </div>
    )
}