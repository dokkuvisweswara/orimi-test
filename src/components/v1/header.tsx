"use client"

import Image from 'next/image';
import Logo from '../../../public/oriMiLogo.svg';
import { setCookie, getCookie } from '@/hooks/client.cookie'
import { useStore, useStoreUser, useSoreUtility, useStoreSearchQuery, useStoreLanguageDataset } from '@/store/init'
import UserDropdownIcon from '@/shared/v1/userDropdown'
import React, { useState, useEffect,useRef } from 'react';
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import Spinner from '@/loaders/spinner/spinner';
import { redirectionsDetails } from '@/utils/detailPageRedirection';
import useDebounce from '@/utils/debounce';
import CategoryTabs from '@/shared/v1/categoryTabs';
let categoryTabsData:any = ['music', 'podcast', 'audiobook'];

 interface Props {
  config: any,
  lang: any,
  whereIamFrom:any,
  deckingconfig: any,
  langSelected: any
}

interface SearchResult {
  title: string;
}

export default function Header( { config, lang, whereIamFrom, deckingconfig, langSelected }: Props ) {    
    
    const router = useRouter();
    const pathname = usePathname();
    const setCounter = useStore((state : any) => state.setCounter);
    const getCounter = useStore((state : any) => state.counter);
    const getSubscriptionDetails = useStoreUser((state : any) => state.subscriptionDetails);
    const [hasSubscriptionDetails, setHasSubscriptionDetails] = useState(false);
    const isUserPresent = useStoreUser((state : any) => state.isUserPresent);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isUserPresentActive, setIsUserPresentActive] = useState<any>(null);
    const [searchValue, setSearchValue] = useState<any>('');
    const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
    const [isActiveToggleState, setIsActiveToggleState] = useState<any>(false);
    const setIsToggleActive = useSoreUtility(( state:  any) => state.setIsToggleActive);
    const setQueryStore = useStoreSearchQuery((state:any)=> state.setStoreQuery)     
    const getIsSearch = useStoreSearchQuery((state:any)=>state.isSearch)  
    const [urlParams,setUrlParams]= useState<any>(whereIamFrom?whereIamFrom:'')
    const setStoreLanguageDataset = useStoreLanguageDataset((state: any) => state.setStoreLanguageDataset);

    const fetchData = async (payload: any = []) => {
      let subscriptionDetails = getSubscriptionDetails || payload;
      if (!subscriptionDetails?.result?.data || subscriptionDetails?.length === 0) {
          let subscribe: any = localStorage.getItem('subscriptionDetails');
          const localStorageData: any = subscribe && getCookie('sessionToken') ? JSON.parse(subscribe) : [];
          subscriptionDetails = localStorageData;
      }
      setHasSubscriptionDetails(subscriptionDetails.length > 0);
    };

    useEffect(() => {
      if (getCookie('sessionToken')) {
        setIsUserPresentActive(true)
      } else {
        setIsUserPresentActive(false)
      }

      const unsubscribe = useStoreUser.subscribe((state: any) => {
          setIsUserPresentActive(state?.isUserPresent)
      }); 
      fetchData()
      return () => unsubscribe();      
    }, [getSubscriptionDetails]); // eslint-disable-line react-hooks/exhaustive-deps


    useEffect(() => {
      (window as any).setStoreLanguageDataset = lang;
    }, [lang]); // eslint-disable-line react-hooks/exhaustive-deps

    
    useEffect(() => {
      let removeSideNavTitle = ['/subscribe', '/profile', '/login', '/switchprofile'];
      let sideNavId: any = document.querySelector('#separator-sidebar');
      let result = removeSideNavTitle.filter((item) => {
        if (pathname.includes(item)) return item;
      })
      if (sideNavId) {
        if (result.length > 0) {
          sideNavId.style.display = 'none';
        } else {
          sideNavId.style.display = 'block';
        }
      }
     
    }, [pathname]);

    useEffect(() => {
      const unsubscribe = useStoreUser.subscribe((state: any) => {
          fetchData();
      }); 

      let subscriptionDetails: any = localStorage.getItem('subscriptionDetails');

      if (subscriptionDetails) {
        subscriptionDetails = JSON.parse(subscriptionDetails);
        fetchData(subscriptionDetails)
      }

      return () => unsubscribe();  
    }, [])
    useEffect(() => {
     
      if(getIsSearch==null){
        setSearchValue('')
      }
    }, [getIsSearch]); // eslint-disable-line react-hooks/exhaustive-deps

    function useActCounter() {
      setCounter(getCounter);
    }
   
    interface PathnameObject {
      pathname:string
    }  
    const handleSearchClick = async (value:any) => {      
      setSearchValue(value);
      setSearchResults([]);    

      setQueryStore(value)    
        if(typeof window !== undefined){
          let windowUrl :any= window
          const url = new URL(windowUrl.location);
          url.searchParams.set('q', encodeURIComponent(value));
          window.history.replaceState(null, '', url.toString());
        }   
    };
    const debouncedSearchClick = useDebounce(handleSearchClick, 600);
    const handleChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value;
      setSearchValue(newValue);
      // Call the debounced function with the new input value
      debouncedSearchClick(newValue);
    };   
    const actSearchClick = (result: any) => {
      router.push(redirectionsDetails(result));
      setIsDropdownOpen(false);
    }
    const actIsActiveToggle = () => {
      setIsToggleActive(!isActiveToggleState);
      setIsActiveToggleState(!isActiveToggleState)
    }
  const handleSearchOnClick = ()=>{
    router.push('/search')   
  }  
  const actLogoRedirection = () => {

    if (!pathname?.includes('switchprofile') ) {
      router.push('/')
    }
  }
  
  return (  
      <nav className="h-[4rem] fixed top-0 z-50 w-full  border-primaryItemColor dark:bg-secondaryBgColor dark:border-detailsbordercolor bg-secondaryBgColor">
        <div className="pl-3  lg:mb-1 lg:pl-5 pt-[0.5rem] pb-[0.5rem]">
          <div className="flex items-center w-full">

            <div onClick={actLogoRedirection} className="flex lg:ms-2 w-[10rem] h-[3rem]">
              <Image src={Logo} alt="Orimedia"  width={150} height={150} title="ORI MI"/>              
            </div>
  
            {!(pathname?.includes('switchprofile')) &&
              <div className="flex items-center justify-between w-full mx-[2.5rem] max-lg:justify-end ml-[0.5rem] max-md:mx-[1rem] sm:ml-[3.6rem]">      
              {
       
              // other header input
              <div className={`flex items-center justify-start max-md:hidden ml-[2.6rem]`} id='headerSearchBar'>
                <form className='relative bg-selectedBGSecondaryColor rounded-lg' onSubmit={e => { e.preventDefault(); }}>
                  <label htmlFor="default-search" className="mb-2 text-sm font-medium text-footerbordercolor sr-only dark:primaryColor">Search</label>
                  <div className="relative lg:w-96">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                      <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M7.17806 13C5.38355 13 3.86479 12.3708 2.62181 11.1125C1.37882 9.85417 0.757324 8.31667 0.757324 6.5C0.757324 4.68333 1.37882 3.14583 2.62181 1.8875C3.86479 0.629167 5.38355 0 7.17806 0C8.97257 0 10.4913 0.629167 11.7343 1.8875C12.9773 3.14583 13.5988 4.68333 13.5988 6.5C13.5988 7.23333 13.4835 7.925 13.2531 8.575C13.0226 9.225 12.7098 9.8 12.3146 10.3L17.8464 15.9C18.0275 16.0833 18.118 16.3167 18.118 16.6C18.118 16.8833 18.0275 17.1167 17.8464 17.3C17.6653 17.4833 17.4348 17.575 17.1549 17.575C16.875 17.575 16.6445 17.4833 16.4634 17.3L10.9317 11.7C10.4378 12.1 9.86983 12.4167 9.22775 12.65C8.58568 12.8833 7.90245 13 7.17806 13ZM7.17806 11C8.41281 11 9.46236 10.5625 10.3267 9.6875C11.191 8.8125 11.6232 7.75 11.6232 6.5C11.6232 5.25 11.191 4.1875 10.3267 3.3125C9.46236 2.4375 8.41281 2 7.17806 2C5.9433 2 4.89376 2.4375 4.02943 3.3125C3.1651 4.1875 2.73293 5.25 2.73293 6.5C2.73293 7.75 3.1651 8.8125 4.02943 9.6875C4.89376 10.5625 5.9433 11 7.17806 11Z"
                          fill="white"
                          fillOpacity="0.7"
                        />
                      </svg>
                    </div>
                    <input
                      type="search"
                      className="block w-full p-2 ps-10 text-sm text-primaryColor border-none rounded-lg bg-searchBgColor focus:outline-none"
                      placeholder= {lang?.search_placeholder}
                      value={searchValue}                     
                      onClick={handleSearchOnClick}
                      onChange={handleChangeSearch}     
                      id='searchElement'
                    />
                  </div>
                  {isDropdownOpen && (
                    <div className="absolute  w-96 text-sm bg-[#232323] rounded-b-lg" id="dropdown">
                      {searchResults.length > 0 ? (
                        <div className="absolute bg-[#232323] rounded-b-lg w-96 z-10" id="dropdown">
                          {searchResults.map((result, index) => (
                            <div key={index} onClick={() => actSearchClick(result)} className="flex justify-start cursor-pointer text-primaryColor bg-selectedBGSecondaryColor  hover:bg-gridTagsonhoverColor rounded-md px-2 py-2 my-2">
                              <div className="flex-grow font-medium px-2 cursor-pointer">{result.title}</div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="absolute bg-[#232323] rounded-b-lg w-96 z-10" id="dropdown">
                  
                          <div  className="flex justify-start cursor-pointer text-primaryColor bg-selectedBGSecondaryColor  hover:bg-gridTagsonhoverColor rounded-md px-2 py-2 my-2">
                            <div className="flex-grow font-medium px-2 text-center text-primaryErrorColor"> Content Not Found </div>
                          </div>
                      </div>
                      )}

                    </div>
                  )}
                </form>
              </div>               
              }
              <div className="flex items-center ms-3 gap-2" id='userContent'>
              <div id='subscribeBtn' className='' onClick={useActCounter}>
                <Link href={hasSubscriptionDetails ? '/subscription' : '/subscribe'}>
                  <button className="bg-selectedBGPrimaryColor px-4 py-1 text-center font-medium rounded-lg text-sm text-primaryColor hover:bg-onhoverBGcolor">
                    {hasSubscriptionDetails ? lang?.subscription : lang?.subscribe}                
                  </button>
                </Link>
              </div>
                {
                  isUserPresentActive === null ? <Spinner></Spinner>: isUserPresentActive? ( <div id='profile' className='flex gap-1 p-1 items-center rounded-2xl bg-selectedBGSecondaryColor  hover:bg-gridTagsonhoverColor'>
                  <UserDropdownIcon lang={lang}></UserDropdownIcon>
                  </div>) :  (<div id='loginBtn'>
                  <Link href="/login">
                    <button className="bg-[#232323] px-4 py-1 text-center rounded-lg text-sm font-medium text-primaryColor  hover:bg-[#BA0B5D]"
                    >
                    {lang?.login}
                    </button>
                  </Link>  
                  </div>)
                }
                
              </div>
            </div>}
          </div> 
          {
            (getIsSearch == 'SEARCH' && !(pathname?.includes('switchprofile'))) &&
            <div className={`flex items-center justify-start max-md:block max-md:mt-[0.5rem] w-[97%] hidden`} id='headerSearchBar'>
                  <form className='relative bg-selectedBGSecondaryColor rounded-lg'>
                    <label htmlFor="default-search" className="mb-2 text-sm font-medium text-footerbordercolor sr-only dark:primaryColor">Search</label>
                    <div className="relative lg:w-96">
                      <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M7.17806 13C5.38355 13 3.86479 12.3708 2.62181 11.1125C1.37882 9.85417 0.757324 8.31667 0.757324 6.5C0.757324 4.68333 1.37882 3.14583 2.62181 1.8875C3.86479 0.629167 5.38355 0 7.17806 0C8.97257 0 10.4913 0.629167 11.7343 1.8875C12.9773 3.14583 13.5988 4.68333 13.5988 6.5C13.5988 7.23333 13.4835 7.925 13.2531 8.575C13.0226 9.225 12.7098 9.8 12.3146 10.3L17.8464 15.9C18.0275 16.0833 18.118 16.3167 18.118 16.6C18.118 16.8833 18.0275 17.1167 17.8464 17.3C17.6653 17.4833 17.4348 17.575 17.1549 17.575C16.875 17.575 16.6445 17.4833 16.4634 17.3L10.9317 11.7C10.4378 12.1 9.86983 12.4167 9.22775 12.65C8.58568 12.8833 7.90245 13 7.17806 13ZM7.17806 11C8.41281 11 9.46236 10.5625 10.3267 9.6875C11.191 8.8125 11.6232 7.75 11.6232 6.5C11.6232 5.25 11.191 4.1875 10.3267 3.3125C9.46236 2.4375 8.41281 2 7.17806 2C5.9433 2 4.89376 2.4375 4.02943 3.3125C3.1651 4.1875 2.73293 5.25 2.73293 6.5C2.73293 7.75 3.1651 8.8125 4.02943 9.6875C4.89376 10.5625 5.9433 11 7.17806 11Z"
                            fill="white"
                            fillOpacity="0.7"
                          />
                        </svg>
                      </div>
                      <input
                        type="search"
                        className="block w-full p-2 ps-10 text-sm text-primaryColor border-none rounded-lg bg-searchBgColor focus:outline-none"
                        placeholder= {lang?.search_placeholder}
                        value={searchValue}
                        onChange={handleChangeSearch}                     
                      />
                    </div>
                    {isDropdownOpen && (
                      <div className="absolute  w-96 text-sm bg-[#232323] rounded-b-lg" id="dropdown">
                        {searchResults.length > 0 ? (
                          <div className="absolute bg-[#232323] rounded-b-lg w-96 z-10" id="dropdown">
                            {searchResults.map((result, index) => (
                              <div key={index} onClick={() => actSearchClick(result)} className="flex justify-start cursor-pointer text-primaryColor bg-selectedBGSecondaryColor  hover:bg-gridTagsonhoverColor rounded-md px-2 py-2 my-2">
                                <div className="flex-grow font-medium px-2 cursor-pointer">{result.title}</div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="absolute bg-[#232323] rounded-b-lg w-96 z-10" id="dropdown">
                    
                            <div  className="flex justify-start cursor-pointer text-primaryColor bg-selectedBGSecondaryColor  hover:bg-gridTagsonhoverColor rounded-md px-2 py-2 my-2">
                              <div className="flex-grow font-medium px-2 text-center text-primaryErrorColor"> Content Not Found </div>
                            </div>
                        </div>
                        )}

                      </div>
                    )}
                  </form>
            </div>
          }       
        </div>


        <div className="hidden max-lg:block py-4 bg-skeletonColor pl-4">
                <CategoryTabs contentData={categoryTabsData} whereIamFrom={'dashboard'} lang={lang} deckingconfig={deckingconfig?.screens} langSelected={langSelected}></CategoryTabs>
          </div>
        
      </nav>
  )
}