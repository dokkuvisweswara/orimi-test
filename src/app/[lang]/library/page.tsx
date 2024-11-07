// import CommonSidebar from "@/components/v1/CommonSidebar";
import LibraryPage from "@/components/v1/librearyPage";
import { APPCONFIG } from '@/constants/appConfig';
import { getDictionary } from "@/i18n/dictionaries";
import { actConfig } from '@/services/actions/init.action'
import { actGetCurrentLanguage } from "@/utils/accessCurrentLang";

export default async function Library(
    {
      params,
    }: {
      params: { audiobookId: string };
    }
) {
    let config: any = '';
    if (!APPCONFIG) {
       let configObj = await actConfig();
        config = configObj?.result;
    } else {
        config = APPCONFIG
    }
    let langSelected: any = await actGetCurrentLanguage();

    const lang = await getDictionary(langSelected);
    return (
    <>
        <div>
            {/* <CommonSidebar lang={lang} /> */}
            <LibraryPage lang={lang}></LibraryPage> 
          </div>
    </>
    )
}
export function generateMetadata() {
    return {
        title: "Library",
        description: "Library"
    }
}