const ID = 'user_id';
import Vue from 'vue'
import { firebase_auth, firebase_db } from 'boot/firebase'
let messagesRef

const state = {
  userDetails:{},
  users: {},
  messages: {},
  errors: {},
  orders: {}
}
const mutations = {
  setUserDetails(state, payload) {
    state.userDetails = payload
  },
  setUserOrders(state, payload) {
    state.orders = payload.payload
  },
  errors(state,payload){
    state.errors = payload
  },
	addUser(state, payload) {
    Vue.set(state.users, payload.userId, payload.userDetails)
	},
	updateUser(state, payload) {
    Object.assign(state.users[payload.userId], payload.userDetails)
  },
  addMessage(state, payload) {
		Vue.set(state.messages, payload.messageId, payload.messageDetails)
	},
	clearMessages(state) {
		state.messages = {}
  }
}
const actions = {
  getOrders({commit}){
    fetch("http://127.0.0.1:8000/api/getorders/" + localStorage.getItem(ID))
      .then(res => res.json())
      .then(res => {
        let payload =  res.data
        commit('setUserOrders',{
          payload
        })
      })
    },
	registerUser({dispatch}, payload) {
		firebase_auth.createUserWithEmailAndPassword(payload.email, payload.password)
			.then(response => {
				console.log(response)
				let userId = firebase_auth.currentUser.uid
				firebase_db.ref('users/' + userId).set({
					name: payload.name,
					email: payload.email,
					online: true
				})
			})
			.catch(error => {
        dispatch('errors',{
          errors : error.message
          }),
				console.log(error.message)
			})
	},
	loginUser({dispatch}, payload) {
		firebase_auth.signInWithEmailAndPassword(payload.email, payload.password)
			.then(response => {
				console.log(response)
			})
			.catch(error => {
        dispatch('errors',{
        errors : error.message
        }),
				console.log(error.message)
			})
  },
  handleAuthStateChanged({ commit,dispatch, state }) {
		firebase_auth.onAuthStateChanged(user => {
		  if (user) {
		    // User is logged in.
		    let userId = firebase_auth.currentUser.uid
		    firebase_db.ref('users/' + userId).once('value', snapshot => {
		    	let userDetails = snapshot.val()
		    	commit('setUserDetails', {
		    		name: userDetails.name,
		    		email: userDetails.email,
		    		userId: userId
		    	})
        })
        dispatch('firebaseUpdateUser', {
		    	userId: userId,
		    	updates: {
		    		online: true
		    	}
        })
        dispatch('firebaseGetUsers')
		    this.$router.push('/home')
		  }
		  else {
		  	// User is logged out.
		  	dispatch('firebaseUpdateUser', {
		  		userId: state.userDetails.userId,
		  		updates: {
		  			online: false
		  		}
		  	})
		  	commit('setUserDetails', {})
		  	this.$router.replace('/')
		  }
		})
  },
  logoutUser() {
		firebase_auth.signOut()
  },
  firebaseUpdateUser({}, payload) {
		if (payload.userId) {
			firebase_db.ref('users/' + payload.userId).update(payload.updates)
		}
  },
  errors({commit}, payload){
    let errors = payload.errors
    commit('errors', {
      errors
    })
  },
  firebaseGetUsers({ commit }) {
		firebase_db.ref('users').on('child_added', snapshot => {
			let userDetails = snapshot.val()
			let userId = snapshot.key
			commit('addUser', {
				userId,
				userDetails,
			})
		})
		firebase_db.ref('users').on('child_changed', snapshot => {
			let userDetails = snapshot.val()
			let userId = snapshot.key
			commit('updateUser', {
				userId,
        userDetails,
      })
		})
  },
  firebaseGetMessages({ commit, state }, otherUserId) {
		let userId = state.userDetails.userId
		messagesRef = firebase_db.ref('chats/' + userId + '/' + otherUserId)
		messagesRef.on('child_added', snapshot => {
			let messageDetails = snapshot.val()
			let messageId = snapshot.key
			commit('addMessage', {
				messageId,
				messageDetails
			})
		})
  },
  firebaseStopGettingMessages({ commit }) {
		if (messagesRef) {
			messagesRef.off('child_added')
			commit('clearMessages')
		}
  },
  firebaseSendMessage({}, payload) {
		firebase_db.ref('chats/' + state.userDetails.userId + '/' + payload.otherUserId).push(payload.message)

		payload.message.from = 'them'
		firebase_db.ref('chats/' + payload.otherUserId + '/' + state.userDetails.userId).push(payload.message)
	}
}
// && state.userNames.charAt(5) == 'r'
const getters = {
	users: state => {
		let usersFiltered = {}
		Object.keys(state.users).forEach(key => {
			if (key !== state.userDetails.userId ) {
        usersFiltered[key] = state.users[key]
			}
		})
		return usersFiltered
  },
  errors: state => {
    return state.errors
  }
}

export default {
	namespaced: true,
	state,
	mutations,
	actions,
	getters
}
