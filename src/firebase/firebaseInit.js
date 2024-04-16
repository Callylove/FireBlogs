/* eslint-disable no-unused-vars */
import firebase from 'firebase/app';
import 'firebase/firestore';
import { FirestoreError } from 'firebase/firestore';

var firebaseConfig = {
    apiKey: "AIzaSyDKhoHLOheVZz3aTUqTaETma7GyzeVQxtk",
    authDomain: "fireblogs-5f09f.firebaseapp.com",
    projectId: "fireblogs-5f09f",
    storageBucket: "fireblogs-5f09f.appspot.com",
    messagingSenderId: "21421630975",
    appId: "1:21421630975:web:694ddc3c7e999736f0b3ca"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig)
  const timestamp = firebase.firestore.FieldValue.serverTimestamp;

  export {timestamp}
  export default firebaseApp.firestore();