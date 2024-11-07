"use client";
import { useRouter } from 'next/navigation';
import { useState, useEffect } from "react";
import OpenEye from "../../../public/open-eye.svg";
import CloseEye from "../../../public/close-eye.svg";
import Image from "next/image";
import CountryDropDown from "@/components/v1/countryCodeDropDown";
import { actGetCurrentLanguage } from '@/utils/accessCurrentLang';
import { getDictionary } from '@/i18n/dictionaries';

export default function PrimaryTextInput(props:any) {
  const payload = props.textPayload;

  const router = useRouter();
  const [lang, setLang] = useState<any>(null);
  const [isFocused, setIsFocused] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [useTxtType, setUseTxtType] = useState("text");

  const [isnumber, setIsNumber] = useState(false);

  const [inputVal, setInpulVal] = useState(payload.val?payload.val:"");   
 
  useEffect(() => {
    getCurrentLang();
   
     }, [lang]);  // eslint-disable-line react-hooks/exhaustive-deps
  const emailmobileChange = () => {
    setInpulVal('')
    props.changeBtnCallBack(null);
  };

  const actEnbledIcon = () => {
    if (!showPassword) {
      setShowPassword(true);
      setUseTxtType("text");
    } else {
      setShowPassword(false);
      setUseTxtType("password");
    }
  };

  const actGetTextValue = (e:any) => {
    actNumber(e.target.value);
    setInpulVal(e.target.value);
    props.callbackText(e.target.value);
  };

  const actNumber = (val:any) => {
    if(val==''){
      setIsNumber(false);
    } else if (!isNaN(val))
    {
      setTimeout(() => {
        setIsNumber(true);
      }, 500);      
    } else
    setIsNumber(false);
  }

  useEffect(() => {
    setUseTxtType(payload.type);
    isnumber
  }, [isnumber]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setInpulVal(props.test);
    // setInpulVal(payload.val)
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleCountryCode = (data:any)=>{     
    props.callBackCountryCode(data)
  }
  const getCurrentLang = async () => {
    let langSelected: any = await actGetCurrentLanguage()
     const language = await getDictionary(langSelected);
     setLang(language);
   }
  return (
    <>
      <div className="relative mt-4 flex items-center">
      { (isnumber && payload.type != "password" && payload.usedKey != "name") ? <CountryDropDown countryCode={handleCountryCode} /> : ""}
        <input
          id={payload.usedKey}
          onChange={actGetTextValue}
          type={useTxtType}
          value={inputVal || payload.val}
          name={payload.usedKey}
          placeholder={payload.placeholder}
          disabled={props.isDisabledPart !== 'active' && payload.val != "" && payload.usedKey == "emailmobile"}
          className={` ${isnumber && payload.type != "password" && payload.usedKey != "name" ? "w-10/12 ml-4" : "w-full"} relative h-10 text-sm placeholder-transparent transition-all border-b-2 outline-none my-2
          focus-visible:outline-none peer border-rose-200 text-gray-200 bg-transparent autofill:autofill-custom-style autofill:bg-transparent invalid:border-selectedBGPrimaryColor invalid:text-selectedBGPrimaryColor focus:border-[#BA0B5D] 
          focus:outline-none invalid:focus:border-selectedBGPrimaryColor disabled:cursor-not-allowed disabled:transparent disabled:text-secondaryItemColor`}
        />
        <label
          htmlFor={payload.usedKey}
          className="cursor-text peer-focus:cursor-default peer-autofill:-top-2 absolute left-0 -top-2 z-[1]
          text-xs text-slate-200 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full 
          before:w-full before:bg-transparent before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm 
          peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-invalid:text-pink-500 peer-focus:-top-2 
          peer-focus:text-xs peer-focus:text-gray-500 peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed
          peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
        >
          {payload.placeholder} <span className="text-rose-800">*</span>
        </label>

        {props.isDisabledPart !== 'active' && payload.val != "" && payload.usedKey == "emailmobile" && (
          <button
            onClick={() => emailmobileChange()}
            className="absolute top-0.5 right-0 cursor-pointer stroke-pink-400 text-rose-200 text-xs bg-transparent p-1 my-2 h-7 hover:text-rose-400"
          >
            <span className="">{lang?.change}</span>
          </button>
        )}

        {payload.type == "password" &&
          (showPassword ? (
            <Image
              src={OpenEye}
              alt="Open Eye"
              className="absolute top-3 right-0 h-5 w-5 cursor-pointer stroke-secondaryItemColor peer-disabled:cursor-not-allowed"
              onClick={() => actEnbledIcon()}
            ></Image>
          ) : (
            <Image
              src={CloseEye}
              alt="Close Eye"
              className="absolute top-3 right-0 h-5 w-5 cursor-pointer stroke-secondaryItemColor  peer-disabled:cursor-not-allowed"
              onClick={() => actEnbledIcon()}
            ></Image>
          ))}

                {/* <div>
                    <div>
                        <input type="text" />
                        <div>
                            <div>1</div>
                            <div>1</div>
                            <div>1</div>
                            <div>1</div>
                            <div>1</div>
                        </div>
                    </div>                    
                </div> */}
      </div>
    </>
  );
}
