import { get, ref, update, remove } from "firebase/database";
import db from "./firebase";
import { getPosterRecently } from "@/utils/content";


const setContentToFirebase =async (id:any,contentData:any,dataObj:any,subscriberId:any, profileId:any, mediaStatus = "INPROGRESS")=>{
    let currentLang = "eng";
    let path = `/subscriber/${subscriberId}/${profileId}/content/${contentData?.objectid}`;
    let landscapePoster = getPosterRecently(contentData,"LANDSCAPE","HD")
    let potraitPoster = getPosterRecently(contentData,"POTRAIT","HD")
    let squarePoster = getPosterRecently(contentData,"SUQARE","LOW")
    let contentObj = {            
                category: contentData?.category,
                objectid: contentData?.objectid,
                objecttype: contentData?.objecttype,            
                title: contentData?.title,             
                genre: contentData?.genre,
                updatedat: Math.floor(new Date().getTime() / 1000),
                poster: {
                    landscape: landscapePoster,                
                    portrait: potraitPoster,                
                    square: squarePoster,                
                },            
                contentstatus: "ACTIVE",
                duration: 120,             
                displaylanguage: currentLang,
                inwatchlist:dataObj.isInWatchList                      
            };   
    const callbackRes: any = {};     
    const dataRef = ref(db, path);             
    try {             
        await update(dataRef, contentObj);  
        callbackRes['success'] = true  
      } catch (error) {
        callbackRes['error'] = error         
      }
      return callbackRes;
}

const getAllContentFromFirebase =async (subscriberId:any,profileId:any) => {
  let path = `/subscriber/${subscriberId}/${profileId}/content`;
    try {
        const dataRef = ref(db, path);        
        const snapshot = await get(dataRef);
        const data = snapshot.val(); 
        let allData = Object.values(data)
        let finalData = allData.filter((ele:any)=>{
          if(ele.inwatchlist==true){
            return ele             
          }
        })           
        return finalData       
    } catch (error) {
        console.log(error);        
    }
} 
const getSingContentToFirebase = async(profileId:any,subscriberId:any,contentData:any)=>{
  let path = `/subscriber/${subscriberId}/${profileId}/content/${contentData?.objectid}`;
          try {            
              const dataRef = ref(db, path);        
              const snapshot = await get(dataRef);
              const data = snapshot.val();    
              if (data) {
                return data;
              }     
          } catch (error) {
            
          }
}
const getRecentlyPlayedFromFirebase = async (params: any) => {
  let path = `/subscriber/${params.subscriberId}/${params.profileId}/content`;
    try {
          const dataRef = ref(db, path);        
          const snapshot = await get(dataRef);
          const data = snapshot.val(); 
          let allData = Object.values(data)
          let finalData = allData.filter((ele:any)=>{
            if (ele.watchedduration != undefined) {
              return ele             
            }
          })           
          return finalData         
    } catch (error) {
        console.log(error);        
    }
}

const  updateContinueWatch = async (content: any, watchStatus: any, watchDuration: any, subscriberid: any, profileid: any) =>  {
  if (!content) return;

  let localDisplayLang = 'eng';

  const nextepisodeid = localStorage.getItem("nextepisodeid");
  let path = `/subscriber/${subscriberid}/${profileid}/content/`;

  if ("seriesid" in content && content.seriesid) {
    path += `${content.seriesid}/episodes/${content.objectid}`;
  } else {
    path += `${content.objectid}`;
  }

  let landscapeImage: any, portraitImage: any, squareImage: any;

  return putContentContinueData();

  async function putContentContinueData() {
    let landscapeIndex,portraitIndex,squareIndex;

    if (Array.isArray(content.poster)) {
       landscapeIndex = content.poster.findIndex((el: any) => {
        return el.postertype === "LANDSCAPE";
      });

       portraitIndex = content.poster.findIndex((el: any) => {
        return el.postertype === "PORTRAIT";
      });

       squareIndex = content.poster.findIndex((el: any) => {
        return el.postertype === "SQUARE";
      });

      if (landscapeIndex > -1) {
        landscapeImage = content.poster[landscapeIndex].filelist[2].filename;
      }

      if (portraitIndex > -1) {
        portraitImage = content.poster[portraitIndex].filelist[2].filename;
      }

      if (squareIndex > -1) {
        squareImage = content.poster[squareIndex].filelist[2].filename;
      }
    } else {
      if (content.poster['landscape']) {
        landscapeImage = content.poster['landscape']
      } else if (content.poster['portrait']) {
        portraitImage = content.poster['portrait'];
      } else {
        landscapeImage = '  '
      }
    }


    // The  main onbject, and the only object
    let data: any = {
      objectid: content.objectid ? content.objectid : "",
      objecttype: content.objecttype ? content.objecttype : "",
      category: content.category ? content.category : "",
      genre: content.genre ? content.genre : "",
      title: content.title ? content.title : "",
      updatedat: Math.floor(new Date().getTime() / 1000),
      poster: {
        landscape: landscapeImage ? landscapeImage : "",
        portrait: portraitImage ? portraitImage : "",
        square: squareImage ? squareImage : "", 
      },
      status: watchStatus,
      contentstatus: "ACTIVE",
      duration: content.duration ? parseInt(content.duration) : 0,
      watchedduration: watchStatus === "INPROGRESS" ? watchDuration : null,
      displaylanguage: localDisplayLang ? localDisplayLang : "",
      
    };
    if ("seriesid" in content && content.seriesid) {
      data.seriesid = content.seriesid;
      data.seasonnum = content.seasonnum;
      data.episodenum = content.episodenum;
      data.nextepisodeid=nextepisodeid ? nextepisodeid : ""
    }
      const dataRef = ref(db, path);             
      try {             
          await update(dataRef, data);    
        } catch (error) {
          console.error('Error updating data:', error);             
        }
  }


}

const removeFromContinueWatch = async (content: any, subscriberid: any, profileid: any) => {
  let localDisplayLang = 'eng';
  let path = `/subscriber/${subscriberid}/${profileid}/content/${content.objectid}`;
  const dbRef = ref(db, path);
  const callbackRes: any = {};
  try {
    // Get the data at the specified reference
    const snapshot = await get(dbRef);

    // Check if data exists at the specified path
    if (snapshot.exists()) {
      // If data exists, remove it
      let removeRes = await remove(dbRef);
      callbackRes['success'] = true;
    } else {
      callbackRes['failed'] = true;
    }
  } catch (error: any) {
    console.error('Error removing data:', error.message);
    callbackRes['error'] = error.message;
  }
  return callbackRes;
}
export  { setContentToFirebase,getSingContentToFirebase,getAllContentFromFirebase,getRecentlyPlayedFromFirebase , updateContinueWatch, removeFromContinueWatch}