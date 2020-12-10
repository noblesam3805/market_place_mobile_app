<template>
  <q-page
  ref="pageChat"
  class="flex column">
    <q-banner
      v-if="!otherUserDetails.online"
  		class="bg-grey-4 text-center fixed-top">
      {{ otherUserDetails.name }} is offline.
    </q-banner>
    <div
    :class="{ 'invisible' : !showMessages }"
    class="q-pa-md column col justify-end">
      <q-chat-message
        v-for="(message, key) in messages"
        :key="key"
        :name="message.from == 'me' ? userDetails.name : otherUserDetails.name"
        :text="[message.text]"
        :sent="message.from =='me' ? true : false"
      />
    </div>

     <q-footer elevated>
       <q-toolbar>
         <q-form @submit="sendMessage" class="full-width">
           <q-input class="full-width"
             ref="newMessage"
             bg-color="white"
             rounded
             dense
             outlined
             label="message"
             v-model="newMsg"
             >

           <template v-slot:after>
             <q-btn
              type="submit"
              dense
              flat
              color="white"
              icon="send"
              @click="sendMessage"
             />
           </template>
         </q-input>
         </q-form>

       </q-toolbar>

    </q-footer>
  </q-page>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import mixinOtherUserDetails from 'src/mixins/mixin-other-user-details.js'

export default {
  mixins: [mixinOtherUserDetails],
  name: 'PageIndex',
  data(){
    return{
      newMsg:'',
      showMessages: false
    }
  },
  computed: {
	  	...mapState('store', ['messages', 'userDetails'])
	},
  methods:{
    ...mapActions('store', ['firebaseGetMessages', 'firebaseStopGettingMessages', 'firebaseSendMessage']),
	  	sendMessage() {
	  		this.firebaseSendMessage({
          message: {
	  			text: this.newMsg,
          from: 'me'
          },
          otherUserId: this.$route.params.otherUserId
        })
        this.clearMessage()
      },
      clearMessage() {
	  		this.newMsg = ''
	  		this.$refs.newMessage.focus()
	  	},
      	scrollToBottom() {
	  		let pageChat = this.$refs.pageChat.$el
	  		setTimeout(() => {
		  		window.scrollTo(0, pageChat.scrollHeight)
	  		}, 20);
	  	}
  },
   watch: {
	  	messages: function(val) {
	  		if (Object.keys(val).length) {
	  			this.scrollToBottom()
	  			setTimeout(() => {
	  				this.showMessages = true
	  			}, 200)
	  		}
	  	}
	  },
   mounted() {
	  	this.firebaseGetMessages(this.$route.params.otherUserId)
	  },
	  destroyed() {
	  	this.firebaseStopGettingMessages()
	  }
}
</script>
<style lang="stylus">
	.q-banner
		top 50px
		z-index 2
		opacity 0.8
	.q-message
		z-index 1
</style>
