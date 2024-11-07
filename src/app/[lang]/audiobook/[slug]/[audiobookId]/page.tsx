'use client'

import AudioBookDetailsPage from "@/components/v1/audioBookDetailsPage";
import { getDictionary } from "@/i18n/dictionaries";
import { actGetCurrentLanguage } from "@/utils/accessCurrentLang";
import { scrollToTop } from "@/utils/basicHelper";
import { useState, useEffect } from "react";

export default  function AudiobookId({
    params,
  }: {
    params: { audiobookId: string };
  }) {
    const [lang, setLang] = useState<any>(null);

    useEffect(() => {
      scrollToTop();

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

    return ( <AudioBookDetailsPage audiobookId={params.audiobookId} lang={lang}></AudioBookDetailsPage> )
}