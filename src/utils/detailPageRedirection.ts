export const redirectionsDetails = (data: any): string => {
    let url ='/';

    if(data.category === "AUDIOBOOK" && data.objecttype === "ALBUM") {
        url = `/audiobook/${data.objectid}`
    
    } else if(data.category === "MUSIC" && data.objecttype === "ALBUM") {
        url = `/album/${data.objectid}`

    } else if(data.category === "MUSIC" && data.objecttype === "CONTENT") {
        url = `/song/${data.objectid}`

    } else if(data.category === "PODCAST" && data.objecttype === "SERIES") {        
        url = `/podcast/${data.objectid}`
    }
    return url;
}