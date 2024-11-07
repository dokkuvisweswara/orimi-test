
import { useEffect, useState } from 'react';
import {setContentToFirebase, getSingContentToFirebase, getAllContentFromFirebase } from '@/libs/firebaseUtility';
import { getCookie } from '@/hooks/client.cookie';
import { useRouter } from 'next/navigation';
import { notify } from '@/(layout)/v1/ToasterComponent';
import { useStoreFavourite } from '@/store/init';
import Watchlistheart from '../watchlistHeart';
 

export default function Favourite({id, whereIamFrom, contentData, type, lang,handleSetOpen}: any) {   
    const subscriberId= getCookie("subscriberId")
    const profileId= getCookie("subscriberId")
    const router = useRouter()
    let removeFavourite = useStoreFavourite((state:any)=>state.setIsFavouriteRemoved)
    const [isAddedToWatchList, setisAddedToWatchList] = useState(false)
    const favouriteAction = async (event: any) => {   
        event.preventDefault();        
        if (handleSetOpen) {
            handleSetOpen(false)
        }    
            
        let dataObj:any= {}; 
        let sessionToken = getCookie('sessionToken');
        if(!sessionToken){
            router.push('/login')
        } else {             
            if(isAddedToWatchList == true){               
                removeFavourite(id)        
                setisAddedToWatchList(false)
                dataObj.isInWatchList = false;
            }else{             
                setisAddedToWatchList(true)
                dataObj.isInWatchList = true;
            }  
            let favres = await setContentToFirebase(id,contentData,dataObj,subscriberId,profileId);
            if( favres.success) {
                isAddedToWatchList == false ? notify(lang?.added_to_library, 'success') : notify(lang?.removed_from_library, 'success');
            }
            if( favres.error) {
                notify(favres.error, 'error')
            }
        }

    }     
    useEffect(() => { 
        let sessionToken = getCookie('sessionToken');
        if (sessionToken && contentData) {            
            fetchData();         
        }       
    }, [isAddedToWatchList, contentData]); // eslint-disable-line react-hooks/exhaustive-deps
    const fetchData = async () => {                 
          try {          
              const snapshot = await getSingContentToFirebase(profileId,subscriberId,contentData);
              const data = snapshot;    
              if (data) {                 
                setisAddedToWatchList(data.inwatchlist == true ? true : false);
              }  else {
                setisAddedToWatchList(false);

              }    
          } catch (error) {
            
          }
                    
    };  
    useEffect(() => {        
        let unsubscribe = useStoreFavourite.subscribe((state: any) => {   });
        return () => unsubscribe();
    },[]); // eslint-disable-line react-hooks/exhaustive-deps

    
    return (
        <div id="favourite" className='flex items-center hover:scale-101' >
            <div className="relative custom-tooltip" aria-describedby="tooltip-custom"></div>
            <button onClick={favouriteAction}>
                {( whereIamFrom == 'songslist' || whereIamFrom == 'detailPage' || whereIamFrom == 'player' || whereIamFrom === 'sliderCard' || whereIamFrom === 'episode') && (<Watchlistheart width="20px" height="20px" isActive={isAddedToWatchList}></Watchlistheart>)}
     
                {whereIamFrom === 'moreOption' &&   
                    <span  title={isAddedToWatchList ? lang?.remove_from_library : lang?.add_to_library}>
                    {(type === 'album' || type === 'audiobook') ? <span>{isAddedToWatchList ? lang?.remove_from_library : lang?.add_to_library }</span> :  <span>{isAddedToWatchList ? lang?.remove_from_your_liked_songs : lang?.add_to_library}</span>}
                    </span>
                    
                }
      
            </button>
        </div>
    )
}