'use client'

import { Popup, PopupHeader, PopupBody } from "@/popup/commonPopup";
import closeIcon from "../../../public/closeicon.svg";
import arrowBack from "../../../public/arrow_back.svg";
import addtoList from '../../../public/add_to_playlist.svg';
import rightMark from '../../../public/rightMark.svg';

import Image  from "next/image";
import { useEffect, useState } from "react";
import useDebounce from "@/utils/debounce";
import { searchContent } from "@/services/actions/search.actions";
import { getPoster } from "@/utils/content";
import { addContetnToPlaylist } from "@/services/actions/playlist.actions";
import { getAccessTokenObj } from "@/services/helpers/init.helper";
import { useStoreContent, useStoreUpdatePlayListSongs } from "@/store/init";
import { notify } from "@/(layout)/v1/ToasterComponent";
import ArtistName from '@/containers/artistName';
import Spinner from "@/loaders/spinner/spinner";

export default function AddToThisPlaylistPopup(props: any) {

    let categoriesList = [{title:'music', id:'MUSIC'}, {title:'episodes', id:'EPISODES'}, {title:'audiobook', id:"AUDIOBOOK"}];
    const [activeCategory, setActiveCategory] = useState<any>('MUSIC');
    const [searchValue, setSearchValue] = useState<any>('');
    const [searchedData, setSearchedData] = useState<any>(null);
    const [selectedItems, setSelectedItems] = useState<any>([]);
    const [enableAddToThisPlaylsitPopup, setEnableAddToThisPlaylsitPopup] = useState<any>(false);
    const setUpdatePlayListSongs = useStoreUpdatePlayListSongs((state : any) => state.setUpdatePlayListSongs);
    const updatePlayListSongs = useStoreUpdatePlayListSongs((state : any) => state.updatePlayListSongs);
    const [loading, setLoading] = useState<any>(false);


    const handleInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        setSearchValue(inputValue);      
        debouncedSearch(inputValue)
    }

    const actGetSearchService = async (inputValue: any) => {

        if (inputValue.length > 1) {
            // debouncedSearch(inputValue);
            let objecttype = 'CONTENT';
            if(activeCategory === 'AUDIOBOOK'){
                objecttype = 'ALBUM'
            } else if(activeCategory === 'EPISODES'){
                objecttype = 'SERIES'
            }
            let payload = {
                query: inputValue,
                category: [activeCategory],
                objecttype: objecttype
            }
            let serchRes = await searchContent(payload, getAccessTokenObj());
            if (serchRes.data && serchRes.data.length > 0) {
             
                setSearchedData(serchRes.data);

            }

        } else {
            setSearchedData(null);
        }
    }

    const selectCategory = (item: any) => {
        setActiveCategory(item.id);
        setSearchedData(null);
        setSearchValue('');
        setSelectedItems([]);
    }

    const clearSerchValue = (Event: any) => {
        Event.preventDefault();
        setSearchValue('');
        setSearchedData(null);
    }
    
    const handleSelect = (id: any) => {
        const selectedItem = searchedData?.find((todo: any) => todo.objectid === id);
        const isAlreadySelected = selectedItems.length > 0 && selectedItems?.some((item: any) => item.objectid === id);
        if (isAlreadySelected) {
          const updatedItems = selectedItems.filter((item: any) => item.objectid !== id);
          setSelectedItems(updatedItems);
        } else {
          setSelectedItems([...selectedItems, selectedItem]);
        }
      };
    
    const isSelected = (id: any) => {
    return selectedItems?.some((item: any) => item?.objectid === id);
    };

    const savePlaylist = async (data: any) => {
    const objectIds = selectedItems?.map((item: any, i:number) => {
            return item.objectid;
    })
    let params = {
        idplaylist: props.itemId,
        objectId: objectIds
    }
    setLoading(true);
    let addResponce = await addContetnToPlaylist(params, getAccessTokenObj());
    if (addResponce.success) {
        setSearchedData(null);
        setSearchValue('');
        setSelectedItems([]);
        setUpdatePlayListSongs([...updatePlayListSongs, ...selectedItems]);
        setLoading(false);
    } else if(addResponce.reason) {
        notify(addResponce.reason, 'error');
        setSearchedData(null);
        setSearchValue('');
        setSelectedItems([]);
        setLoading(false);
    }
    }
    const debouncedSearch = useDebounce(actGetSearchService, 500);

    return(
        <>
        <button className="w-full h-full text-left" onClick={() =>{props?.handleSetOpen(false)
            setEnableAddToThisPlaylsitPopup(!enableAddToThisPlaylsitPopup)}}>{props.lang?.add_to_this_playlist}</button>
        <div id='addToThisPlaylist' className={`${enableAddToThisPlaylsitPopup ? 'block' : 'hidden'}`}>       
            <Popup>
                <div className="p-4 min-w-[30rem] min-h-[20rem]">
                    <PopupHeader>
                        <div className="relative flex flex-col items-center justify-center">
                        <button className="absolute  left-0 p-[0.1rem] rounded-full bg-selectedBGSecondaryColor  hover:bg-gridTagsonhoverColor"
                        onClick={() => {setEnableAddToThisPlaylsitPopup(!enableAddToThisPlaylsitPopup)}}>
                        <Image width={25} height={25} src={arrowBack} alt='arrowicon' />
                        </button>
                        <h1 className="ttext-xl font-medium text-primaryColor text-center">{props.lang?.add_to_playlist}</h1>
                        <button className="absolute  right-0 px-4 p-1 bg-selectedBGPrimaryColor py-1 text-center rounded-2xl text-xs text-primaryItemColor hover:bg-onhoverBGcolor mt-4"
                            onClick={() => {savePlaylist('')}}>
                            { loading ? <Spinner></Spinner> : <span className="order-2">{props.lang?.save}</span> }
                        </button>
                        </div>
                    </PopupHeader>
                    <PopupBody>
                        <div className="search_add mt-6">
                        <form className='relative bg-[#232323] rounded-lg'>
                            <label htmlFor="default-search" className="mb-2 text-sm font-medium text-secondaryItemColor sr-only ">Search</label>
                            <div className="relative">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7.17806 13C5.38355 13 3.86479 12.3708 2.62181 11.1125C1.37882 9.85417 0.757324 8.31667 0.757324 6.5C0.757324 4.68333 1.37882 3.14583 2.62181 1.8875C3.86479 0.629167 5.38355 0 7.17806 0C8.97257 0 10.4913 0.629167 11.7343 1.8875C12.9773 3.14583 13.5988 4.68333 13.5988 6.5C13.5988 7.23333 13.4835 7.925 13.2531 8.575C13.0226 9.225 12.7098 9.8 12.3146 10.3L17.8464 15.9C18.0275 16.0833 18.118 16.3167 18.118 16.6C18.118 16.8833 18.0275 17.1167 17.8464 17.3C17.6653 17.4833 17.4348 17.575 17.1549 17.575C16.875 17.575 16.6445 17.4833 16.4634 17.3L10.9317 11.7C10.4378 12.1 9.86983 12.4167 9.22775 12.65C8.58568 12.8833 7.90245 13 7.17806 13ZM7.17806 11C8.41281 11 9.46236 10.5625 10.3267 9.6875C11.191 8.8125 11.6232 7.75 11.6232 6.5C11.6232 5.25 11.191 4.1875 10.3267 3.3125C9.46236 2.4375 8.41281 2 7.17806 2C5.9433 2 4.89376 2.4375 4.02943 3.3125C3.1651 4.1875 2.73293 5.25 2.73293 6.5C2.73293 7.75 3.1651 8.8125 4.02943 9.6875C4.89376 10.5625 5.9433 11 7.17806 11Z" fill="white" fillOpacity="0.7" />
                                </svg>
                            </div>
                            <input 
                                type="text" 
                                className="block w-full p-2 ps-10 text-sm text-primaryColor border-none rounded-md bg-[#2D2D2D] focus:outline-none" 
                                placeholder={props.lang?.search_placeholder} 
                                value={searchValue} 
                                onChange={handleInputChange}/>
                            <button className="absolute top-1 right-0 p-1"
                                onClick={(Event: any) => {clearSerchValue(Event)}}>
                                <span className=""><Image src={closeIcon} alt='closeicon' width={20} height={20} /></span>
                                
                            </button>
                            </div>
                        </form>
                        </div>
                        <div className="categories_add mt-4">
                            <ul className="flex gap-2 justify-center mb-5">
                                {
                                    categoriesList.map((item:any, i:number)=>{
                                        let title = item.title;
                                        return (
                                            <li className={`rounded-sm ${activeCategory === item.id ? 'bg-selectedBGPrimaryColor' : 'bg-[#2F2D2E]'}`} key={i}>
                                                <button className="py-1 px-5  w-full h-full text-sm text-primaryItemColor" onClick={() => {selectCategory(item)}}>{props.lang && props.lang[item.title]}</button>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                        <div className="searchedData mt-4">
                            {searchedData ?
                            <ul className="overflow-y-auto max-h-64 min-h-40 pb-10">
                                {searchedData && searchedData.map((item:any, i:number) => {
                                    return(
                                        <li className="px-3 py-2 hover:bg-[#232323]" key={i}>
                                            <div className="flex hover:cursor-pointer gap-2 group  justify-between">
                                                <div className='flex gap-2'>
                                                    <div className="relative">
                                                        <Image className="rounded-sm group-hover:brightness-50" width={40} height={40}  priority src={getPoster(item, 'SQUARE', 'LOW')} alt={''} />
                                                    </div>
                                                    <div className="text-xs flex flex-col justify-center">
                                                        {/* <p className="hidden text-sm text-secondaryItemColor hover:underline mb-0">{props.itemlist.episode}</p> */}
                                                        <p className="text-md font-bold text-primaryItemColor ">{item.title}</p>
                                                        <p className="text-sm text-secondaryItemColor hover:underline"><ArtistName data={item}></ArtistName></p>
                                                    </div>
                                                </div>
                                                <div className="items-center justify-center mx-2 text-sm font-medium text-skeletonColor dark:text-gray-300  inline-flex ml-auto"
                                                    onClick={() => {handleSelect(item.objectid)}}>
                                                    <Image src={addtoList} alt="addtoplaylist" width={20} height={20} className={`${!isSelected(item.objectid) ? 'inline-block' : 'hidden' }`}/>
                                                    <Image src={rightMark} alt='addedtoPlaylsit' width={20} height={20} className={`${isSelected(item.objectid) ? 'inline-block' : 'hidden' } rounded-full bg-green-300 p-1`}/>
                                                </div>
                                            </div>
                                        </li>
                                    )
                                })}
                                {searchedData && searchedData.reason &&
                                    <p className="w-full text-secondaryItemColor text-center text-md py-8">{searchedData.reason}</p>
                                }
                            </ul> : <p className="w-full text-secondaryItemColor text-center text-md py-8"> {props.lang?.please_search_the_content} </p>
                            }
                        </div>
                    </PopupBody>
                </div>
            </Popup>
        </div>
        </>
    )
}