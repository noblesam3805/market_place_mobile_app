<template>
  <q-page class="flex q-pa-md">
    <q-card class="full-width">
      <q-tabs
      dense
      v-model="tab"
      class="text-grey"
      align="justify"
      active-color="primary"
      indicator-color="primary"
      narrow-indicator
      >
      <q-tab name="login" label="login" />
      <q-tab name="register" label="register" />
      </q-tabs>
      <q-separator />
      <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="login">
        <login :tab="tab"/>
      </q-tab-panel>

      <q-tab-panel name="register">
        <login :tab="tab"/>
      </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
  data(){
    return{
      tab:'login'
    }
  },
  components:{
    'login': require('components/login.vue').default
  }
}
</script>
