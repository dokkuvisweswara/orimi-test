'use client'

import { use, useEffect, useState } from "react";
import HorizontalGridSlider from "./horizontalGridSlider";
import { useFirebaseLoginStore, useStoreRecallPlaylist, useStoreUser } from "@/store/init";
import { getRecentlyPlayedFromFirebase } from "@/libs/firebaseUtility";
import { getCookie } from "@/hooks/client.cookie";
import { actRecentlyPlayedContentData } from "@/services/actions/content.action";
import { getAccessTokenObj } from "@/services/helpers/init.helper";
import { filterDataByMenu } from "@/utils/recentallyPlayed";

export default function RecentlyPlayed(props: any) {    
    const [isUserPresented, setIsUserPresented] = useState<any>(false);
    const [recentData, setRecentData] = useState<any>(null);
    const [firebaseData, setFirebaseData] = useState<any>(null);
    const subscriberId= getCookie("subscriberId");
    const profileId= getCookie("ProfileId");
    const sessionToken= getCookie("sessionToken")
    const getUserPresented = useStoreUser((state: any) => state.isUserPresented);  
    const isFirebaseLogin = useFirebaseLoginStore((state:any) => state.isFirebaseLogin)
    
    useEffect(() => {           
        let unsybscribe = useStoreUser.subscribe((state: any) => {
            setIsUserPresented(state?.isUserPresented);
        });
        setIsUserPresented(getUserPresented);       
        recentFirebaseData();              
        return () => unsybscribe();
    },[isUserPresented,isFirebaseLogin]); // eslint-disable-line react-hooks/exhaustive-deps
    
    useEffect(() => {
        let unsubscribe = useStoreRecallPlaylist.subscribe((state: any) => {
            recentFirebaseData();
        });
        return () => unsubscribe();
    },[]); // eslint-disable-line react-hooks/exhaustive-deps
    const recentFirebaseData = async() => {
        if (!subscriberId) return false;
        
        const res = await getRecentlyPlayedFromFirebase({subscriberId, profileId});
        if(res) {
            let dataTemp = res.length > 15 ? res.slice(0, 15) : res;
            setFirebaseData(dataTemp);
            checkLanguage(dataTemp);
        }
    };

    const checkLanguage = async (dataTemp: any) => {
        let pathname = getPathname()
        let objectIdList:any = [];
        dataTemp && dataTemp.map((item: any, i:number) => {
            objectIdList.push(`"${item.objectid}"`);
        });
        if (objectIdList && objectIdList.length > 0) {
            const payload = {
                contentlist: "[" + objectIdList + "]"
            };
            const responseData = await actRecentlyPlayedContentData(payload, getAccessTokenObj());
            if(responseData.data) {   
                let result :any = [];
                setRecentData(null)
                result = filterDataByMenu(responseData.data, pathname)
                setRecentData(result);
            }
        }
    }

    const getPathname = () =>{
        if (typeof window !== 'undefined') { 
            const currentPathname = window.location.pathname;
            const withOutSlash = currentPathname.split('/') 
            const word = withOutSlash[withOutSlash.length - 1].toLowerCase();                       
            return word
        } 
    }
    return(
        <>
        {subscriberId && sessionToken && recentData?.length>0 && <HorizontalGridSlider contentData={recentData} lang={props.lang}></HorizontalGridSlider>}
        </>
    )
}