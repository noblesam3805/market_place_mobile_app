<template>
<div>
  <q-banner
    v-if="errors.errors"
    class="q-mb-md bg-warning text-center"
    >
    {{errors.errors}}
  </q-banner>
  <q-form @submit="submit_form">
    <q-input
    v-if="tab=='register'"
    outlined
    label="name"
    v-model="form_data.name"
    class="q-mb-md"
    />
    <q-input
    outlined
    label="email"
    type="email"
    class="q-mb-md"
    v-model="form_data.email"
    />
    <q-input
    outlined
    type="password"
    label="password"
    class="q-mb-md"
    v-model="form_data.password"
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
      password:''
    }
  }
},
methods:{
  ...mapActions('store', ['registerUser', 'loginUser']),
  submit_form(){
    if(this.tab == 'login'){
      this.loginUser(this.form_data);
    }
    else{
      this.registerUser(this.form_data);
    }
  }
}
}
</script>

<style>

</style>
