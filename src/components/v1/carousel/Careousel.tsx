'use client'
import React from "react"
import './style/CardStyle.css'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules'; 
import 'swiper/css'; 
import 'swiper/css/pagination'
import 'swiper/css/autoplay'
import Card from "./Card";
 
export default function Careousel({featuredScreen, lang}: any) {   
    return (
      <section className="carousel-wrapper">
               { featuredScreen && (<Swiper           
                modules={[Navigation, Pagination, Autoplay ]}
           
                spaceBetween={1}
                slidesPerView={1}  
                loop={true}       
                navigation      
                pagination={{clickable:true}}    
                autoplay={{
                  delay: 7000,
                  pauseOnMouseEnter: true
              }}          
                className="w-full aspect-[4/1]  max-lg:aspect-[1/1] flex justify-center items-center hover:opacity-90"      
                >
                  {
                    featuredScreen?.data?.map((item: any, key: any)=>(
                      <SwiperSlide key={key} className="updated-width">     
                        <Card itemindex={item} lang={lang} />
                      </SwiperSlide>       
                    
                    ))
                  }
                </Swiper>) }
         </section>
  )
}
