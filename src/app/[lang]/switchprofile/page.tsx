import SwitchProfile from "@/components/v1/switchprofile";
import { getDictionary } from "@/i18n/dictionaries";import { actGetCurrentLanguage } from "@/utils/accessCurrentLang";

export default async function switchprofile() {

    let langSelected:any = await actGetCurrentLanguage();
    const lang = await getDictionary(langSelected);

    return (
        <>
        <SwitchProfile lang={lang}/>
        </>
    )
}
export function generateMetadata() {
    return {
        title: "Switch Profile",
        description: "Switch Profile"
    }
}