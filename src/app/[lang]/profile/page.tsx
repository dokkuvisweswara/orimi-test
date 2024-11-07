import ProfilePage from "@/components/v1/profilePage";
import { cookies } from 'next/headers'
import { getDictionary } from '@/i18n/dictionaries';
import { actGetCurrentLanguage } from "@/utils/accessCurrentLang";

export default  async function profile() {

    const cookieStore = cookies()
    let langSelected: any = await actGetCurrentLanguage();

    const lang = await getDictionary(langSelected);
    return (
        <>
        <ProfilePage lang={lang} ></ProfilePage>
        </>
    )
}
export function generateMetadata() {
    return {
        title: "Profile",
        description: "Profile"
    }
}