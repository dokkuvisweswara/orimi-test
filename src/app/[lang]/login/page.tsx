'use client'
import LongInPage from '@/components/v1/login';
import LookUpPage from '@/components/v1/lookup';
import SignUpPage from '@/components/v1/signup'
import { useEffect, useState } from 'react';
import Modal from "@/components/v1/modelbox";
import { actGetCurrentLanguage } from '@/utils/accessCurrentLang';
import { getDictionary } from '@/i18n/dictionaries';

export default function Login() {
    const [userExit, setUserExit] = useState(null);
    const [userEnterValue, setUserEnteredValue] = useState(null)
    
    const[showModal, setShowModal] = useState(true);

    const [lang, setLang] = useState<any>(null);

    const[emailPayloadLookup, setEmailPayloadLookup] = useState<any>(null);
    const [loginBy, setLoginBy] = useState<string | null>(null);
   

    useEffect(() => {
      
      
     getCurrentLang();
     let payload =   
     {
        placeholder: lang?.email_mobile,
        type: "text",
        usedKey: "emailmobile",
        val: "",
      }
      setEmailPayloadLookup(payload);
    
      }, [lang]);
    function actUserExit(status: any, userinput: any, loginBy: any, countryCode:any) {
        setUserExit(status);
        if(loginBy=='email'){
            setUserEnteredValue(userinput)
            setEmailPayloadLookup( {
                placeholder: lang?.email_mobile,
                type: "text",
                usedKey: "emailmobile",
                val: userinput, 
                loginBy:loginBy           
              });
        }else if(loginBy=='mobile'){
            setUserEnteredValue(countryCode+userinput);
            setEmailPayloadLookup( {
                placeholder:lang?.email_mobile,
                type: "text",
                usedKey: "emailmobile",
                val: userinput, 
                loginBy:loginBy           
              });
        }
        setLoginBy(loginBy);                                                              
    }

    const modalClose = async () => {
        setShowModal(false);
    }

    const changeBtnCallBackLogin = (data:any) => {    
        setUserExit(null); 
        setEmailPayloadLookup( {
            placeholder: lang?.email_mobile,
            type: "text",
            usedKey: "emailmobile",
            val: "",                      
          });      
    }
    const actGetEmailAfterSignup = (data: any,loginBy:any, typeofProcess: any) => {       
        setEmailPayloadLookup( {
            placeholder: lang?.email_mobile,
            type: "text",
            usedKey: "emailmobile",
            val: data, 
            loginBy:loginBy,
            typeofProcess: typeofProcess          
          });
        //   setUserEnteredValue(data)
        setUserExit(null);         
    }
        const getCurrentLang = async () => {
         let langSelected: any = await actGetCurrentLanguage()
          const language = await getDictionary(langSelected);
          setLang(language);
        }
    return (
        <div>
            <title>Login</title>
            <Modal isVisible={showModal}
            onClose={() => modalClose()}
            AllClass={"w-[90%] sm:w-[70%] md:w-[50%] lg:w-[35%] xl:w-[30%] mx-[5%] sm:mx-[15%] md:mx-[25%] lg:mx-[32.5%] xl:mx-[35%] absolute my-[15%] sm:my-[15%] md:my-[10%] lg:my-[5%]"}
            >
                { (userExit == null && emailPayloadLookup?.placeholder) &&  <LookUpPage lang={lang}  actGetUserExits={actUserExit} emailPayloadLookup={emailPayloadLookup} loginBy={loginBy} changeBtnCallBackLogin={changeBtnCallBackLogin}/>}
                
                { userExit == true && (<LongInPage lang={lang} userinput={userEnterValue}  loginBy={loginBy} changeBtnCallBackLogin={changeBtnCallBackLogin} />) }

                { userExit == false && (<SignUpPage lang={lang} userinput={userEnterValue} getEmailIdCB={actGetEmailAfterSignup}  loginBy={loginBy}  emailPayloadLookup={emailPayloadLookup} changeBtnCallBackLogin={changeBtnCallBackLogin}/>) }
            </Modal>
        </div>
    )
}