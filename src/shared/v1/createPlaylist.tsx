import { addContetnToPlaylist, createPlayListApi } from "@/services/actions/playlist.actions";
import { useStore, useStoreContent, useStoreUser } from "@/store/init";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getAccessTokenObj } from "@/services/helpers/init.helper";
import { Popup, PopupHeader, PopupBody } from "@/popup/commonPopup";
import Image from 'next/image';
import closeIcon from '../../../public/closeicon.svg';
import { notify } from "@/(layout)/v1/ToasterComponent";
import Spinner from "@/loaders/spinner/spinner";
import {errors_message}  from "@/constants/errors_constants"
import { getPlaylistData } from '@/services/actions/playlist.actions';

export default function CreatePlayList(props: any) {
    const router = useRouter();
    const [enablePopup, setEnablePopup] = useState<any>(false);
    const setCounter = useStore((state : any) => state.setCounter);
    const setContentData = useStoreContent((state : any) => state.setContentData);
    const [formData, setFormData] = useState({
        name: '',
        playlistaccess: 'PRIVATE',
      });
    const [isUserPresentActive, setIsUserPresentActive] = useState(false);
    const getIsUserPresent = useStoreUser((state: any) => state.isUserPresent);
    const [loading, setLoading] = useState<any>(false);

    useEffect(() => {      
      const unsubscribe = useStoreUser.subscribe((state: any) => {
        setIsUserPresentActive(state?.isUserPresent)
      }); 
      return () => unsubscribe();
    }, []);
    const [errors, setErrors] = useState({name: ''});
    const handleChange = (e: { target: { name: any; value: any; type: any; checked: any; }; }) => {
        const { name, value, type, checked } = e.target;
        const inputValue = type === 'checkbox' ? (checked ? 'PUBLIC' : 'PRIVATE') : value;
        if(name == 'name') {
          let validationErrors: any = {}
          if(value.length < 4) {
            validationErrors['name'] = 'Please enter a playlist name with at least 4 characters.';
          } else {
            validationErrors = {}
            setErrors(validationErrors);
          }
        }
        setFormData({
          ...formData,
          [name]: inputValue,
        });
      };

      const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        // Validate form fields
        let validationErrors:any = {};
        if (formData.name.trim() === '') {
          validationErrors['name'] = 'Name is required';
        }
        if (formData.name.length < 4) {
          validationErrors['name'] = 'Please enter a playlist name with at least 4 characters.';
        } else {
          validationErrors = {}
        }
    
        // If there are validation errors, update the errors state
        if (Object.keys(validationErrors).length > 0) {
          setErrors(validationErrors);
        } else {
          // No errors, form submission logic here
          setLoading(true);
          let response = await createPlayListApi(formData, getAccessTokenObj());
          if(response.success) {
            setEnablePopup(!enablePopup);
            setCounter(1);
            notify(errors_message.CREATED, 'success');
            if(props.contentId) {
              let params = {
                idplaylist: response.success,
                objectId: [props.contentId]
              }
              let addResponce = await addContetnToPlaylist(params, getAccessTokenObj());
              if (addResponce.success) {
                  setEnablePopup(!enablePopup)
                  notify(errors_message.ADDED_TO_PLAYLIST, 'success');          
              } else if(addResponce.reason) {
                  setEnablePopup(!enablePopup)
                  notify(addResponce.reason, 'info');
              }
            } else {
              let playList: any = {};
              playList['title'] = formData.name;
              playList['playlistaccess'] = formData.playlistaccess;
              playList['totalContent'] = 0;

              const apiPlaylistData = await getPlaylistData(response.success, getAccessTokenObj());
              // setPlayListData({...apiPlaylistData});

              setContentData({...apiPlaylistData});
              router.push(`/playlist/${response.success}`);
            }
          }
          setFormData({
            name: '',
            playlistaccess: 'PRIVATE',
          });
          setErrors({name: ''});
        }
      };

      function createPlayList() {
        let cvfg = isUserPresentActive;
        getIsUserPresent ? setEnablePopup(!enablePopup) : router.push('/login')
    }

    function cancleButton(dat: any) {
        setEnablePopup(!enablePopup);
      };
    return (
        <>
        <button className="w-full flex items-center justify-center p-2 gap-1 rounded-full dark:text-white bg-[#232323] dark:bg-[#232323] group cursor-pointer hover:opacity-70"
            onClick={createPlayList}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11 13H6C5.71667 13 5.47917 12.9042 5.2875 12.7125C5.09583 12.5208 5 12.2833 5 12C5 11.7167 5.09583 11.4792 5.2875 11.2875C5.47917 11.0958 5.71667 11 6 11H11V6C11 5.71667 11.0958 5.47917 11.2875 5.2875C11.4792 5.09583 11.7167 5 12 5C12.2833 5 12.5208 5.09583 12.7125 5.2875C12.9042 5.47917 13 5.71667 13 6V11H18C18.2833 11 18.5208 11.0958 18.7125 11.2875C18.9042 11.4792 19 11.7167 19 12C19 12.2833 18.9042 12.5208 18.7125 12.7125C18.5208 12.9042 18.2833 13 18 13H13V18C13 18.2833 12.9042 18.5208 12.7125 18.7125C12.5208 18.9042 12.2833 19 12 19C11.7167 19 11.4792 18.9042 11.2875 18.7125C11.0958 18.5208 11 18.2833 11 18V13Z" fill="white" fillOpacity="0.9"/>
            </svg>
            <span className="ms-1 font-thin text-sm w-20 overflow-ellipsis truncate">{props.lang?.new_playlist}</span>

        </button>
        {enablePopup &&
        <div id="createPlayListPopup" className="FadeupPopupAnimation">
            <Popup>
                <div className=" max-w-[30rem]  p-4">
                    <PopupHeader>
                        <div className="relative">
                        <button className="absolute top-0 right-0 p-1 bg-primaryBgColor rounded-full hover:bg-slate-500"
                        onClick={() => {setEnablePopup(!enablePopup);}}>
                        <Image src={closeIcon} alt='closeicon' />
                        </button>
                        </div>
                    </PopupHeader>
                    <PopupBody>
                      <form onSubmit={handleSubmit}>
                        <div className="px-6 py-3">
                            <header className="mb-4">
                                <h3 className="text-xl font-medium text-primaryColor text-center">{props.lang?.create_new_playlist}</h3>
                            </header>
                            <div id="playListNameInput"className="relative my-6 text-primaryItemColor">
                                <input 
                                    id="id-b02" 
                                    type="text" 
                                    name="name" 
                                    placeholder="Playlist Name..." 
                                    className="bg-[#161213] relative w-full h-10 px-1 text-sm placeholder-transparent transition-all border-b outline-none focus-visible:outline-none peer autofill:bg-primaryBgColor" 
                                    value={formData.name}
                                    onChange={handleChange}
                                    autoComplete="off" 
                                />
                                <label htmlFor="id-b02" className="bg-[#161213] cursor-text peer-focus:cursor-default peer-autofill:-top-2 absolute left-0 -top-2 z-[1] px-2 text-xs text-ordinaryItemColor transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-[#161213] before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-white peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent">
                                    {props.lang?.playlist_name}
                                </label>
                                {errors.name && <p className="text-primaryErrorColor">{errors.name}</p>}
                            </div>
                            <div id="playListStatus" className="flex justify-between items-center">
                            <div className="text-primaryItemColor">
                                <p>{props.lang?.public}</p>
                                <p className="text-xs text-dotsLoaderBgColor">{props.lang?.let_people_see}
                                </p>
                            </div>
                            <div className="ml-5">
                            <label className="relative inline-flex items-center mb-5 cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    value="" 
                                    className="sr-only peer" 
                                    name="playlistaccess"
                                    checked={formData.playlistaccess === 'PUBLIC' ? true : false}
                                    onChange={handleChange}
                                />
                                    <div className="w-7 h-3 ml-1 mt-1 bg-checkboxBeforeColor peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-[#E80D74]  after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primaryColor"></div>
                                </label>
                            </div>
                            </div>
                            <div>
                                <div className="flex  justify-center gap-2 px-1 pt-6 ">
                                    <button className="h-10 gap-2 px-5 rounded-full text-sm font-medium tracking-wide transition duration-300 focus-visible:outline-none justify-self-center whitespace-nowrap text-modalbtnprimaryColor hover:bg-[#232423] hover:text-modalbtnprimaryColor focus:bg-emerald-200 focus:text-modalbtnprimaryColor"
                                        onClick={() => {setEnablePopup(!enablePopup);}}>
                                    <span className="order-2">{props.lang?.cancel}</span>
                                    </button>
                                    <button className="h-10 gap-2 px-7 text-sm font-medium tracking-wide text-primaryColor transition duration-300 rounded-full focus-visible:outline-none whitespace-nowrap bg-modalbtnprimaryColor hover:bg-modalbtnprimaryColor focus:bg-modalbtnprimaryColor" type="submit">
                                      { loading ? <Spinner></Spinner> : <span className="order-2">{props.lang?.save}</span> }
                                    </button>
                                </div>
                            </div>
                        </div>
                      </form>
                    </PopupBody>
                </div>
            </Popup>
        </div>
        }

        </>
    )
}