import  Cookies  from 'js-cookie';


export const getCookie = (key: any) => {
    return Cookies.get(key);
 }
 
 export const removeCookie = (key: any) => {
     return Cookies.remove(key);
  }
 
export const setCookie = (key: any, value: any, dateN:any ) => {
    if (typeof window !== "undefined") {
        let maxDate: any = "";
            if (dateN) {
                let t: any = new Date(dateN * 1000);
                t.setSeconds(t.getSeconds() - 30);
                maxDate = t.toGMTString();
                (window as any).document.cookie = key + '='+ value + ';expires='+maxDate + ';path=/';

            } else {
                (window as any).document.cookie = key + '='+ value + ';path=/';

            }
        }
}
