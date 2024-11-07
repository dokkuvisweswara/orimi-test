import Image from 'next/image';
import colabicon from "../../../public/Colaborator.svg";
import { useState } from 'react';
import InviteColaborator from './inviteColaborator';

export default function Colabicon ({ id, contentData }: any){
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => {
        setIsOpen((prev) => !prev);
    };

    const actGetPopupStatus = (flag: boolean) =>{
        setIsOpen(flag)
    }
    return(
        <>
            <div onClick={handleClick}>
                <Image src={colabicon} alt="closeicon" className= "w-10 cursor-pointer hover:scale-125"  />
            </div>
            {isOpen && < InviteColaborator id={id} contentData={contentData} callbackPopupStatus={actGetPopupStatus}/>}
        </>
    )
}

