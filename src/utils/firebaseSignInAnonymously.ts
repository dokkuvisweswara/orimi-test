import "firebase/database";
import { getAuth, onAuthStateChanged, signInAnonymously } from "firebase/auth";
import { CLIENT_KEY } from '@/constants/v1/constants';
import db  from '@/libs/firebase'
import { ref, update, remove } from "firebase/database";

export async function firebaseAnonymousLogin(subscribeID: any) {
    return new Promise<any>((resolve, reject) => {
        const auth = getAuth();
        signInAnonymously(auth)
          .then((dataset) => {
           onAuthStateChanged(auth, (user) => {
              if (user) {
                let secretKey = CLIENT_KEY;
                const obj: any = {};
                secretKey = secretKey.substring(0, secretKey.length - 3);
                let path = `/${secretKey}`;
                obj[user.uid] = subscribeID;
                const dbRef = ref(db, path)
                update(dbRef, obj).then(() => {
                    localStorage.setItem('uid', user.uid);
                    resolve('sucess')
                }).catch((e) => {
                    reject(e)
                })
              } else {
               reject("User is signed out")

              }
            });
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ...
          });

    })


  }
 
  export async function firebaseRemoveUser() {
    let secretKey = CLIENT_KEY;
    const uid = localStorage.getItem('uid');
    secretKey = secretKey.substring(0, secretKey.length - 3);
    let path = `/${secretKey}/${uid}`;
    const dbRef: any = ref(db, path);

    return remove(dbRef);
  }
 