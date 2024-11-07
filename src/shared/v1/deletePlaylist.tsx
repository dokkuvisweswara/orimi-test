'use client'

import { deletePlaylistAction } from "@/services/actions/playlist.actions";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/store/init";
import { getAccessTokenObj } from "@/services/helpers/init.helper";
import { Popup, PopupBody, PopupHeader } from "@/popup/commonPopup";

import closeIcon from '../../../public/closeicon.svg';
import Image from "next/image";

export default function DeletePlaylist(props: any) {
    const setCounter = useStore((state: any) => state.setCounter);
    const [enableDeletePopup, setEnableDeletePopup] = useState<any>(false);
    const router = useRouter();

    const deletePlaylist = async (id: any) => {
        let deleteRes = await deletePlaylistAction(id, getAccessTokenObj());
        if (deleteRes.success) {
            setCounter(1);
            router.push('/', { scroll: false });
        }
    }
    return (
        <>
            <button onClick={() => { setEnableDeletePopup(!enableDeletePopup) }} className='w-full h-full text-left'>{props?.lang?.delete_playlist}</button>
            <div id="deletePlayListPopup" className={`${enableDeletePopup ? 'block' : 'hidden'}`}>
                <Popup>
                    <div className=" max-w-[20rem] p-4">
                        <PopupHeader>
                            <div className="relative">
                                <button className="absolute top-0 right-0 p-1 bg-primaryBgColor rounded-full hover:bg-slate-500"
                                    onClick={() => { setEnableDeletePopup(!enableDeletePopup); }}>
                                    <Image src={closeIcon} alt='closeicon' />
                                </button>
                            </div>
                        </PopupHeader>
                        <PopupBody>
                            <div className="px-6 py-3">
                                <header className="mb-4">
                                    <h3 className="text-xl font-medium text-primaryColor text-center">{props?.lang?.delete_playlist}t</h3>
                                </header>
                                <p className="text-sm text-center text-wrap">{props?.lang?.this_will_delete_this_playlist_from_My_Music_on_all_devices}</p>
                                <div>
                                    <div className="flex justify-center items-start gap-2 px-1 pt-4">
                                        <button className="h-10 gap-2 px-5 rounded-full text-sm font-medium tracking-wide transition duration-300 focus-visible:outline-none justify-self-center whitespace-nowrap text-modalbtnprimaryColor hover:bg-[#232423] hover:text-modalbtnprimaryColor focus:bg-emerald-200 focus:text-modalbtnprimaryColor"
                                            onClick={() => { setEnableDeletePopup(!enableDeletePopup); }}>
                                            <span className="order-2">{props?.lang?.cancel}</span>
                                        </button>
                                        <button className="h-10 gap-2 px-7 text-sm font-medium tracking-wide text-primaryColor transition duration-300 rounded-full focus-visible:outline-none whitespace-nowrap bg-modalbtnprimaryColor hover:bg-modalbtnprimaryColor focus:bg-modalbtnprimaryColor"
                                            onClick={() => { deletePlaylist(props.itemId) }}>
                                            <span className="order-2">{props?.lang?.delete}</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </PopupBody>
                    </div>
                </Popup>
            </div>

        </>
    )
}