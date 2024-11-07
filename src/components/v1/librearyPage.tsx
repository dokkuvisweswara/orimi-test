'use client'
import CategoryTabs from "@/shared/v1/categoryTabs";

import { actConfig } from '@/services/actions/init.action'
import { useEffect, useState } from "react";
import { getAllContentFromFirebase } from "@/libs/firebaseUtility";
import GridLayout from "./gridLayout";
import { getCookie } from "@/hooks/client.cookie";

import { dataType } from "@/utils/content";
import { useStore, useStoreFavourite } from "@/store/init";
import { useRouter } from "next/navigation";

import { PlayListView } from "./playlistView";
import { actRecentlyPlayedContentData } from "@/services/actions/content.action";
import { getAccessTokenObj } from "@/services/helpers/init.helper";



export default function LibraryPage({lang}: any) {    
    const [categoryData,setCategoryData] = useState<any>('MUSIC')
    const [libraryMenu,setLibraryMenu] = useState<any>([])
    const [libraryData, setLibraryData] = useState<any>()
    const [firebaseData,setFirebaseData]=useState<any>([])
    const [getConfig, setConfig] = useState("")    
    const subscriberId= getCookie("subscriberId")
    const profileId= getCookie("ProfileId")
    const [showLibrary,setShowLibrary]= useState<any>(null)
    let sessionToken = getCookie('sessionToken');

    const getListOfPlaylists = useStore((state: any) => state.allPlaylistData);
    const getFavourite = useStoreFavourite((state:any)=>state.isFavouriteRemoved)
    const [isRemoved,setRemoved]= useState<any>()
    const router = useRouter()

    useEffect(()=>{
        if(getCookie("sessionToken")){
            setShowLibrary(true)
        } else {
            setShowLibrary(false)
        }
        appConfigCall() 
        if(sessionToken){
            fetchAllFirebaseData()       
        }
    },[sessionToken,getFavourite]); // eslint-disable-line react-hooks/exhaustive-deps

    const appConfigCall= async()=>{
        let config: any = '';      
        let configObj = await actConfig();
        config = configObj?.result;      
        const newArray = config?.libraryMenu.filter((menu:any) => menu.id !== "DOWNLOAD");  
        setCategoryData(newArray[0].id)          
        setLibraryMenu(newArray)                
        setConfig(config)       
    }
    const getContentIDtoAllInfo = async (dataTemp: any) => {
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
               setFirebaseData(responseData.data)
                filterDataFromFirebase(responseData.data);
            }
        }
    }
    const fetchAllFirebaseData=async()=>{
        try {             
            const snapshot = await getAllContentFromFirebase(subscriberId,profileId);
            const data = snapshot;    

            if (data) {    
                getContentIDtoAllInfo(data)                            
            }     
        } catch (error) {
          
        }
    }


    const handleTabClick =(data:any)=>{     
        setCategoryData(data) 
    }

    const filterDataFromFirebase=(data:any)=>{
        const finalData=data?.filter((ele:any)=>{
            if(dataType(ele) === categoryData) {
                return ele
              }      
        })
        setLibraryData(finalData)
    }

    useEffect(()=>{
        if (categoryData == 'PLAYLIST') {
        } else {
            filterDataFromFirebase(firebaseData)
        }
    },[categoryData,isRemoved]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {        
        let unsubscribe = useStoreFavourite.subscribe((state: any) => {
            setRemoved(state.isFavouriteRemoved)
        });
        return () => unsubscribe();
    },[]); // eslint-disable-line react-hooks/exhaustive-deps

    const handlePlayList = (playList:any) =>{
        setTimeout(() => {
            router.push(`/playlist/${playList.idplaylist}`); 
        }, 200)
    }

    return (
        <>
            <div className="flex w-full">            
                {
                    showLibrary === null ? <></> : showLibrary && libraryMenu ? 
                    <div className="mx-[1.5rem] mb-[1rem] max-lg:auto sub-container w-full max-md:ml-[-0.5rem] fadeAmination">
                    <div className="p-4">                         
                            <CategoryTabs contentData={libraryMenu} onCategoryTabClick={handleTabClick} activeCategoryTab={categoryData} clickable={true} whereIamFrom={'libararyPage'} lang={lang}></CategoryTabs>                        
                    </div>
                    {
                        categoryData && categoryData ==='PLAYLIST' && <>
                        {
                            getListOfPlaylists && getListOfPlaylists.length>0?
                            <PlayListView listOfPlaylistData={getListOfPlaylists} lang={lang} handlePlayList={handlePlayList}> </PlayListView>:<div className="text-primaryColor mt-4 ml-4">{lang?.no_data_found}</div>
                        }   
                        </>
                    }

                    {
                        categoryData && categoryData ==="SPEECH"  && <>  
                        {
                            libraryData && libraryData.length>0 ?
                            <GridLayout contentData={libraryData} lang={lang} className="mt-4"></GridLayout>:
                            <div className="text-primaryColor mt-4 ml-4">{lang?.no_data_found}</div>
                        }          
                        </>
                    }

                    {
                        categoryData && categoryData ==="ALBUM" && <>                     
                        {
                            libraryData && libraryData.length>0 ?
                            <GridLayout contentData={libraryData} lang={lang} className="mt-4"></GridLayout>:
                            <div className="text-primaryColor mt-4 ml-4">{lang?.no_data_found}</div>
                        }                  
                        </>
                    }

                    {
                        categoryData && categoryData ==="AUDIOBOOK" && <>                    
                        {
                            libraryData && libraryData.length>0 ?
                            <GridLayout contentData={libraryData} lang={lang} className="mt-4 ml-2"></GridLayout>:
                            <div className="text-primaryColor mt-4 ml-4">{lang?.no_data_found}</div>
                        }                      
                        </>
                    }

                    {
                        categoryData && categoryData ==="libraryData" && <>                     
                        {
                            libraryData && libraryData.length>0 ?
                            <GridLayout contentData={libraryData} lang={lang} className="mt-4"></GridLayout>:
                            <div className="text-primaryColor mt-4 ml-4">{lang?.no_data_found}</div>
                        }                      
                        </>
                    }

                    {
                        categoryData && categoryData ==="EPISODE" && <>                    
                        {
                            libraryData && libraryData.length>0 ?
                            <GridLayout contentData={libraryData} lang={lang} className="mt-4"></GridLayout>:
                            <div className="text-primaryColor mt-4 ml-4">{lang?.no_data_found}</div>
                        }                    
                        </>
                    }

                    {
                        categoryData && categoryData ==="MUSIC" && <>                    
                        {
                            libraryData && libraryData.length>0 ?
                            <GridLayout contentData={libraryData} lang={lang} className="mt-4"></GridLayout>:
                            <div className="text-primaryColor mt-4 ml-4">{lang?.no_data_found}</div>
                        }                  
                        </>
                    }
                    </div> :
                    <div className="flex items-center justify-center h-screen text-secondaryItemColor w-full flex-col absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <div className="text-xl font-bold mb-[1rem]">
                            {lang?.Your_library_is_empty}
                        </div>
                        <div className="text-s">
                            <a href="/login" className="text-primaryColor font-bold"> {lang?.Please_Login_to_see_your_library} </a>
                        </div>
                    </div>
                }
            </div>    
        </>
    )
}

