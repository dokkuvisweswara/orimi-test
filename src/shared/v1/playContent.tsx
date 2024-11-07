'use client'

import Image from 'next/image';
import v7 from '../../../public/play.svg';
import { useStorePlayer, useSelectedIndexFromPlaylist} from '@/store/init';
import IconURL from '@/components/v1/carousel/Icon.png'; 
import { getCookie } from '@/hooks/client.cookie'
import { useRouter } from "next/navigation";
import v11 from '../../../public/playtransperent.svg';
import { useEffect, useState } from 'react';
import { LoaderPlayIcon } from '@/loaders/loaderPlayIcon';
import beat from "../../../public/beat.gif";

export default function PlayContent({id, contentData, whereIamFrom, selectedIndex, idplaylist,uniqueFlag, lang}: any){
    const router = useRouter();
    const [loader, setloader] = useState<boolean>(false);
    const [isPlaying, SetIsplaying] = useState<boolean>(false);

    const setContentSelectedByPlayBtn = useStorePlayer((state: any) => state.setContentSelectedByPlayBtn);
    const setSelectedIndexPlaylist = useSelectedIndexFromPlaylist((state: any) => state.setSelectedIndexPlaylist);

    const onPlayAction = () => {
        SetIsplaying(true);

        let uniqueFlagPrev = sessionStorage.getItem('uniqueFlag');
        if (uniqueFlagPrev && uniqueFlagPrev!= 'null') {
            let itemOnPrev: any = document.getElementById(`${uniqueFlagPrev}`);
            let itemPlayIconPrev: any = document.getElementById(`${uniqueFlagPrev}-play`);
            let itemBeatIconPrev: any = document.getElementById(`${uniqueFlagPrev}-beat`);

            itemOnPrev.style.background = "";
            itemPlayIconPrev.style.display = "";
            itemPlayIconPrev.previousSibling.style.display = "";
            itemBeatIconPrev.style.display = "";
            itemBeatIconPrev.nextSibling.style.display = "";

            // SetIsplaying(false)
        }
    
        uniqueFlag && sessionStorage.setItem('uniqueFlag', `${uniqueFlag}`);

        let itemOn: any = document.getElementById(`${uniqueFlag}`);
        let itemPlayIcon: any = document.getElementById(`${uniqueFlag}-play`);

        switch (whereIamFrom) {
            case 'songsList' :
               itemOn.style.background = "#2A2A2A";
               itemPlayIcon.style.display = "block";
               itemPlayIcon.previousSibling.style.display = "none";
              setTimeout(() => {
                let itemBeatIcon: any = document.getElementById(`${uniqueFlag}-beat`);
                itemBeatIcon.style.display = "block";
                itemBeatIcon.nextSibling.style.display = "none";
              }, 4090)
         
            break;
        }

    }

    const playSelectedContent = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        event.stopPropagation();

        setloader(true);

        try {
            onPlayAction();
        } catch (e) {}
      


        setTimeout(() => {
            setloader(false);
        }, 4000)
        let sessionToken = getCookie('sessionToken');
        if (!sessionToken) {
            router.push('/login')
        } else {
            if (whereIamFrom == 'playlist') {
                setSelectedIndexPlaylist(selectedIndex);
            } else {
                
                setContentSelectedByPlayBtn(contentData);
            }
        }

    }
    return(
        <button onClick={playSelectedContent} title='play' className='hover:scale-105'>
            {
                whereIamFrom === 'carousel' && 
                ( loader ?  (<LoaderPlayIcon></LoaderPlayIcon>) : (
                <div className='w-auto p-2.5 text-20 rounded-full bg-gray-300 flex justify-center items-center cursor-pointer hover:bg-ordinaryItemColor'>
                    <Image src={IconURL} alt="play" height={5} width={20} className="z-0" />
                    <div className="z-1 max-sm:hidden text-[0.9rem]">{lang?.play_now}</div>
                </div>)
                )
            }
            {
                whereIamFrom === 'sliderCard' && 
               ( loader ?  (<LoaderPlayIcon></LoaderPlayIcon>) : (<div className="bg-playactionBgColor rounded-full p-[0.9rem] transition duration-850 ease-out hover:ease-in ">
                   
                <svg width="17" height="20" viewBox="0 0 17 20" fill="none" xmlns="http://www.w3.org/2000/svg" className='ml-[3px] hover:scale-125'>
                    <path d="M16.3158 9.02762C17.0643 9.45979 17.0643 10.5402 16.3158 10.9724L1.68421 19.4199C0.935673 19.8521 0 19.3119 0 18.4475V1.55246C0 0.688118 0.935673 0.147906 1.68421 0.580075L16.3158 9.02762Z" fill="white"/>
                </svg>

                </div>)  
               )          
            }
            {
                whereIamFrom === 'detailPage' &&   ( loader ?  (<LoaderPlayIcon w={44} h={44} ></LoaderPlayIcon>) : <Image className="w-15 h-15 max-md:w-12 max-md:h-12" src={v7} alt={''} /> )           
            }
            {
                
                whereIamFrom === 'episode' &&   ( loader ?  (<LoaderPlayIcon></LoaderPlayIcon>) : <Image src={v11} alt={''} /> )
            }
            {
            whereIamFrom === 'recently' && 
            ( loader ?  (<LoaderPlayIcon></LoaderPlayIcon>) : ( <div>
                    <svg width="16" height="22" viewBox="0 0 24 28" fill="none" xmlns="http://www.w3.org/2000/svg" className='hover:scale-125'>
                        <path d="M23.3222 12.7952C24.2259 13.3305 24.2259 14.6686 23.3222 15.2038L2.03354 27.8111C1.12975 28.3464 0 27.6773 0 26.6069V1.39217C0 0.3217 1.12974 -0.347348 2.03354 0.187889L23.3222 12.7952Z" fill="white"/>
                    </svg>
                </div>
             ))
            }
            {
                whereIamFrom === 'songsList' && 
                ( loader ?  (<LoaderPlayIcon></LoaderPlayIcon>) : 
                (<>
                    <div className="w-6 hidden"  id={`${uniqueFlag}-beat`}> <Image src={beat} height={60} width={60} alt="beat"></Image> 
                    </div> 
                    <div>
                        <svg width="16" height="22" viewBox="0 0 24 28" fill="none" xmlns="http://www.w3.org/2000/svg" className='hover:scale-125'>
                            <path d="M23.3222 12.7952C24.2259 13.3305 24.2259 14.6686 23.3222 15.2038L2.03354 27.8111C1.12975 28.3464 0 27.6773 0 26.6069V1.39217C0 0.3217 1.12974 -0.347348 2.03354 0.187889L23.3222 12.7952Z" fill="white"/>
                        </svg>
                    </div>
                </>
              ) )
            }
             {
                whereIamFrom === 'playlist' && 
                ( loader ?  (<LoaderPlayIcon></LoaderPlayIcon>) : (<div>
                    <svg width="16" height="22" viewBox="0 0 24 28" fill="none" xmlns="http://www.w3.org/2000/svg" className='hover:scale-125'>
                        <path d="M23.3222 12.7952C24.2259 13.3305 24.2259 14.6686 23.3222 15.2038L2.03354 27.8111C1.12975 28.3464 0 27.6773 0 26.6069V1.39217C0 0.3217 1.12974 -0.347348 2.03354 0.187889L23.3222 12.7952Z" fill="white"/>
                    </svg>
                </div>)
                )
            }
        </button>
    )
}