import React, { useEffect, useState } from "react";
import Image from 'next/image'
import { getPoster, redirectUrl }  from '@/utils/content'
import { useStore, useStorePlayer, useStoreContent } from '@/store/init'
import PlayContent from "@/shared/v1/playContent";
import ArtistName from "@/containers/artistName";
import Link from "next/link";

export default function Card({ itemindex, lang }: any) {
    const setIsSelectedContent = useStorePlayer((state : any) => state.setIsSelectedContent);
    const setContentData = useStoreContent((state: any) => state.setContentData);
    const getContentData = useStoreContent((state: any) => state.getContentData);
    const [isMobile, setIsMobile] = useState(false);


    useEffect(() => { 
        const handleResize = () => {
            setIsMobile((window as any).innerWidth <= 1023); // Adjust the width accordingly
        };

        handleResize();
        (window as any).addEventListener("resize", handleResize);

        return () => {
            (window as any).removeEventListener("resize", handleResize);
        };
    }, []);

    const redirectToDetailPage = (data: any) => {
        setContentData(data);
    }

    return (
        <>          
            <Link shallow href={redirectUrl(itemindex)} className="relative overflow-hidden cursor-pointer grad-left-right" onClick={() => redirectToDetailPage(itemindex)}>
           
                    <div className="flex h-full w-full items-center justify-center hover: opacity-80 bg-skeletonColor">
                        <Image 
                            src={isMobile ? getPoster(itemindex, 'PORTRAIT', 'HD', 'LANDSCAPE') : getPoster(itemindex, 'WIDE', 'HD', 'LANDSCAPE')} 
                            alt={itemindex.title} 
                            height={200} 
                            width={400}  
                            loading="lazy"
                            className={`w-full h-full block object-cover`}
                        />
                    </div>       
                <div className="absolute inset-0" id="pagination"></div>                   
            </Link>    
            <div className="absolute left-[0.5rem] bottom-[6rem] w-[30rem] max-xs:top-[6rem] z-[9]">
                <div className="font-medium text-24 leading-32 text-primaryColor">{itemindex.title}</div>
                <p className="text-primaryColor cursor-pointer">
                 <ArtistName data={itemindex}></ArtistName>
                </p>
                {(isMobile || !(itemindex.shortdescription || itemindex.longdescription)) ? null : <div className="font-medium text-14 leading-20 text-ordinaryItemColor mb-4">{`${(itemindex.shortdescription || itemindex.longdescription)?.substring(0, 200)}...`}</div> }
            </div>
          
            <div className="absolute bottom-9 z-100 max-sm:right-8 max-sm:bottom-[10rem] left-8 max-sm:left-auto">
                <PlayContent id={itemindex.objectid} contentData={itemindex} whereIamFrom={'carousel'} lang={lang}></PlayContent>
            </div>
        </>
    )
}
