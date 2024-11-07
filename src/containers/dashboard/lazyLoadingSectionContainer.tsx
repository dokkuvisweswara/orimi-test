'use client'
import React, { useState, useEffect, useRef } from 'react';
import VerticalGridSlider from '@/shared/v1/verticalGridSlider';
import { getAccessTokenObj } from '@/services/helpers/init.helper';
import SkeletonCard from '@/components/v1/skeletonCard';
import DeckingSectionControl from '@/utils/deckingSectionControl';

const SectionLoader = ({ apiUrl, selectedLang, lang, index }: any) => {
  const [data, setData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let theObserver: any = "";
    let itemTarget: any = document.getElementById(`section-loader${index}`)
    const fetchData = async () => {
      setIsLoading(true);
      try {        
        const response = await DeckingSectionControl(apiUrl, getAccessTokenObj(), selectedLang);
        setData(response);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      setIsLoading(false);
    };

    const observerCallback = (entries: any) => {
      const [entry] = entries;
      if (entry.isIntersecting && !isLoading) {
        theObserver.unobserve(itemTarget);
        itemTarget.style.display = 'none';
        fetchData();

      }
    };

    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    };

    theObserver = new IntersectionObserver(observerCallback, observerOptions);
    theObserver.observe(itemTarget);

    return () => {
      theObserver.unobserve(itemTarget);
      theObserver.disconnect();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps


  return (
    <>
        {data && data.sectionData && data.sectionData.length > 0 ? <VerticalGridSlider
            sectionData={data.sectionData}
            headerData={data.headerData}
            apiCallData={data.apiCallData}
            config={apiUrl}
            lang={lang}
          /> : ''}
          {isLoading && <SkeletonCard></SkeletonCard>}
          <div id={`section-loader${index}`} className='h-[5rem]'></div>
    </>
  );
};

const LazyLoadingSectionContainer = ({ configs, selectedLang,lang }: any) => {

  return (
    <div>
      {configs.map((carousel: any, index: number) => (
        <SectionLoader apiUrl={carousel} key={index} index={index} selectedLang={selectedLang} lang={lang}></SectionLoader>
      ))}
    </div>
  );


};

export default LazyLoadingSectionContainer;
