
'use client'
import React, { useEffect, useState } from 'react';
import PlanCard from '@/shared/v1/planCard';
import { listSubscription } from "@/services/actions/payment.action";
import { getAccessTokenObj } from '@/services/helpers/init.helper';


export default function Subscription({lang}:any) {
  const [plansData, setPlansData] = useState([]);

  const fetchData = async () => {
    try {
      // Make an API call to fetch plans
      const response:any = await listSubscription(getAccessTokenObj());
      const plans = response.result.data;
      setPlansData(plans);
    } catch (error) {
      console.error('Error fetching plans:', error);
    }
  };
  useEffect(() => {    
    fetchData();
  }, []);

  return (
    <div>
      <h3 className='text-center text-primaryHeadingFont text-primaryheadingColor my-6 font-bold'>{lang?.subscription}</h3>
      { lang && <PlanCard plansData={plansData} whereIamFrom='subscription' lang={lang}/> }
    </div>
  );
}

