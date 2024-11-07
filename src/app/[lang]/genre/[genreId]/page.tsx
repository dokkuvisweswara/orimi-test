'use client'
import { useEffect, useState } from 'react';;
import { actConfig } from '@/services/actions/init.action'
import { actGetCurrentLanguage } from "@/utils/accessCurrentLang";
import { getDictionary } from '@/i18n/dictionaries';
import { GenereDetailPage } from './genereDetailPage';
import { Helmet } from "react-helmet";

export default function GenreDetail({
    params,  
}: {
    params: { genreId: string };
}) {
    const [fetchedData, setFetchedData] = useState<{
        title: any; type: string; data: any; 
}[]>([]);
const [loading, setLoading] = useState(true);
const [lang, setLang] = useState<any>(null);

const [readyPayload, setReadyPlayload] = useState<any>(null);
const [isContentAvai, setisContentAvai] = useState<number>(0);

let config: any = '';
config = localStorage.getItem('primary-config');
config = config ? JSON.parse(config) : null;
if (!config) {
   let configObj = actConfig().then((configObj: any) => {
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
          
        const fetchData =  () => {
            try {
                if (params && params.genreId) {
                    const combinations = [
                        { category: 'MUSIC', objecttype: 'ALBUM' , title: 'Album'},
                        { category: 'MUSIC', objecttype: 'CONTENT' ,title: 'Songs'},
                        { category: 'AUDIOBOOK', objecttype: 'ALBUM' , title: 'Audiobook'},
                        { category: 'AUDIOBOOK', objecttype: 'CONTENT', title: ' Audio Chapter' },
                        { category: 'PODCAST', objecttype: 'SERIES' , title: 'Podcast'}
                    ];

                    const fetchedData = [];

                    for (const combination of combinations) {
                        const payload = {
                            category: combination.category,
                            objecttype: combination.objecttype,
                            genre: params.genreId,
                            subgenre: params.genreId,
                            groupbyor: JSON.stringify(['genre', 'subgenre'])
                        };

                        fetchedData.push({ type: combination.category, data: { endpoint: 'subscriber/v1/content', params: payload }, title: combination.title});
                    }
                    
                    setReadyPlayload(fetchedData);
                    setLoading(false); 
                }
            } catch (error) {
                setLoading(false); 
            }
        };

        fetchData(); 
    }, [params]);

    function actGetContentData (item: any) {
        setisContentAvai((prev: any) => {
             return prev + item
        })
    }

    return (
        <div>
            <Helmet>
            <title>{`Listen Genre Base Music on ORI MI`}</title>
            <meta name="description" content={ `Listen Genre Base Music on ORI MI`} />
            </Helmet>
          <div className='sub-container w-full'>
        { isContentAvai == 0 && (
            <div className="text-center text-primaryColor font-bold absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                {lang?.no_data_found}
            </div>
            )
        }

            {
               readyPayload && readyPayload.map((item: any, index: number) => {
                  return  <GenereDetailPage fetchedData={item} key={index} lang={lang} actGetContentData={actGetContentData}></GenereDetailPage>
               }) 
            }

          </div>
        </div>
    );
}
