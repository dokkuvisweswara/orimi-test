'use client'
import VerticalGridCard from '@/shared/v1/verticalGridCard';
import VerticalRoundedGridCard from '@/shared/v1/verticalRoundedGridCard';
import { scrollToTop } from "@/utils/basicHelper"
import { useEffect } from 'react';

export default function GridLayout({contentData, itemType, lang}: any) {

    const gridStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(155px, 1fr))',
        gap: '0.5rem',
    };
    useEffect(() => {
        scrollToTop()
    },[]);
    return (
        <>
            <section className='px-4  w-full ml-2 max-lg:ml-[0rem] max-lg:p-[0rem]'>                
                <div style={gridStyle} className="text-primaryColor mt-4">
                    {   
                        contentData?.map((item:any, i:number) => {                        
                            return (
                                <>
                                    { itemType == 'CASTNCREW' && <VerticalRoundedGridCard itemlist={item} displayType={"grid"}  key={i} lang={lang}/> }
                                    { itemType != 'CASTNCREW' && <VerticalGridCard itemlist={item} key={i} displayType={"grid"} lang={lang}></VerticalGridCard> }

                                </>
                       
                            )
                        })   
                    }
                </div>
            </section>
        </>
    )
}