<template>
  <q-pull-to-refresh @refresh="refresher">
  <q-page class="flex flex-center">
    <img style="width:100%; margin-top:-18%;"
      alt="Quasar logo"
      src="~assets/banner.jpg"
    >

  <div class="flex flex-center" style="width:40%; background-color:#fff; border: 1px solid gray;
   margin: -56% 10px 0 0; border-radius:5%;">
    <img style="width:60%; margin-top:; padding: 5%;"
      alt=""
      src="~assets/faq.png"
    >
    <span>Frequent questions</span>
    </div>
  <div
  @click="toUsers()"
  class="flex flex-center" style="width:40%; background-color:#fff; border: 1px solid gray;
   margin: -56% 0 0 0px; border-radius:5%;">
     <img style="width:60%; margin-top:; padding: 5%;"
      alt=""
      src="~assets/test.png"
    >
     Meet a user</div>
  <div class="flex flex-center" style="width:40%; border: 1px solid gray; margin:-60% 10px 0 0; border-radius:5%;">
     <img style="width:60%; margin-top:; padding: 5%;"
      alt=""
      src="~assets/set.png"
    >
    Account settings</div>
  <div
  @click="toDocs()"
  class="flex flex-center" style="width:40%; border: 1px solid gray; margin-top:-60%; border-radius:5%;">
     <img style="width:60%; margin-top:; padding: 5%;"
      alt=""
      src="~assets/chat.png"
    >
    Meet a specialist</div>
  </q-page>
  </q-pull-to-refresh>

</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'PageIndex',
mounted(){
  this.getOrders();
},
methods:{
  ...mapActions('store', ['getOrders']),
  toUsers(){
    this.$router.push('/users')
  },
  toDocs(){
    this.$router.push('/doc')
  },
  refresher (done) {
    setTimeout(() => {
      done()
        window.location.reload()
      }, 1000)
  },
},
}
</script>
