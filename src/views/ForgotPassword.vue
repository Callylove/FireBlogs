<template>
<div class="reset-password">
    <Nav/>
  <Modal v-if="modalActive" :modalMessage="modalMessage" v-on:close-modal="closeModal"/>
  <Loading v-if="loading" />

  <div class="form-wrap">
    <form class="reset">
        <p class="login-register">
            Back to  <router-link class="router-link" :to="{name:'Login'}">
                Login
            </router-link>
        </p>
        <h2>Reset Password</h2>
        <p>Forgot your password? Enter your email to reset</p>
        <div class="inputs">
            <div class="input">
                <input type="text" placeholder="Email" v-model="email" />
                <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="envelope" class="svg-inline--fa fa-envelope fa-w-16 icon" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M464 64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zm0 48v40.805c-22.422 18.259-58.168 46.651-134.587 106.49-16.841 13.247-50.201 45.072-73.413 44.701-23.208.375-56.579-31.459-73.413-44.701C106.18 199.465 70.425 171.067 48 152.805V112h416zM48 400V214.398c22.914 18.251 55.409 43.862 104.938 82.646 21.857 17.205 60.134 55.186 103.062 54.955 42.717.231 80.509-37.199 103.053-54.947 49.528-38.783 82.032-64.401 104.947-82.653V400H48z"></path></svg>
            </div>
        </div>
        <button @click.prevent="resetPassword">Reset</button>
        <div class="angle"></div>
    </form>
    <div class="background"></div>
  </div>
  </div>
</template>

<script>
import Nav from '../components/Nav.vue'
import Modal from '../components/Modal.vue'
import Loading from '../components/Loading.vue'
import { sendPasswordResetEmail} from 'firebase/auth';
import { auth } from "../firebase/firebaseInit";
export default {
name:'ForgotPassword',
data(){
  return{
    email:"",
    modalMessage:"",
    modalActive:false,
    loading:null,
  }
},
components: {
  Modal,
  Loading,
  Nav
},
methods: {
  closeModal(){
    this.modalActive = !this.modalActive;
    this.email="";
  },
  resetPassword(){
    this.loading=true;
    sendPasswordResetEmail(auth,this.email)
    .then(()=>{
      this.modalMessage="If your account exists, you will receive an email";
      this.loading=false;
      this.modalActive=true;
    }).catch(err=>{
      this.modalMessage=err.message;
      this.loading=false;
      this.modalActive=true;
    })
  }
}
}
</script>

<style lang="scss" scoped>
.reset-password{
  position: relative;
  .form-wrap{
    .reset{
      h2{
        margin-bottom: 8px;
      }
      p{
        text-align: center;
        margin-bottom: 32px;
      }
    }
  }
}
</style>