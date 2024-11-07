'use client'
import React, { useState, useEffect } from 'react';
import { setCookie, getCookie, removeCookie } from '@/hooks/client.cookie';
import { actGetDeviceToken, actGetRefreshToken, fetchgGenresList, getcountry } from '@/services/actions/init.action'
import { useStorePlayer, useStoreUser } from '@/store/init';
import { decodeJWT } from '@/utils/auth';
import  { actGetAvailability }  from "@/services/actions/player.action"
import { SET_DEVICE_TOKEN} from '@/constants/appConfig';
import { getAccessTokenObj } from '@/services/helpers/init.helper';
import { logoutUtil } from '@/utils/logout';
import { fetchCountryCode } from '@/services/actions/login.action';
import { DEFAULT_LANGUAGE_SETUP } from '@/constants/v1/constants';

let INTERVALTRACKER: any = "";

export const actSaveToken = ({ success, refreshtoken }: any) => {
  let sessionTokenInfo = decodeJWT(success);
  let refreshtokenInfo = decodeJWT(refreshtoken);
  removeCookie('sessionToken');
  removeCookie('refreshToken');
  setCookie('sessionToken', success, sessionTokenInfo.exp);
  setCookie('refreshToken', refreshtoken, refreshtokenInfo.exp);
}

export const actSaveDeviceToken = (deviceToken: string) => {
  if (!deviceToken) {
    return;
  }
  let deviceTokenInfo = decodeJWT(deviceToken);
  removeCookie('deviceToken');
  
  setCookie('deviceToken', deviceToken, deviceTokenInfo.exp);
  SET_DEVICE_TOKEN(deviceToken)
}
const getTimerDeviceToken = async () => {
  let sessionToken = getCookie('sessionToken');
  let refreshToken = getCookie('refreshToken');
  let currentTime = new Date();
  if (refreshToken && sessionToken) {
    let sessionTokenTokenInfo = decodeJWT(sessionToken);
    if ((new Date(((sessionTokenTokenInfo.exp * 1000) - 120000))) < currentTime) {
       let refreshTokenRes = await actGetRefreshToken(getAccessTokenObj('REFRESH'));
        if (refreshTokenRes.isSuccessful) {
          actSaveToken(refreshTokenRes.result)
        } else {
          logoutUtil()
        }
    }

  } else {
    let deviceToken = getCookie('deviceToken');
    let deviceTokenInfo = deviceToken && decodeJWT(deviceToken);
    if (!deviceToken  || deviceToken == 'undefined' || deviceToken == 'null' || (new Date(((deviceTokenInfo.exp * 1000) - 120000))) < currentTime) {
      let deviceToken = await actGetDeviceToken();
      actSaveDeviceToken(deviceToken);  
   }
  }


}
const actGetAvailabilityFunc =  () => {
  let payload = { page: 1, pagesize: 15 };
  let token = getAccessTokenObj();
    if (!token) return
  actGetAvailability(payload, token).then((avaibility) =>  { 
    if (avaibility) {
      localStorage.setItem('availabilities', JSON.stringify(avaibility))
    }
  });
}

export default function AuthToken({ config }:any) {
  const setIsUserPresent = useStoreUser((state: any) => state.setIsUserPresent);
  const setAvaibility = useStorePlayer((state: any) => state.setAvaibility);
  useEffect(() => {
    if (getCookie('sessionToken')) {
      setIsUserPresent(true)
    }
  },[setIsUserPresent])

  useEffect(() => {
    if(!getCookie("currentCountry")){
     actGetDeviceToken().then((deviceToken) => {
      let header: any = {};
      header["Authorization"] = `Bearer ${deviceToken}`;
      getcountry(header).then((currentCountry) => {
        if (currentCountry) {
          setCookie('currentCountry', currentCountry, null)
        } else {
          setCookie('currentCountry', 'MN', null)
        }
      })
     })
    }
  },[])
 
  useEffect( () => {
    if (!getCookie('localeLangauge')) {
      setCookie('localeLangauge', DEFAULT_LANGUAGE_SETUP, null);
    }


    INTERVALTRACKER = setInterval(getTimerDeviceToken, 50000);

    localStorage.setItem('primary-config', JSON.stringify(config));

    setTimeout(() => {
        actGetAvailabilityFunc();
    }, 5000)
   

     fetchCountryCode().then((country:any) => {
      localStorage.setItem('countryCode',JSON.stringify(country))
     })

     fetchgGenresList().then((generes: any)=> {
      if (generes.result)
        localStorage.setItem('genreList',JSON.stringify(generes.result))
     })
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  
  return (<> </>)
}
