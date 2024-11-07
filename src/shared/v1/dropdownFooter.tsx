"use client"
import React, { useEffect, useState } from "react"
import { getCookie, setCookie } from '@/hooks/client.cookie';
import { DEFAULT_LANGUAGE_SETUP } from "@/constants/v1/constants";

export default function DropdownBasic({lang}: any) {
  const [selectedLang, setSelectedLang] = useState<any>('');

  const langs = [{
    lang:"english",
    local:"en",
  },{
    lang:"mongolian",
    local:"mn"
  }]
   const getLang = (cb:any) => {
    setCookie('localeLangauge', cb.target.value, null);
    setTimeout(() => {
      (window as any).location.href = '/'

    }, 200)

   }
   useEffect(() => {
    setSelectedLang(getCookie('localeLangauge') || DEFAULT_LANGUAGE_SETUP)
   }, [])
  return (
    <>
      <select 
      onChange={getLang}
      className="bg-dropdownBgColor rounded focus:outline-none py-2 px-2 text-primaryItemColor cursor-pointer"> 
      {
        langs.map((i) => ( 
          <option key={i.local} value={i.local} selected={i.local == selectedLang}>{lang && lang[i.lang]}</option>
        ))
      }
      </select>
    </>
  )
}