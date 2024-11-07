'use client'


import { getAccessTokenObj } from  "@/services/helpers/init.helper";
import VerticalGridSlider from "./verticalGridSlider";
import { useEffect, useState } from "react";
import { actRelatedContentData } from "@/services/actions/content.action";
import SkeletonCard from "@/components/v1/skeletonCard";

export default function RelatedSection(props: any) {
    const [songRelatedData, setsongRelatedData] = useState<any>(false);
    const [getSeeAllSectionConfig, setSeeAllSectionConfig] = useState<any>(false);


    useEffect(() => {
        calApiToGetRelatedContentData();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const calApiToGetRelatedContentData = async () => {
        let relatedPayload = {
            endpoint: 'subscriber/v1/content/related/' + props.songId,
            params: {type: 'related'}
        };
        setSeeAllSectionConfig(relatedPayload);
        const responseData = await actRelatedContentData(relatedPayload, getAccessTokenObj());
        if (responseData && responseData.data) {
            setsongRelatedData(responseData.data);
        }
    }
  
    return (
        <div className="related-content-slider">
            { songRelatedData && <VerticalGridSlider sectionData={songRelatedData} headerData={{titleheader: props.lang?.related_songs, listType: 'TWOROWS', link: props.lang?.related_songs, engTitle: 'Related Songs'}} lang={props.lang} apiCallData={getSeeAllSectionConfig} ></VerticalGridSlider> }
            {!songRelatedData && <SkeletonCard ></SkeletonCard> }
        </div>
    )
}