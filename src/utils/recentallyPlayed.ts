 

export const filterDataByMenu = (contentData:any, params:any) =>{ 
     let data :any = [] ;
     if(!contentData) return false;

     if(params == 'music'){
       data = contentData.filter((ele:any) => {
         if (ele?.category === "MUSIC" && ele?.objecttype === "CONTENT") {
            return ele;
         }
       }) 
     } else if(params == 'podcast'){
        data = contentData?.filter((ele:any)=> {
           if((ele?.category === "PODCAST" && ele?.objecttype === "SERIES") || (ele.category === "SPEECH" && ele.objecttype === "CONTENT")){
            return ele;
           }    
        })
     } else if(params == 'audiobook') {
      data = contentData.filter((ele:any) => {
         if((ele.category === "AUDIOBOOK" && ele.objecttype === "ALBUM") || (ele.category === "AUDIOBOOK" && ele.objecttype === "CONTENT")) {
            return ele;
         }
       })       
     } else if (params == 'album'){
        data = contentData?.filter((ele:any)=> {
           if (ele.category === "MUSIC" && ele.objecttype === "ALBUM"){
               return ele;
           }
        }) 
     }else if (params != null) {
      data = contentData;
   }      
   return data;
}