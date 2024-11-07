'use client'

import { useStoreContent } from '@/store/init';
import { useEffect, useState } from 'react';
import { Helmet } from "react-helmet";


export default function ArtistInformation(props: any){
    let type = 'artist';
    const [loading, setLoading] = useState(false);

    const getContentData = useStoreContent((state : any) => state.contentData);
    const [albumData, setAlbumData] = useState<any>(null);
    const [castAndCrewData, setCastAndCrewData] = useState<any>(null);

    useEffect(() => {
        if (getContentData) {
            setCastAndCrewData({...getContentData});
        } 
    },[getContentData]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (props.castAndCrewDataProps && !castAndCrewData) {
            setCastAndCrewData({...props.castAndCrewDataProps[0]});
        } 
    },[props.castAndCrewDataProps]); // eslint-disable-line react-hooks/exhaustive-deps

    

    const dynamicStyle: any = {
        backgroundImage: `url(${castAndCrewData?.profilepic})`,
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "cadetblue"

      };
    const getCastCrew = (role: any) => {
        let updatedRole: any = " ";
        role && role.forEach((item: any, index: any) => {
            updatedRole += (props?.lang[item?.toUpperCase()] ? props?.lang[item?.toUpperCase()] : item) + ", "
        })

        return updatedRole.slice(0, -2);
      
    }

    return (
        <>
            <Helmet>
                <title>{`Listen ${castAndCrewData?.castncrewname || ''} on ORI MI` || ''}</title>
                <meta name="description" content={ `Listen ${castAndCrewData?.castncrewname || ''} on ORI MI`|| ''} />
            </Helmet>


            <div className="relative  bottom-0 left-0 right-0  text-primaryColor  w-full h-[25rem]  bg-origin-padding max-md:bg-scroll shadow-md" style={dynamicStyle}>
            <div className="relative  inset-0 bg-gradient-to-bl from-transparent via-[rgba(1, 1, 1, .9)] to-primaryBgColor w-full h-72 md:w-full md:h-full sm:w-full sm:-h-full lg:w-full lg:h-full xl:w-full xl:h-full xxl:w-full xxl:h-full  min-[300px]:w-full min-[300px]:h-full  rounded-md shadow-md flex items-center justify-center">
               { props.lang && (
                <div className="absolute left-8 bottom-8">
                    <p className="text-primaryColor text-xl font-bold" >{castAndCrewData?.castncrewname}</p>
                    <p className="text-primaryColor text-sm font-bold opacity-60">{getCastCrew(castAndCrewData?.role)}</p>
                </div>
               )} 
            </div>
        </div>
        
        </>
      
    )
}
