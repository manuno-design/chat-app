<template>
  <v-navigation-drawer v-model="store.drawer">
    <v-sheet color="grey-lighten-4" class="pa-4">
      <v-avatar class="mb-4" color="grey-darken-1" size="64"></v-avatar>

      <div>john@google.com</div>
    </v-sheet>

    <v-divider></v-divider>

    <v-list>
      <v-list-item v-for="[icon, text, link] in links" :key="icon" link :to="link">
        <template v-slot:prepend>
          <v-icon>{{ icon }}</v-icon>
        </template>
        <v-list-item-title>{{ text }}</v-list-item-title>
      </v-list-item>
      <v-list-item @click="logout">
        <template v-slot:prepend>
          <v-icon>mdi-logout</v-icon>
        </template>
        <v-list-item-title>Logput</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts" setup>
import { useAppStore } from '@/store/app'
import { auth } from '@/firebase/firebase'
import { signOut } from '@firebase/auth';
import router from '@/router';

const store = useAppStore()

const links = [
  ['mdi-home', 'Home', ''],
  ['mdi-account', 'User', ''],
  ['mdi-delete', 'Trash', ''],
  ['mdi-alert-octagon', 'Spam', ''],
]

const logout = () => {
  signOut(auth)
    .then(() => {
      localStorage.message = 'ログアウトしました'
      router.push('/login')
    })
    .catch((error) => {
      console.log(error)
    })
}
</script>