
import { actFireAnalytics } from "@/libs/firebase";
import { getPlatform } from "./analyticsFunction";
const { detect } = require('detect-browser');
const browser = detect() 
import {logEvent} from "firebase/analytics"; 

export function signUpEvent(data:any){
    data.platform_type = browser.name;
    data.platform = getPlatform();
    actFireAnalytics && logEvent(actFireAnalytics(),'sign_up',data)
}

export const searchedEvent = (data:any)=>{
    let analyticsData = data;   
    actFireAnalytics && logEvent(actFireAnalytics(),'searched',analyticsData);
}

export const logInEvent = (data:any) =>{
    data.platform_type = browser.name;
    data.platform = getPlatform();
    actFireAnalytics && logEvent(actFireAnalytics(),'login',data);
}

export const createProfileEvent = (data:any) =>{
    let analyticsData = data;
    actFireAnalytics && logEvent(actFireAnalytics(),'create_profile', analyticsData)
}

export const switchProfileEvent = (data:any) =>{
    let analyticsData = data;
    actFireAnalytics && logEvent(actFireAnalytics(),'switch_profile', analyticsData)
}

export const logOutEvent = (data:any) =>{
    let analyticsData = data;   
    actFireAnalytics && logEvent(actFireAnalytics(),'logout', analyticsData)
}

export const deleteProfileEvent = (data:any) =>{
    let analyticsData = data;
    actFireAnalytics && logEvent(actFireAnalytics(),'delete_profile', analyticsData)
}

export const actionEvent = (data:any) =>{
    let analyticsData = data;
    actFireAnalytics && logEvent(actFireAnalytics(),'action', analyticsData)
}

export const playedEvent = (data:any)=>{
    let analyticsData = data;
    actFireAnalytics && logEvent(actFireAnalytics(),'played', analyticsData)
}