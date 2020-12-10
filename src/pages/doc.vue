<template>
  <q-page class="flex q-pa-md">
    <!-- <img
      alt="Quasar logo"
      src="~assets/quasar-logo-full.svg"
    > -->
    <q-list class="full-width" separator v-for="(user, key) in users"
  	  	:key="key">
      <q-item v-if="user.name.charAt(5) == 'r'"
       class="q-my-sm"
       :to="'/chat/' + key"
      clickable v-ripple>
        <q-item-section avatar v-if="user.name.charAt(5) == 'r'">
          <q-avatar color="primary" text-color="white">
            {{ user.name.charAt(0) }}
          </q-avatar>
        </q-item-section>

        <q-item-section v-if="user.name.charAt(5) == 'r'">
          <q-item-label>{{ user.name }}</q-item-label>
        </q-item-section>

        <q-item-section side v-if="user.name.charAt(5) == 'r'">
            <q-badge :color ="user.online ? 'light-green-5' : 'grey-4'">
            {{user.online ? 'online' : 'offline'}}
            </q-badge>
        </q-item-section>
      </q-item>
      <q-item v-else style="display:none; height:0px"/>

      <q-separator v-if="user.name.charAt(5) == 'r'"/>

    </q-list>
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters('store', ['users'])
  }
}

</script>
