import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from './firebase/firebaseInit'
// import * as firebaser from 'firebase/app';
import { auth } from "./firebase/firebaseInit";
import {onAuthStateChanged} from 'firebase/auth';
import Vuelidate from '@vuelidate/core'

// import 'firebase/auth';
// const cors = require('cors');
// const corsOptions ={
//     origin:'http://localhost:8080', 
//     credentials:true,            //access-control-allow-credentials:true
//     optionSuccessStatus:200
// }

let app;

onAuthStateChanged(auth,()=>{
    if(!app){
        createApp(App).use(store).use(router).use(firebase).use(Vuelidate).mount('#app')
    }
})


