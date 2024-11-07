'use client'
import GridLayout from "@/components/v1/gridLayout";
import { actConfig } from '@/services/actions/init.action'
import { actSectionData } from "@/services/actions/content.action";
import { getAccessTokenObj } from "@/services/helpers/init.helper";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SkeletonCard from "@/components/v1/skeletonCard";
import { useStoreSearchQuery } from "@/store/init";
import { actGetCurrentLanguage } from "@/utils/accessCurrentLang";
import { getDictionary } from "@/i18n/dictionaries";

// import CommonSidebar from "@/components/v1/CommonSidebar";
import { getCookie } from "@/hooks/client.cookie";
export default function SeeAll() {
    const [lang, setLang] = useState<any>(null);

    const [setAllData, setSeeALlData] = useState<any>([])
    const [sectionTitle, setSectionTitle] = useState<any>('Recently Played')
    const [sectionAPIObj, setSectionAPIObj] = useState<any>(null)
    const [loading, setLoading] = useState<any>(true)
    const [currentPage, setCurrentPage] = useState<any>(1);
    const router = useRouter()
    const getStoreQuery = useStoreSearchQuery((state:any)=>state.storeQuery)
    const [errorMsg, setErrorMsg] = useState<any>(null)
    const [itemType, setItemType] = useState<any>(null)


    useEffect(() => {
        (document as any).body.scrollTop = 0; // For Safari
        (document as any).documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera

        let cachedata = (window as any).getSeeAllSectionData;
        if (cachedata) {
            setSeeALlData(cachedata);
            (window as any).getSeeAllSectionData = ""
        } else {
            setCurrentPage((prev: number) => prev - 1 )
        }
       
        getSectionTitle();
        let largeDesktop = window.innerWidth > 1600 ? true : false; 
        let threshold = 0.3;
 
        const intersectionObserver = new IntersectionObserver(function (entries) {

            let local:any = localStorage.getItem('getSeeAllSectionConfig');
            if (local == 'undefined') return;
                const getSeeAllData:any = JSON.parse(local);
                setItemType(getSeeAllData.itemType ? getSeeAllData.itemType : getSeeAllData.data)
            if (!getSeeAllData.params) {
                setSeeALlData(getSeeAllData);
                setLoading(false);
                return;
            }
 
            if (entries[0].isIntersecting && local) {
          
                setCurrentPage((prev: any) => {
                    let next = prev + 1;
                    getSeeAllData.params.page = next;
                    getSeeAllData.params.pagesize = 15;
                    setSectionAPIObj(getSeeAllData);
                    apiResponse(getSeeAllData);
                 
                    return next;
                })
                if (largeDesktop) {
                    setTimeout(() => { 

                        setCurrentPage((prev: any) => {
                            let next = prev + 1;
                            getSeeAllData.params.page = next;
                            getSeeAllData.params.pagesize = 15;
                            setSectionAPIObj(getSeeAllData);
                            apiResponse(getSeeAllData);
                        
                            return next;
                        })
                    }, 1000)
               }
            }
          }, {
            root: null,
            rootMargin: largeDesktop ? "-100px" : '-50px',
            threshold: threshold,
          });
          // start observing
          let objContent: any = document.querySelector(".virtual");
          intersectionObserver.observe(objContent);

    },[])

    useEffect(() => {
        actGetCurrentLanguage().then((langSelected) => {
          getDictionary(langSelected).then((language: any) => {
            setLang(language);
  
          })
        })
        
      }, []);

    const apiResponse = async (getSeeAllData: any) => {
        
        try {                    
            let res = await actSectionData({ endpoint: getSeeAllData.endpoint, params: getSeeAllData.params} , getAccessTokenObj());
             
            if (!res) {
                setLoading(false);
                if (setAllData.length == 0) {
                    setErrorMsg(lang?.['no_such_contents_found'])
                    // setSeeALlData([])
                }
              
                return;
            } 

            
                setSeeALlData((prev: any) => {
                    let next: any = [...prev, ...res.data]
                    if (res.totalcount <= next.length) {
                        setLoading(false);
     
                    }
                    return next
                })
                           
        } catch (error) {
    
        }
    }


    const getSectionTitle = ()=>{
        
        if (typeof window !== 'undefined') { 
            let lang = getCookie('localeLangauge');
            lang = lang == 'en' ? 'eng' : 'mon'

            const currentPathname = window.location.pathname;
            const segments = currentPathname.split('/');
            const lastSegment = segments[segments.length - 1];
            let title: any = lastSegment.replace(/-/g, ' ');

            let titleItem: any = localStorage.getItem('title-see-all');
            if (titleItem) {
                titleItem = JSON.parse(titleItem);
                title = titleItem.title[lang]
            }
            
            setSectionTitle(title)
          } 
    }
    {
        let config: any = '';
        // config = localStorage.getItem('primary-config');
        if (typeof localStorage !== 'undefined') {
            config = localStorage.getItem('primary-config');
          }
        config = config ? JSON.parse(config) : null;
        if (!config) {
            let configObj = actConfig().then((configObj) => {
                config = configObj?.result;
            })
        }
        const handleRouteBack = ()=>{        
            router.back();
        }
        return(
            <>
            <div>
                {/* <CommonSidebar lang={lang} /> */}

                <div className="bg-primaryBgColor  text-primaryColor  sub-container w-full">
                    <h1 className="px-3 w-full ml-4 font-semibold text-lg uppercase max-lg:ml-[0.5rem] max-lg:px-[0rem]">{sectionTitle}</h1>
                    {
                        errorMsg && <div className="w-full sub-container bg-primaryBgColor text-primaryColor mt-7 opacity=80">{errorMsg} </div>
                    }
                    <GridLayout contentData={setAllData} lang={lang} itemType={itemType} ></GridLayout>
                    {loading && <div className="virtual">
                         <SkeletonCard></SkeletonCard>
                         <SkeletonCard></SkeletonCard>
                         <SkeletonCard></SkeletonCard>


                    </div> }
                </div>
            </div>
            </>
            
        )
    }
}