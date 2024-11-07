'use client'
import { getDictionary } from "@/i18n/dictionaries";
import { actConfig } from "@/services/actions/init.action";
import { actPopularSearch , searchContent } from "@/services/actions/search.actions";
import { getAccessTokenObj } from "@/services/helpers/init.helper";
import { actGetCurrentLanguage } from "@/utils/accessCurrentLang";
import { dataType } from "@/utils/content";
import { useEffect, useState} from "react";
import { useSearchParams } from "next/navigation";
import SearchDetailPage from "@/components/v1/searchDetailPage";
import { useStoreSearchQuery } from "@/store/init";
import Header from "@/components/v1/header";
import SkeletonCard from "@/components/v1/skeletonCard";
import {CONTENT_ENDPOINT} from '@/constants/appConfig' 
import {searchedEvent } from "@/utils/firebaseAnalytics";
// import CommonSidebar from "@/components/v1/CommonSidebar";
import GridLayout from "@/components/v1/gridLayout";
import TagsGridView from "@/shared/v1/tagsGridView";

export default function SearchModule (){    
    let config: any = '';     
    if (typeof localStorage !== 'undefined') {
      config = localStorage.getItem('primary-config');
    }   
    config = config ? JSON.parse(config) : null;
    if (!config) {
       let configObj = actConfig().then((configObj) => {
        config = configObj?.result;
       })
    }     
    const [searchResult, setSearchResult] = useState<any>()  
    const [errorMsg, setErrorMsg] = useState<any>()     
    const [lang,setLang]= useState<any>() 
    const [apiLang,setApiLang]= useState<any>() 
    const searchParams = useSearchParams()     
    let categorizedData:any = {};   
    const getStoreQuery = useStoreSearchQuery((state:any)=>state.storeQuery)
    const setQueryStore = useStoreSearchQuery((state:any)=> state.setStoreQuery) 
    const setIsSearch = useStoreSearchQuery((state:any)=> state.setIsSearch) 
    const [loading,setLoading]= useState<boolean>(false)
    const [query,setQuery]=useState<any>('')
    const [popularSearch, setPopularSearch] = useState<any>([])
    const [isPopularSearch, setIsPopularSearch] = useState<any>(true)

    useEffect(() => {
        // calling language api
      actGetCurrentLanguage().then((langSelected:any) => {
        setApiLang(langSelected == 'en' ? 'eng' : 'mon')        
        getDictionary(langSelected).then((language: any) => {
          setLang(language);
        })
      })
      getPopularData()
    //   setting variable for to show search input when it is in search 
      setIsSearch('SEARCH')

        return () =>{
            setIsSearch(null)
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
    
    useEffect(()=>{
        // calling from api from url query
        const params = searchParams.get('q')      
        const length :any = params?.length;
        setQuery(params)
        handleData(params,length)       
    },[]); // eslint-disable-line react-hooks/exhaustive-deps

    const handleData=(params:any,length:number)=>{        
        if (length>1) {
            setLoading(true)
            let payload = {
              query: params,
              displaylanguage:apiLang
            };
            getSearchData(payload)              
        } else { 

            setSearchResult([])
            setErrorMsg(null)  
            setIsPopularSearch(true) 
        }    
    }
    useEffect(()=>{
        // calling api from store state varible
        const str = getStoreQuery;
        const length = str?.length;
        handleData(str,length)
        // setQuery(getStoreQuery)
         return () =>{
            setQueryStore(null)             
        }
    },[getStoreQuery]); // eslint-disable-line react-hooks/exhaustive-deps

    const getSearchData = async(payload:any) =>{         
        setLoading(true)
        let searchRes: any = await searchContent(payload, getAccessTokenObj());
        let length = searchRes?.data?.length
        if (searchRes?.errorcode) {
            setLoading(false);
            setErrorMsg(searchRes.reason);
            categorizedData = {};
            setSearchResult([]);
            setIsPopularSearch(false);
        } else {  
            setErrorMsg(null);     
            setLoading(false); 
            setIsPopularSearch(false); 
            let allResult: any = [];  
            if (searchRes?.data?.length > 0 ){
                    allResult = searchRes.data;
                    allResult.forEach((ele:any,i:any)=>{                     
                        const key = dataType(ele)
                        // If the category doesn't exist in categorizedData, create an empty array for it
                        if(key !== undefined){
                            if (!categorizedData[key]) {
                                categorizedData[key] = [];
                            }
                            // Push the element into the array corresponding to its category
                            categorizedData[key].push(ele);
                            setSearchResult(categorizedData)
                        } else {
                            const defaultCategory = '';
                            categorizedData[defaultCategory].push(ele);
                            setSearchResult(categorizedData)                            
                        }
                    }) 
            } else {
                    setErrorMsg(null);   
                    setErrorMsg(lang.no_contents_found)
            }
            //analytics detail object.
        }
        // analytics event
        let data = {
            Keyword: payload,
            result_count: length
        };
        searchedEvent(data)
    }
    useEffect(() => {        
        let unsubscribe = useStoreSearchQuery.subscribe((state: any) => {
            // watching vairble to send query
            if (state.storeQuery)
             setQuery(state.storeQuery);
        });
        return () => unsubscribe();
    },[])
    const getPopularData = async()=> {

        setLoading(true);
        let res: any = localStorage.getItem('deckingconfig');
        res = res && JSON.parse(res);
        let popularSearchData = res.screens.filter((item: any) => {
            if (item.id == "Discover") {
                return item;
            }
        })
        if ( popularSearchData.length > 0 ) {
            setLoading(false);
            setPopularSearch(popularSearchData[0]?.sections)
        } else {
            setLoading(false);
        }
    }

    const actGetTitleFilter = (configSectionData: any) => {
        let localGenreData: any = [];
  
        localGenreData = localStorage.getItem('genreList');
        localGenreData = localGenreData ? JSON.parse(localGenreData) : [];
            
        let emptyGenere: any = {};
        emptyGenere.sectionData = [];
        for (let inner of configSectionData.sectionData) {
            for (let outer of localGenreData) {
                if (inner.genereid == outer.genereid) {
                    emptyGenere.sectionData.push(outer)
                    break;
                }
            }
        }
        return emptyGenere;
    }
    return(
        <>      
        <div className="flex max-lg:w-[97%] max-lg:mt-[1rem]">
            {/* <CommonSidebar lang={lang} /> */}            
            {
                loading ?
                <div className="w-full ml-[3rem] mr-[0.5rem] max-lg:mx-[0.1rem]">
                    <SkeletonCard></SkeletonCard> 
                    <SkeletonCard></SkeletonCard> 
                    <SkeletonCard></SkeletonCard> 
                </div>:
                <div className="w-full ml-[.5rem] mr-[0.5rem] max-lg:mx-[0.1rem]">
                    {
                        popularSearch && popularSearch.length > 0 && isPopularSearch && (popularSearch.map((item: any, index: any) => {
                        
                        return (item.status == 'ACTIVE' && <div className="w-full sub-container bg-primaryBgColor text-primaryColor mt-7 opacity-80" key={index}>
                                <h1 className="searchtext  opacity-75 text-[1.2rem] mb-[2.5rem]">{item && item.title && item.title[apiLang]}</h1>
                                <TagsGridView headerData={actGetTitleFilter(item)} lang={lang}></TagsGridView>
                            </div>) 
                        })
                        )                       
                    }
                    {
                        errorMsg && <div className="w-full sub-container bg-primaryBgColor text-primaryColor mt-7 opacity-80">{lang && lang.no_contents_found} </div>
                    }
                    {
                        searchResult && searchResult['ARTIST'] && (                           
                            <SearchDetailPage searchResult={searchResult['ARTIST']}  title={'ARTIST'} lang={lang} headerData={{titleheader:"ARTIST"}} apiData={{endpoint:CONTENT_ENDPOINT,
                            params:{category:["MUSIC"],displaylanguage:apiLang,objecttype:"CONTENT",query:query}}} isSeeAllEnable={false}/>
                        )
                    } 
                    {
                        searchResult && searchResult['MUSIC'] && (
                            <SearchDetailPage searchResult={searchResult['MUSIC']} title={'MUSIC'} lang={lang} headerData={{titleheader:"MUSIC"}} apiData={{endpoint:CONTENT_ENDPOINT,
                            params:{category:["MUSIC"],displaylanguage:apiLang,objecttype:"CONTENT",query:query}}} isSeeAllEnable={true}/>
                        )
                    } 
                    {
                        searchResult && searchResult['AUDIOBOOK'] && (
                            <SearchDetailPage searchResult={searchResult['AUDIOBOOK']} title={'AUDIOBOOK'} lang={lang} headerData={{titleheader:"AUDIOBOOK"}} apiData={{endpoint:CONTENT_ENDPOINT,
                            params:{category:["AUDIOBOOK"],displaylanguage:apiLang,objecttype:"ALBUM",query:query}}} isSeeAllEnable={true}/>
                        )
                    } 
                    {
                        searchResult && searchResult['ALBUM'] && (
                            <SearchDetailPage searchResult={searchResult['ALBUM']} title={'ALBUM'} lang={lang} headerData={{titleheader:"ALBUM"}} apiData={{endpoint:CONTENT_ENDPOINT,
                            params:{category:["MUSIC"],displaylanguage:apiLang,objecttype:"ALBUM",query:query}}} isSeeAllEnable={true}/>
                        )
                    } 
                    {
                        searchResult && searchResult['PODCAST'] && (
                            <SearchDetailPage searchResult={searchResult['PODCAST']} title={'PODCAST'} lang={lang} headerData= {{titleheader:"PODCAST"}} apiData={{endpoint:CONTENT_ENDPOINT,
                            params:{category:["PODCAST"],displaylanguage:apiLang,objecttype:"SERIES",query:query}}} isSeeAllEnable={true}/>
                        )
                    } 
                    {
                        searchResult && searchResult['SPEECH'] && (
                            <SearchDetailPage searchResult={searchResult['SPEECH']}  title={'SPEECH'} lang={lang} headerData={{titleheader:"SPEECH"}} apiData={{endpoint:CONTENT_ENDPOINT,
                            params:{category:["SPEECH"],displaylanguage:apiLang,objecttype:"CONTENT",query:query}}} isSeeAllEnable={true}/>
                        )
                    } 
                    
                </div>
            }

        </div>
        </>
    )
}