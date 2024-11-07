import Spinner from '@/loaders/spinner/spinner';
import Image from 'next/image';
import profilepic from '../../../public/user-icon.svg'
import { useState } from 'react';
import { useStoreCollaboratorList } from '@/store/init';
import { actremoveCollaborator } from '@/services/actions/collaborator.action';
import { getAccessTokenObj } from '@/services/helpers/init.helper';

export default function  ExsistingCollaborator({ collaboratorList, playListData }:any){

  const setCollaboratorListStore:any = useStoreCollaboratorList((state : any) => state.setCollaboratorList);
  const getCollaboratorListStore:any = useStoreCollaboratorList((state : any) => state.collaboratorList);
  const [collaboratorData, setCollaboratorData] = useState<any>(getCollaboratorListStore);
  const [loading, setLoading] = useState<any>(false);
  const removeCollaborator  = async (user: any, index: any)=>{
    setLoading(true);
    let payload = {
      playlistId: playListData.idplaylist,
      userData: {}
    }
    if(user?.email){
      payload.userData = {email: user.email}
    } else {
      payload.userData = {mobileno: user.mobileno}
    }
    let res = await actremoveCollaborator(payload,getAccessTokenObj());
    if(res?.isSuccessful){
      setCollaboratorData((prev: any) => {
        let returnVal = prev.filter((item: any, i: any) => {
          return i !== index; 
        });
        setCollaboratorListStore(returnVal);
        return returnVal;
      });
      setLoading(false);
    }
  }
    return(
     <>
    <div className='w-[30rem] h-[20rem] overflow-auto'>
                          {collaboratorData ? 
                  <>
                    {collaboratorData?.length > 0 ?
                    <ul className='flex flex-col pb-12'>
                      <h3 className="text-primaryColor mt-5 mb-5">Existing Collaborator</h3>
                      { collaboratorData?.map((item: any, i: any) => (
                        <li  key={i} className="flex justify-between items-center hover:bg-[#232323] hover:rounded-lg px-3">
                          <div className='flex'>
                          <div className="flex colla-image">
                            <Image
                              className="brightness-125 rounded-full mt-1 p-2 aspect-square	"
                              width={60}
                              height={60}
                              src={item?.picture ? item.picture : profilepic}
                              alt=""
                            />
                          </div>
                          <div className="flex flex-col coll-details">
                            <div className="flex">
                              <div className="text-md text-white truncate ml-4 mt-2">
                                {item?.subscribername}
                              </div>
                            </div>
                            <div className="flex">
                              <div className="text-secondaryItemColor text-xs truncate opacity-80 capitalize ml-4">
                                {item?.email ? item.email : item.mobileno}
                              </div>
                            </div>
                          </div>
                          </div>
                          <div className="coll-remove">
                            <button className="bg-red-500 text-white rounded-full px-2 py-1 font-thin text-xs" onClick={() => {removeCollaborator(item, i)}}>
                              Remove
                            </button>
                          </div>
                        </li>

                        ))
                      }
                    </ul>
                    :
                    <div>
                      <p className="text-center text-secondaryItemColor mt-20">When you invite a collaborator they can add or</p>
                      <p className="text-center text-secondaryItemColor">remove content to the added playlist</p>
                    </div>
                    }
                  </>
                  :
                  <>
                    <div className='w-full h-full flex items-center justify-center'>
                    <Spinner></Spinner>
                    </div>
                  </>
                }
        </div>
        </>
    )
}


