'use client'

import DetailsContentBar from "@/shared/v1/detailsContentBar";
import CategoryTabs from "@/shared/v1/categoryTabs";
import Description from "@/shared/v1/description";
import { actContentData } from "@/services/actions/content.action";
import ProdcastTabsSection from "@/shared/v1/prodcastTabsSection";
import { getAccessTokenObj } from "@/services/helpers/init.helper";
import { useEffect, useState } from "react";
import { useStoreContent } from "@/store/init";
import { scrollToTop } from "@/utils/basicHelper";
import { Helmet } from "react-helmet";

export default function AudioBookDetailsPage(props: any) {
    const tabsList: any = [{title:'chapter', tabId: 'CHAPTER'}, {title:'moreLikeThis', tabId: 'RELATED'}];
    const [categoryTabsData, setCategoryTabsData] = useState([]);


    const getContentData = useStoreContent((state : any) => state.contentData);
    const [audioBookData, setAudioBookData] = useState<any>(false);
    const [descriptionData, setDescriptionData] = useState<any>(false);
    useEffect(() => {
        scrollToTop();   
        if(getContentData){
            let description = getContentData.shortdescription ? getContentData.shortdescription : getContentData.longdescription;
            setAudioBookData({...getContentData});
            generateCatagoryData(getContentData);
            setDescriptionData(description);
        } else {
            
            callApiToGetAudioBookData();
        }        
    },[getContentData]); // eslint-disable-line react-hooks/exhaustive-deps

    const callApiToGetAudioBookData = async () => {
        let payload = {
            id: props.audiobookId,
            endpoint: 'subscriber/v1/content/'
        };
        const responseData = await actContentData(payload, getAccessTokenObj());
        setAudioBookData({...responseData});
        let description = responseData?.shortdescription ? responseData?.shortdescription : responseData?.longdescription;
        setDescriptionData(description)
        generateCatagoryData(responseData);
    }
    const generateCatagoryData = async (data: any) => {
        let tabData: any = [];
        data?.category && tabData.push(data?.category);
        data?.genre && tabData.push(data?.genre);
        data?.objecttype && tabData.push(data?.objecttype);
        setCategoryTabsData(tabData);
    }
    return (       
        <>

            <Helmet>
                <title>{`Listen ${audioBookData?.title} on ORI MI` || ''}</title>
                <meta name="description" content={ `Listen ${audioBookData?.title || ''} on ORI MI`|| ''} />
            </Helmet>
            <section  className='w-full sub-container fadeAmination'>
                <div className="bg-primaryBgColor  text-primaryColor w-full">
                    <div className="mx-auto">
                        <DetailsContentBar contentData={audioBookData} type="audiobook" contentId={props.audiobookId} lang={props.lang}></DetailsContentBar>
                    </div>                    
                    <div className="description p-4">
                        <Description description={descriptionData} lang={props.lang}></Description>
                    </div>
                    <div className="p-4">
                        <CategoryTabs contentData={categoryTabsData} clickable={false} whereIamFrom={'audioBookDetailsPage'} lang={props.lang}></CategoryTabs>
                    </div>
                    <div className="tabsSection">
                       <ProdcastTabsSection contentData={audioBookData} contentId={props.audiobookId} tabsList={tabsList} lang={props.lang}></ProdcastTabsSection>
                    </div>
                </div>
            </section>
        </>
        
    )
}