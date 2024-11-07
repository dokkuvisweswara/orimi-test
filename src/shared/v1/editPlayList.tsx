import { useEffect, useState } from 'react';
import { editPlayListApi } from "@/services/actions/playlist.actions";
import { useStore, useStoreContent, useStoreRecallPlaylist, useStoreUser } from "@/store/init";
import { useRouter } from "next/navigation";
import { getAccessTokenObj } from "@/services/helpers/init.helper";
import { Popup, PopupHeader, PopupBody } from "@/popup/commonPopup";
import Image from 'next/image';
import closeIcon from '../../../public/closeicon.svg';

export default function EditPlayList({ contentId, contentData, onClose }: any) {
    const router = useRouter();
    const [formData, setFormData] = useState({
        title: contentData.title,
        playlistaccess: contentData.playlistaccess
    });
    // const [idplaylist, setIdPlayList] = useState({
    //     idplaylist: contentData.idplaylist
    // });
    const [errors, setErrors] = useState({ title: '' });
    const [apiError, setApiErrors] = useState('');
    const [isPopupOpen, setIsPopupOpen] = useState(true); // Initially open
    const setContentData = useStoreContent((state : any) => state.setContentData);
    const setRecallPlaylist = useStoreRecallPlaylist((state: any) => state.setRecallPlaylist);
    const getRecallPlaylist = useStoreRecallPlaylist((state: any) => state.recallPlaylist);

    const handleChange = (e: any) => {
        const { name, value, type, checked } = e.target;
        const inputValue = type === 'checkbox' ? (checked ? 'PUBLIC' : 'PRIVATE') : value;
        setFormData({
            ...formData,
            [name]: inputValue,
        });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const validationErrors: any = {};
        if (formData.title.trim() === '') {
            validationErrors['title'] = 'Name is required';
        }
        if (formData.title.length <= 4) {
            validationErrors['title'] = 'Please enter a playlist name with at least 4 characters.';
        }
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            let payload = {
                title: formData.title,
                playlistaccess: formData.playlistaccess
            }
            let response = await editPlayListApi(payload, contentData.idplaylist, getAccessTokenObj());

            if (response.success) {
              let playList: any = {};
              playList['title'] = formData.title;
              playList['playlistaccess'] = formData.playlistaccess;
              playList['totalContent'] = 0;
              setContentData({...playList});
              setRecallPlaylist(getRecallPlaylist);
              setIsPopupOpen(false); // Close the popup
              onClose(); // Notify the parent component

            } else {
                setApiErrors(response.reason);
            }
        }
    };

    const handleCancel = () => {
        setIsPopupOpen(false); // Close the popup
        onClose(); // Notify the parent component
    };

    return (
        <div id="createPlayListPopup" className={isPopupOpen ? "block" : "hidden"}>
            <Popup>
                <div className="max-w-[30rem]">
                    <PopupHeader>
                        <div className="relative p-3 mt-2 mr-2">
                            <button className="absolute top-0 right-0 p-1 rounded-full bg-selectedBGSecondaryColor hover:bg-gridTagsonhoverColor"
                                onClick={handleCancel}>
                                <Image src={closeIcon} alt='closeicon' />
                            </button>
                        </div>
                    </PopupHeader>
                    <PopupBody>
                        <form onSubmit={handleSubmit}>
                            <div className="px-6 py-3">
                                <header className="">
                                    <h3 className="text-xl font-medium text-primaryColor text-center">Edit PlayList</h3>
                                </header>
                                <div className="relative my-6">
                                    <input
                                        type="text"
                                        name="title"
                                        placeholder="Playlist name..."
                                        className="bg-[#161213] relative w-full h-10 px-1 text-sm placeholder-transparent transition-all border-b outline-none focus-visible:outline-none peer autofill:bg-primaryBgColor text-primaryItemColor"
                                        value={formData.title}
                                        onChange={handleChange}
                                        autoComplete="off"
                                    />
                                    {errors.title && <p className="text-primaryErrorColor">{errors.title}</p>}
                                </div>
                                <div className="flex justify-between items-center">
                                    <div className="text-primaryItemColor">
                                        <p>Public</p>
                                        <p className="text-xs text-dotsLoaderBgColor">Let people see this playlist on your profile and in other places</p>
                                    </div>
                                    <div className="ml-5">
                                        <label className="relative inline-flex items-center mb-5 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                className="sr-only peer"
                                                name="playlistaccess"
                                                checked={formData.playlistaccess === 'PUBLIC'}
                                                onChange={handleChange}
                                            />
                                            <div className="w-7 h-3 ml-1 mt-1 bg-checkboxBeforeColor peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-[#E80D74]  after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primaryColor"></div>
                                        </label>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-center gap-2 px-1 pt-6">
                                        <button
                                            className="h-10 gap-2 px-5 rounded-full text-sm font-medium tracking-wide transition duration-300 focus-visible:outline-none justify-self-center whitespace-nowrap text-modalbtnprimaryColor hover:bg-[#232423] hover:text-modalbtnprimaryColor focus:bg-emerald-200 focus:text-modalbtnprimaryColor"
                                            onClick={handleCancel}>
                                            Cancel
                                        </button>
                                        <button
                                            className="h-10 gap-2 px-7 text-sm font-medium tracking-wide text-primaryColor transition duration-300 rounded-full focus-visible:outline-none whitespace-nowrap bg-modalbtnprimaryColor hover:bg-modalbtnprimaryColor hover:bg-onhoverBGcolor focus:bg-modalbtnprimaryColor"
                                            type="submit">
                                            Save
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </PopupBody>
                </div>
            </Popup>
        </div>
    );
}

