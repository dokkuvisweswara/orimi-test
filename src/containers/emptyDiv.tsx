
'use client'

import { useStorePlayer } from "@/store/init";
import { useEffect, useState } from "react";

export default function EmptyDiv() {
    const [miniPlayer, setMiniPlayer] = useState<any>(false);
    useEffect(() => {    
        const unsubscribe = useStorePlayer.subscribe((state: any) => {
            setMiniPlayer(true);
        }); 
        return () => unsubscribe();
    }, []);
    return(
        <>
        {/* {
            miniPlayer && <div className='w-full h-[5rem] max-md:h-5 max-lg:h[13rem] '></div>
        } */}
        <div className='w-full h-[3rem] max-md:h-5 max-lg:h[13rem] '></div>
        </>
    )
}