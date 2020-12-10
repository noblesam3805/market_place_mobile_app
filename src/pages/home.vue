<template>
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
     Chat a user</div>

  <div
  @click="toDocs()"
  class="flex flex-center" style="width:40%; border: 1px solid gray; margin-top:-60%; border-radius:5%;">
     <img style="width:60%; margin-top:; padding: 5%;"
      alt=""
      src="~assets/chat.png"
    >
    Meet Admin</div>
  </q-page>

</template>

<script>
export default {
  name: 'PageIndex',

methods:{
  toUsers(){
    this.$router.push('/users')
  },
  toDocs(){
    this.$router.push('/doc')
  }
},
}
</script>
