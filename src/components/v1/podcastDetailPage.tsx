'use client'

import DetailsContentBar from '@/shared/v1/detailsContentBar';
import CategoryTabs from '@/shared/v1/categoryTabs';
import Description from '@/shared/v1/description';
import { actContentData } from '@/services/actions/content.action';
import ProdcastTabsSection from '@/shared/v1/prodcastTabsSection';
import { useEffect, useState } from 'react';
import { useStoreContent } from '@/store/init';
import { getAccessTokenObj } from '@/services/helpers/init.helper';
import { scrollToTop } from "@/utils/basicHelper";
import DetailsContentBarSkeleton from '@/containers/skeleton/detailsContentBarSkeleton';
import PodcastListSkeleton from '@/containers/skeleton/podcastListSkeleton';
import { Helmet } from "react-helmet";


export default function PodcastDetailspage(props: any){
    const tabsList: any = [{title: 'episode', tabId: 'EPISODE'}, {title:'moreLikeThis', tabId: 'RELATED'}];
    const getContentData = useStoreContent((state : any) => state.contentData);
    const [podcastData, setPodcastData] = useState<any>(null);
    const [descriptionData, setDescriptionData] =  useState<any>(false);
    const [categoryTabsData, setCategoryTabsData] = useState([]);

    useEffect(() => {
        scrollToTop() 
        if (getContentData) {
            setPodcastData({...getContentData});
            let description = getContentData.shortdescription ? getContentData.shortdescription : getContentData.longdescription;
            setDescriptionData(description);
            let tabData: any = [];
            getContentData?.category && tabData.push(getContentData?.category);
            getContentData?.genre && tabData.push(getContentData?.genre);


            if (getContentData?.subgenre) {
                tabData = tabData.concat(getContentData?.subgenre) 
            }
            setCategoryTabsData(tabData);
        } else {
            
            callApiToGetPodcastData();
        }
    }, [getContentData]); // eslint-disable-line react-hooks/exhaustive-deps

    const callApiToGetPodcastData = async () => {
        let contentPayload = {
            id: props.podcastId,
            endpoint: 'subscriber/v1/content/'
        };
        const responseData = await actContentData(contentPayload, getAccessTokenObj());
        setPodcastData(responseData);        
        let description = responseData?.shortdescription ? responseData?.shortdescription : responseData?.longdescription;
        setDescriptionData(description)
        let tabData: any = [];
        tabData.push(responseData.category);
        tabData.push(responseData.genre);

        if (responseData?.objecttag) {
            tabData = tabData.concat(responseData?.objecttag) 
        }
        setCategoryTabsData(tabData);
    }

    return (
        <>
            <Helmet>
                <title>{`Listen ${podcastData?.title || ''} on ORI MI`}</title>
                <meta name="description" content={ `Listen ${podcastData?.title || ''} on ORI MI`} />
            </Helmet>
            <section  className='w-full sub-container fadeAmination'>
                <div className="bg-primaryBgColor  text-primaryColor w-full">
                    {podcastData ? 
                    <div className="mx-auto">
                        <DetailsContentBar contentData={podcastData} type="podcast" contentId={props.podcastId} lang={props.lang}></DetailsContentBar>         
                    </div>
                    :
                    <div className='skeleton'>
                        <DetailsContentBarSkeleton></DetailsContentBarSkeleton>
                    </div>
                    }
                    <div className="description p-4">
                        <Description description={descriptionData} lang={props.lang}></Description>
                    </div>
                    <div className="p-4">
                        <CategoryTabs contentData={categoryTabsData} clickable={false} whereIamFrom={'podcastDetailPage'} lang={props.lang}></CategoryTabs>
                    </div>
                    {podcastData ?
                    <div className="related-tabs-section">
                        <ProdcastTabsSection contentData={podcastData} contentId={props.podcastId} tabsList={tabsList} lang={props.lang}></ProdcastTabsSection>
                    </div>
                    :
                    <PodcastListSkeleton></PodcastListSkeleton>
                    }
                </div>
            </section>

        </>
    )
}