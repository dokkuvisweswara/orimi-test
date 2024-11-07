
'use client'
import { useStorePlayer, usePlayList, useStoreMakeSaveDetailLists } from '@/store/init';
import { useEffect, useRef, useState } from 'react';
import { filterContentdataSet, getAlbumPagePayload } from '@/player/helper/playerUtility'
import { getAccessTokenObj } from '@/services/helpers/init.helper';
import BasePlayer from './basePlayer';
import { actRecentlyPlayedContentData, actRelatedContentData, actSectionData } from '@/services/actions/content.action'
import { notify } from '@/(layout)/v1/ToasterComponent';
import Script from 'next/script'
import { getPlaylistSongsAction } from '@/services/actions/playlist.actions';
import { actGetAvailability } from "@/services/actions/player.action"
import { errors_message } from '@/constants/errors_constants';
import { getCookie } from '@/hooks/client.cookie';
import { getAllContentFromFirebase } from '@/libs/firebaseUtility';
import usePaginatedData from './player.custom.com';

export default function ContainerPlayer({ lang }: any) {
    const setPrimaryPlayList = usePlayList((state: any) => state.setPrimaryPlayList);

    const detailListSave = useStoreMakeSaveDetailLists((state: any) => state.detailListSave);

    const [contentData, setContentData] = useState<any>(false);
    const [paginationPayload, setPaginationPayload] = useState<any>({});

    const [playerActive, setPlayerActive] = useState<any>(false);
    const [primaryPlayListLocalState, setPrimaryPlayListLocalState] = useState<any>([]);

    const [currentPlaybackTrack, setCurrentPlaybackTrack] = useState<any>(null);


    const { mergeDatadata, error, setPage, setPayloadService , getactPlayload} = usePaginatedData();

    const subscriberId = getCookie("subscriberId")
    const profileId = getCookie("ProfileId")


    useEffect(() => {
        setPrimaryPlayListLocalState((prev: any) => {
            let item = [...prev,  ...mergeDatadata];
            return item
        })
    }, [mergeDatadata]);

    useEffect(() => {
        if (error) {
            let itemTarget: any = document.getElementById(`lazyLoadSectionPlayerPlaylist`);
            if (itemTarget) {
                itemTarget.style.display = 'none';
            }

            setPage(1)
        }
    }, [error]);



    async function actTypeofObjectsetup(filteredPlayerObj: any) {
        setPaginationPayload({})
        setPage(1)

        
        if (filteredPlayerObj.category === "PODCAST" && filteredPlayerObj.objecttype === "SERIES") {
            let episodePayload = getAlbumPagePayload(filteredPlayerObj.objectid, false);

            const EpData = await actSectionData(episodePayload, getAccessTokenObj());
            let PRIMARYPLAYLIST = [];
            if (EpData?.data && EpData.data.length > 0) {
                PRIMARYPLAYLIST = EpData.data.map((singleItem: any, n: number) => {
                    return filterContentdataSet(singleItem, n)
                })
                // setCurrentPlaybackTrack(0);
                setCurrentPlaybackTrack({track: 0, objectid: PRIMARYPLAYLIST[0].objectid});

                setPrimaryPlayListLocalState(PRIMARYPLAYLIST)
            } else {
                notify(errors_message.NO_DATA_FOUND, "error");
            }

        } else if (filteredPlayerObj.category === "MUSIC" && filteredPlayerObj.objecttype === "ALBUM") {
            let contentPayload = getAlbumPagePayload(filteredPlayerObj.objectid, true);
            getactPlayload(contentPayload)

            const responseData = await actSectionData(contentPayload, getAccessTokenObj());

            let PRIMARYPLAYLIST = [];
            if (responseData?.data && responseData.data.length > 0) {
                setPaginationPayload({ payload: responseData.data, totalcount: responseData.totalcount })

                PRIMARYPLAYLIST = responseData.data.map((singleItem: any, n: number) => {
                    return filterContentdataSet(singleItem, n)
                })
                setCurrentPlaybackTrack({track: 0, objectid: PRIMARYPLAYLIST[0].objectid});
                setPrimaryPlayListLocalState(PRIMARYPLAYLIST)
            } else {
                notify(errors_message.NO_DATA_FOUND, "error");
            }
        } else if (filteredPlayerObj.category === "AUDIOBOOK" && filteredPlayerObj.objecttype === "ALBUM") {
            let contentPayload = getAlbumPagePayload(filteredPlayerObj.objectid, true, { category: ["AUDIOBOOK"] });
            const responseData = await actSectionData(contentPayload, getAccessTokenObj());

            let PRIMARYPLAYLIST = [];
            if (responseData?.data && responseData.data.length > 0) {
                PRIMARYPLAYLIST = responseData.data.map((singleItem: any, n: number) => {
                    return filterContentdataSet(singleItem, n)
                })
                // setCurrentPlaybackTrack(0);
                setCurrentPlaybackTrack({track: 0, objectid: PRIMARYPLAYLIST[0].objectid});

                setPrimaryPlayListLocalState(PRIMARYPLAYLIST)
            } else {
                notify(errors_message.NO_DATA_FOUND, "error");
            }
        } else if (filteredPlayerObj.category === "MUSIC" && filteredPlayerObj.objecttype === "CONTENT" && filteredPlayerObj.albumid) {

            let contentPayload = getAlbumPagePayload(filteredPlayerObj.albumid, true);
            getactPlayload(contentPayload)

            let currentTrack = 0;
            let responseData: any = "";

            let listFromGlobal: any = (window as any).DETAILPAGELISTTRACKS;
            // if (detailListSave || listFromGlobal) {
            //     responseData = listFromGlobal;
            //     setPaginationPayload({ payload: responseData, totalcount: responseData.totalcount })

            // } else {
                responseData = await actSectionData(contentPayload, getAccessTokenObj());

                setPaginationPayload({ payload: responseData.data, totalcount: responseData.totalcount })

            // }

            let PRIMARYPLAYLIST = [];
            if (responseData?.data && responseData.data.length > 0) {
                PRIMARYPLAYLIST =  responseData.data.map((singleItem: any, n: number) => {
                    if (singleItem.objectid == filteredPlayerObj.objectid) {
                        currentTrack = n;
                    }
                    return filterContentdataSet(singleItem, n)
                })
                // setCurrentPlaybackTrack(currentTrack);
                setCurrentPlaybackTrack({track: currentTrack, objectid: PRIMARYPLAYLIST[currentTrack].objectid});


                setPrimaryPlayListLocalState(PRIMARYPLAYLIST)
            } else {
                notify(errors_message.NO_DATA_FOUND, "error");
            }
        } else if (filteredPlayerObj.idplaylist && filteredPlayerObj.playliststatus) {
            let payload = {
                idplaylist: filteredPlayerObj.idplaylist,
                page: 1,
                pagesize: 15
            }
            const responseData: any = await getPlaylistSongsAction(payload, getAccessTokenObj());

            let PRIMARYPLAYLIST = [];
            if (responseData && responseData.length > 0) {
                PRIMARYPLAYLIST = responseData.map((singleItem: any, n: number) => {
                    return filterContentdataSet(singleItem, n)
                })
                // setCurrentPlaybackTrack(filteredPlayerObj.selectedIndex || 0);
                setCurrentPlaybackTrack({track: filteredPlayerObj.selectedIndex || 0, objectid: PRIMARYPLAYLIST[filteredPlayerObj.selectedIndex || 0].objectid});

                
                setPrimaryPlayListLocalState(PRIMARYPLAYLIST)
            } else {
                notify(errors_message.NO_DATA_FOUND, "error");

            }


        } else {

            // single track
            // getting liked sonsg only
            let likeData = await fetchAllFirebaseData();
            let musicList = Array.isArray(likeData) ? likeData.filter((upper: any) => upper.category == "MUSIC") : [];
            let indexfind = Array.isArray(musicList) ? musicList.findIndex((lower: any) => lower.objectid == filteredPlayerObj.objectid) : -1;
            let PRIMARYPLAYLIST = [];

            if (indexfind == -1) {

                // @params {PRIMARYPLAYLIST} added playlist as related data

                // let relatedPayload = {
                //     endpoint: 'subscriber/v1/content/related/' + filteredPlayerObj.objectid,
                //     params: { type: 'related' }
                // };
                // const responseData = await actRelatedContentData(relatedPayload, getAccessTokenObj());

                // @params base on genre data should be display playlist


                const payload = {
                    endpoint: 'subscriber/v1/content', params: {
                        category: ["MUSIC"],
                        objecttype: "CONTENT",
                        genre: filteredPlayerObj.genre,
                        page: 1
                    }
                }

                getactPlayload(payload)



                const responseData = await actSectionData(payload, getAccessTokenObj());

                if (responseData && responseData.data) {
                    setPaginationPayload({ payload, totalcount: responseData.totalcount })

                    PRIMARYPLAYLIST = responseData.data.map((singleItem: any, n: number) => {
                        return filterContentdataSet(singleItem, n)
                    })



                    PRIMARYPLAYLIST = [...[filteredPlayerObj], ...PRIMARYPLAYLIST]

                } else {
                    PRIMARYPLAYLIST = [filteredPlayerObj]
                }

                setPrimaryPlayListLocalState(PRIMARYPLAYLIST)


            } else {
                const itemToRemove = musicList.splice(indexfind, 1);

                musicList = [...itemToRemove, ...musicList];

                 PRIMARYPLAYLIST = musicList.map((singleItem: any, n: number) => {
                    return filterContentdataSet(singleItem, n)
                })

                setPrimaryPlayListLocalState(PRIMARYPLAYLIST)
            }

            // setCurrentPlaybackTrack(0);
            setCurrentPlaybackTrack({track: 0, objectid: PRIMARYPLAYLIST[0].objectid});

            

        }
    }
    const onEventPagination = function () {
        setPage((prev: any) => {
            return prev + 1;
        })
    }
    async function fetchAllFirebaseData() {
        try {
            const snapshot = await getAllContentFromFirebase(subscriberId, profileId);

            if (snapshot) {
                return await getContentIDtoAllInfo(snapshot)
            }
        } catch (error) { }
    }

    const getContentIDtoAllInfo = async (dataTemp: any) => {
        let objectIdList: any = [];
        dataTemp && dataTemp.map((item: any, i: number) => {
            objectIdList.push(`"${item.objectid}"`);
        });
        if (objectIdList && objectIdList.length > 0) {
            const payload = {
                contentlist: "[" + objectIdList + "]"
            };
            const responseData = await actRecentlyPlayedContentData(payload, getAccessTokenObj());
            if (responseData.data) {
                let result: any = [];
                console.error("reacted", responseData)
                return responseData.data
            }
        }
    }

    function actPlaybackPreparedForLaunch(playbackInfo: any) {
        let filteredPlayerObj: any = {};

        if (playbackInfo.idplaylist && playbackInfo.playliststatus) {
            filteredPlayerObj = playbackInfo;
        } else {
            filteredPlayerObj = filterContentdataSet(playbackInfo, 0)
        }
        actTypeofObjectsetup(filteredPlayerObj);
        setContentData(filteredPlayerObj);
    }
    useEffect(() => {
        setPage(1)
        let itemTarget: any = document.getElementById(`lazyLoadSectionPlayerPlaylist`);
        if (itemTarget) {
            itemTarget.style.display = 'block';

        }
        const unsubscribe = useStorePlayer.subscribe((state: any) => {
            setPlayerActive(true);
            let availabilities: any = localStorage.getItem('availabilities');

            if (availabilities == 'undefined' || !availabilities) {
                let payload = { page: 1, pagesize: 15 };
                actGetAvailability(payload, getAccessTokenObj()).then((avaibility) => {
                    if (avaibility) {
                        localStorage.setItem('availabilities', JSON.stringify(avaibility))

                        actPlaybackPreparedForLaunch(state?.contentSelectedByPlayBtn);

                    } else {
                        notify(errors_message.AVAILABILITY_NOT_LOADED, "error");
                    }
                });
            } else {
                actPlaybackPreparedForLaunch(state?.contentSelectedByPlayBtn)
            }


            let item: any = document.getElementById('main-contain');
            if (item) {
                item.style.marginBottom = "3rem";
            }

            let footerExtraHeight: any = document.getElementById('extra-footer-height');
            if (footerExtraHeight) {
                footerExtraHeight.style.height = "6rem";
            }

        });

        return () => unsubscribe();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps




    return (
        <>
            <Script src="/scripts/shaka-player.compiled.js" />
            {(playerActive && currentPlaybackTrack != null && primaryPlayListLocalState) && <BasePlayer currentPlaybackPosition={currentPlaybackTrack} primaryPlayListLocalState={primaryPlayListLocalState} contentData={contentData} lang={lang} paginationPayload={paginationPayload} onEventPagination={onEventPagination}
            
            
            ></BasePlayer>}

        </>
    )
}