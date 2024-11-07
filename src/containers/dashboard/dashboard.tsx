import dynamic from 'next/dynamic';


import { actConfig, actGetDeviceToken, getDeckingConfig } from '@/services/actions/init.action'
import { actSectionData } from '@/services/actions/content.action'
import { getAccessTokenObjFromServer } from  "@/services/helpers/init.server.helper"
import { cookies } from 'next/headers'

const VerticalGridSlider: any = dynamic(() => import('@/shared/v1/verticalGridSlider'));
const Careousel: any = dynamic(() => import('@/components/v1/carousel/Careousel.tsx'));


const LazyLoadingSectionContainer = dynamic(() => import('@/containers/dashboard/lazyLoadingSectionContainer'), {
  ssr: false, // Disable server-side rendering for this component
});
import { getEndPoint } from '@/services/helpers/init.helper';
import DeckingSectionControl from '@/utils/deckingSectionControl';

import { getDictionary } from '@/i18n/dictionaries';
import { actGetCurrentLanguage } from "../../utils/accessCurrentLang";
import { DEVICE_TOKEN, SET_DEVICE_TOKEN } from '@/constants/appConfig';





export default async function Dashboard ({ screenIdParam }: any) {
  const noServerSectionRender: number = 1;
    let config: any = '';
    let deckingconfig: any = null;

    const RecentlyPlayed = dynamic(() => import('@/shared/v1/recentlyPlayed'), {
      ssr: false, // Disable server-side rendering for this component
    });

   

    let configObj = await actConfig();
    config = configObj?.result;
       
    const cookieStore = cookies();
    let header: any = {};
    let deviceTokenObj = cookieStore.get('deviceToken');
    let deviceToken: any = deviceTokenObj && deviceTokenObj.value ? deviceTokenObj.value : null
    if (!deviceToken) {
        try {
          if (DEVICE_TOKEN) {
            header["Authorization"] = `Bearer ${DEVICE_TOKEN}`;
        } else {
            deviceToken = await actGetDeviceToken();
            header["Authorization"] = `Bearer ${deviceToken}`;
            SET_DEVICE_TOKEN(deviceToken)
        }
        } catch(e) {
            console.log("e>>>>>>", e)
        }
       
    } else {
        header = getAccessTokenObjFromServer();
    }


    let langSelected: any = await actGetCurrentLanguage()
    const lang = await getDictionary(langSelected);

    deckingconfig = await getDeckingConfig(header);


    let featuredScreen: any = '';
		let categoryScreens: any = [];
		let resolvedConfigs: any[] = [];
	  let sliderConfigs: any[] = [];
	  let remainingSliderConfigs: any[] = [];
    let continueWatchSlider: any = '';
    
    if (config && deckingconfig && deckingconfig.screens) {
        let featuredScreenPayload: any = null;
        let configScreen: any = {};
        deckingconfig.screens.forEach((item: any) => {
          if (item.id.toLowerCase().includes(screenIdParam.toLowerCase())) 
            configScreen = item
        })
        if (!configScreen.sections) {
          return ;
        }
        configScreen?.sections.forEach((section: any) => {
            if (section.listType === "CAROUSEL") {
                featuredScreenPayload = section;
            } else if (section.sectionType == "CONTINUEWATCHING") {
              continueWatchSlider = section;
            } else {
                categoryScreens.push(section)
            }
          })
        if (featuredScreenPayload) {
            let payload = {
              endpoint: getEndPoint(featuredScreenPayload),
              params: featuredScreenPayload.sectionData
            };

            featuredScreen = await actSectionData(payload, getAccessTokenObjFromServer());
        }

			sliderConfigs = categoryScreens.slice(0, noServerSectionRender).map(async (section: any) => {
				try {
					const apiResponse: any = await DeckingSectionControl(section, getAccessTokenObjFromServer(),langSelected);
					return apiResponse;
				} catch (error) {
					return {
						sectionData: [],
						headerData: { titleheader: section.title[langSelected == "en" ? "eng" : "mon"], link:section.title["eng"] },
					};
				}
			})
			remainingSliderConfigs = categoryScreens.slice(noServerSectionRender);
			resolvedConfigs = await Promise.all(sliderConfigs);
    }
    
  
    return (
              <>
                {featuredScreen && <Careousel featuredScreen={featuredScreen} lang={lang}></Careousel>}
                {continueWatchSlider && <RecentlyPlayed continueSection={continueWatchSlider} lang={lang}></RecentlyPlayed>}
                
                {resolvedConfigs && resolvedConfigs.map((config: any, index: number) => (
                 config.sectionData && config.sectionData.length > 0 && (
                  <VerticalGridSlider
                    key={index}
                    sectionData={config.sectionData}
                    headerData={config.headerData}
                    apiCallData={config.apiCallData}
                    lang={lang}
                    config={config.config}
                  ></VerticalGridSlider>
                 )
                ))}
                <LazyLoadingSectionContainer id="additionalSection" configs={remainingSliderConfigs} selectedLang={langSelected} lang={lang}></LazyLoadingSectionContainer>
                
            </>
    )
}