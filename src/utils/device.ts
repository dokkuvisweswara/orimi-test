import CryptoJS from "crypto-js";
let sha1 = require("sha1");
import { CLIENT_KEY, PRODIVER_ID, APP_VERSION} from '@/constants/v1/constants';

export const getDeviceOS = () => {
    let deviceOS = "";
   if (typeof window === 'undefined') {
    return "OTHER";
   }
    if (navigator.userAgent.indexOf("Win") != -1) {
      deviceOS = "WINDOWS";
    }
  
    if (navigator.userAgent.indexOf("Macintosh") != -1) {
      deviceOS = "MACOS";
    }
  
    if (navigator.userAgent.indexOf("Linux") != -1) {
      deviceOS = "LINUX";
    }
  
    if (navigator.userAgent.indexOf("like Mac") != -1) {
      deviceOS = "MACOS";
    }
  
    if (!deviceOS) {
      deviceOS = "OTHER";
    }
  
    return deviceOS;
 };
function Encrypt(deviceid: string, key: any) {
    var C = CryptoJS;
    var plainText = C.enc.Utf8.parse(deviceid);
    key = C.enc.Utf8.parse(key);
    var aes = C.algo.AES.createEncryptor(key, {
      mode: C.mode.ECB,
      padding: C.pad.Pkcs7,
      iv: key,
    });
    var encrypted: any = aes.finalize(plainText);
    encrypted = C.enc.Base64.stringify(encrypted);
    encrypted = encode_url(encrypted);
    return encrypted;
 }
function encode_url(data: string) {
    var data1 = data.replace(/\+/g, "-");
    data1 = data.replace(/\//g, "_");
    data1 = data.replace(/\=/g, ",");
    return data1;
 }
export function encryptDeviceInfo() {
    
    var uniqueId: any = "";
    if (typeof localStorage !== "undefined") {
      uniqueId = localStorage.getItem("random")
    }
    let newUniqueId = "";
    if (!uniqueId) {
      newUniqueId = Math.round(Math.random() * 1e16).toString();
      if (typeof localStorage !== "undefined") {
        localStorage.setItem("random", newUniqueId);
      }
    }
      let xyz = {
        deviceid: uniqueId ? uniqueId : newUniqueId,
        devicetype: "PC",
        deviceos: getDeviceOS(),
        providerid: PRODIVER_ID,
        timestamp: Math.floor((new Date()).getTime() / 1000),
        appversion : APP_VERSION
      };
  
      let res = {
        hash: sha1(JSON.stringify(xyz)),
        enc: Encrypt(JSON.stringify(xyz), CLIENT_KEY),
        providerid: PRODIVER_ID,
      };
      return res;
 }