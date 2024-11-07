import { getCookie } from "@/hooks/client.cookie";
import { useEffect, useState } from "react";
export default function RadioButton({ callbackRadio }:any) {
    const [selectedOption, setSelectedOption] = useState('password')
    const [countryCode, setCountryCode] = useState<any>('')

    const onValueChange = (e:any) => {
        setSelectedOption(e.target.value)        
    }

    useEffect(() => {
      let country = getCookie('currentCountry');
      setCountryCode(country)
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
    useEffect(() => {
        callbackRadio(selectedOption);
    }, [selectedOption]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
        
            <fieldset className="flex gap-4">                
                <div className="relative flex items-center">
                  <input
                    className="w-4 h-4 transition-colors bg-transparent border-2 rounded-full appearance-none cursor-pointer peer border-white checked:border-slate-200 checked:bg-transparent checked:hover:border-slate-600 checked:hover:bg-white focus:outline-none checked:focus:border-slate-200 checked:focus:bg-transparent focus-visible:outline-none disabled:cursor-not-allowed disabled:border-slate-100 disabled:bg-slate-50"
                    type="radio"
                    value="password"
                    id="password"
                    name="passwordOTP"
                    checked={selectedOption == 'password'}
                    onChange={onValueChange}
                  />
                  <label
                    className="pl-1 text-sm cursor-pointer text-slate-200 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <svg
                    className="absolute left-0 w-4 h-4 transition-all duration-300 scale-50 opacity-0 pointer-events-none fill-white peer-checked:scale-100 peer-checked:opacity-100 peer-disabled:cursor-not-allowed"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-labelledby="title-1 description-1"
                    role="graphics-symbol"
                  >
                    <circle cx="8" cy="8" r="4" />
                  </svg>
                </div>
             <div className="relative flex items-center">
                  <input
                    className="w-4 h-4 transition-colors bg-transparent border-2 rounded-full appearance-none cursor-pointer peer border-white checked:border-slate-200 checked:bg-transparent checked:hover:border-slate-600 checked:hover:bg-white focus:outline-none checked:focus:border-slate-200 checked:focus:bg-transparent focus-visible:outline-none disabled:cursor-not-allowed disabled:border-slate-100 disabled:bg-slate-50"
                    type="radio"
                    value="otp"
                    id="otp"
                    name="passwordOTP"
                    checked={selectedOption == 'otp'}
                    onChange={onValueChange}
                  />
                  <label
                    className="pl-1 text-sm cursor-pointer text-slate-200 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400"
                    htmlFor="otp"
                  >
                    OTP
                  </label>
                  <svg
                    className="absolute left-0 w-4 h-4 transition-all duration-300 scale-50 opacity-0 pointer-events-none fill-white peer-checked:scale-100 peer-checked:opacity-100 peer-disabled:cursor-not-allowed"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-labelledby="title-2 description-2"
                    role="graphics-symbol"
                  >
                    <circle cx="8" cy="8" r="4" />
                  </svg>
                </div>
            </fieldset>
        </>
    );
}