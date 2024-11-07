//  import firebase from "firebase/compat/app";
import { ENV } from "@/constants/v1/constants";
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAnalytics} from "firebase/analytics";
import { getAuth } from "firebase/auth";

let firebaseConfig: any = {};
if (ENV === 'PROD') {
  
 firebaseConfig = {

    apiKey: "AIzaSyB64KzJH6HTFWRmqSHaZL_JIcNIeW4-K4k",

    authDomain: "ori-mi.firebaseapp.com",

    databaseURL: "https://ori-mi-default-rtdb.firebaseio.com",

    projectId: "ori-mi",

    storageBucket: "ori-mi.appspot.com",

    messagingSenderId: "316096270418",

    appId: "1:316096270418:web:867f5bf1a27de513c34f8b",

    measurementId: "G-FRLRKNTWJ4"

  };
} else {
   firebaseConfig = {

    apiKey: "AIzaSyBJzFZnoDjYSsqNjrnqtNrQi6n3HeJdrC8",

    authDomain: "orimedia-preprod.firebaseapp.com",

    databaseURL: "https://orimedia-preprod-default-rtdb.firebaseio.com",

    projectId: "orimedia-preprod",

    storageBucket: "orimedia-preprod.appspot.com",

    messagingSenderId: "455307967853",

    appId: "1:455307967853:web:1a1e2da2036cc4eb8fee64",

    measurementId: "G-077Z29BTF2"

  };
}

// Initialize Firebase

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

const db = getDatabase(app);
export default db

export const actFireAnalytics: any =   () => {  
  if (typeof window !== "undefined") {
    return  getAnalytics(app);
  } else {
  }
}