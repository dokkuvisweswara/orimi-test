



"use client"

import React from 'react';
import PlanCard from "@/shared/v1/planCard"
import { useEffect, useState } from "react";
import { getPlansList } from '@/services/actions/payment.action';
import { getAccessTokenObj } from '@/services/helpers/init.helper';



export default function Subscribe({lang}: any) {
  	// State to hold the plans data
const [plansData, setPlansData] = useState([]);
// useEffect to fetch plans data when the component mounts
useEffect(() => {
  // Function to make the API call and update state
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

  // Call the function
  fetchPlansData();
}, []);
    return (
      <div>
        <h3 className="text-center text-primaryHeadingFont text-primaryheadingColor my-6 font-bold">{lang?.subscribe_premium}</h3>
        <PlanCard plansData={plansData} lang={lang} whereIamFrom='subscribe'></PlanCard>
      </div>

    );
  }
