"use client";
import Close from "../../../public/close.svg"
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function CloseIcon(props) {
  const router = useRouter();
  const closeHandled = () => {
    router.back()
  } 
  return (
    <>
      <div className="float-right px-4">
        <Image src={Close} height={13} width={13} alt="Close"
        className="cursor-pointer"
        onClick={closeHandled}
        ></Image>
      </div>
    </>
  );
}
