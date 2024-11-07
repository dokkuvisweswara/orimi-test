'use client'
import { useEffect, useState } from 'react';
import { actSectionData } from '@/services/actions/content.action';
import { getAccessTokenObj } from '@/services/helpers/init.helper';
import ArtistDetailsPage from '@/components/v1/artistDetailPage';
import { actGetCurrentLanguage } from '@/utils/accessCurrentLang';
import { getDictionary } from '@/i18n/dictionaries';
import ArtistInformation from '@/components/v1/artistInformation';
import { scrollToTop } from "@/utils/basicHelper";

export default function ArtistId({
    params,
}: {
    params: { artistId: string };
}) {
    const [artistData, setArtistData] = useState<{
        title: any; type: string; data: any; 
    }[]>([]);
    const [loading, setLoading] = useState(true);
    const [castAndCrewData, setCastAndCrewData] = useState<any>(null);
    const [lang, setLang] = useState<any>(null);
    const [apiCombinationList, setApiCombinationList] = useState<any>([]);


    useEffect(() => {
        scrollToTop();
        actGetCurrentLanguage().then((langSelected) => {
          getDictionary(langSelected).then((language: any) => {
            setLang(language);
  
          })
        })
      }, []);
      
    useEffect(() => {
        const fetchData = async () => {
            try {
                if (params && params.artistId) {

                    const combinations = [
                        { category: 'MUSIC', objecttype: 'ALBUM', title: 'Album' },
                        { category: 'MUSIC', objecttype: 'CONTENT', title: 'Popular Songs' },
                        { category: 'AUDIOBOOK', objecttype: 'ALBUM', title: 'Audiobook' },
                        { category: 'PODCAST', objecttype: 'SERIES', title: 'Podcast' }
                    ];

                    const fetchedData = [];

                    for (const combination of combinations) {
                        const payload = {
                            category: combination.category,
                            objecttype: combination.objecttype,
                            artist: params.artistId, // Adjust the parameter name
                            page: 1,
                            pagesize: 15
                        };
                        let apidataset = { endpoint: 'subscriber/v1/content', params: payload };

                        fetchedData.push({apidataset, combination})
                    }


                    const castAndCrewResponse = await actSectionData(
                        { 
                            endpoint: 'subscriber/v1/metadata/castncrew',
                            params: {
                                itemlist: JSON.stringify([params.artistId]) // Convert to JSON array
                            }
                        }, 
                        getAccessTokenObj()
                    );

                    if (castAndCrewResponse && castAndCrewResponse.data) {
                        setCastAndCrewData(castAndCrewResponse.data);
                    }
                        
                    setApiCombinationList(fetchedData);
                    setLoading(false);
                    
                }
            } catch (error) {
                setLoading(false);
            }
        };
        fetchData();
    }, [params]);

    return (    
            <section  className='sub-container w-full'>
                <ArtistInformation castAndCrewDataProps={castAndCrewData} lang={lang}></ArtistInformation>
                { apiCombinationList.map((item: any, index: number) => {
                    return  <ArtistDetailsPage artistData={item.apidataset} combination={item.combination} lang={lang} key={index} />
                })} 
                
            </section>
    );
}
