import { useStoreAddToQue } from "@/store/init"
import { filterContentdataSet} from '@/player/helper/playerUtility'
import { notify } from "@/(layout)/v1/ToasterComponent";
import {errors_message}  from "@/constants/errors_constants"
import { useEffect, useState } from "react";
import { actSectionData } from "@/services/actions/content.action";
import { getAccessTokenObj } from "@/services/helpers/init.helper";
export default function AddToQue({contentId, contentData, lang, handleSetOpen, albumSongsData}: any) {
    const setAddToQueContent = useStoreAddToQue((state : any) => state.setAddToQueContent);
    const [albumsongs, setAlbumSongs] = useState([]);

    const addContentToQue = () => {
        handleSetOpen && handleSetOpen(false);
        if (contentData.objecttype != 'ALBUM') {
            setAddToQueContent([filterContentdataSet(contentData , -1)]);
        } else {
            let contentPayload = {
                id: contentData.objectid,
                endpoint: 'subscriber/v1/content/',
                params: {
                  albumid: contentData.objectid,
                  objecttype: 'CONTENT',
                  orderby: {
                    track: 'ASC',
                  },
                  page: 1,
                  pagesize: 15,
                },
              };
             actSectionData(contentPayload, getAccessTokenObj()).then((albumData) => {
                if (albumData && albumData.data) {
                    let list: any = [];
                    albumData.data.map((item: any, key: number) => {
                        list.push(filterContentdataSet(item , -1))
                    });
                    setAddToQueContent([...list]);
                }
             
             })
         
        }
   
        notify(errors_message.ADDED, "success");
    }
    useEffect(() => {
        albumSongsData && setAlbumSongs(albumSongsData)
    }, [albumSongsData])

    return(
        <>
        <button className="w-full h-full text-left" onClick={addContentToQue}>{lang?.add_to_queue}</button>
        </>
    )
}