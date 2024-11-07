'use client'
import Image from "next/image";
import { useEffect } from "react";
import { getPoster, redirectUrl } from "@/utils/content";
import { useStoreContent } from "@/store/init";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function MoreLikeThisSection({contentId, contentData, lang}: any) {
    const router = useRouter();
    const setContentData = useStoreContent((state: any) => state.setContentData);
    const redirectToDetailPage = (data: any) => {
        setContentData(data);
    }
    return (
        <>
        {contentData?.data &&
        <div className="flex flex-col mx-5 mt-5 gap-3 ">             
        {contentData?.data?.map((item:any, i:number) => {
            return (
                <>
                    <Link className="flex gap-2 cursor-pointer hover:bg-[#2B2A2B]" key={i} onClick={() => {redirectToDetailPage(item)}} href={redirectUrl(item)}>
                        <div className="flex items-center justify-center w-40 aspect-square">
                            <Image className="w-full h-full aspect-square bg-[#232323]" src={getPoster(item, 'SQUARE', 'HD')} alt={item.title ? item.title : 'poster'} width={150} height={150} />
                        </div>
                        <div className="flex ps-3 w-full">
                            <div className="text-primaryColor">
                                <p className="text-xs text-selectedBGPrimaryColor pt-2">{item.genre ? item.genre : ''}</p>
                                <p className=" text-md text-primaryColor">{item.title ? item.title : ''}</p>
                                <div className="inline-block">
                                    <p className="text-sm text-secondaryItemColor mt-1">{item.shortdescription ? item.shortdescription : ''}</p>
                                </div>
                            </div>
                        </div>
                    </Link>
                    <div>
                        <p className='border-b-2 border-detailpagecontentBorderColor mt-2 '></p>
                    </div>
                </>
            )
        })}
        </div>
        }
        {
          contentData.reason && 
            <div className="flex mx-5">
                <p className="text-center w-full h-32 flex items-center justify-center">{lang?.['no_such_contents_found']}</p>
            </div> 
            
        }
        </>
    )
}