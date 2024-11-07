'use client'
import HorizontalGridCard from "./horizontalGridCard";
import SliderHeader from "./sliderHeader";
import v2 from '../../../public/song5.jpg';
import { Swiper, SwiperSlide } from "swiper/react";
import { Grid, Navigation } from "swiper/modules";
import { useEffect, useState, useRef } from "react"; 

export default function HorizontalGridSlider({contentData,lang}: any) {
    const swiperRef = useRef(null);
    const [isEND, setIsEND] = useState<any>({
        isEnd:false,
        isBegain:true
    })
    const [groups,setGroups]= useState<any>([])

    const headerData = { titleheader: lang?.Recently_Played};
    let SLIDER_PER_VIEW = 9 
    let TITLE_LIST = 'Recently Watch';
    let withoutspace = TITLE_LIST?.replace(/ +/g, ""); 
    withoutspace = withoutspace.replace('\'', "")
    withoutspace = withoutspace.replace('&', "")
    let imageGroups :any = useRef();

    // useEffect(()=>{       
    //     imageGroups.current = chunks(contentData, 9);      
    //     setGroups(imageGroups.current);
    // },[contentData]); // eslint-disable-line react-hooks/exhaustive-deps
    // const chunks = (array:any, size:any) => {
    //     const result = [];
    //     for (let i = 0; i < array?.length; i += size) {
    //       result.push(array.slice(i, i + size));
    //     }
    //     return result;
    // };
    // const getSliderStatus = (swiper: any) => {        
    //     let obj = {
    //        isEnd: swiper.isEnd,
    //        isBegain: swiper.isBeginning, 
    //     }
    //     setIsEND(obj)
    // }
    const renderGrid = () => {
        const grids = [];
        if(contentData){
            for (let i = 0; i < contentData.length; i += 9) {
              const gridData = contentData.slice(i, i + SLIDER_PER_VIEW);
              grids.push(
                <SwiperSlide key={i}>
                  <div className="w-full h-auto relative mx-auto rounded-[0.625rem] " key={i}>
                        <div key={i} className="grid grid-cols-3 max-xs:grid-cols-1 max-sm:grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-x-2 gap-y-4">  
                            {gridData.map((item:any, index:any) => (
                            <HorizontalGridCard itemlist={item} key={index} lang={lang}></HorizontalGridCard>
                            ))}
                        </div>
                  </div>
                </SwiperSlide>
              );
            }
            return grids;
        }    
      };
      const handleNextSlide = () => {        
        if (swiperRef.current) {
            var swiperSlide :any= swiperRef?.current; 
            swiperSlide?.swiper.slideNext() ;           
            let obj = {
                isEnd: swiperSlide?.swiper.isEnd,
                isBegain: swiperSlide?.swiper.isBeginning, 
            }
            setIsEND(obj)
        }
      };
      const handlePrevSlide = () => {        
        if (swiperRef.current) {
            var swiperSlide :any= swiperRef?.current;
            swiperSlide?.swiper.slidePrev() ;           
            let obj = {
                isEnd: swiperSlide?.swiper.isEnd,
                isBegain: swiperSlide?.swiper.isBeginning, 
            }
            setIsEND(obj)
        }
      };
    
    return (
        <section className="mt-5">
            {
                contentData &&
                <div id="slider-header">
                    <SliderHeader itemlist={headerData} defaultTitle={withoutspace} swiperInstance={isEND} sectionData={contentData} lang={lang} handleNextSlide={handleNextSlide} handlePrevSlide={handlePrevSlide} whereIamFrom={'RecentlyWatch'} isSeeAllEnable={true} />
                </div>
            }  
            <div className="w-full h-auto relative mx-auto rounded-[0.625rem] mt-4">
                <div>
                <Swiper
                    ref={swiperRef}
                    slidesPerView={1}               
                    breakpoints={{
                        280:{                        
                            slidesPerView:1,
                            slidesPerGroup:1
                        },
                        450:{                        
                            slidesPerView:1,
                            slidesPerGroup:1
                        },
                        640:{
                            slidesPerView:1,
                            slidesPerGroup:1
                        },
                        768:{
                            slidesPerView:1,
                            slidesPerGroup:1
                        }
                    }} 
                    className="grid grid-cols-3 max-xs:grid-cols-1 max-sm:grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-x-2 gap-y-4"
                >
                    {renderGrid()}
                </Swiper>
                </div>
            </div>  
    </section>
    )
}