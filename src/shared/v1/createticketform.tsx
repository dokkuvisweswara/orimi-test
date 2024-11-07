
"use client";
import v20 from '../../../public/closeicon.svg';
import React, { useEffect, useState } from "react";
import Image from "next/image"
import { actConfig } from "@/services/actions/init.action";
import FormValidator from "@/utils/validation-utils"
import toast from "react-hot-toast";
import { typeCreateTicket } from '@/types/ticket';
import { getAccessTokenObj } from '@/services/helpers/init.helper';
import { actGetTicketToken } from '@/services/actions/ticket.action';
import  {fileUpload} from "@/services/actions/user.actions"
import { notify } from '@/(layout)/v1/ToasterComponent';
import {errors_message}  from "@/constants/errors_constants"
import { getCookie } from '@/hooks/client.cookie';
import MultiFileUpload from '@/containers/multiFileUpload';
import { DEFAULT_LANGUAGE_SETUP } from '@/constants/v1/constants';


export default function CreateTicket({lang,callBackModalClose}:any) {
  const [selectedOption, setSelectedOption] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  const [selectedLang, setSelectedLang] = useState('en');

  const [ticketIssue, setTicketIssue] = useState([]);
  const validator = new FormValidator();


  const handleDropdownChange = (event:any) => {    
    const selectedValue = event.target.value;
    let optionTitel = selectedValue.split('#')    
    setSelectedOption(optionTitel[1]);
    setTitle(optionTitel[0]);
  };

  const handleFileChange = (event:any) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleTitleChange = (event:any) => {
    setTitle(event.target.value);
  };

  const handleSubmit = async (event:any) => {
    event.preventDefault();

    if (validator.validateTicketTitle(title,message)) {
    
      let payload: typeCreateTicket = {
        category: '',
        title: '',
        message: ''
      };
      payload.category = selectedOption
      payload.title = title
      payload.message = message
      let response = await actGetTicketToken(payload, getAccessTokenObj());
      response.isSuccessful ? notify(errors_message.TICKET, 'success') : notify(response.result.reason, 'error');
      if(response.isSuccessful)  {
        callBackModalClose(false ,"createTicket")
      }
    } 
  };

  const closeModal = () => {
    callBackModalClose(false ,"createTicket")
  }
  useEffect(() => {
    let selectedLangLocal: any = getCookie('localeLangauge');
    selectedLangLocal = selectedLangLocal ? selectedLangLocal : DEFAULT_LANGUAGE_SETUP;
    setSelectedLang(selectedLangLocal)
    actGetConfigSet();
  }, []);

  async function actGetConfigSet() {
    let local = localStorage.getItem("primary-config");
    local = local ? JSON.parse(local) : "";
    let config:any = "";
    if (local) {
      let configObj = await actConfig();
      config = configObj?.result;
      setTicketIssue(config.ticketCategories);
    } else {
      setTicketIssue(config.ticketCategories);
    }
  }

  return (
    <div className="relative flex flex-col items-center justify-center px-2 overflow-hidden">
        <div className="p-8 bg-selectedBGSecondaryColor rounded-md shadow-md w-[90%] sm:w-[90%] md:w-[50%] lg:w-[35%]">
            <div className="float-right cursor-pointer" onClick={closeModal}>
              <Image src={v20} width={20} height={20} alt={"logo"} />
            </div>
        <p className="text-2xl font-bold text-center text-secondaryItemColor select-none"> {lang?.create_new_ticket} </p>
        <form className="mt-6 flex flex-col gap-3" onSubmit={handleSubmit}>
          <div className="">
            <label
              htmlFor="dropdown"
              className="block text-sm  text-gray-400"
            >
             {lang?.choose_category}:
            </label>
            <select
              id="dropdown"
              className="block w-full px-4 py-2 mt-2 text-primaryColor  bg-primaryBgColor border border-secondaryItemColor rounded-sm focus:border-white"
              value={selectedOption}
              onChange={handleDropdownChange}
            >
              {/* <option value="">Select an option</option> */}
              {ticketIssue && ticketIssue.map((item:any, i:any) =>
                <option value={`${item.categoryTitle[selectedLang]}#${item.apiCategory}`} key={i}>{item.categoryTitle[selectedLang]}</option>
              )}           
            </select>
          </div>
          <div className="">
            <label
              htmlFor="title"
              className="block text-sm  text-secondaryItemColor"
            >
             {lang?.title} <span className="text-primaryErrorColor">*</span>
            </label>
            <input
              id="title"
              type="text"
              className="block w-full px-4 py-2 mt-2 text-primaryColor  bg-selectedBGSecondaryColor border border-secondaryItemColor rounded-sm focus:border-white"
              value={title}
              onChange={handleTitleChange}
              maxLength={100}
              name="ticketTitle"
            />
          </div>
          <div className="">
            <label
              htmlFor="message"
              className="block text-sm text-gray-400"
            >
             {lang?.message} <span className="text-primaryErrorColor">*</span>
            </label>
            <textarea
              id="message"
              className="block w-full px-4 py-2 mt-2 text-primaryColor  bg-selectedBGSecondaryColor border border-secondaryItemColor rounded-sm focus:border-white"
              rows={2}
              maxLength={256}
              value={message}
              name="ticketDesc"
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
            <p className='float-right text-secondaryItemColor text-xs pt-1'>256 {lang?.charecters}</p>
          </div>
          <div className="flex items-center justify-center w-4/12 py-1 border-dotsLoaderBgColor border rounded-sm cursor-pointer bg-zinc-800">
                <MultiFileUpload lang={lang}></MultiFileUpload>
          </div>
          <div className="">
            <button
              type="submit"
              className="w-full px-4 py-2 tracking-wide text-primaryColor transition-colors duration-200 transform bg-selectedBGPrimaryColor rounded-md hover:bg-onhoverBGcolor focus:outline-none font-bold"
            >
            {lang?.create}
            </button>
          </div>
        </form>
      </div>
    </div>

  );
}
