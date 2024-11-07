'use client'
import { notify } from "@/(layout)/v1/ToasterComponent";
import { errors_message } from "@/constants/errors_constants";
import { actResendOTP } from "@/services/actions/user.actions";
import { getAccessTokenObj } from "@/services/helpers/init.helper";
import React, { useEffect, useRef, useState } from "react";

export default function OTPBox ({ value, onChangeOTP,OTPPayload }:any) {
    const [focusedIndex, setFocusedIndex] = useState<any>(0);   
      useEffect(()=> {        
            const focusElement = document.getElementById(`input-${focusedIndex}`) 
            focusElement?.focus()        
      },[focusedIndex])

    const handleKeyPress=(e:any)=>{     
          if(e.key=='Backspace'){        
            setFocusedIndex((prevIndex:any) => (prevIndex - 1))                  
        } 
    }
    const handleResendOTP =async () =>{
        let payload = {
            mobileno:OTPPayload
        }
        let response = await actResendOTP(payload, getAccessTokenObj())
        if(response.isSuccessful){
            notify(errors_message.OTP_HAS_BEEN_SENT_TO_YOUR_MOBILE_NUMBER, 'success');
        } else {
            notify(response.result.reason, 'error');
        }
    }
    return (
        <>
        <div className="justify-center">
            <p className="text-left select-none text-xs mt-2 opacity-70">Enter OTP <span className="text-rose-700 text-sm">*</span></p>         
            <div className="flex my-2 gap-2">        
            {[...Array(6)].map((_, index) => (
                <input
                id={`input-${index}`}
                key={index}
                type="password"
                maxLength= {1}
                onChange={(e:any)=>{
                    const inputValue = e.target.value;
                    if (/[^0-9]/.test(inputValue)) return;
                    onChangeOTP(index, inputValue);   
                    setFocusedIndex((prevIndex:any) => (prevIndex+1));
                }}
                value={value[index] || ''}                 
                className="flex w-1/2 sm:w-1/2 md:w-10 lg:w-12 h-10 text-2xl border border-gray-300 rounded-sm text-center bg-zinc-900"
                onKeyDown={handleKeyPress}
                />
            ))}
            </div>
            <div className="text-zinc-600 py-2">
                <p className="select-none text-center text-sm">
                    Didnt receive OTP? <span className="text-sm text-white cursor-pointer" onClick={handleResendOTP}>Resend</span>
                </p>
            </div>
            <div className="text-zinc-600">
                <p className="italic text-xs select-none">Incase you are not receiving OTP, please login/sign up using your email address</p>
            </div>            
        </div> 

        </>
    );
}
