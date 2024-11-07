import SliderHeader from "@/shared/v1/sliderHeader";
import VerticalGridCard from "@/shared/v1/verticalGridCard";
import VerticalRoundedGridCard from "@/shared/v1/verticalRoundedGridCard";
import { useEffect, useState } from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css'; 

export default function SearchDetailPage({searchResult,title,lang,headerData,apiData,isSeeAllEnable}: any) { 
    const [searchData, setSearchData]= useState<any>([])     
    useEffect(()=>{
        setSearchData(searchResult) 
        if (searchResult) {             
            let newObject :any= {};
            // Iterate over the originalObject
            Object.keys(searchResult)?.forEach(key => {
                // Create a new key-value pair in newObject where the value is the same as the key
                newObject[key] = { titleheader: key };
            }); 
            const newData = Object.values(newObject);                    
            // setHeaderData(newData);  
        }
    },[searchResult]);
    const [isEND, setIsEND] = useState<any>({
        isEnd:false,
        isBegain:true
    })
    function getSliderStatus (swiper: any) {      
        let obj = {
           isEnd: swiper.isEnd,
           isBegain: swiper.isBeginning, 
        }
        setIsEND(obj)
    }  
    let SLIDER_PER_VIEW = 6   
    return (
        <>           
            <div className="mt-4 sub-container mr-4">
                <SliderHeader itemlist={headerData} whereIamFrom={"SEARCH"} apiCallData={apiData} sectionData={searchResult}  lang={lang} title={title} isSeeAllEnable={isSeeAllEnable} defaultTitle={title} swiperInstance={isEND}></SliderHeader>
                 <Swiper modules={[Navigation]} autoHeight={true} grid={{fill:'row'}} slidesPerView={SLIDER_PER_VIEW} navigation={{nextEl:`.${title}-swiper-button-next`,prevEl:`.${title}-swiper-button-prev`}} spaceBetween={8} maxBackfaceHiddenSlides={1}  slidesPerGroup={SLIDER_PER_VIEW}  onSlideChange={(e)=>{getSliderStatus(e)}} 
                    breakpoints={{
                        280:{                        
                            slidesPerView:2.1,
                            slidesPerGroup:2
                        },
                        450:{                        
                            slidesPerView:3.1,
                            slidesPerGroup:3
                        },
                        768:{
                            slidesPerView:4.2,
                            slidesPerGroup:4
                        },
                        900:{
                            slidesPerView:4.7,
                            slidesPerGroup:4
                        },
                        1160:{
                            slidesPerView:5.5,
                            slidesPerGroup:5
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
                            slidesPerView:10,
                            slidesPerGroup:10
                        }
                    }}
                    >
                        {
                            searchData &&                      
                            <div className='mt-4 flex'>
                                <div className="grid grid-cols-6 xs:grid-cols-1  sm:grid-cols-3  md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-6 2xl:grid-cols-6 gap-4 max-sm:grid-cols-3">                               
                                    {
                                    searchData && searchData.map((item:any,i:any)=>{
                                        return (  
                                            <div key={i}>
                                                {
                                                    searchData && title =='ARTIST' &&
                                                    <SwiperSlide key={i}>
                                                        <VerticalRoundedGridCard itemlist={item} key={i}  lang={lang} />
                                                    </SwiperSlide>   
                                                }  
                                                {
                                                    searchData && title =='MUSIC'    && 
                                                    <SwiperSlide key={i}>
                                                        <VerticalGridCard itemlist={item} key={i}  lang={lang} />
                                                    </SwiperSlide>                                         
                                                }   
                                                {
                                                    searchData && title =='AUDIOBOOK' &&
                                                    <SwiperSlide key={i}>
                                                        <VerticalGridCard itemlist={item} key={i}  lang={lang} />
                                                    </SwiperSlide>   
                                                }     
                                                {
                                                    searchData && title =='ALBUM' && 
                                                    <SwiperSlide key={i}>
                                                        <VerticalGridCard itemlist={item} key={i}  lang={lang} />
                                                    </SwiperSlide>   
                                                } 
                                                {
                                                    searchData && title =='PODCAST' && 
                                                    <SwiperSlide key={i}>
                                                        <VerticalGridCard itemlist={item} key={i}  lang={lang} />
                                                    </SwiperSlide>
                                                }   
                                                {
                                                    searchData && title =='SPEECH' && 
                                                    <SwiperSlide key={i}>
                                                        <VerticalGridCard itemlist={item} key={i}  lang={lang} />
                                                    </SwiperSlide> 
                                                }                    
                                            </div>     
                                        )
                                    })
                                    }                                    
                                     
                                                                
                                </div>
                            </div>
                        }
                    </Swiper>              
             
            </div>
        </>
    )
}