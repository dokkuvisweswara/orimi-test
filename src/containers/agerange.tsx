'use client'

import { AGE_RANGE } from "@/constants/appConfig";
import { calculateDOB, getAge } from "@/utils/content";
import { useEffect, useState } from "react";
export default function AgeRange({callBackAge, selectedAge}: any){
    const [ageSelectIndex, setAgeSelectIndex] = useState(2);

    useEffect(() => {
      AGE_RANGE?.map((item: any, index: any) => {
        if( actHighLightRange(item?.range, index)) {
         setAgeSelectIndex(index);
         const dob = calculateDOB(item.age);
         callBackAge({dob: dob, selected: item.age});
        }
       })

    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const handleAgeClick = (item:any, i:any) => {    
      setAgeSelectIndex(i);
      const dob = calculateDOB(item?.age);             
      callBackAge({dob: dob, selected: item?.age});              
    };

    const actHighLightRange = (typeRange: string, i: number): boolean => {
      const Flag = false;
      if (!selectedAge && i == 2) {
    
        return true;
      } else if (!selectedAge) {
        return false
      }
      let currentAge: any = getAge(selectedAge);
     
   
        if (typeRange.includes("<")) {
          const max = typeRange.split("<")[1];
          if (currentAge <= max) {
            
            return true;
          }
        } else if (typeRange.includes("-")) {
         const min = typeRange.split("-")[0];
         const max = typeRange.split("-")[1];
        if (min <= currentAge && max >= currentAge) {
          
          return true
        }
        } else if (typeRange.includes("+")) {
          const max = typeRange.split("+")[0];
          if ( max < currentAge) {
            
          return true;
          }
        }
      return Flag;
  
    }

    return(
        <div className="flex items-center mt-2 text-primaryColor w-full text-center">
        { AGE_RANGE && AGE_RANGE.map((item:any, i:number) => {
                    return (<div key={i} 
                      onClick={() => (handleAgeClick(item, i))}
                      className={`${ageSelectIndex == i ? 'bg-selectedBGPrimaryColor' : ''} last:border border-t-[0.5px] border-l-[0.5px] border-b-[0.5px]  py-2 w-full cursor-pointer`}>
                      {item?.range}
                    </div>)
                  })
                }
        </div>
    )
}