'use client'
import Link from "next/link";
import SocialIcon from "../../../public/share.svg";
import Image from "next/image";
import TwitterIcon from "../../../public/oritwitter.png";
import InstaIcon from "../../../public/oriinstagram.png";
import FacebookIcon from "../../../public/orifacebook.png";
import { useEffect, useRef, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import CopyToClipboard from "./copyToClipboard";
import closeIcon from '../../../public/closeicon.svg';
import { Popup, PopupBody, PopupHeader } from "@/popup/commonPopup";

export default function SocialShare({id, whereIamFrom,lang,type,handleSetOpen}: any) {
    const link = "https://orimi.mn";
    const [popupEnable, setPopupEnable] = useState<any>(false);
    const path = usePathname();
    const wrapperRef: any = useRef(null);

    useEffect(() => {  
        function handleClickOutside(event: MouseEvent) {
            // Check if the click occurred outside the wrapperRef
            if (wrapperRef?.current && !wrapperRef?.current.contains(event.target as Node)) {
                // Check if the click occurred inside the popup
                const popup = document.querySelector('.popup-container');
                if (popup && popup.contains(event.target as Node)) {
                    return; // Don't close the popup if clicked inside
                }
                setPopupEnable(false); // Close the popup if clicked outside
            }
        }
    
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [wrapperRef, popupEnable]); 

    return(
        <div className="relative share-options" ref={wrapperRef}>
            <button onClick={() => {setPopupEnable(!popupEnable)}} className={`${whereIamFrom === 'moreOption' ? 'w-full text-left h-full' : ''}`} title="share">
                { whereIamFrom === 'moreOption' ? <span>{lang?.share}</span> : <Image src={SocialIcon} alt={'social-icon'} className='hover:scale-125' /> }
            </button>
            {
                popupEnable && 
                <div>
                    { whereIamFrom === 'moreOption' ? 
                    <Popup>
                        <div className="max-w-[30rem] min-w-52">
                            <PopupHeader>
                                <div className="relative">
                                    <button className="absolute top-1 right-1 bg-primaryBgColor rounded-full hover:bg-slate-500"
                                    onClick={() => {setPopupEnable(!popupEnable);}}>
                                        <Image src={closeIcon} alt='closeicon' />
                                    </button>
                                </div>
                            </PopupHeader>
                            <PopupBody>
                                {shareContainer (link, path, lang, wrapperRef, popupEnable)}
                            </PopupBody>
                        </div>
                    </Popup>
                    :
                    <div className={`flex flex-col gap-3 absolute ${type == 'bottom'? '' : 'bottom-full'} left-8 z-10 mb-2 w-auto -translate-x-1/2 rounded bg-slate-700 text-sm text-white opacity-1 transition-all`}>
                        {
                            shareContainer (link, path, lang, wrapperRef, popupEnable)
                        }                
                    </div>
                    }
                </div>
            }
        </div>
    )
}

export function shareContainer(link: any, path: any,lang: any,wrapperRef:any,popupEnable:any) {
     
    return(        
        <div className="flex flex-col gap-3 text-sm text-primaryColor p-4 bg-[#161213] share-options"ref={wrapperRef}>                
            <div>
                <p className="text-left">{lang?.share_this_link}</p>
            </div>
            <div className="w-80 relative">
                <input value={`${link}${path}`} disabled className="w-full p-2 rounded border-b-2 border-dotsLoaderBgColor"/>
                <div className="absolute top-1/2 right-1 -translate-y-1/2">
                    <CopyToClipboard text={`${link}${path}`}></CopyToClipboard>
                </div>
            </div>
            <div>
                <ul className='flex items-center gap-3'>
                    <li>
                        <Link href={'https://www.facebook.com/share.php?u=' + `${link}${path}`} target="_blank" className="cursor-pointer">
                            <Image
                                src={FacebookIcon}
                                height={30}
                                width={30}
                                className="share-ico hover:scale-125"
                                alt="fb icon"
                            />
                        </Link>
                    </li>
                    <li>
                        <Link target="_blank" href={'https://www.instagram.com/share?url=' + `${link}${path}`} className="cursor-pointer">
                            <Image
                                src={InstaIcon}
                                height={30}
                                width={30}
                                className="share-ico hover:scale-125"
                                alt="gp icon"
                            />
                        </Link>
                    </li>
                    <li>
                        <Link target="_blank" href={'http://twitter.com/share?url=' + `${link}${path}`} className="cursor-pointer">
                            <Image
                                src={TwitterIcon}
                                height={30}
                                width={30}
                                className="share-ico hover:scale-125"
                                alt="gp icon"
                            />
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}
