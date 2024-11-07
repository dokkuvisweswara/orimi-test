'use client'
import EmptyDiv from '@/containers/emptyDiv';
import { actSectionData } from '@/services/actions/content.action';
import { getAccessTokenObj } from '@/services/helpers/init.helper';
import VerticalGridSlider from '@/shared/v1/verticalGridSlider';
import { useEffect, useState } from 'react';
import SkeletonCard from '@/components/v1/skeletonCard';


export default function ArtistDetailsPage(props: any) {
    const [loading, setLoading] = useState<string>('loading');

    const [artistDatabase, setArtistDatabase] = useState<any>({});

    useEffect(() => {
        getArtistDb();
    }, [props.artistData])

    const getArtistDb = function () {
        actSectionData(props.artistData, getAccessTokenObj()).then((response) => {
            let fetchedData: any = {};
            if (response && response.data) {
                let SINGLE: any = [];
                let EP: any = [];
                let ALBUM: any = [];
                if (props.combination.objecttype == "ALBUM" && props.combination.category == "MUSIC") {

                    response.data.forEach((raw: any) => {
                        if (raw.tags.includes('Single') || raw.tags.includes('SINGLE')) {
                            SINGLE.push(raw);
                        } else if (raw.tags.includes('Ep') || raw.tags.includes('EP')) {
                            EP.push(raw)
                        } else {
                            ALBUM.push(raw)
                        }
                    })

                    if (SINGLE.length > 0) {
                        fetchedData = { type: 'ALBUMS', data: SINGLE, title: 'Single' };
                    } if (EP.length > 0) {
                        fetchedData = { type: 'ALBUMS', data: EP, title: 'EP' };
                    } if (ALBUM.length > 0) {
                        fetchedData = { type: 'ALBUMS', data: ALBUM, title: 'Album' };
                    }

                } else {
                    fetchedData = { type: props.combination.category, data: response.data, title: props.combination.title, apidataset: props.artistData };
                }

                setArtistDatabase(fetchedData)
                setLoading('success')

            } else {
                setLoading('failed')
            }
        })
    }

    return (
        <div className="text-center text-primaryColor font-bold">

            {loading == 'loading' && (<SkeletonCard />)}

            {loading == 'success' && (<VerticalGridSlider
                sectionData={artistDatabase.data}
                headerData={{ listType: artistDatabase.type, title: props?.lang[artistDatabase.title], engTitle: artistDatabase.title }}
                apiCallData={artistDatabase.apidataset} // Pass the whole item for additional data if neededx
                lang={props?.lang}
                className="mb-10"
            />)
            }
        </div>
    )
}
