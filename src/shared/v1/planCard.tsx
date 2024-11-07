"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import planLogo from "../../../public/cardlogo.png";
import crown from "../../../public/crown.svg";
import Modal from "@/components/v1/modelbox";
import { useRouter } from "next/navigation";
import PlanSkeletonCard from "@/components/v1/planListSkeleton";
import { actConfig } from "@/services/actions/init.action";
import { getCookie } from "@/hooks/client.cookie";
import Gateway from "@/components/v1/paymentGateway";
import { PaymentGateway, cancelSubscription } from "@/services/actions/payment.action";
import { getAccessTokenObj } from "@/services/helpers/init.helper";
import { notify } from "@/(layout)/v1/ToasterComponent";
import { actGetCurrentLanguage } from "@/utils/accessCurrentLang";
import { getCurrencyWithPayment } from "@/utils/basicHelper";

export default function PlanCard({ plansData, lang, whereIamFrom }: any) {
  const router = useRouter();
  let sessionToken = getCookie('sessionToken');

  const [planbenefits, setPlanbenefits] = useState<any>([]);
  const [showModal, setShowModal] = useState(false);
  const[selectedPlan, setSelectedPlan] = useState({});
  const[currentLang, setcurrentLang] = useState({});
  const[gateways, setGateways] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const langSelected = await actGetCurrentLanguage();
      setcurrentLang(langSelected)
      if (langSelected){
        actGetConfigSet(langSelected); 
      }
    };
  
    fetchData();
  }, []);
  const handleButtonClick = () => {
    router.push("/payment");
  };
  async function actGetConfigSet(langSelected :any) {
    let local: any = localStorage.getItem("primary-config");
    local = local ? JSON.parse(local) : "";

    let config: any = "";
    if (local) {
      let configObj = await actConfig();
      config = configObj?.result;
      if (langSelected == "en") {
        setPlanbenefits(config.planBenefits.en);
      } else {
        setPlanbenefits(config.planBenefits.mn);
      }
    } 
  }

  const actGetCurrentPlan = async (plan: any) => {    
    if(!sessionToken) { 
      router.push('/login');
      return;
    } else {
      let payload = {
        planid: plan.planid,
        country: getCookie('currentCountry')
      }
      const response = await PaymentGateway(payload, getAccessTokenObj())
      const gatewayIds = response.data.map((entry:any) => entry.gatewayid);
      setGateways(gatewayIds)
      setSelectedPlan(plan)
      setShowModal(true)
    }    
  }
  const cancelPlan = async (plan: any) => {
    let payload = {
      planId: plan?.planid,
      params: {
        planstatus: "CANCEL",
        comment: "I don't want the Auto-Renewal of my subscription"
      }
    }
    let cancleRes = await cancelSubscription(payload, getAccessTokenObj());
    if(cancleRes?.isSuccessful) {
      window?.location?.reload();
    } else {
      if(cancleRes?.result?.reason){
        notify(cancleRes?.result?.reason, 'error');
      }
    }
  }
  const callBackModalClose = (data:any) => {
    setShowModal(data);
  } 
  
  
  return (
    <section>
        <div className="flex flex-wrap justify-center mb-24 sm:mb-auto md:mb-auto lg:mb-auto gap-y-4 gap-x-0">
          {plansData && plansData.length && plansData !== "undefined" ? (
            plansData.map((plan: any, index: number) => (
              <div key={index} className={`w-[35%] min-w-40 sm:w-[${whereIamFrom == 'profile' ? '45%' : '35%'}] md:w-[${whereIamFrom == 'profile' ? '45%' : '35%'}] lg:w-[${whereIamFrom == 'profile' ? '45%' : '35%'}] p-2`}>
                <div className="overflow-hidden border border-zinc-600 rounded bg-[#151617] text-slate-500 w-full text-sm ">
                  <div className="">
                    <div className="flex justify-center items-center">
                      <div className="absolute bg-[#E80D74] rounded-sm w-[13rem] max-w-[85%] mt-0 px-1 py-2">
                        <div className="flex justify-center p-0.5">
                          <Image src={crown} alt="Crown Icon" className="w-4" />
                          <p className="text-primaryColor pl-2" style={{ fontSize: '0.60rem', lineHeight: '1rem' }}>{lang[plan.planname] || plan.planname}</p>
                        </div>
                      </div>
                    </div>
                    <figure>
                      <Image
                        src={planLogo}
                        alt="card image"
                        height={200}
                        width={300}
                        className="aspect-video w-full"
                      />
                    </figure>
                    <div className="p-6 ">
                      <header className="mb-4">
                        <h3 className="text-md font-medium text-primaryheadingColor">
                        {lang[plan.planname] || plan.planname}
                        </h3>
                        <p className=" text-selectedBGPrimaryColor font-semibold">{getCurrencyWithPayment(plan.amount, plan.currency)}</p>
                        {plan.nextbilling && (
                          <p className="text-selectedBGPrimaryColor font-semibold">{lang?.RENEWAL_DATE}: {plan.nextbilling}</p>
                        )}
                      </header>
                        <div className="mb-1">
                          {planbenefits && planbenefits[plan.planinterval]?.map((item: any, i: any) => 
                              <div className="flex gap-2 py-1 secondaryItemColor items-baseline" key={i}>
                                <div>
                                  <svg width="12" height="12" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 0C2.24 0 0 2.24 0 5C0 7.76 2.24 10 5 10C7.76 10 10 7.76 10 5C10 2.24 7.76 0 5 0ZM3.645 7.145L1.85 5.35C1.655 5.155 1.655 4.84 1.85 4.645C2.045 4.45 2.36 4.45 2.555 4.645L4 6.085L7.44 2.645C7.635 2.45 7.95 2.45 8.145 2.645C8.34 2.84 8.34 3.155 8.145 3.35L4.35 7.145C4.16 7.34 3.84 7.34 3.645 7.145Z" fill="#bf1171"></path><path d="M3.645 7.145L1.85 5.35C1.655 5.155 1.655 4.84 1.85 4.645C2.045 4.45 2.36 4.45 2.555 4.645L4 6.085L7.44 2.645C7.635 2.45 7.95 2.45 8.145 2.645C8.34 2.84 8.34 3.155 8.145 3.35L4.35 7.145C4.16 7.34 3.84 7.34 3.645 7.145Z" fill="white"></path></svg>
                                </div>
                                <div> {item} </div>                          
                              </div>
                          )}
                        </div>
                   
                    </div>
                  </div>

                  <div className="flex justify-end p-6 pt-0">
                      {plan.clientcancancel === "YES" && (
                        <button
                          className="inline-flex h-10 w-full items-center justify-center gap-2 whitespace-nowrap rounded bg-selectedBGPrimaryColor  px-5 text-sm font-medium tracking-wide text-primaryColor transition duration-300 hover:bg-[#BA0B5D]"
                          onClick={() => cancelPlan(plan)}
                        >
                          <span className="text-md">{lang?.CANCEL_PLAN}</span>
                        </button>
                      )}

                      { !plan.nextbilling && (
                        <button
                          className="inline-flex h-10 w-full items-center justify-center gap-2 whitespace-nowrap rounded bg-selectedBGPrimaryColor px-5 text-sm font-medium tracking-wide text-primaryColor transition duration-300 hover:bg-[#BA0B5D]"
                          onClick={() => actGetCurrentPlan(plan)}
                        >
                          <span className="text-md">{lang?.subscribe}</span>
                        </button>
                      )}
                  </div>
          
                </div>
              </div>
            ))
          ) : (
            <>
              <PlanSkeletonCard/>
            </>
          )}
        </div>
        <Modal isVisible={showModal} onClose={() => setShowModal(false)} 
          AllClass={"w-[90%] sm:w-[90%] md:w-[90%] lg:w-[70%] mx-[5%] sm:mx-[5%] md:mx-[5%] lg:mx-[15%] my-[10%] sm:my-[5%] md:my-[5%] lg:my-[2%] "}
          >
            <Gateway plan={selectedPlan} gateways={gateways} callBackModalClose = {callBackModalClose} lang={lang}/>
        </Modal>
    </section>
  );
}
