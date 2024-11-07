"use client";
import Image from "next/image";
import v40 from '../../../public/att-doc.svg';
import v20 from '../../../public/closeicon.svg';
import React, { useEffect, useState } from "react";
import { dateFormater } from "@/utils/content";
import { actUpdateTicketData, actViewTicketData } from "@/services/actions/ticket.action";
import { getAccessTokenObj } from "@/services/helpers/init.helper";
import { notify } from "@/(layout)/v1/ToasterComponent";
import Spinner from "@/loaders/spinner/spinner";

export default function ViewTicket({requestid, lang, callBackModalClose}:any) {
  const [message, setMessage] = useState("");
  const [ticketData, setTicketData] = useState<any>(null);
  const [currentProfileInfo, setCurrentProfileInfo] = useState<any>(null);
  const [messageData, setMessagesData] = useState<any>(null);
  const [newComment, setNewComment] = useState<any>(null);
  useEffect(() => {
    viewTicketData();
  },[]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmit = (event:any) => {
    event.preventDefault();
    let payload:any = {
      data:{
        message: newComment
      },
      requestid: requestid
    }
    actUpdateTicketData(payload, getAccessTokenObj()).then((response: any)=>{
      if(response?.isSuccessful){
        setNewComment('');
        viewTicketData();
        notify("Comment added successfully", 'success');
      }else{
        notify("response?.result?.reason", 'error');
      }
    }).catch((error: any)=>{
      notify("Unkown Error", 'error');
    })
  };

  const viewTicketData = () => {
    let payload: any = {
      requestid: requestid
    }
    actViewTicketData(payload, getAccessTokenObj()).then((response: any) => {
      if(response?.isSuccessful){
        setTicketData(response?.result);
        setMessagesData(response?.result?.messageData);
      }else{
        notify(response?.result?.reason, 'error') 
      }
    }).catch(() => {
      notify('Unknown Error', 'error');
    })
  }
  
  return (
    <div className="relative flex flex-col items-center justify-center  overflow-hidden mt-10">
      <div className="w-5/12 p-8 bg-selectedBGSecondaryColor rounded-md shadow-md lg:max-w-xl">
        <div className="float-right cursor-pointer">
          <Image src={v20} width={20} height={20} alt={"logo"} onClick={() => callBackModalClose(false, 'viewTicket')}/>
        </div>
        {ticketData ? 
        <div>
        <div className="mt-4 flex justify-between ">
          <p className="text-3xl font-bold text-center text-secondaryItemColor">
            {lang?.details}
          </p>
          <span className="text-3xl mr-6 font-bold text-center text-secondaryItemColor">
            #{ticketData?.requestid}
          </span>
        </div>
        <div className="mt-10">
          <p className="block text-xl text-secondaryItemColor my-3">
            <span className="font-bold">{lang?.title} : </span> {ticketData?.title}
            <span className="float-right text-md">{dateFormater(ticketData?.updatedon)}</span>
          </p>
          <p className="block text-xl text-secondaryItemColor my-3 ">
            <span className="font-bold">{lang?.category} : </span>{ticketData?.category}
          </p>
        </div>
        <div className="mb-2">
          <h2 className="text-xl  text-secondaryItemColor top-4 font-bold mt-6 mb-1">
            {lang?.comments}
          </h2>
          <div className="divide-y divide-gray-300 not-last:border-b-0">
            {messageData?.map((data: any, key: number) => {
            return (<div className="bg-black p-4 rounded-sm" id="messageCard" key={key}>
              <p className="block text-lg text-secondaryItemColor font-bold">
                {data?.updatedbyname}
                <span className="float-right text-md">{dateFormater(data?.messagedate)}</span>
              </p>
              <p className="text-secondaryItemColor mt-2">
                {data?.message}
              </p>
            </div>)})}
          </div>
        </div>
        <div className="flex items-center  mt-1" id="addCommentBox">
          <input
            id="addMessage"
            type="text"
            placeholder="Add Comment"
            className="block w-8/12 rounded-l-lg  border h-10 px-4 py-2 text-primaryColor  bg-selectedBGSecondaryColor  border-secondaryItemColor rounded-sm"
            value={newComment}
            onChange={(event)=>{setNewComment(event?.target?.value)}}
          />
          <div className="flex items-center  w-1/12 h-20  mr-7   ">
            <label
              htmlFor="dropzone-file"
              className=" flex flex-col items-center justify-center w-9/12 h-10 p-1  bg-selectedBGPrimaryColor rounded-r-lg   border border-l-0 cursor-pointer    border-secondaryItemColor "
            >            
              <Image  src={v40} className="w-full h-20  rounded-r-lg" alt={""}/>              
              <input id="dropzone-file" type="file" className="hidden" />
            </label>
          </div>
          <div>
            <button
              type="submit"
              className="w-full float-right px-6 py-2 tracking-wide  text-primaryColor transition-colors duration-200 transform bg-selectedBGPrimaryColor rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
              onClick={handleSubmit}
            >
              {lang?.submit}
            </button>
          </div>
        </div>
        </div> : 
        <div className="flex items-center justify-center">
            <Spinner></Spinner>
        </div>}
      </div>
    </div>
  );
}