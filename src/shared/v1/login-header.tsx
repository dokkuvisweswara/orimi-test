import CloseIcon from "./close-icon";
import SocialIcon from "./social-icon";
import { useEffect, useState } from 'react';
import { actGetCurrentLanguage } from '@/utils/accessCurrentLang';
import { getDictionary } from '@/i18n/dictionaries';

export default function LoginHeader(props:any) {
  const [lang, setLang] = useState<any>(null);

  useEffect(() => { getCurrentLang();}, []);

  const callbackCloseModal = (data:any) => {    
    props.closeModalCallBack(data);
  }
  const getCurrentLang = async () => {
    let langSelected: any = await actGetCurrentLanguage()
     const language = await getDictionary(langSelected);
     setLang(language);
   }
  return (
    <>
      <div className="pt-4 text-gray-200 text-lg font-bold bg-[#191919] rounded-t-md">
        <CloseIcon callbackCloseModal = {callbackCloseModal}/>
        <div className="mt-6">
          <h1 className="text-2xl text-center font-semibold"> {lang?.Welcome_set} </h1>
          <SocialIcon />
        </div>
      </div>
    </>
  );
}
