'use client'
import PodcastDetailspage from "@/components/v1/podcastDetailPage";
import { getDictionary } from "@/i18n/dictionaries";
import { actGetCurrentLanguage } from "@/utils/accessCurrentLang";
import { useState, useEffect } from "react";

export default  function PodcastId({
    params,
  }: {
    params: { podcastId: string };
  }) {
    const [lang, setLang] = useState<any>(null);
    
    useEffect(() => {
      actGetCurrentLanguage().then((langSelected) => {
        getDictionary(langSelected).then((language: any) => {
          setLang(language);

        })
      })
    }, []);

    return( <PodcastDetailspage podcastId={params.podcastId} lang={lang}></PodcastDetailspage> )
}