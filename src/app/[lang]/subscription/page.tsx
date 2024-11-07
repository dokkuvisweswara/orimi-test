import Subscription from "@/containers/plan/subscription";
import { getDictionary } from '@/i18n/dictionaries';
import { actGetCurrentLanguage } from "@/utils/accessCurrentLang";
export default async function SubscriptionList() {
    let langSelected: any = await actGetCurrentLanguage();

    const lang = await getDictionary(langSelected);
    return(
        <Subscription lang={lang}></Subscription>
    )
}