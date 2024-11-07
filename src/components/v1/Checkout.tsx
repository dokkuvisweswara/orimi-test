'use client'
import React, { useEffect, useRef, useState } from "react";
import AdyenCheckout from "@adyen/adyen-web";
import "@adyen/adyen-web/dist/adyen.css";
import { paymentInitiation } from "@/services/actions/payment.action";
import { useRouter } from "next/navigation";
import { getAccessTokenObj } from "@/services/helpers/init.helper";
import Spinner from "@/loaders/spinner/spinner";
import { Popup, PopupBody } from "@/popup/commonPopup";
import { notify } from "@/(layout)/v1/ToasterComponent";
import { ENV } from "@/constants/v1/constants";

export const PaymentContainer = (plan: any) => {
  
  return (
    <div id="payment-page">
      <div className="container">
        <Checkout plan={plan.plan} />
      </div>
    </div>
  );
};

export const Checkout = (plan:any) => {
	const planDetails = plan.plan;
	const router = useRouter();
	const [session, setSession] = useState(null);
	const [userLoad, setUserLoad] = useState<any>(true);

	useEffect(() => {
    let ignore = false;

    const initAdyenPayment = async () => {
      try {
			let payload: any = {
			
      		};
			  let payloadEx: any= {
				devicetype: "WEB",
				amount: planDetails.amount,
				currency: planDetails.currency,
				transactionmode: "CC",
				availabilityid: planDetails.availabilityset[0],
				optrecurring: true
			  }
			if (!planDetails.pricemodel) {
				payload.params = {...{
					
					transactionpurpose: "SUBSCRIPTION",
					planid: planDetails.planid,
					
				}, ...payloadEx} 
			} else {

				payload.params = {...{
					transactionpurpose: "PURCHASE",
					priceclassid: planDetails.priceclassid,
					objectid: planDetails.objectid
				}, ...payloadEx} 

			}

		const response = await paymentInitiation(payload, getAccessTokenObj());
		if(response.result.reason) {
			setUserLoad(false)
			notify(response.result.reason, "error")
			setTimeout(() => {
				router.push('/');
			}, 3000);				
		} else {
			const responseData = response.result;
			setSession(responseData); // Assuming the API response contains the required session data
		}
      } catch (error) {
        console.error("Error initializing Adyen payment:", error);
      }
    };

    initAdyenPayment();

    return () => {
      ignore = true;
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

	useEffect(() => {
		let sessionData: any = '' 
		if (session) {
			 sessionData = session;
			const newSession = sessionData && sessionData.referencedata && sessionData.referencedata.sessionData;
			const config = {
				id: sessionData && sessionData.referencedata && sessionData.referencedata.sessionData && sessionData.referencedata.sessionData.id,
				session: newSession,
				clientKey: sessionData && sessionData.referencedata && sessionData.referencedata.clientKey,
				locale: "en_US",
				environment: ENV == "PROD" ? "live" : "test", // change to live for production
				showPayButton: true,
				recurringProcessingModel: "Subscription",
				storePaymentMethod: true,
				paymentMethodsConfiguration: {
					ideal: {
						showImage: true
					},
					card: {
						hasHolderName: true,
						holderNameRequired: true,
						name: "Credit or debit card",
						amount: {
							value: sessionData && sessionData.referencedata && sessionData.referencedata.amount,
							currency: sessionData && sessionData.referencedata && sessionData.referencedata.currency
						}
					},
					paypal: {
						amount: {
							currency: sessionData && sessionData.referencedata && sessionData.referencedata.currency,
							value: 1000
						},
						environment: ENV == "PROD" ? "live" : "test",
						countryCode: "US"   // Only needed for test. This will be automatically retrieved when you are in production.
					},
					
				},
			};
			const createCheckout = async () => {
			const checkout = await AdyenCheckout({
				...config,
			    onPaymentCompleted: (response: any, _component: any) => {
					if (response.resultCode === "Authorised") {
					router.push(`/payment-status?success=true&message=Payment%20successful!&referenceid=${sessionData.referenceid}&planname=${planDetails.planname}`);
					} else {
					  router.push(`/payment-status?success=false&message=Payment%20Failed!&referenceid=${sessionData.referenceid}&planname=${planDetails.planname}`);
					}
					setTimeout(() => (window as any).location.reload() , 1200)
				  },
				  onError: (error: any, _component: any) => {
					router.push(`/payment-status?success=false&message=Payment%20Failed!&referenceid=${sessionData.referenceid}&planname=${planDetails.planname}`);
					setTimeout(() => (window as any).location.reload() , 1200)
					

				  },
			});
      		setUserLoad(false)
			checkout?.create("dropin").mount("#dropin-container");
		};
			createCheckout();
		}
  }, [session]); // eslint-disable-line react-hooks/exhaustive-deps
  const handleBackEvent = () => {
	window?.location?.reload();
  };

  if (!session)
    return (
      <div>
        <Popup>
          <PopupBody>
            <Spinner></Spinner>
          </PopupBody>
        </Popup>
      </div>
    );

  return (
    <>
      {userLoad && (
        <Popup>
          <PopupBody>
            <Spinner></Spinner>
          </PopupBody>
        </Popup>
      )}
      <div className="payment-container relative">
		<div className="font-bold w-6 h-6 bg-primaryBgColor  rounded absolute right-1 top-1 text-primaryBgColor hover:translate-1 z-[999] cursor-pointer" onClick={() => handleBackEvent()}>
			<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-100 hover:scale-125 transition-all duration-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" role="graphics-symbol" aria-labelledby="title-79 desc-79">
				<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>
			</svg>
		</div>
        <div id="dropin-container" className="payment"></div>
      </div>
    </>
  );
};
