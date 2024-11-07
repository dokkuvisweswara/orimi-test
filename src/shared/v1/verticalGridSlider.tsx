'use client'
import SliderHeader from "./sliderHeader"
import VerticalGridCard from "./verticalGridCard"
import VerticalGridCardBg from "./vericalGridCardWithBg";
import VerticalRoundedGridCard from "./verticalRoundedGridCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import 'swiper/css'; 
import { useEffect, useState } from "react";
import TagsGridView from "./tagsGridView";

export default function VerticalGridSlider({sectionData, headerData, apiCallData,lang, config}: any) {


    const [titleWithoutspace, setTitleWithoutspace] = useState<any>({})
    const [SLIDER_PER_VIEW, setSLIDER_PER_VIEW] = useState<number>(7)


    const [isEND, setIsEND] = useState<any>({
        isEnd:false,
        isBegain:true
    })

    useEffect(() => {
        let TITLE_LIST = headerData?.link
        let withoutspace = TITLE_LIST?.replace(/ +/g, "")    
        withoutspace = withoutspace?.replace('\'', "");
        withoutspace = withoutspace?.replace('&', "");
        setTitleWithoutspace({ withoutspace: withoutspace, TITLE_LIST: TITLE_LIST});
    }, [])


    function getSliderStatus (swiper: any) {       
     let obj = {
        isEnd: swiper.isEnd,
        isBegain: swiper.isBeginning, 
     }
     setIsEND(obj)
    }    

   

    return (
        <section className="mt-5">
            <div className="bg-primaryBgColor text-primaryColor  mt-7 vertical-slider-home">
                    <SliderHeader itemlist={headerData} defaultTitle={titleWithoutspace.withoutspace} title={titleWithoutspace.TITLE_LIST} sectionData={sectionData} sliderView={SLIDER_PER_VIEW} swiperInstance={isEND} apiCallData={apiCallData} lang={lang} whereIamFrom={'VERTICALSLIDER'} isSeeAllEnable={true} config={config}/>
                    {
                        sectionData &&  headerData &&
                        <Swiper modules={[Navigation]} autoHeight={true} grid={{fill:'row'}} navigation={{nextEl:`.${titleWithoutspace.withoutspace}-swiper-button-next`,prevEl:`.${titleWithoutspace.withoutspace}-swiper-button-prev`}} spaceBetween={8} maxBackfaceHiddenSlides={1}   onSlideChange={(e)=>{getSliderStatus(e)} } 
                        breakpoints={{
                            280:{                        
                                slidesPerView:2.1,
                                slidesPerGroup:2
                            },
                            450:{                        
                                slidesPerView:3.1,
                                slidesPerGroup:2
                            },
                            768:{
                                slidesPerView:4.2,
                                slidesPerGroup:2
                            },
                            900:{
                                slidesPerView:4.7,
                                slidesPerGroup:3
                            },
                            1160:{
                                slidesPerView:5.5,
                                slidesPerGroup:4
                            },
                            1279 : {
                                slidesPerView:6,
                                slidesPerGroup:6
                            },
                            1400:{
                                slidesPerView:7,
                                slidesPerGroup:7
                            },
                            1640:{
                                slidesPerView:8,
                                slidesPerGroup:8
                            },
                            1800:{
                                slidesPerView:9.5,
                                slidesPerGroup:9.5
                            }
                        }}
                        >
                    {
                        sectionData &&
                            <div className='mt-4'>
                                <div className="grid grid-cols-6 xs:grid-cols-1  sm:grid-cols-3  md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-6 2xl:grid-cols-6 gap-4 max-sm:grid-cols-3">
                                    {sectionData && sectionData.map((item: any, i:number) => {
                                        return (
                                            <div key={i}>
                                                    {headerData.listType === 'MUSIC' &&  <SwiperSlide key={i}><VerticalGridCard itemlist={item} key={i} lang={lang}/></SwiperSlide>}
                                                    {headerData.listType === 'TWOROWS' && <SwiperSlide key={i}><VerticalGridCard itemlist={item} key={i} lang={lang}/></SwiperSlide> }
                                                    {headerData.listType === 'AUDIOBOOKS' &&  <SwiperSlide key={i}><VerticalGridCard itemlist={item} key={i} lang={lang}/></SwiperSlide>}
                                                    {headerData.listType === 'AUDIOBOOK' &&  <SwiperSlide key={i}><VerticalGridCard itemlist={item} key={i} lang={lang}/></SwiperSlide>}
                                                    {headerData.listType === 'ARTIST' && <SwiperSlide key={i}><VerticalRoundedGridCard itemlist={item} key={i} lang={lang}/></SwiperSlide>}
                                                    {headerData.listType === 'PLAYLIST' && <SwiperSlide key={i}><VerticalGridCardBg itemlist={item} key={i} lang={lang}/></SwiperSlide>}
                                                    {headerData.listType === 'ALBUMS' && <SwiperSlide key={i}><VerticalGridCardBg itemlist={item} key={i} lang={lang}/></SwiperSlide>}
                                                    {headerData.listType === 'PODCAST' && <SwiperSlide key={i}><VerticalGridCard itemlist={item} key={i} lang={lang}/></SwiperSlide> }
                                                    {headerData.listType === 'LIST' && <SwiperSlide key={i}><VerticalGridCard itemlist={item} key={i} lang={lang}/></SwiperSlide> }
                                            </div>
                                        )
                                    })
                                    }
                                
                                    
                                </div>
                            </div>
                    }
                        </Swiper>
                    }
            </div>
            {headerData.listType === 'GENRES' && <TagsGridView headerData={headerData} lang={lang}/> }
      </section>
    )
}