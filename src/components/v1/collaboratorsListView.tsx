import { useEffect, useState } from 'react';
import Image from 'next/image';
import profilepic from '../../../public/user-icon.svg';
import { actCollaboratorList } from '@/services/actions/collaborator.action';
import { getAccessTokenObj } from '@/services/helpers/init.helper';
import { useStoreCollaboratorList } from '@/store/init';
import ViewColaborator from './viewColaborator';

export default function CollaboratorsListView({ playlistId, contentData }: any) {
  const setCollaboratorListStore: any = useStoreCollaboratorList((state: any) => state.setCollaboratorList);
  const [collaboratorList, setCollaboratorList] = useState<any>(null);
  const [subscriberName, setSubscriberName] = useState<any>(null);
  const [collaboratorShowList, setCollaboratorShowList] = useState<any>(null);
  const [isViewColaboratorOpen, setIsViewColaboratorOpen] = useState(false);

  useEffect(() => {
    let subscriberDetail: any = localStorage.getItem('subscriberDetail');
    if (subscriberDetail) {
      subscriberDetail = JSON.parse(subscriberDetail);
      const subName = subscriberDetail ? subscriberDetail.subscribername : null;
      setSubscriberName(subName);
    }
    collaboratorlistData();
    const unsubscribe = useStoreCollaboratorList.subscribe((state: any) => {
      setCollaboratorList(state?.collaboratorList);
      insertZindex(state?.collaboratorList);
    });
    return () => unsubscribe();
  }, []);

const insertZindex = async (data: any) => {
  const mapData = data?.slice(0, 3).map((item: any, i: number) => {
    item.zIndex = `${data.length - i}0`;
    item.left = i * 2;
    return item;
  });
  setCollaboratorShowList(mapData);
};

  const collaboratorlistData = async () => {
    const payload = {
      playlistId: playlistId
    };
    const res = await actCollaboratorList(payload, getAccessTokenObj());
    if (res?.isSuccessful) {
      setCollaboratorList(res?.result?.data);
      setCollaboratorListStore(res?.result?.data);
      insertZindex(res?.result?.data);
    } else {
      setCollaboratorList([]);
      setCollaboratorListStore([]);
    }
  };

  const handleCollaboratorClick = () => {
    setIsViewColaboratorOpen(!isViewColaboratorOpen);
  };

  const handleCollaboratorImageClick = () => {
    setIsViewColaboratorOpen(!isViewColaboratorOpen);
  };

  return (
    <>
      {collaboratorShowList && collaboratorShowList?.length > 0 && (
        <div className="flex gap-3 items-center">
          <div className="relative flex w-32 h-16 items-center">
            {collaboratorShowList.map((item: any, index: number) => (
              <Image
                key={index}
                className={`rounded-full absolute aspect-square border-4 border-[#383838] top-0 z-${collaboratorShowList?.length - index}0 left-${index * 8} ${
                  index === 3 && 'left-16'
                } cursor-pointer`}
                width={60}
                height={60}
                src={item.picture ? item.picture : profilepic}
                alt=""
                onClick={handleCollaboratorImageClick}
              />
            ))}
          </div>
          <div className="flex gap-1 cursor-pointer" onClick={handleCollaboratorClick}>
            {subscriberName && <span>{subscriberName}</span>}
            {collaboratorList?.length && <span>+ {collaboratorList?.length} others</span>}
          </div>
        </div>
      )}
      {isViewColaboratorOpen && <ViewColaborator collaboratorList={collaboratorList} id={playlistId} playListData={contentData} />}
    </>
  );
}
