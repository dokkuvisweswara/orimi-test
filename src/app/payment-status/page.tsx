// PaymentStatus.tsx
'use client'
import { useEffect, useState } from "react";
import { paymentDetail, listSubscription } from '@/services/actions/payment.action';
import { useRouter } from "next/navigation";
import { getAccessTokenObj } from '@/services/helpers/init.helper';
import successIcon from '../../../public/SuccessIcon.png';
import failureIcon from '../../../public/Failure.png';
import Image from 'next/image';
import { useStore, useStoreUser, useSoreUtility, useStorePlayer } from '@/store/init';
import { actGetCurrentLanguage } from "@/utils/accessCurrentLang";
import { getDictionary } from "@/i18n/dictionaries";
import { getCurrencyWithPayment } from "@/utils/basicHelper";

const PaymentStatus = () => {
  const router = useRouter();
  const settingSubscriptionDetails = useStoreUser((state: any) => state?.setSubscriptionDetails);
  let search = {}
  if (typeof window !== 'undefined') {
    search =  (window as any).location.search
  }
  const params = new URLSearchParams(search);
  const referenceid = params.get('referenceid');
  const planname = params.get('planname');
  const success = params.get('success');
  const message = params.get('message');
  const [lang, setLang] = useState<any>(null);
  const [apiResult, setApiResult] = useState("");
  const [apiResponse, setApiResponse] = useState<any>({});
  const [loading, setLoading] = useState(true);

  let subscriberDetail: any = (typeof localStorage !== 'undefined') && localStorage.getItem('subscriberDetail');
  subscriberDetail = subscriberDetail ? JSON.parse(subscriberDetail) : {}
  const email = subscriberDetail ? subscriberDetail.email : '';
  const handleButtonClick = (apiResult: any) => {
    const route = apiResult === 'SUCCESS' ? '/' : '/subscribe';
    router.push(route);
  };
  
  const goHome =() => {
    router.push('/');
  }
  const fetchPaymentStatus = async () => {
    try {
      if (referenceid) {
        let payload = {
          referenceid: referenceid
        };
        const response = await paymentDetail(payload, getAccessTokenObj());
        setLoading(false);
        if (response.isSuccessful && response.result.transactionstatus === 'SUCCESS') {
          setApiResult(response.result.transactionstatus);
          setApiResponse(response.result);
          const subscriptionDetails = await listSubscription(getAccessTokenObj());
          if (subscriptionDetails.isSuccessful) {
            localStorage.setItem('subscriptionDetails', JSON.stringify(subscriptionDetails.result.data));
            settingSubscriptionDetails(subscriptionDetails.result.data);
          }
        } else {
          setApiResult(response.result.transactionstatus);
          setApiResponse(response.result);
        }
      } else {
        
        const subscriptionDetails = await listSubscription(getAccessTokenObj());
        if (subscriptionDetails.isSuccessful) {
          localStorage.setItem('subscriptionDetails', JSON.stringify(subscriptionDetails.result.data));
          settingSubscriptionDetails(subscriptionDetails.result.data);
        }

        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };
  useEffect(() => {
    if ((window as any).setStoreLanguageDataset) {
      setLang((window as any).setStoreLanguageDataset)
    } else {
      actGetCurrentLanguage().then((langSelected) => {
        getDictionary(langSelected).then((language: any) => {
          setLang(language);
        })
      })
    }
  }, []);
  useEffect(() => {
    fetchPaymentStatus();
  }, [referenceid]); // eslint-disable-line react-hooks/exhaustive-deps

  if (loading) {
    // Display a loading spinner or message while fetching data
    return <div>Loading...</div>;
  }

  if (!apiResult) {
    // If apiResult is empty, return null
    return null;
  }

  return (
    <>
      <title>Payment Status</title>
      <div className="min-h-screen flex items-center justify-center bg-footerbordercolor">
        <div className="bg- p-8 w-[50rem] rounded-lg shadow-md text-center">
          {apiResult === 'SUCCESS' ? (
            <Image src={successIcon} alt="Success Image" width={100} height={100} className="mb-4 mx-auto" />
          ) : (
            <Image src={failureIcon} alt="Failure Image" width={100} height={100} className="mb-4 mx-auto" />
          )}

          <h1 className={`text-2xl font-bold ${apiResult === 'SUCCESS' ? 'text-green-500' : 'text-primaryErrorColor'} mb-4`}>
            {lang?.payment} {apiResult === 'SUCCESS' ? lang?.successful : 'Failed!'}
          </h1>
          <p className="text-lg text-primaryColor mb-6">
            {apiResult === 'SUCCESS' ? lang?.plan_subscription_is_successful : "We couldn't process your payment"}
          </p>
          <hr className="my-4 border-t border-gray-300" />
          <div className="mb-4 flex flex-wrap justify-between items-center">
            <label className="text-primaryColor font-bold">{lang?.email_id}</label>
            <p className="text-stone-400">{email}</p>
          </div>
          <div className="mb-4 flex justify-between items-center">
            <label className="text-primaryColor font-bold">{lang?.Payment_Id}</label>
            <p className="text-stone-400">{apiResponse.paymentid}</p>
          </div>
          <div className="mb-4 flex justify-between items-center">
            <label className="text-primaryColor font-bold">{lang?.Order_Id}</label>
            <p className="text-stone-400">{apiResponse.originaltransactionid}</p>
          </div>
          <div className="mb-4 flex justify-between items-center">
            <label className="text-primaryColor font-bold">{lang?.Plan_Name}</label>
            <p className="text-stone-400">{planname}</p>
          </div>
          <div className="mb-4 flex justify-between items-center">
            <label className="text-primaryColor font-bold">{lang?.Plan_Price}</label>
            <p className="text-stone-400">{getCurrencyWithPayment(apiResponse.amount, apiResponse.currency)} </p>
          </div>
          {/* <button className={`bg-pink-700 hover:bg-pink-900 text-primaryColor font-bold py-2 px-4 rounded`}
            onClick={() => handleButtonClick(apiResult)}>
            {apiResult === 'SUCCESS' ? 'Explore Premium' : 'Retry'}
          </button> */}
          <button className={`bg-pink-700 hover:bg-pink-900 text-primaryColor font-bold py-2 px-4 rounded ml-4`}
            onClick={() => goHome()}>
            {lang?.Go_To_Home}
          </button>
        </div>
      </div>
    </>
  );
};

export default PaymentStatus;
