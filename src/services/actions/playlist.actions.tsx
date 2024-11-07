import { BASEURLS } from "@/constants/appConfig";
import { createPlaylistMiddleware, listOfPlaylistMiddleware, playlistDataMiddleware, playlistSongsListMiddleware, playlistSuggetionMiddleware, addContetnToPlaylistMiddleware, deletePlaylistMiddleware, removeFromThisPlaylistMiddleware } from "../middlewares/playlist.middleware";
import { httpGet, httpPost, httpDelete, httPut } from "./http";
import { makeQueryStringDync,toFormUrlEncoded, setHeaderContentType } from "../helpers/init.helper";
import { checkMpegRequired } from '@/services/helpers/player.helper';

// To Create Playlist
export async function createPlayListApi(formData:any, TokenObj: {}) {
    const url = `${BASEURLS.vCMS}subscriber/v1/playlist`;
    const urlencoded = new URLSearchParams();
    urlencoded.append("title", formData.name);
    //   urlencoded.append("Description", formData.name);
      urlencoded.append("playlistaccess", formData.playlistaccess);
    //   urlencoded.append("icon", "jzJnIzQS.jpeg");
    const header = {...TokenObj};
    const response = await httpPost(url, header, urlencoded);
    return createPlaylistMiddleware(response);
}
export async function editPlayListApi(payload:any, idplaylist:any, TokenObj: {}) {
    let url = `${BASEURLS.vCMS}subscriber/v1/playlist/${idplaylist}`
    let header = { ...TokenObj, ...setHeaderContentType('formUrl')};
    //const body = JSON.stringify(formData)
    let body = toFormUrlEncoded(payload);
    let response = await httPut (url,header,body);
    return createPlaylistMiddleware(response);
 }

//To Get All The list of Playlist

export async function getListOfPlaylists(TokenObj: {}) {
    const url = `${BASEURLS.vCMS}subscriber/v1/playlist`;
    const header = {...TokenObj};
    const response = await httpGet(url, header);
    return listOfPlaylistMiddleware(response);
}

//To get content of current playlist data

export async function getPlaylistData(idplaylist:any,  TokenObj: {}) {
    const url = `${BASEURLS.vCMS}subscriber/v1/playlist/${idplaylist}`;
    const header = {...TokenObj};
    const response = await httpGet(url, header);
    return playlistDataMiddleware(response);
}

//To get songs list from playlist

export async function getPlaylistSongsAction(payload:any = {},  TokenObj: {}) {
    let url = `${BASEURLS.vCMS}subscriber/v1/playlist/content/${payload.idplaylist}?page=${payload.page}&pagesize=${payload.pagesize}`;
    const header = {...TokenObj};
    let mpegtspackage = await checkMpegRequired();
     
    if (mpegtspackage == true) {
        url =  url + '&mpegtspackage=' + "YES";
    }

    const response = await httpGet(url, header);
    return playlistSongsListMiddleware(response);
}

//To get Suggetions For playlist

export async function suggetionDataAction(params: any,  TokenObj: {}) {
    const url = `${BASEURLS.vCMS}subscriber/v1/content?category=${params.category}&objecttype=${params.objecttype}&page=${params.page}&pagesize=${params.pagesize}`
    const header = {...TokenObj};
    const response = await httpGet(url, header);
    return playlistSuggetionMiddleware(response);
}

//To add content to playlist

export async function addContetnToPlaylist(params: any,  TokenObj: {}) {
    const url = `${BASEURLS.vCMS}subscriber/v1/playlist/content/${params.idplaylist}`;
    var headers = {
        'Content-Type': 'application/json' 
    };
    headers = {...headers, ...TokenObj}
    var raw = JSON.stringify({
        "aggregatelist": [...params.objectId]
      });
    const response = await httpPost(url, headers, raw);
    return addContetnToPlaylistMiddleware(response);
}

//To delete playlist

export async function deletePlaylistAction(params: any,  TokenObj: {}) {
    const url = `${BASEURLS.vCMS}subscriber/v1/playlist/${params}`
    // var headers = {
    //     'Content-Type': 'application/json' 
    // };
    var headers = {...TokenObj}
    const body = {}
    const response = await httpDelete(url, headers);
    return deletePlaylistMiddleware(response);
}

//To Remove songs from the Playlist

export async function actRemoveFromThisPlaylist(params: any,  TokenObj: {}) {
    const url = `${BASEURLS.vCMS}subscriber/v1/playlist/content/${params.playListId}`;
    var headers = {
        'Content-Type': 'application/json' 
    };
    headers = {...headers, ...TokenObj};
    var raw = JSON.stringify({
        "removelist": [...[params.objectId]]
      });
    const response = await httpDelete(url, headers, raw);
    return removeFromThisPlaylistMiddleware(response);
}

