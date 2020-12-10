<template>
<div>
  <q-banner
    v-if="form_data.error"
    class="q-mb-md bg-warning text-center"
    >
    {{form_data.error}}
  </q-banner>
  <q-form @submit="submit_form">
    <q-input
    outlined
    label="name"
    v-model="form_data.name"
    class="q-mb-md"
    required
    />
  <q-input
    v-if="tab=='register'"
    outlined
    label="email"
    type="email"
    class="q-mb-md"
    v-model="form_data.email"
    required
    />
    <q-input
    v-if="tab=='register'"
    outlined
    label="phone"
    type="phone"
    class="q-mb-md"
    v-model="form_data.phone"
    required
    />
    <q-input
    outlined
    type="password"
    label="password"
    class="q-mb-md"
    v-model="form_data.password"
    required
    />
    <div class="row">
      <q-space />
        <q-btn
        type="submit"
        color="primary"
        :label="tab"

        />
    </div>
  </q-form>
</div>
</template>

<script>
const NAME = 'user_name';
const PHONE = 'user_phone';
const ID = 'user_id';
const USER_TYPE = 'user_type';
const EMAIL = 'user_email';

import { mapActions } from 'vuex'
import { mapGetters } from 'vuex'
export default {
computed: {
    ...mapGetters('store', ['errors'])
  },
props:['tab'],
data(){
  return{
    form_data:{
      name:'',
      email:'',
      password:'',
      phone: '',
      error:''
    }
  }
},
methods:{
  ...mapActions('store', ['registerUser', 'loginUser']),
  submit_form(){

    if(this.tab == 'login'){
      fetch("http://127.0.0.1:8000/api/login", {
         method: "POST",
         body: JSON.stringify({
           name: this.form_data.name,
           password: this.form_data.password
         }),
         headers: {
           "Content-type": "application/json"
            }
         })
        .then(res => res.json())
        .then(res => {
          // console.log(localStorage.getItem(NAME))
          // console.log(res)
          if(res.success && res.user_type == "0"){
            localStorage.setItem(NAME, res.name)
            localStorage.setItem(PHONE, res.phone)
            localStorage.setItem(EMAIL, res.email)
            localStorage.setItem(ID, res.id)
            localStorage.setItem(USER_TYPE, res.user_type)
            window.location.reload()
            this.$router.push('/patient')
          }
            else if(res.success && res.user_type == "1"){
            localStorage.setItem(NAME, res.name)
            localStorage.setItem(USER_TYPE, res.user_type)
            localStorage.setItem(PHONE, res.phone)
            localStorage.setItem(EMAIL, res.email)
            localStorage.setItem(ID, res.id)
            window.location.reload()
            this.$router.push('/admin')
          }
          else{
             this.form_data.error = res.error
          }
        })
    }
    else{
      fetch("http://127.0.0.1:8000/api/reg", {
         method: "POST",
         body: JSON.stringify({
           name: this.form_data.name,
           password: this.form_data.password,
           email: this.form_data.email,
           phone: this.form_data.phone
         }),
         headers: {
           "Content-type": "application/json"
            }
         })
        .then(res => res.json())
        .then(res => {
          console.log(res)
          if(res.success){
            this.form_data.error = "Please check registerd email(spam and inbox) for activation link to activate account"

        //      fetch("http://127.0.0.1:8000/api/mail", {
        //      method: "POST",
        //      body: JSON.stringify({
        //        name: 'ssa',
        //        email: 'noblesam3805@gmail.com'
        //      }),
        //      headers: {
        //        "Content-type": "application/json"
        //         }
        //      })
        //       .then(res => res.json())
        //       .then(res => {
        //       console.log(res)
        //       if(res.mail){
        //         this.form_data.error = "email for activation sent"
        //       }
        //       else{
        //          this.form_data.error = "error sending mail"
        //       }
        // })

     }
          else{
             this.form_data.error = res.error
          }
        })

    }
  }
}
}
</script>

<style lang="stylus">

</style>
