<template>
  <q-page class="flex flex-center">
    <img style="width:100%; margin-top:-18%;"
      alt="Quasar logo"
      src="~assets/banner.jpg"
    >

<div class="q-pa-md">

    <div class="q-gutter-md row items-start">

      <!-- notice "basic" prop (which disables default animation) -->
      <q-img v-for="product in products" :key="product.id"
        :src="product.image1"
        style="width: 155px"
        :ratio="1"
        basic
        spinner-color="white"
        class="rounded-borders"
        @click="orderProduct(product)"
      >
        <div class="absolute-bottom text-center text-italic text-body2">
          {{product.name}}
        </div>
        <div class="text-italic text-body2">
         N{{product.price}}
        </div>
      </q-img>
    </div>
</div>
<q-dialog v-model="v_product">
  <q-card >

  <q-card-section class="row">
         <div class="text-h6">Order Product</div>
          <q-space/>
          <q-btn
          v-close-popup
          icon="close" />
    <q-banner
    v-if="msg"
    class="q-mb-md bg-green-4 text-center"
    @click="msg = ''"
    >
    {{msg}}
    </q-banner>
  </q-card-section>
  <div>
        <div class="q-pl-md text-bold text-body2">
          N{{o_p_price * qty}}
        </div>
         <div class="q-pl-md q-mb-md text-bold text-body2">
          <q-input v-model="qty" type="number" label="quantity" class="q-pr-md"/>
        </div>
        <q-btn label="order" color="primary" class="q-ml-md"
        @click="order(o_p_model,o_p_name)"/>

    <q-carousel
      style="width:300px;"
      class="q-pa-md"
      animated
      v-model="slide"
      arrows
      navigation
      infinite
    >
      <q-carousel-slide :name="1" :img-src="o_p_img_one" />
      <q-carousel-slide :name="2" :img-src="o_p_img_two" />
      <q-carousel-slide :name="3" :img-src="o_p_img_three" />
      <q-carousel-slide :name="4" :img-src="o_p_img_four" />
      <q-carousel-slide :name="5" :img-src="o_p_img_five" />
    </q-carousel>
        <div class="q-pl-md text-body2">
          <b>Product Name : </b>{{o_p_name}}
        </div>
         <div class="q-pl-md text-body2">
          <b>Product Model :</b> {{o_p_model}}
        </div>
         <div class="q-pl-md q-pb-md text-body2">
          <b>Product Description :</b> {{o_p_desc}}
        </div>
  </div>
  </q-card>
  </q-dialog>
  </q-page>

</template>

<script>
const NAME = 'user_name';
const ID = 'user_id';
const PHONE = 'user_phone';
export default {
  name: 'PageIndex',
  data(){
    return{
      products : [{}],
      slide : 1,
      v_product : false,
      o_p_img_one : '',
      qty : '1',
      o_p_img_two : '',
      o_p_img_three : '',
      o_p_img_four : '',
      o_p_img_five : '',
      o_p_desc : '',
      o_p_name : '',
      o_p_price : '',
      o_p_model : '',
      o_p_id : '',
      msg : ''
    }
  },
mounted(){
  this.getProducts();
},
methods:{
  orderProduct(product){
    console.log(product.id)
    this.v_product = true
      this.o_p_img_one = product.image1
      this.o_p_img_two = product.image2
      this.o_p_img_three = product.image3
      this.o_p_img_four = product.image4
      this.o_p_img_five = product.image5
      this.o_p_desc  = product.description
      this.o_p_name  = product.name
      this.o_p_price  = product.price
      this.o_p_model  = product.c_model
      this.o_p_id = product.id
  },
  order(o_p_model,o_p_name){
    fetch("http://127.0.0.1:8000/api/order", {
         method: "POST",
         body: JSON.stringify({
           user_id:     localStorage.getItem(ID),
           user_name:   localStorage.getItem(NAME),
           user_phone:  localStorage.getItem(PHONE),
           p_name:      this.o_p_name,
           p_qty:       this.qty,
           p_model:     this.o_p_model,
           p_price:     this.o_p_price,
           p_desc:      this.o_p_desc,
         }),
         headers: {
           "Content-type": "application/json",
           'Accept': 'application/json'
            }
         })
        .then(res => res.text())
        .then(text => {
          console.log(text)
          this.qty= '',
          this.msg = 'Order successfully made, You will be contacted shortly'
          // this.fetchAppointment();
        })
         .catch(err => console.log(err));
  },
  toUsers(){
    this.$router.push('/users')
  },
  toDocs(){
    this.$router.push('/doc')
  },
  getProducts(){
    fetch("http://127.0.0.1:8000/api/products")
    .then(res => res.json())
    .then(res => {
       this.products = res.data
      console.log(res.data)
    })
  },
},
}
</script>
