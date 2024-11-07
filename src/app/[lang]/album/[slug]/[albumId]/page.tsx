'use client'
import AlbumDetailspage from "@/components/v1/albumDetailPage";
import { getDictionary } from "@/i18n/dictionaries";
import { useStoreLanguageDataset } from "@/store/init";
import { actGetCurrentLanguage } from "@/utils/accessCurrentLang";
import { scrollToTop } from "@/utils/basicHelper";
import { useEffect, useState } from "react";


export default  function Album({
    params,
  }: {
    params: { albumId: string };
  }) {

    const [lang, setLang] = useState<any>(null);
    const getStoreLanguageDataset = useStoreLanguageDataset((state: any) => state.getStoreLanguageDataset);

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

    return ( <AlbumDetailspage albumId={params.albumId} lang={lang}></AlbumDetailspage> )
}