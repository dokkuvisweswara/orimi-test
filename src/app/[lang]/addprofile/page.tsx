import AddProfile from "@/components/v1/addProfile";
import { getDictionary } from "@/i18n/dictionaries";
import { actGetCurrentLanguage } from "@/utils/accessCurrentLang";
import { cookies } from "next/headers";

export default async function addprofile() {
    const cookieStore = cookies()
    let langSelected: any = await actGetCurrentLanguage();

    const lang = await getDictionary(langSelected);
    return (
        <>
        <AddProfile lang={lang}/>
        </>
    )
}
export function generateMetadata() {
    return {
        title: "Add Profile",
        description: "Add Profile"
    }
}