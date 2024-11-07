import Modal from "@/components/v1/modelbox";
import CreateTicket from "@/shared/v1/createticketform";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { typeTicket } from '@/types/ticket';
import { getAccessTokenObj } from '@/services/helpers/init.helper';
import { actGetOpenTicketToken, actGetCloseTicketToken } from '@/services/actions/ticket.action';
import TicketSkeleton from "@/components/v1/ticketSkeleton";
import { dateFormater } from '@/utils/content';
import { getCookie } from '@/hooks/client.cookie';
import ViewTicket from "./viewticket";

export default function Tickets({lang,tabSelectedIndex}:any) {
  const [tabSelected, setTabSelected] = useState({
    currentTab: 1,
    noTabs: 2,
  })
  const [openTicket, setOpenTicket] = useState([]);
  const [closeTicket, setCloseTicket] = useState([]);
  const [isSkeleton, setIsSkeleton] = useState(true);
  const wrapperRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [showTicketModal, setShowTicketModal] =useState(false);
  const [ticketData , setTicketData] = useState<any>(null);
  const [showCreateTicketModal, setShowCreateTicketModal] = useState(false);  
  const [showViewTicketModal, setShowViewTicketModal] = useState(false);
  useEffect(() => {  
    if(tabSelectedIndex==2){
      getOpenTicket();
      getCloseTicket();
    }
  },[tabSelectedIndex])

  async function getOpenTicket () {
    let payload: typeTicket = {
      requeststatus: "OPEN",
      page: 1,
      pagesize: 15
    };
  
    let response = await actGetOpenTicketToken(payload, getAccessTokenObj());
    response.isSuccessful
    ? setOpenTicket(response.result.data) : setOpenTicket(response.result.reason);
    setIsSkeleton(false);
  }
  async function getCloseTicket () {
    let payload: typeTicket = {
      requeststatus: "CLOSED",
      page: 1,
      pagesize: 15
    };
  
    let response = await actGetCloseTicketToken(payload, getAccessTokenObj());
    response.isSuccessful
    ? setCloseTicket(response.result.data) : setCloseTicket(response.result.reason);
    setIsSkeleton(false);
  }
  
  
  const callBackModalClose = (data:any, type:any) => {
    if(type == "createTicket"){
      setShowModal(data);
    }else if(type == 'viewTicket'){
      setShowTicketModal(data);
    }
  }  

  function viewtickectAct(item: any) {
    setShowTicketModal(true);
    setTicketData(item);
  }

  const handleCloseCreateTicketModal = useCallback(() => {
    setShowCreateTicketModal(false);
  }, [setShowCreateTicketModal]);
  
  const handleCloseViewTicketModal = useCallback(() => {
    setShowViewTicketModal(false);
  }, [setShowViewTicketModal]);
  return (
    <>
      {/*<!-- Component: Basic base sized tab --> */}
      <section className="max-w-full">
        <ul
          className="flex items-center border-b border-slate-700 py-1 relative"
          role="tablist"
          ref={wrapperRef}
        >
          <li className="my-0.5 mx-0.5" role="presentation">
            <button
              className={`-mb-px inline-flex h-8 w-full items-center justify-center gap-2 whitespace-nowrap rounded-sm px-2 sm:px-3 text-sm font-medium tracking-wide transition duration-300 hover:stroke-emerald-600 focus:bg-primaryFocusBgColor focus-visible:outline-none disabled:cursor-not-allowed ${tabSelected.currentTab === 1
                ? "bg-selectedBGPrimaryColor text-primaryColor  focus:bg-selectedBGPrimaryColor"
                : "w-full justify-self-center stroke-secondaryItemColor text-primaryColor slow-underline hover:text-primaryColor focus:bg-onhoverBGcolor"
                }`}
              id="tab-label-1b"
              role="tab"
              tabIndex={tabSelected.currentTab === 1 ? 0 : -1}
              aria-controls="tab-panel-1b"
              aria-hidden={tabSelected.currentTab === 1 ? true : false}
              onClick={() => setTabSelected({ ...tabSelected, currentTab: 1 })}
            >
              <span> {lang?.open} </span>
            </button>
          </li>
          <li className="" role="presentation">
            <button
              className={`-mb-px inline-flex h-8 w-full items-center justify-center gap-2 whitespace-nowrap rounded-sm px-2 sm:px-3 text-sm font-medium tracking-wide transition duration-300 hover:stroke-emerald-600 focus:bg-primaryFocusBgColor focus-visible:outline-none disabled:cursor-not-allowed ${tabSelected.currentTab === 2
                ? "bg-selectedBGPrimaryColor text-primaryColor  focus:bg-selectedBGPrimaryColor"
                : "w-full justify-self-center stroke-secondaryItemColor text-primaryColor slow-underline hover:text-primaryColor focus:bg-onhoverBGcolor"
                }`}
              id="tab-label-2b"
              role="tab"
              tabIndex={tabSelected.currentTab === 2 ? 0 : -1}
              aria-controls="tab-panel-2b"
              aria-hidden={tabSelected.currentTab === 2 ? true : false}
              onClick={() => setTabSelected({ ...tabSelected, currentTab: 2 })}
            >
              <span> {lang?.closed} </span>
            </button>
          </li>
          <li className="absolute right-0">
            <button onClick={() => setShowModal(true)}
              className="inline-flex items-center justify-center h-8 gap-2 px-3 sm:px-10 md:px-10 lg:px-12 text-sm  tracking-wide text-primaryColor transition duration-300 rounded focus-visible:outline-none whitespace-nowrap bg-selectedBGPrimaryColor  hover:bg-onhoverBGcolor disabled:shadow-none">
              <span> {lang?.create_ticket} </span>
            </button>
          </li>
        </ul>
        <Modal isVisible={showModal} onClose={() => setShowModal(false)}
          AllClass={"w-full lg:w-[96%] lg:mx-[2%] my-2"}>
          <CreateTicket lang={lang} callBackModalClose={callBackModalClose} />
        </Modal>
        <Modal isVisible={showTicketModal} onClose={() => setShowTicketModal(false)}
          AllClass={"w-full lg:w-[96%] lg:mx-[2%] my-2"}>
          <ViewTicket lang={lang} requestid={ticketData?.requestid} callBackModalClose={callBackModalClose}/>
        </Modal>
        <div className="mb-10">
          {/* Open Ticket Section */}
          <div
            className={`py-2 ${tabSelected.currentTab === 1 ? "" : "hidden"
              }`}
            id="tab-panel-1b"
            aria-hidden={tabSelected.currentTab === 1 ? true : false}
            role="tabpanel"
            aria-labelledby="tab-label-1b"
            tabIndex={-1}
          >
            {isSkeleton === true ? (
              <TicketSkeleton  lang={lang} />
            ) : openTicket && Array.isArray(openTicket) && openTicket.length > 0 ? (
              openTicket.map((item: any, i: any,) => (
                <div className="bg-profilePageBgColor flex justify-between rounded-md items-center py-3 px-6 my-3 hover:bg-zinc-800 cursor-pointer duration-700 select-none" key={i}>
                  <div>
                  <p className="text-xl text-primaryColor font-bold py-0.5">{item.title}</p>
                  <p className="text-sm text-primaryColor"> {lang?.Updated_on}: {dateFormater(item.updatedon)}</p>
                  <p className="text-sm text-primaryColor py-2">{lang?.category}: {item.title} </p>
                  </div>
                  <div>
                    <button className="inline-block px-4 py-2 mt-2 text-sm font-medium text-white border border-selectedBGPrimaryColor rounded-full" onClick={()=>viewtickectAct(item)}>{lang?.view_ticket}</button>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-3">
                <p className="text-center">{lang?.No_ticket_found}</p>
              </div>
            )}
          </div>
          {/* Close Ticket Section */}
          <div
            className={`py-2 ${tabSelected.currentTab === 2 ? "" : "hidden"
              }`}
            id="tab-panel-2b"
            aria-hidden={tabSelected.currentTab === 2 ? true : false}
            role="tabpanel"
            aria-labelledby="tab-label-2b"
            tabIndex={-1}
          >
            {isSkeleton === true ? (
              <TicketSkeleton />
            ) : closeTicket && Array.isArray(closeTicket) && closeTicket.length > 0 ? (
              closeTicket.map((item: any, i: any) => (
                <div className="bg-profilePageBgColor rounded-md items-center p-2 my-2 hover:bg-zinc-800 cursor-pointer duration-700 select-none" key={i}>
                  <p className="text-xl text-primaryColor font-bold py-0.5">{item.title}</p>
                  <p className="text-sm text-primaryColor"> {lang?.Updated_on} {item.updatedon}</p>
                  <p className="text-sm text-primaryColor py-2">{lang?.category}: {item.title} </p>
                </div>
              ))
            ) : (
              <div className="py-3">
                <p className="text-center">{lang?.No_ticket_found} </p>
              </div>
            )}
          </div>
        </div>
      </section>
      {/*<!-- End Basic base sized tab --> */}
    </>
  )
}
