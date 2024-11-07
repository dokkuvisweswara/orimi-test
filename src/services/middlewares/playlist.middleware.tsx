export const createPlaylistMiddleware = (response: any) => {
    if (response.isSuccessful) {
        return response.result;
    } else {
        return response.result;
    }
};


export const listOfPlaylistMiddleware = (response: any) => {  
    let callBackData = [];
    if (response.isSuccessful) {
        if(response.result.data && response.result.data.length > 0){
            callBackData = response.result.data.map((item:any, i:number) => {
                return {idplaylist: item.idplaylist, title: item.title, icon: item.icon, playliststatus:item.playliststatus, playlistaccess:item.playlistaccess, initiatedby: item.initiatedby, playlistowner: item.playlistowner };
            })
        }        
    }
    return callBackData;
}

export const playlistDataMiddleware = (response: any) => {
    let callBackData: any = [];
    if (response.isSuccessful) {
        if(response.result){
            callBackData = response.result;
        }        
    }
    return callBackData;
}

export const playlistSongsListMiddleware = (response: any) => {
    let callBackData = [];
    if (response.isSuccessful) {
        if(response.result){
            callBackData = response.result.data.map((item:any, i:number) => {
                return item;
            });
        }        
    }
    return callBackData;
}

export const playlistSuggetionMiddleware = (response: any) => {
    let callBackData = [];
    if (response.isSuccessful) {
        if(response.result){
            callBackData = response.result.data.map((item:any, i:number) => {
                return item;
            });
        }        
    }
    return callBackData;
}

export const deletePlaylistMiddleware = (response: any) => {
    return response.result;
}

export const addContetnToPlaylistMiddleware = (response: any) => {
    return response.result;
}
export const removeFromThisPlaylistMiddleware = (response: any) => {
    return response.result;
}