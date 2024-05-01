/* eslint-disable no-unused-vars */
import * as firebase from 'firebase/app';
// import 'firebase/firestore';

import { getFirestore } from "firebase/firestore";
import { serverTimestamp } from 'firebase/firestore'
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDKhoHLOheVZz3aTUqTaETma7GyzeVQxtk",
    authDomain: "fireblogs-5f09f.firebaseapp.com",
    projectId: "fireblogs-5f09f",
    storageBucket: "fireblogs-5f09f.appspot.com",
    messagingSenderId: "21421630975",
    appId: "1:21421630975:web:694ddc3c7e999736f0b3ca"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig)
  const auth = getAuth(firebaseApp);
  const db = getFirestore(firebaseApp);
  const timestamp = serverTimestamp();

  export {timestamp,auth,db}
  export default firebaseApp.firestore;