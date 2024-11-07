import { Open_Sans } from 'next/font/google'
import dynamic from 'next/dynamic';
import Head from 'next/head'

import { actConfig, actGetDeviceToken, getDeckingConfig } from '@/services/actions/init.action'
import { DEVICE_TOKEN, SET_DEVICE_TOKEN, SET_STATIC_CODE_STORE_DECKING } from '@/constants/appConfig';
import { cookies } from 'next/headers';
import NextTopLoader from 'nextjs-toploader';

const Header: any = dynamic(() => import('@/components/v1/header'));
const CommonSidebar = dynamic(() => import('@/components/v1/CommonSidebar'));


import AuthToken, { actSaveDeviceToken } from '@/(layout)/v1/authToken.tsx';
import { Toaster } from '@/(layout)/v1/ToasterComponent';


const EmptyDiv = dynamic(() => import('@/containers/emptyDiv'), {loading:() => <p> loading...</p>, ssr: false});
import { getDictionary } from '@/i18n/dictionaries';

import { actGetCurrentLanguage } from "../../utils/accessCurrentLang";
import { getAccessTokenObjFromServer } from '@/services/helpers/init.server.helper';

const ContainerPlayer = dynamic(() => import('@/containers/player/containerPlayer'), { loading:() => <p> loading...</p>, ssr: false});

const MobileFooterNav = dynamic(() => import('@/shared/v1/mobileFooterNav'), { loading:() => <p> loading...</p>, ssr: false });

// const FooterBottom = dynamic(() => import('@/components/v1/footer-bottom'), {
//     ssr: false, // Disable server-side rendering for this component
//   });
// const FooterTop = dynamic(() => import('@/components/v1/footer-top'), {
//     ssr: false, // Disable server-side rendering for this component
//   });

const FooterUI = dynamic(() => import('@/containers/footer.tsx'));


const Sans_Open = Open_Sans({ subsets: ['latin'] })
type Props = {
    children: React.ReactNode;
    params: { lang: string };
  };

export default async function WrapperLayout({ children, params }: Props) {

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
        header =  getAccessTokenObjFromServer();
    }

    let config = await actConfig();  
    let deckingconfig = await getDeckingConfig(header);
    
    SET_STATIC_CODE_STORE_DECKING(deckingconfig);


    let langSelected: any = await actGetCurrentLanguage();
    const language = await getDictionary(langSelected);
    return (
        <html  className='bg-black !scroll-smooth'>
            <Head>
                <meta property="og:image:height" content="600" />
                <meta property="og:image:width" content="800" />
                <meta property="og:type" content="website" />
            </Head>
            <body className={Sans_Open.className}>
            <AuthToken config={config?.result}></AuthToken>
            <NextTopLoader/>
                <div className='bg-black w-full' id='header'>
                <Header config={config?.result} lang={language} whereIamFrom={'LAYOUT'} deckingconfig={deckingconfig} langSelected={langSelected}></Header>
                </div>


            { deckingconfig && (<div className="mt-16 max-lg:mt-28  bg-black p-1 min-h-screen">
                    <div className='flex gap-1 justify-between'>
                      <CommonSidebar config={config} lang={language} deckingconfig={deckingconfig} /> 
                        <main id="main-contain" className='max-xl:pb-[4rem] max-lg:!py-4 max-lg:!px-1 '>
                            {children} 
                            {/* <EmptyDiv></EmptyDiv> */}
                        </main>
                    </div>
                 
                    <div id='mobileNav' className='hidden max-lg:block max-lg:h-auto max-lg:fixed max-lg:bottom-0 max-lg:w-full max-lg:z-50 max-lg:left-0'>
                        <MobileFooterNav></MobileFooterNav>
                    </div>
                </div>) }
                
                <ContainerPlayer lang={language}></ContainerPlayer>
                <Toaster></Toaster>

                <FooterUI config={config} lang={language} ></FooterUI>
            </body>
        </html>
    )
}