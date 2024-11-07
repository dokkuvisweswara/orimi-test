import Subscribe from "@/containers/plan/subscribe";
import { getDictionary } from '@/i18n/dictionaries';
import { actGetCurrentLanguage } from "@/utils/accessCurrentLang";

export default async function SubscribePlansList() {
    let langSelected: any = await actGetCurrentLanguage();

    const lang = await getDictionary(langSelected);
    return(
         
        <Subscribe lang={lang}></Subscribe>
    )
}
export function generateMetadata() {
    return {
        title: "Subscribe",
        description: "Subscribe"
    }
}