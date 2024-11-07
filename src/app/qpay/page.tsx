'use client'
import React from 'react';
import { useQRCode } from 'next-qrcode';
import { useEffect, useState } from 'react';
import { listSubscription, paymentInitiationForQpay } from "@/services/actions/payment.action";
import { getAccessTokenObj } from "@/services/helpers/init.helper";
import { getCurrencyWithPayment } from '@/utils/basicHelper';
import { useStoreUser } from '@/store/init';
import { useRouter } from 'next/navigation';
import { notify } from '@/(layout)/v1/ToasterComponent';
import { errors_message } from '@/constants/errors_constants';

export default function QPay({ planData, planQpay, lang }: any) {
    const QR = useQRCode();
    const ImagObj = QR.Image;
    let countdownInterval: any = null;
    const [showPopup, setShowPopup] = useState(false); 
    const [apiResult, setApiResult] = useState<string>("");
    const [apiResponse, setApiResponse] = useState<any>({}); 
    const [email, setEmail] = useState<string>("");
    const [planname, setPlanname] = useState<string>("");
    const [qPayShortUrl, setQPayShortUrl] = useState<string>("");
    const [qPayQRCode, setQPayQRCode] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [isMobile, setIsMobile] = useState(false);
    const [remainingTime, setRemainingTime] = useState(300)
    const settingSubscriptionDetails = useStoreUser((state: any) => state?.setSubscriptionDetails);
    const router = useRouter();


    const formattedTime = (time: any) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }
    const startCountdown = () => {
        const intervalDuration = 1000;
         countdownInterval = setInterval(() => {
             setRemainingTime((prev) => {
                let old = prev - 1;
                if (old <= 0) {
                    clearInterval(countdownInterval);
                    setRemainingTime(0)
                    actGetPaymentStatusLink();
                }
                return old;
             })
        }, intervalDuration);
    }

    useEffect(() => {
        setIsMobile((window as any).innerWidth <= 780); 
        startCountdown();

        return () => clearInterval(countdownInterval);
    }, [])

    useEffect(() => {
        const initiatePayment = async () => {
            try {
                const plan = planData;
                let payload: any = {};
                let payloadEx: any= {
                  devicetype: "WEB",
                  amount: plan.amount,
                  currency: plan.currency,
                  transactionmode: "CC",
                  availabilityid: plan.availabilityset[0],
                }
              if (!plan.pricemodel) {
                  payload.params = {...{
                      
                      transactionpurpose: "SUBSCRIPTION",
                      planid: plan.planid,
                      
                  }, ...payloadEx} 
              } else {
  
                  payload.params = {...{
                      transactionpurpose: "PURCHASE",
                      priceclassid: plan.priceclassid,
                      objectid: plan.objectid
                  }, ...payloadEx} 
  
              }


                
                const response = await paymentInitiationForQpay(payload, getAccessTokenObj());
                if (response.isSuccessful) {
                    setShowPopup(true);
                    setApiResult(response.result);
                    setApiResponse(response.result.referencedata);
                    setEmail(response.result.referencedata.email);
                    setPlanname(response.result.referencedata.amount);
                    setQPayShortUrl(response.result.referencedata.qPay_shortUrl);
                    setQPayQRCode(response.result.referencedata.qr_text)
                } else {
                    setErrorMessage(response.result.reason);
                }
            } catch (error) {
                setErrorMessage('Error initiating payment. Please try again later.');
            }
        };

        if (planData) {
            initiatePayment();
        }
    }, [planData]);
    const actGetPaymentStatusLink = async (statusChecker: boolean = false) => {

        const subscriptionDetails = await listSubscription(getAccessTokenObj());
        if (subscriptionDetails.isSuccessful) {
          localStorage.setItem('subscriptionDetails', JSON.stringify(subscriptionDetails.result.data));
          settingSubscriptionDetails(subscriptionDetails.result.data);
          router.push('/subscription')
        } else {
            if (!statusChecker) {
                router.push('/subscribe')
            } else {
                notify(errors_message.NO_STATUS_UPDATE, 'error')
            }
        }


    };
    const handleBackEvent = () => {
        router.push('/subscribe')
        window?.location.reload();
      };

    return (
        <div>
            {errorMessage && (
                <div className="min-h-screen flex items-center justify-center">
                    <div className="bg-gray-800 p-8 w-[50rem] rounded-lg shadow-md text-center relative">
                        <p className="text-red-500 text-lg mb-4">{errorMessage}</p>
                        <button className="bg-pink-700 hover:bg-pink-900 text-primaryColor font-bold py-2 px-4 rounded" onClick={() => handleBackEvent()}>Back</button>
                    </div>
                </div>
            )}
    
            {showPopup && !errorMessage && (
                <div className="min-h-screen bharath flex items-center justify-center">
                    <div className="bg-gray-800 p-8 w-[50rem] rounded-lg shadow-md text-center relative">
                    <button className="absolute top-4 right-4 text-white" onClick={() => handleBackEvent()}>X</button>
                    {/* QPAY heading */}
                    <h1 className="text-2xl font-bold text-white mb-4">QPAY</h1>
                    {/* Email */}
                    <div className="mb-4 flex flex-wrap justify-between items-center">
                        <label className="text-primaryColor font-bold">{lang?.email_id}</label>
                        <p className="text-stone-400">{email}</p>
                    </div>
                    {/* Payment ID */}
                    <div className="mb-4 flex justify-between items-center">
                        <label className="text-primaryColor font-bold">{lang?.Payment_Id}</label>
                        <p className="text-stone-400">{apiResponse.paymentid}</p>
                    </div>
                    {/* Other details */}
                    {/* Replace these placeholders with actual data */}
                    <div className="mb-4 flex justify-between items-center">
                        <label className="text-primaryColor font-bold">{lang?.Order_Id}</label>
                        <p className="text-stone-400">{apiResponse.receipt}</p>
                    </div>
                    <div className="mb-4 flex justify-between items-center">
                        <label className="text-primaryColor font-bold">{lang?.Plan_Name}</label>
                        <p className="text-stone-400">{planData.planname}</p>
                    </div>
                    <div className="mb-4 flex justify-between items-center">
                        <label className="text-primaryColor font-bold">{lang?.Plan_Price}</label>
                        <p className="text-stone-400">
                        {getCurrencyWithPayment(apiResponse.amount, planData.currency)}
                        </p>
                    </div>
                    {/* QR Code */}
                    <div className="flex justify-center mb-4">
                        <ImagObj
                            text={qPayQRCode}
                            options={{
                                type: 'image/jpeg',
                                quality: 0.3,
                                errorCorrectionLevel: 'M',
                                margin: 3,
                                scale: 4,
                                width: 200,
                                color: {
                                    dark: '#000000', // Set dark color to black
                                    light: '#FFFFFF', // Set light color to white
                                },
                            }}
                        />
                    </div>
                    {/* Text under QR Code */}
                    <p className="text-stone-400 mb-2">{lang?.scanQR}</p>
 

                    {/* Button */}
                    { isMobile && <a href={qPayShortUrl} target="_blank" rel="noopener noreferrer" className="bg-pink-700 hover:bg-pink-900 text-primaryColor font-bold py-2 px-4 rounded">{lang?.QpayPay}</a>}

                    <p className="text-stone-100 mb-4">{lang?.Remaining_Time} {formattedTime(remainingTime)}</p>
                    <button className="bg-pink-700 hover:bg-pink-900 text-primaryColor font-bold py-2 px-4 rounded ml-4" onClick={() => actGetPaymentStatusLink(true)}>{lang?.Refresh_Status}</button>
                </div>
                </div>
            )}
        </div>
    );
    
}
