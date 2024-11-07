import React, { useState, FormEvent, useEffect } from 'react';
import { Popup, PopupBody, PopupHeader } from "@/popup/commonPopup";
import closeIcon from "../../../public/closeicon.svg";
import Image from 'next/image';
import FormValidator from '@/utils/validation-utils';
import { actAddcollaborator, actCollaboratorList, actremoveCollaborator } from '@/services/actions/collaborator.action';
import { getAccessTokenObj } from '@/services/helpers/init.helper';
import { notify } from '@/(layout)/v1/ToasterComponent';
import Spinner from '@/loaders/spinner/spinner';
import { useStoreCollaboratorList } from '@/store/init';
import ExsistingCollaborator from './exsistingCollaborators';

export default function InviteColaborator({contentData, id, callbackPopupStatus} : any) {
  const [emailOrMobile, setEmailOrMobile] = useState<any>('');

  const setCollaboratorListStore:any = useStoreCollaboratorList((state : any) => state.setCollaboratorList);
  const getCollaboratorListStore:any = useStoreCollaboratorList((state : any) => state.collaboratorList);
  const [collaboratorList, setCollaboratorList] = useState<any>(getCollaboratorListStore);
  const [loading, setLoading] = useState<any>(false);

  useEffect(()=>{
    const unsubscribe = useStoreCollaboratorList.subscribe((state: any) => {
      setCollaboratorList(state?.collaboratorList);
    });
    // collaboratorlistData();    
    return () => unsubscribe();
  },[])
  
  const collaboratorlistData  = async ()=>{
    let playload = {
      playlistId: id
    }
    let res = await actCollaboratorList(playload, getAccessTokenObj());
  if(res?.isSuccessful){
    setCollaboratorList(res?.result?.data);
    setCollaboratorListStore(res?.result?.data);
  }else {
    setCollaboratorList([]);
    res?.result?.data([]);
  }
    console.log("col_res", res);
  }

  const handleFormSubmit = async (e: any) => {
    setLoading(true);
    e.preventDefault();   
    let payload ={
      playlistId: id,
      userData : {}
    }
    let validator = new FormValidator();
    if(isNaN(emailOrMobile)){
      if (validator.validateEmail(emailOrMobile)) {            
        payload.userData = { email: emailOrMobile };
        } else {
        alert('Enter valid emailId');
      }
    } else if(validator.validateMobileno(emailOrMobile)) {
      payload.userData = { mobileno: emailOrMobile };
    }

    let res = await actAddcollaborator(payload, getAccessTokenObj());
    if(res?.isSuccessful){
      notify('added collaborater successfully', 'success');
      setEmailOrMobile('')
      await collaboratorlistData();
      setLoading(false);
    }else{
      setLoading(false);
      notify(res?.result?.reason, 'error');
    }
  };

  const handleClosePopup = () => {
    // setShowPopup(false);
    callbackPopupStatus(false)
  };

  return (
        <Popup>
            <PopupHeader>
              <div className="mt-2 float-right mr-2 cursor-pointer" onClick={handleClosePopup}>
                <Image src={closeIcon} alt="closeicon" />
              </div>
            </PopupHeader>
            <PopupBody>
              <p className="text-left font-bold text-primaryColor mt-5 ml-8 text-xl">Invite Collaborator</p>
              <div className="border-b-2 border-[#232323] py-2 px-3"></div>
              <div className=" h-[20rem] pb-1 pt-5 pl-5 pr-5">
                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div className="relative">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg>
                  </div>
                  <input
                    type="search"
                    id="default-search"
                    className="block w-full h-10 p-4 ps-10 text-sm text-secondaryItemColor border border-[#404040] rounded-lg bg-[#232323]"
                    placeholder="Enter User Email Id / Mobile Number"
                    required
                    value={emailOrMobile}
                    onChange={(e) => setEmailOrMobile(e.target.value)}
                  />
                  <div className='h-full w-auto absolute end-2.5 bottom-0 flex items-center justify-center'>
                    <button type="submit" className="text-white bg-selectedBGPrimaryColor hover:bg-onhoverBGcolor focus:ring-4 font-normal rounded-md text-xsm px-2 py-[0.07rem]" onClick={handleFormSubmit}>ADD</button>
                  </div>
                </div>
                <ExsistingCollaborator collaboratorList={collaboratorList} playListData={contentData} id={id}></ExsistingCollaborator>
              </div>              
              {loading && 
              <div className='w-full h-full flex items-center justify-center absolute top-0 left-0'>
                <Spinner></Spinner>
              </div>
              }
            </PopupBody>
          </Popup>
  );
}
function addcolaborator() {
  throw new Error('Function not implemented.');
}

function async() {
  throw new Error('Function not implemented.');
}