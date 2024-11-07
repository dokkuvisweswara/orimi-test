
export const  checkMpegRequired = async () => {

    let isMpegRequired = false;
    if ( typeof document !== 'undefined') {
      let videoTag = document.createElement("video");
      let platformOs = navigator.platform;
  
      if (videoTag.canPlayType("application/vnd.apple.mpegurl")) {
        if (platformOs.startsWith("Mac")) {
          isMpegRequired = true;
        }
      }
    } else {
      let browserdetails: any = '';
     
      if (typeof window === 'undefined') {
        // Server-side
        const { cookies: serverCookies } = await import('next/headers');
        browserdetails = serverCookies().get('browserdetails')?.value

        if (browserdetails?.browser?.name == 'Safari') {
          isMpegRequired = true;
        } else if (browserdetails?.os?.name == 'iOS') {
          isMpegRequired = true;
        }
      }
    
    }
  

    return isMpegRequired;
  }