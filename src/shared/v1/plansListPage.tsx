'use client'
import PlanCard from "@/shared/v1/planCard"
import { useEffect, useState } from "react";
import planLogo from "../../../public/cardlogo.png";
import { getPlansList, listSubscription } from '@/services/actions/payment.action';
import { getAccessTokenObj } from '@/services/helpers/init.helper';
import PlanSkeletonCard from "@/components/v1/planListSkeleton";

export default function PlansListPage({lang, subscriberInfo, whereIamFrom}:any) {
 
const [plansData, setPlansData] = useState([]);
  const fetchSubscriptionData = async () => {
    try {
      const response:any = await listSubscription(getAccessTokenObj());
      const plans = response.result.data;
      setPlansData(plans);
      return plans;
    } catch (error) {
      console.error('Error fetching plans:', error);
    }
  };
  const fetchPlansData = async () => {
    try {
      // Make the API call
      const response = await getPlansList(getAccessTokenObj());

      // Assuming the response data is an array of plans
      setPlansData(response.result.data);
    } catch (error) {
      // Handle errors
      console.error("Error fetching plans data:", error);
    }
  };
  useEffect(() => {
    // Fetch subscription data
    if(subscriberInfo){
      fetchSubscriptionData().then((response) => {
        if (!response || response.length === 0) {
          // Data is not available, fetch plans data
          fetchPlansData();
        }
      });
    }
    // Check if there is data from fetchSubscriptionData before calling fetchPlansData    
  }, [subscriberInfo]);
    return (
      <section>
      {plansData && plansData.length > 0 ? (
        // Plans data is available, show PlanCard
        <PlanCard  lang={lang} plansData={plansData} whereIamFrom='profile'></PlanCard>
      ) : <>
          <h3 className="text-center text-primaryHeadingFont text-primaryheadingColor">
            {lang?.subscribe_premium}
          </h3>
          <PlanSkeletonCard />
        </>
      }
    </section>
    )
}