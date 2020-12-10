<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn v-if="this.$route.path == '/'  || this.$route.path == '/home'
        || this.$route.path == '/admin'
        || this.$route.path == '/patient'"
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />
         <q-btn v-if="this.$route.params.otherUserId || this.$route.path == '/users'
         || this.$route.path == '/doc'"
          v-go-back.single
          flat
          dense
          round
          icon="arrow_back"
          aria-label="Back"

        />

        <q-toolbar-title class="absolute-center">
          {{title}}
        </q-toolbar-title>
          <!-- icon="account_circle" -->
        <q-btn style="padding-left:210px;"
          v-if="userDetails.userId"
          @click="logoutUser"
          class="absolute-right q-pr-sm"
          no-caps
          flat
          dense>
          Logout<br>
          {{ userDetails.name }}
        </q-btn>
         <q-btn style="padding-left:210px;"
          v-if="this.$route.path == '/doctor' || this.$route.path == '/admin'
          || this.$route.path == '/nurse' || this.$route.path == '/patient'"
          @click="logout()"
          to="/"
          class="absolute-right q-pr-sm"
          no-caps
          flat
          dense>
          Logout<br>
          {{u_name}}
        </q-btn>

        <q-btn style="padding-left:210px;"
          v-if="this.$route.path == '/'"
          to="/c_login"
          class="absolute-right q-pr-sm"
          no-caps
          flat
          dense>
          ask <br>
            question
        </q-btn>

      </q-toolbar>
    </q-header>

    <!-- <q-footer v-if="this.$route.path == '/admin'">
        <q-tabs >
          <q-route-tab
          to="/admin" icon="home"/>
          <q-route-tab
          to="" icon="chat"/>

        </q-tabs>
    </q-footer> -->

    <q-footer v-if="this.$route.path == '/c_login'">
        <q-tabs >
          <q-route-tab
          to="/" icon="home"/>
          <q-route-tab
          to="/c_login" icon="perm_identity"/>
        </q-tabs>
    </q-footer>
      <q-footer v-if="this.$route.path == '/login'">
        <q-tabs >
          <q-route-tab
          to="/login" icon="perm_identity"/>
          <q-route-tab
          to="/" icon="home"/>
        </q-tabs>
    </q-footer>
     <q-footer v-if="this.$route.path == '/'">
        <q-tabs >
          <q-route-tab
          to="/login" icon="perm_identity" label=""/>
          <q-route-tab
          to="/" icon="home" label=""/>
        </q-tabs>
    </q-footer>
    <q-footer v-if="this.$route.path == '/' && user_type == '0'">
        <q-tabs >
          <q-route-tab
          to="/patient" icon="perm_identity" label=""/>
          <q-route-tab
          to="/" icon="home" label=""/>
        </q-tabs>
    </q-footer>
    <q-footer v-if="this.$route.path == '/' && user_type == '1'">
        <q-tabs >
          <q-route-tab
          to="/admin" icon="perm_identity" label=""/>
          <q-route-tab
          to="/" icon="home" label=""/>
        </q-tabs>
    </q-footer>
    <q-footer v-if="this.$route.path == '/patient'">
        <q-tabs >
          <q-route-tab
          to="/patient" icon="perm_identity" label=""/>
          <q-route-tab
          to="/" icon="home" label=""/>
        </q-tabs>
    </q-footer>
    <q-footer v-if="this.$route.path == '/admin'">
        <q-tabs >
          <q-route-tab
          to="/admin" icon="perm_identity" label=""/>
          <q-route-tab
          to="/" icon="home" label=""/>
        </q-tabs>
    </q-footer>
     <q-footer v-if="this.$route.path == '/home'">
        <q-tabs >
          <q-route-tab
          to="/doc" icon="chat" label=""/>
          <q-route-tab
          to="/home" icon="home" label=""/>
        </q-tabs>
    </q-footer>

    <q-drawer v-if="this.$route.path == '/'  || this.$route.path =='/home'
    || this.$route.path =='/admin' ||
    !this.$route.params.otherUserId"
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-green-2"
    >
      <q-list v-if="this.$route.path == '/home' || this.$route.path == '/' ">
        <q-item-label
          header
          class="text-grey-8"
        >
          Essential Links
        </q-item-label>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>

       <!-- links admin -->

    <q-list v-if="this.$route.path == '/admin' ">
        <q-item-label
          header
          class="text-grey-8"
        >
          Admin
        </q-item-label>
        <div style="margin:0% 0 0% 5%; padding:5%"
          class="row"
          @click="see_a=true"
          clickable
          tag="a"
          target="_blank"
          href=""
        >
          <q-item-section
            avatar
          >
            <q-icon name="publish" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Post Product</q-item-label>
            <q-item-label caption>
              post product for sell
            </q-item-label>
          </q-item-section>
        </div>
          <div style="margin:0% 0 0% 5%; padding:5%"
          class="row"
          @click="booking=true"
          clickable
          tag="a"
          target="_blank"
          href=""
        >
          <q-item-section
            avatar
          >
            <q-icon name="person_outline" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Update</q-item-label>
            <q-item-label caption>
              update your info
            </q-item-label>
          </q-item-section>
        </div>
        <div style="margin:0% 0 0% 5%; padding:5%"
          class="row"
          @click="s_all_p=true"
          clickable
          tag="a"
          target="_blank"
          href=""
        >
          <q-item-section
            avatar
          >
            <q-icon name="check_circle" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Send Name</q-item-label>
            <q-item-label caption>
              send patient name to nurses
            </q-item-label>
          </q-item-section>
        </div>

    </q-list>

        <!-- links doctor -->

    <q-list v-if="this.$route.path == '/doctor'">
        <q-item-label
          header
          class="text-grey-8"
        >
          Doctor
        </q-item-label>
         <div style="margin:0% 0 0% 5%; padding:5%"
          @click="pInfo=true"
          clickable
          tag="a"
          target="_blank"
          href=""
        >
          <!-- <q-item-section
            avatar
          >
            <q-icon name="check_circle" />
          </q-item-section> -->

          <q-item-section>
            <q-item-label>Patient Info</q-item-label>
            <q-item-label caption>
              document patient info
            </q-item-label>
          </q-item-section>
        </div>
         <div style="margin:0% 0 0% 5%; padding:5%"
          @click="rInvestigation=true"
          clickable
          tag="a"
          target="_blank"
          href=""
        >
          <!-- <q-item-section
            avatar
          >
            <q-icon name="check_circle" />
          </q-item-section> -->

          <q-item-section>
            <q-item-label>Investigation</q-item-label>
            <q-item-label caption>
              request for investigation
            </q-item-label>
          </q-item-section>
        </div>
        <div style="margin:0% 0 0% 5%; padding:5%"
          @click="sPrescription=true"
          clickable
          tag="a"
          target="_blank"
          href=""
        >
          <!-- <q-item-section
            avatar
          >
            <q-icon name="check_circle" />
          </q-item-section> -->

          <q-item-section>
            <q-item-label>Prescription</q-item-label>
            <q-item-label caption>
              send prescription request
            </q-item-label>
          </q-item-section>
        </div>
        <div style="margin:0% 0 0% 5%; padding:5%"
          @click="m_a_patients=true"
          clickable
          tag="a"
          target="_blank"
          href=""
        >
          <!-- <q-item-section
            avatar
          >
            <q-icon name="check_circle" />
          </q-item-section> -->

          <q-item-section>
            <q-item-label>Admitted Patients</q-item-label>
            <q-item-label caption>
              manage admitted patients
            </q-item-label>
          </q-item-section>
        </div>
         <div style="margin:0% 0 0% 5%; padding:5%"
          @click="s_i_admin=true"
          clickable
          tag="a"
          target="_blank"
          href=""
        >
          <!-- <q-item-section
            avatar
          >
            <q-icon name="check_circle" />
          </q-item-section> -->

          <q-item-section>
            <q-item-label>Send Info</q-item-label>
            <q-item-label caption>
              send information to CSO officer(admin)
            </q-item-label>
          </q-item-section>
        </div>
    </q-list>

        <!-- links nurse -->

    <q-list v-if="this.$route.path == '/nurse'">
        <q-item-label
          header
          class="text-grey-8"
        >
          Nurse
        </q-item-label>
         <div style="margin:0% 0 0% 5%; padding:5%"
          @click="a_a_p=true"
          clickable
          tag="a"
          target="_blank"
          href=""
        >
          <!-- <q-item-section
            avatar
          >
            <q-icon name="check_circle" />
          </q-item-section> -->

          <q-item-section>
            <q-item-label>Admitted Patients</q-item-label>
            <q-item-label caption>
              see admitted patients & available bed space
            </q-item-label>
          </q-item-section>
        </div>
          <div style="margin:0% 0 0% 5%; padding:5%"
          @click="s_b=true"
          clickable
          tag="a"
          target="_blank"
          href=""
        >
          <!-- <q-item-section
            avatar
          >
            <q-icon name="check_circle" />
          </q-item-section> -->

          <q-item-section>
            <q-item-label>Send Broadcast</q-item-label>
            <q-item-label caption>
              send broadcast messages to all patients
            </q-item-label>
          </q-item-section>
        </div>
         <div style="margin:0% 0 0% 5%; padding:5%"
          @click="respond=true"
          clickable
          tag="a"
          target="_blank"
          href=""
        >
          <!-- <q-item-section
            avatar
          >
            <q-icon name="check_circle" />
          </q-item-section> -->

          <q-item-section>
            <q-item-label>Respond</q-item-label>
            <q-item-label caption>
              respond to request for results & invoices
            </q-item-label>
          </q-item-section>
        </div>
    </q-list>

        <!-- links patient -->

    <q-list v-if="this.$route.path == '/patient' ">
        <q-item-label
          header
          class="text-grey-8"
        >
         User Account [ {{u_name}} ]
        </q-item-label>
        <div style="margin:0% 0 0% 5%; padding:5%"
          @click="confirm=true"
          clickable
          tag="a"
          target="_blank"
          href=""
        >
      <q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="check_circle" color="primary" text-color="white" />
          <span class="q-ml-sm">Proceed to send name.</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn flat label="OK" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
          <!-- <q-item-section
            avatar
          >
            <q-icon name="check_circle" />
          </q-item-section> -->

          <q-item-section>
            <q-item-label>Send Name</q-item-label>
            <q-item-label caption>
              send name to admin
            </q-item-label>
          </q-item-section>
        </div>
        <div style="margin:0% 0 0% 5%; padding:5%"
          @click="appointment =true"
          clickable
          tag="a"
          target="_blank"
          href=""
        >
          <!-- <q-item-section
            avatar
          >
            <q-icon name="check_circle" />
          </q-item-section> -->

          <q-item-section>
            <q-item-label>Update</q-item-label>
            <q-item-label caption>
              Update account info
            </q-item-label>
          </q-item-section>
        </div>
        <div style="margin-left:5%; padding:5%"
          @click="result =true"
          clickable
          tag="a"
          target="_blank"
          href=""
        >
          <!-- <q-item-section
            avatar
          >
            <q-icon name="check_circle" />
          </q-item-section> -->

          <q-item-section>
            <q-item-label>Order</q-item-label>
            <q-item-label caption>
              view/update orders
            </q-item-label>
          </q-item-section>
        </div>
        <div style="margin-left:5%; padding:5%"
          @click="request =true"
          clickable
          tag="a"
          target="_blank"
          href=""
        >
          <!-- <q-item-section
            avatar
          >
            <q-icon name="check_circle" />
          </q-item-section> -->

          <q-item-section>
            <q-item-label>Request</q-item-label>
            <q-item-label caption>
              request result to be sent to email
            </q-item-label>
          </q-item-section>
        </div>
      <q-dialog v-model="request" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="check_circle" color="primary" text-color="white" />
          <span class="q-ml-sm">Proceed to request?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn flat label="OK" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
       <div style="margin:0% 0 0% 5%; padding:5%"
          @click="payment =true"
          clickable
          tag="a"
          target="_blank"
          href=""
        >
          <!-- <q-item-section
            avatar
          >
            <q-icon name="check_circle" />
          </q-item-section> -->

          <q-item-section>
            <q-item-label>Payment</q-item-label>
            <q-item-label caption>
              make payments for invoices
            </q-item-label>
          </q-item-section>
        </div>

      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <!-- appointment -->

    <q-dialog v-model="appointment">
      <q-card>
   <form @submit.prevent="u_user">
        <q-card-section class="row">
          <div class="text-h6">Update Your Info</div>
          <q-space/>
          <q-btn
          v-close-popup
          icon="close"
          />
          <q-banner
            v-if="msg"
            class="q-mb-md bg-green-4 text-center"
            @click="msg = ''"
            >
            {{msg}}
        </q-banner>
        </q-card-section>
        <q-card-section>
          <div class="q-mb-md">
          <q-input
          :placeholder="u_name"
          autofocus
          outlined
          required
          v-model="new_name"
          label="name">
          <template v-slot:append>
                <q-icon name="close"
                 class="cursor-pointer">
                </q-icon>
          </template>
          </q-input>
          </div>
          <div class="q-mb-md">
          <q-input
          outlined
          required
          type="email"
          v-model="new_email"
          label="email">
          <template v-slot:append>
                <q-icon name="close"
                 class="cursor-pointer">
                </q-icon>
          </template>
          </q-input>
          </div>
          <div class="q-mb-md">
          <q-input
          outlined
          type="password"
          required
          v-model="new_password"
          label="password">
          <template v-slot:append>
                <q-icon name="close"
                 class="cursor-pointer">
                </q-icon>
          </template>
          </q-input>
          </div>
          <div class="q-mb-md">
          <q-input
          outlined
          required
          v-model="new_phone"
          label="phone">
          <template v-slot:append>
                <q-icon name="close"
                 class="cursor-pointer">
                </q-icon>
          </template>
          </q-input>
          </div>
        </q-card-section>
         <q-card-actions  align="right">
        <q-btn
        type="submit"
          color="primary"
          label="update"
          />
         </q-card-actions>
         </form>
      </q-card>

    </q-dialog>

    <!-- payment -->

    <q-dialog v-model="payment">
      <q-card>
   <form @submit.prevent="">
        <q-card-section class="row">
          <div class="text-h6">Make Payment</div>
          <q-space/>
          <q-btn
          v-close-popup
          icon="close"

          />
        </q-card-section>
        <q-card-section>
          <div  class="q-mb-md">
          <q-input
          ref="amount"
          :rules="[val => !!val || 'this field is required']"
          autofocus
          outlined
          type="number"
          label="amount"
          >
          <template v-slot:append>
                <q-icon name="close"
                 class="cursor-pointer"
                >
            </q-icon>
          </template>
          </q-input>

          </div>

        </q-card-section>
         <q-card-actions  align="right">
        <q-btn
        type="submit"
          color="primary"
          label="pay"
          />
         </q-card-actions>
         </form>
      </q-card>

    </q-dialog>

    <!-- result -->

    <q-dialog v-model="result">
      <q-card>
        <q-card-section class="row">
            <q-banner style="margin:15% 0 0 23%; width:50%"
            v-if="msg"
            @click="msg = ''"
            class="q-mb-md bg-warning text-center fixed-top"
            >
            {{msg}}
            </q-banner><br>
          <div class="text-h6 q-pa-md">See/Update Orders</div>
          <q-space/>
          <q-btn
          v-close-popup
          icon="close"
          />
        </q-card-section>
        <q-card-section>
      <q-list bordered separator v-if="Object.keys(orders).length">
      <q-item clickable v-ripple v-for="order in orders" :key="order.id">
        <q-item-section>
          <q-item-label><b>Product Name :</b> {{order.p_name}}</q-item-label>
          <q-item-label><b>Price : </b>{{order.p_price}}</q-item-label>
          <q-item-label><b>Quantity : </b>{{order.p_qty}}</q-item-label>
          <q-item-label><b>Model : </b>{{order.p_model}}</q-item-label>
          <q-item-label><b>Order Status :</b> {{order.status}}</q-item-label>
          <q-item-label><b>Description : </b>{{order.p_desc}}</q-item-label>
          <q-item-label><b>Order Date : </b>{{order.created_at}}</q-item-label>
          <q-btn
          @click="removeOrder(order.id)"
          label="cancel order"
          class="q-ma-sm bg-warning"/>
          <q-btn
          @click="completeOrder(order.id)"
          class="q-ma-sm bg-primary"
          v-if="order.status == 'pending'"
          text-color="white" label="completed" />
        </q-item-section>
      </q-item>
      </q-list>
      <q-list v-else bordered separator>
        <q-item-section>
          <q-item-label class="q-pa-md"><h5>No Order Made Yet</h5></q-item-label>
        </q-item-section>
      </q-list>
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- nurse [all admitted patients] -->

    <q-dialog v-model="a_a_p">
      <q-card>
   <form @submit.prevent="">
        <q-card-section class="row">
          <div class="text-h6">All Admitted Patients</div>
          <q-space/>
          <q-btn
          v-close-popup
          icon="close"

          />
        </q-card-section>
        <q-card-section>
          <div  class="q-mb-md">


          </div>
        </q-card-section>

         </form>
      </q-card>

    </q-dialog>

    <!-- nurse [all patients request] -->

    <q-dialog v-model="respond">
      <q-card>
   <form @submit.prevent="">
        <q-card-section class="row">
          <div class="text-h6">All Patients Requests</div>
          <q-space/>
          <q-btn
          v-close-popup
          icon="close"

          />
        </q-card-section>
        <q-card-section>
          <div  class="q-mb-md">


          </div>
        </q-card-section>

         </form>
      </q-card>

    </q-dialog>

      <!-- nurses send broadcast -->
    <q-dialog v-model="s_b">
      <q-card>
   <form @submit.prevent="">
        <q-card-section class="row">
          <div class="text-h6 p-md-a">Send Broadcast</div>
          <q-space/>
          <q-btn
          v-close-popup
          icon="close"

          />
        </q-card-section>
           <q-card-section>
          <div  class="q-mb-md">
          <q-input
          ref="title"
          :rules="[val => !!val || 'this field is required']"
          autofocus
          outlined

          label="message"
          >
          <template v-slot:append>
                <q-icon name="close"
                 class="cursor-pointer"

                 >
                </q-icon>
              </template>
          </q-input>

          </div>
        </q-card-section>
          <q-card-actions  align="right">
        <q-btn
        type="submit"
          color="primary"
          label="send"
          />
         </q-card-actions>
         </form>
      </q-card>
    </q-dialog>

    <!-- admin post product -->

    <q-dialog v-model="see_a">
        <q-card>
   <form @submit.prevent="saveProduct" enctype="multipart/form-data">
        <q-card-section class="row">
          <div class="text-h6">Post Products</div>
          <q-space/>
          <q-btn
          v-close-popup
          icon="close"

          />
        </q-card-section>
        <q-card-section>
          <q-banner style="margin:15% 0 0 23%; width:50%"
            v-if="msg"
            @click="msg = ''"
            class="q-mb-md bg-warning text-center fixed-top"
            >
            {{msg}}
            </q-banner><br>
          <div  class="q-mb-md">
          <q-input
          autofocus
          outlined
          required
          v-model="name"
          label="product name"
          >
          <template v-slot:append>
                <q-icon name="close"
                 class="cursor-pointer"
                 >
                </q-icon>
              </template>
          </q-input>

          </div>
          <div  class="q-mb-md">
          <q-input
          outlined
          required
          v-model="product_category"
          label="product category"
          >
          <template v-slot:append>
                <q-icon name="close"
                 class="cursor-pointer"

                 >
                </q-icon>
              </template>
          </q-input>

          </div>
          <div  class="q-mb-md">
          <q-input
          outlined
          required
          v-model="c_model"
          label="product model"
          >
          <template v-slot:append>
                <q-icon name="close"
                 class="cursor-pointer"

                 >
                </q-icon>
              </template>
          </q-input>

          </div>
          <div  class="q-mb-md">
          <q-input
          required
          outlined
          v-model="price"
          label="price"
          >
          <template v-slot:append>
                <q-icon name="close"
                 class="cursor-pointer"

                 >
                </q-icon>
              </template>
          </q-input>

          </div>
          <div  class="q-mb-md">
          <q-input
          required
          outlined
          v-model="description"
          label="description"
          >
          <template v-slot:append>
                <q-icon name="close"
                 class="cursor-pointer"

                 >
                </q-icon>
              </template>
          </q-input>

          </div>
      <div  class="q-mb-md">
        <input type="file"
         style="display:none;"
         ref="fileOneInput"
         color="purple-12" required
         @change="getImageOne"
         label="image">
         <q-img v-if="this.image_one" :src="this.image_one" alt="image" style="width: 100%"
          :ratio="1"
          basic
          spinner-color="white"
          class="rounded-borders" />
        <q-btn label="select image" @click="$refs.fileOneInput.click()"
          style="width: 100%"/>
     </div>
      <div  class="q-mb-md">
        <input type="file"
         style="display:none;"
         ref="fileTwoInput"
         color="purple-12" required
         @change="getImageTwo"
         label="image">
         <q-img v-if="this.image_two" :src="this.image_two" alt="image" style="width: 100%"
          :ratio="1"
          basic
          spinner-color="white"
          class="rounded-borders" />
        <q-btn label="select image" @click="$refs.fileTwoInput.click()"
          style="width: 100%"/>
     </div>
      <div  class="q-mb-md">
        <input type="file"
         style="display:none;"
         ref="fileThreeInput"
         color="purple-12" required
         @change="getImageThree"
         label="image">
         <q-img v-if="this.image_three" :src="this.image_three" alt="image" style="width: 100%"
          :ratio="1"
          basic
          spinner-color="white"
          class="rounded-borders" />
        <q-btn label="select image" @click="$refs.fileThreeInput.click()"
          style="width: 100%"/>
     </div>
      <div  class="q-mb-md">
        <input type="file"
         style="display:none;"
         ref="fileFourInput"
         color="purple-12" required
         @change="getImageFour"
         label="image">
         <q-img v-if="this.image_four" :src="this.image_four" alt="image" style="width: 100%"
          :ratio="1"
          basic
          spinner-color="white"
          class="rounded-borders" />
        <q-btn label="select image" @click="$refs.fileFourInput.click()"
          style="width: 100%"/>
     </div>
      <div  class="q-mb-md">
        <input type="file"
         style="display:none;"
         ref="fileFiveInput"
         color="purple-12" required
         @change="getImageFive"
         label="image">
         <q-img v-if="this.image_five" :src="this.image_five" alt="image" style="width: 100%"
          :ratio="1"
          basic
          spinner-color="white"
          class="rounded-borders" />
        <q-btn label="select image" @click="$refs.fileFiveInput.click()"
          style="width: 100%"/>
     </div>

          <!-- <div  class="q-mb-md">
            <q-input outlined  label="date">
              <template v-slot:append>
                  <q-icon name="close"
                 class="cursor-pointer"
                 >
                </q-icon>

                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy>
                    <q-date  />
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div> -->
            <!-- <div  >
            <q-input outlined  label="time" >
              <template v-slot:append>
                 <q-icon name="close"
                 class="cursor-pointer"
                  >
                </q-icon>

                <q-icon name="access_time" class="cursor-pointer">
                  <q-popup-proxy>
                    <q-time />
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
            </div> -->
        </q-card-section>
         <q-card-actions  align="right">
        <q-btn
        type="submit"
          color="primary"
          label="save"
          />
         </q-card-actions>
         </form>
      </q-card>

    </q-dialog>

    <!-- admin view all/send patient name -->

    <q-dialog v-model="s_all_p">
      <q-card>
   <form @submit.prevent="">
        <q-card-section class="row">
          <div class="text-h6 p-md-a">Send Patient Name</div>
          <q-space/>
          <q-btn
          v-close-popup
          icon="close"

          />
        </q-card-section>
        <q-card-section>
          <div  class="q-mb-md">


          </div>
        </q-card-section>

         </form>
      </q-card>

    </q-dialog>

    <!-- admin see patients and book appointment -->

    <q-dialog v-model="booking">
  <q-card>
<form @submit.prevent="u_user">
        <q-card-section class="row">
          <div class="text-h6">Update Your Info</div>
          <q-space/>
          <q-btn
          v-close-popup
          icon="close"
          />
          <q-banner
            v-if="msg"
            class="q-mb-md bg-green-4 text-center"
            @click="msg = ''"
            >
            {{msg}}
        </q-banner>
        </q-card-section>
        <q-card-section>
          <div class="q-mb-md">
          <q-input
          :placeholder="u_name"
          autofocus
          outlined
          required
          v-model="new_name"
          label="name">
          <template v-slot:append>
                <q-icon name="close"
                 class="cursor-pointer">
                </q-icon>
          </template>
          </q-input>
          </div>
          <div class="q-mb-md">
          <q-input
          outlined
          required
          type="email"
          v-model="new_email"
          label="email">
          <template v-slot:append>
                <q-icon name="close"
                 class="cursor-pointer">
                </q-icon>
          </template>
          </q-input>
          </div>
          <div class="q-mb-md">
          <q-input
          outlined
          type="password"
          required
          v-model="new_password"
          label="password">
          <template v-slot:append>
                <q-icon name="close"
                 class="cursor-pointer">
                </q-icon>
          </template>
          </q-input>
          </div>
          <div class="q-mb-md">
          <q-input
          outlined
          required
          v-model="new_phone"
          label="phone">
          <template v-slot:append>
                <q-icon name="close"
                 class="cursor-pointer">
                </q-icon>
          </template>
          </q-input>
          </div>
        </q-card-section>
         <q-card-actions  align="right">
        <q-btn
        type="submit"
          color="primary"
          label="update"
          />
         </q-card-actions>
         </form>
      </q-card>

    </q-dialog>

    <!-- doctor document patient info -->

    <q-dialog v-model="pInfo">
      <q-card>
   <form @submit.prevent="">
        <q-card-section class="row">
          <div class="text-h6 p-md-a">Document Patient Info</div>
          <q-space/>
          <q-btn
          v-close-popup
          icon="close"

          />
        </q-card-section>
        <q-card-section>
          <div  class="q-mb-md">
          <q-input
          ref="title"
          :rules="[val => !!val || 'this field is required']"
          autofocus
          outlined

          label="patient name"
          >
          <template v-slot:append>
                <q-icon name="close"
                 class="cursor-pointer"

                 >
                </q-icon>
              </template>
          </q-input>

          </div>
          <div  class="q-mb-md">
            <q-input outlined  label="information">
              <template v-slot:append>
                  <q-icon name="close"
                 class="cursor-pointer"
                 >
                </q-icon>


              </template>
            </q-input>
          </div>
        </q-card-section>
        <q-card-actions  align="right">
        <q-btn
        type="submit"
          color="primary"
          label="save"
          />
         </q-card-actions>
         </form>
      </q-card>

    </q-dialog>

    <!-- doctor request for investigation -->

    <q-dialog v-model="rInvestigation">
      <q-card>
   <form @submit.prevent="">
        <q-card-section class="row">
          <div class="text-h6 p-md-a">Request Investigation</div>
          <q-space/>
          <q-btn
          v-close-popup
          icon="close"

          />
        </q-card-section>
        <q-card-section>
          <div  class="q-mb-md">


          </div>
        </q-card-section>

         </form>
      </q-card>
    </q-dialog>

    <!-- doctor send prescription request -->

    <q-dialog v-model="sPrescription">
      <q-card>
   <form @submit.prevent="">
        <q-card-section class="row">
          <div class="text-h6 p-md-a">Send Prescription Request</div>
          <q-space/>
          <q-btn
          v-close-popup
          icon="close"

          />
        </q-card-section>
           <q-card-section>
          <div  class="q-mb-md">
          <q-input
          ref="title"
          :rules="[val => !!val || 'this field is required']"
          autofocus
          outlined

          label="infirmity"
          >
          <template v-slot:append>
                <q-icon name="close"
                 class="cursor-pointer"

                 >
                </q-icon>
              </template>
          </q-input>

          </div>
        </q-card-section>
          <q-card-actions  align="right">
        <q-btn
        type="submit"
          color="primary"
          label="send"
          />
         </q-card-actions>
         </form>
      </q-card>
    </q-dialog>

       <!-- doctor manage admitted patients -->

    <q-dialog v-model="m_a_patients">
      <q-card>
   <form @submit.prevent="">
        <q-card-section class="row">
          <div class="text-h6 p-md-a">Manage Admitted Patients</div>
          <q-space/>
          <q-btn
          v-close-popup
          icon="close"
          />
        </q-card-section>
        <q-card-section>
          <div  class="q-mb-md">
          </div>
        </q-card-section>
         </form>
      </q-card>
    </q-dialog>

         <!-- doctor send info to admin -->

    <q-dialog v-model="s_i_admin">
      <q-card>
   <form @submit.prevent="">
        <q-card-section class="row">
          <div class="text-h6 p-md-a">Send Info To Admin</div>
          <q-space/>
          <q-btn
          v-close-popup
          icon="close"

          />
        </q-card-section>
           <q-card-section>
          <div  class="q-mb-md">
          <q-input
          ref="title"
          :rules="[val => !!val || 'this field is required']"
          autofocus
          outlined

          label="information"
          >
          <template v-slot:append>
                <q-icon name="close"
                 class="cursor-pointer"

                 >
                </q-icon>
              </template>
          </q-input>

          </div>
        </q-card-section>
        <q-card-actions  align="right">
        <q-btn
        type="submit"
          color="primary"
          label="send"
          />
         </q-card-actions>
         </form>
      </q-card>
    </q-dialog>
    <q-dialog v-model="success">
      <q-card>
        <!-- <q-card-section>
          <div class="text-h6">Disclaimer: </div>
        </q-card-section> -->

        <q-card-section class="q-ma-md">
          <h5>You are logged in</h5>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-layout>
</template>

<script>
const NAME = 'user_name';
const ID = 'user_id';
const PASSWORD = 'password';
const USER_TYPE = 'user_type';
const PHONE = 'user_phone';
const EMAIL = 'user_email';


import { mapState, mapActions } from 'vuex'
import mixinOtherUserDetails from 'src/mixins/mixin-other-user-details.js'
import EssentialLink from 'components/EssentialLink'

export default {
  mixins: [mixinOtherUserDetails],
  computed:{
    ...mapState('store', ['userDetails','orders']),
        title(){
          let c_path = this.$route.path;
          if(c_path == '/home'){
            return 'Ask Question Section'
          }
           else if(c_path == '/auth'){
            return 'Login/Register'
          }
           else if(c_path == '/doc'){
            return 'Chat With Doctors'
          }
            else if(c_path == '/'){
            return 'Welcome'
          }
            else if(c_path == '/login'){
            return 'Account Login '
          }
            else if(c_path == '/c_login'){
            return 'Login To Ask Question'
          }
             else if(c_path == '/admin'){
            return 'Welcome Admin'
            }
             else if(c_path == '/patient'){
            return 'Welcome'
          }
           if(c_path.includes('/chat')){
            return this.otherUserDetails.name
          }
          else{
            return 'Chat With Users'
          }
        }
      },
  name: 'MainLayout',

  components: {
    EssentialLink
  },
  props:['tab'],
  data () {
    return {
      new_name: localStorage.getItem(NAME),
      new_phone: localStorage.getItem(PHONE),
      new_password: '',
      new_email: localStorage.getItem(EMAIL),
      u_name : localStorage.getItem(NAME),
      leftDrawerOpen: false,
      success : false,
      essentialLinks: [
        {
          title: 'Docs',
          caption: 'arubah.com',
          icon: 'school',
          link: ''
        },

        {
          title: 'FAQ',
          caption: 'faq.arubah.com',
          icon: 'record_voice_over',
          link: ''
        },
        {
          title: 'Twitter',
          caption: '@arubah',
          icon: 'rss_feed',
          link: ''
        },
        {
          title: 'Facebook',
          caption: '@arubah',
          icon: 'public',
          link: ''
        },
      ],
      image_one : null,
      image_two : null,
      image_three : null,
      image_four : null,
      image_five : null,
      product_category : '',
      description : '',
      c_model : '',
      price : '',
      name : '',
      appointment : false,
      dialog : false,
      result : false,
      confirm : false,
      request : false,
      payment : false,
      see_a : false,
      booking : false,
      s_all_p : false,
      a_a_p : false,
      s_b : false,
      respond : false,
      pInfo : false,
      rInvestigation : false,
      sPrescription : false,
      m_a_patients : false,
      s_i_admin : false,
      msg : '',
      user_type : localStorage.getItem(USER_TYPE),
    }
  },
  mounted(){
    this.showSuccess();
  },
  methods: {
      ...mapActions('store', ['logoutUser','getOrders']),
      logout(){
         localStorage.removeItem(NAME)
         localStorage.removeItem(ID)
         localStorage.removeItem(PASSWORD)
         localStorage.removeItem(EMAIL)
         localStorage.removeItem(PHONE)
         localStorage.removeItem(USER_TYPE)
         window.location.reload()

        // localStorage.setItem(NAME, '')
        // localStorage.setItem(ID, '')
        this.$router.push('/login')

      },
    removeOrder(id){
        fetch("http://127.0.0.1:8000/api/removeorder/"+id, {
         method: "POST",
         headers: {
           "Content-type": "application/json"
            }
        })
        .then(res => res.text())
        .then(res => {
          this.msg = res
          this.getOrders();
        })
      },
      completeOrder(id){
        fetch("http://127.0.0.1:8000/api/completed/"+id, {
         method: "PUT",
         headers: {
           "Content-type": "application/json"
            }
        })
        .then(res => res.text())
        .then(res => {
          this.msg = res
          this.getOrders();
        })
      },
      u_user(){
        fetch("http://127.0.0.1:8000/api/update/"+localStorage.getItem(ID), {
         method: "POST",
           body: JSON.stringify({
           name:     this.new_name,
           email:    this.new_email,
           password: this.new_password,
           phone:    this.new_phone,
         }),
         headers: {
           "Content-type": "application/json"
            }
        })
        .then(res => res.json())
        .then(res => {
          this.msg = res.ok + ", You will be redirected to re-login shortly"
          setTimeout(this.logout, 7000)
        })
      },
      showSuccess(){
        if(localStorage.getItem(NAME)){
           this.success = true
        }
      },
      sendName(){
        this.$q.dialog({
        title: 'Confirm',
        message: 'proceed to send?',
        ok:{
          push : true
        },
        cancel:{
          color:'negative'
        },
        persistent:true }).onOk(() =>{
          // this.deleteTask(id)
        })
      },
       getImageOne(e){
        let image = e.target.files[0]
        let reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = e => {
          this.image_one = e.target.result
        }
      },
      getImageTwo(e){
        let image = e.target.files[0]
        let reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = e => {
          this.image_two = e.target.result
        }
      },
      getImageThree(e){
        let image = e.target.files[0]
        let reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = e => {
          this.image_three = e.target.result
        }
      },
      getImageFour(e){
        let image = e.target.files[0]
        let reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = e => {
          this.image_four = e.target.result
        }
      },
      getImageFive(e){
        let image = e.target.files[0]
        let reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = e => {
          this.image_five = e.target.result
        }
      },
      saveProduct(){
        fetch("http://127.0.0.1:8000/api/product", {
         method: "POST",
         body: JSON.stringify({
           user_id: '',
           name: this.name,
           category: this.product_category,
           description: this.description,
           c_model: this.c_model,
           price: this.price,
           image1: this.image_one,
           image2: this.image_two,
           image3: this.image_three,
           image4: this.image_four,
           image5: this.image_five,
         }),
         headers: {
           "Content-type": "application/json",
           'Accept': 'application/json'
            }
         })
        .then(res => res.text())
        .then(text => {
          console.log(text)
          this.name= '',
          this.product_category= '',
          this.description='',
          this.price='',
          this.c_model='',
          this.image_one= '',
          this.image_two= '',
          this.image_three= '',
          this.image_four= '',
          this.image_five= '',
          this.msg = 'posted successfully'
          // this.fetchAppointment();
        })
         .catch(err => console.log(err));
        }
    },
}
</script>
<style lang="stylus">
  .q-toolbar
    .q-btn
      line-height: 1.2


   aside
    opacity: 0.9 !important
    width: 300px
    transform: translateX(0px)
</style>
