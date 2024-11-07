"use client"

import Gateway from '@/components/v1/paymentGateway';
import { getCookie } from '@/hooks/client.cookie';
import { PaymentGateway } from '@/services/actions/payment.action';
import { getAccessTokenObj } from '@/services/helpers/init.helper';
import { getCurrencyWithPayment } from '@/utils/basicHelper';
import Image from 'next/image';
import React from 'react';
import { useEffect, useState } from "react";
import Modal from "@/components/v1/modelbox";


export default function RentalPurchaseFlow({priceclassdetail, pricemodel, contentData, licenseduration, lang}: any) {
    const[gateways, setGateways] = useState([]);
    const[selectedPlan, setSelectedPlan] = useState({});
    const [showModal, setShowModal] = useState(false);
    useEffect(() => {
        getGatewayList();
    }, []);

    const actActiveModal = function () {
        setShowModal(true)
    }
    const callBackModalClose = (data:any) => {
        setShowModal(data);
      } 
    const getGatewayList = async function() {
        let payload = {
            country: getCookie('currentCountry')
          }
          const response = await PaymentGateway(payload, getAccessTokenObj())
          const gatewayIds = response.data.map((entry:any) => entry.gatewayid);
          setGateways(gatewayIds)

          let plan: any = {
            amount: priceclassdetail.price,
            currency: priceclassdetail.currency,
            description: "",
            picture: contentData.poster,
            planid: "",
            planinterval: licenseduration / 24 + ' Days',
            planname: contentData.title,
            pricemodel: pricemodel,
            objectid: contentData.objectid,
            availabilityset: contentData.contentdetails[0].availabilityset,
            priceclassid: priceclassdetail.priceclassid,
            poster: contentData.poster

          }
          setSelectedPlan(plan)
    }
    return (
      <>
          <h1 className='mb-3 mt-3 font-bold text-center text-2xl'> {lang?.Rental_payment} </h1>

          <div className='m-10 flex gap-3'>
            <Image src={contentData.poster} alt={contentData.title} width={170} height={170}></Image>
              <div>
                <h2 className=' mb-3 mt-3'> {contentData.title} </h2>

                <p className='text-ordinaryItemColor mb-3 mt-3'><span className='font-bold'> {getCurrencyWithPayment(priceclassdetail.price, priceclassdetail.currency)}</span></p>

                <p className='text-ordinaryItemColor mb-3 mt-3'> {lang?.Rental_Payment_Expired?.replace("@%", (licenseduration / 24) )} </p>
              
                {pricemodel == 'RENTAL' && (<button className="bg-selectedBGPrimaryColor px-4 py-1 text-center font-medium rounded-lg text-sm text-primaryColor hover:bg-onhoverBGcolor" onClick={actActiveModal}>{lang?.Rent_key}</button>)}
                {pricemodel == 'PAID' && (<button className="bg-selectedBGPrimaryColor px-4 py-1 text-center font-medium rounded-lg text-sm text-primaryColor hover:bg-onhoverBGcolor" onClick={actActiveModal}> {lang?.Purchase_now} </button>)}
              </div>


        <Modal isVisible={showModal} onClose={() => setShowModal(false)} 
          AllClass={"w-[90%] sm:w-[90%] md:w-[90%] lg:w-[70%] mx-[5%] sm:mx-[5%] md:mx-[5%] lg:mx-[15%] my-[10%] sm:my-[5%] md:my-[5%] lg:my-[2%]"}>
          

          {gateways.length > 0 && <Gateway plan={selectedPlan} gateways={gateways} callBackModalClose = {callBackModalClose} lang={lang} /> }

              
          </Modal>
       
        </div>

      </>
   
    );
}
