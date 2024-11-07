'use client'
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function  CategoryTabs(props: any) { 
    const [activeTab, setActiveTab] = useState(props?.activeCategoryTab); // Initialize the active tab index
    const [contentData,setContentData] = useState<any>([])
    const [pathname, setPathName] = useState<any>();  
    const router = useRouter();
    const url = usePathname();
    useEffect(()=>{
        if (props?.whereIamFrom == 'dashboard') {
            handleCategoryData()
        } else {
            setContentData(props?.contentData)
        }
      },[props?.contentData])

    const handleTabClick = (index:any) => {
        setActiveTab(index);
        props?.onCategoryTabClick(index)
    };
    const handleDashboardMenuClick = (id:any)=>{
        const path = id.split("-")[1]?.toLowerCase();
        router.push(`/${path}`);
        // setActiveTab(section);
    }

    useEffect(() => {        
        if (typeof window !== 'undefined') { 
          const currentPathname = url;
          const withOutSlash = currentPathname.split('/');
          const word = withOutSlash[withOutSlash.length - 1];
          setPathName(url);
        }
    }, []);

    const handleCategoryData = () =>{
        let data = props?.deckingconfig?.filter((item:any, i:number)=>{             
            if(!item.id.includes('Home') && !item.id.includes('Library')){
                return item
            }
        })
        setContentData(data)
    }
      
    return (
        <>
        <section>
            {
                props.whereIamFrom == 'libararyPage' && <>
                    <ul className="flex font-medium gap-2 text-center text-dotsLoaderBgColor text-sm max-md:gap-1 dark:text-gray-400 ">
                    {  contentData?.map((section:any, i:number) => {
                        return (                    
                            <li className="me-2 cursor-pointer" key={i} onClick={() => handleTabClick(section?.dataType)}>
                                <a className={`inline-block px-3 py-1 text-primaryColor text-sm rounded-sm max-md:text-xs hover:bg-[#BA0B5D] max-md:px-2 ${activeTab === section?.screenType ? 'bg-selectedBGPrimaryColor' : 'bg-[#232323]'}`}>{props.lang && props.lang[section?.title?.en]}</a>
                            </li>
                        )
                    })
                    }
                </ul>
                </>
            }
            {
                props.whereIamFrom == 'podcastDetailPage' && <>
                    <ul className="flex flex-nowrap font-medium gap-2 text-center text-dotsLoaderBgColor text-sm dark:text-gray-400 ">
                        {  contentData?.map((section:any, i:number) => {
                            return (
                                <li className="me-2" key={i}>
                                    <a className={`inline-block px-3 py-1 text-primaryColor text-xs rounded-md max-md:text-xs max-md:px-2 bg-[#232323]`}>{props.lang && props.lang[section] ? props.lang[section] :  section}</a>
                                </li>
                            )
                        })
                        }
                    </ul>
                </>
            }
            {
                props.whereIamFrom == 'audioBookDetailsPage' && <>
                    <ul className="flex font-medium gap-2 text-center text-dotsLoaderBgColor text-sm dark:text-gray-400 ">
                        {  contentData?.map((section:any, i:number) => {
                            return (
                                <li className="me-2" key={i}>
                                    <a className={`inline-block px-3 py-1 text-primaryColor text-sm rounded-md max-md:text-xs max-md:px-2 bg-[#232323]`}>{props.lang && props.lang[section] ? props.lang[section] :  section}</a>
                                </li>
                            )
                        })
                        }
                    </ul>
                </>
            }
            {
                props.whereIamFrom == 'dashboard' && <>
                    <ul className="flex font-medium gap-2 text-center text-dotsLoaderBgColor text-sm dark:text-gray-400 ">
                        {  contentData?.map((section:any, i:number) => {
                            return (                                
                                <li className="me-2" key={i} onClick={()=>handleDashboardMenuClick(section?.id)}>
                                    {

                                    }
                                    <a className={`inline-block px-3 py-1 text-primaryColor text-sm rounded-sm max-md:text-xs max-md:px-2 bg-[#232323] cursor-pointer ${pathname === section?.id.split("-")[1]?.toLowerCase() ? 'bg-selectedBGPrimaryColor' : 'bg-[#232323]'}`}>{props.langSelected=='en'?section?.title?.eng:section?.title?.mon}</a>
                                </li>
                            )
                        })
                        }
                    </ul>
                </>
            }
        </section>
        </>
    )
}