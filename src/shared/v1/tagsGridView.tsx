import { useEffect, useState } from 'react';
import Gridslidercolortag from './gridTagsCard';
import SliderHeader from './sliderHeader';
import { actGetCurrentLanguage } from '@/utils/accessCurrentLang';
import { getDictionary } from '@/i18n/dictionaries';

export default function TagsGridView(props: any) {     
    const colors = ['border-leftBorderColor2', 'border-leftBorderColor3'];
    const headerData = { titleheader: 'Genre' };
    const [lang, setLang] = useState<any>(null);

    useEffect(() => { getCurrentLang();}, []);
  
    const callbackCloseModal = (data:any) => {    
      props.closeModalCallBack(data);
    }
    const getCurrentLang = async () => {
      let langSelected: any = await actGetCurrentLanguage()
       setLang(langSelected == 'en' ? 'eng' : 'mon');
     }

    return (
        <>
            <section>
                <div className="bg-primaryBgColor text-primaryColor mt-[-1.5rem] cursor-pointer">
                    <div className='mt-4'>
                        <div className="grid gap-3 grid-cols-3 max-xs:grid-cols-1 max-md:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3">
                            {lang && props?.headerData && props?.headerData?.sectionData?.map((section: any, i: number) => {
                                const colorIndex = i % colors.length; 
                                const color = colors[colorIndex];
                                return (
                                    <Gridslidercolortag itemlist={section} color={color} key={i} lang={props?.lang} selectedLanguage={lang} />
                                )
                            })}
                        </div>
                    </div>
                </div>
            </section>
        </>

    )
}
