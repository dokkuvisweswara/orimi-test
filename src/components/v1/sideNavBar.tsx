'use client'

import { useStore, useSoreUtility, useStorePlayer, useStoreConfig} from '@/store/init'
import { useEffect, useState, lazy, Suspense } from 'react'
import SideBarNavList from '@/shared/v1/sideBarNavList';
// import SideBarPlayList from '@/shared/v1/sideBarPlayList';

const SideBarPlayList = lazy(() => import('@/shared/v1/sideBarPlayList'))

import EmptyDiv from '@/containers/emptyDiv';

export default function SideNavBar( { config, deckingconfig }: any) {     
    const getCounter = useStore((state : any) => state.counter);
    const setIsToggleActive = useSoreUtility(( state:  any) => state.setIsToggleActive);
    useEffect(() => {
        if (typeof localStorage !== 'undefined' && deckingconfig) {
            localStorage.setItem('deckingconfig', JSON.stringify(deckingconfig))
        }

        const unsubscribe = useSoreUtility.subscribe((state: any) => {
            setShowTab(state?.isToggleActive)
        }); 
        return () => unsubscribe();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

   
    const [showTab, setShowTab] = useState(false);

    const sideBarNavPayload = deckingconfig?.screens; 

    const containerStyle = {
        height: 'calc(100vh - 85px)',
        width: '13rem',
        marginLeft: '0.3rem'
    }
    return (
        <div className={`${ showTab != false ? ' w-5/12 ' : 'w-full  px-2'}  z-10 py-4 bg-secondaryBgColor rounded-lg text-primaryColor  dark:bg-secondaryBgColor h-full overflow-y-auto scrollbar-thin custom-scrollbar fixed w-[13rem] ml-[0.3rem]`} style={containerStyle}>
            <div id="menuList">
                { sideBarNavPayload && <SideBarNavList showTab={showTab} sideBarNavPayload={sideBarNavPayload}></SideBarNavList>}
            </div>
            <div  id="playList" className={`${ showTab === true ? 'hidden' : ''}`}>
                <Suspense fallback={<p>Loading...</p>}>
                    <SideBarPlayList /> 
                </Suspense>
            </div>
            <EmptyDiv></EmptyDiv>
        </div>
    )
}