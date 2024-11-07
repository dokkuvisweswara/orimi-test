import SkeletonCard from "@/components/v1/skeletonCard";
import { actSectionData } from "@/services/actions/content.action";
import { getAccessTokenObj } from "@/services/helpers/init.helper";
import VerticalGridSlider from "@/shared/v1/verticalGridSlider"
import { useEffect, useState } from "react"

export  function GenereDetailPage ({ fetchedData, lang, actGetContentData }: any) {
    const [storeData, setStoredata] = useState<any>([]);
    const [loading, setLoading] = useState<string>('loading');

   async function getSlider () {
        const response = await actSectionData(fetchedData.data, getAccessTokenObj());
        if (response && response.data.length > 0) {
            setStoredata(response.data)
            setLoading('success')
            actGetContentData(1);
        } else {
            setLoading('failed')
            actGetContentData(0);
        }
    }
    useEffect(() => {
        getSlider();
    }, [fetchedData])

    return (
        <>
            { loading == 'loading' && <SkeletonCard /> }

            {
            loading == 'success' && <VerticalGridSlider
                sectionData={storeData}
                headerData={{ listType: fetchedData.type, title:fetchedData.title, engTitle: fetchedData.title }} 
                apiCallData={fetchedData.data} // Pass the whole item for additional data if needed
                lang={lang}
            />
            }

        </>

    
    )
}

