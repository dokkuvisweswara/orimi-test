
import { Popup, PopupBody, PopupHeader } from "@/popup/commonPopup";
import closeIcon from "../../../public/closeicon.svg";
import Image from "next/image";
import ExsistingCollaborator from "./exsistingCollaborators";
import { useState } from "react";

export default function ViewColaborator({
  collaboratorList,
  id,
  playListData
}: any) {
  const [showPopup, setShowPopup] = useState(true);
  const handleClosePopup = () => {
    setShowPopup(false);
  };
  return (
    <>
      {showPopup && (
        <Popup>
          <PopupHeader>
          <div className="mt-2 float-right mr-2 cursor-pointer" onClick={handleClosePopup}>
                <Image src={closeIcon} alt="closeicon" />
              </div>
          </PopupHeader>
          <PopupBody>
            <p className="text-left font-bold text-primaryColor mt-5 ml-8 text-xl">
              {playListData.title}
            </p>
            <div className="border-b-2 border-[#232323] py-2 px-3"></div>
            <div className=" pb-1 pt-5 pl-5 pr-5">
              <ExsistingCollaborator
                collaboratorList={collaboratorList}
                playListData={playListData}
                id={id}
              ></ExsistingCollaborator>
            </div>
          </PopupBody>
        </Popup>
      )}
    </>
  );
}
