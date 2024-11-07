import { useStoreContent } from "@/store/init";
import { redirectUrl } from "@/utils/content";
import Link from "next/link";
export default function AlbumName({data}: any){
    const setContentData = useStoreContent((state : any) => state.setContentData);
    const redirectTodetailspage =() => {
         setContentData("");
    }  
    return(
        <>
        <Link href={redirectUrl(data)} className="cursor-pointer hover:underline" onClick={redirectTodetailspage}>{data.albumname}</Link>
        </>
    )
}