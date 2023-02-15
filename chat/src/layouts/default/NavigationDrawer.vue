<template>
  <v-navigation-drawer v-model="store.drawer">
    <v-sheet color="grey-lighten-4" class="pa-4">
      <v-avatar class="mb-4" color="info" size="64" v-if="!photoUrl">
        <input ref="fileInput" type="file" style="display: none" accept="image/jpeg, image/jpg, image/pmg"
          @change="updateIcon" />
        <v-icon @click="changeIcon" icon="mdi-account-circle" v-if="!photoUrl"></v-icon>
      </v-avatar>
      <v-avatar class="mb-4" size="64" v-else>
        <input ref="fileInput" type="file" style="display: none" accept="image/jpeg, image/jpg, image/png"
          @change="updateIcon" />
        <v-img :src="photoUrl" alt="" @click="changeIcon" cover />
      </v-avatar>

      <div>{{ auth.currentUser && auth.currentUser.displayName }}</div>
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
import { ref, onMounted } from 'vue';
import { useAppStore } from '@/store/app'
import { auth, storage } from '@/firebase/firebase'
import { signOut } from '@firebase/auth';
import router from '@/router';
import { onAuthStateChanged, updateProfile } from '@firebase/auth';
import { ref as firebaseRef, uploadBytes, getDownloadURL } from '@firebase/storage'

const store = useAppStore()

const fileInput = ref()

const photoUrl = ref('')
const authUser = ref()

const links = [
  ['mdi-home', 'Home', ''],
  ['mdi-account', 'User', ''],
  ['mdi-delete', 'Trash', ''],
  ['mdi-alert-octagon', 'Spam', ''],
]

onMounted(() => {
  if (auth.currentUser?.photoURL) {
    authUser.value = sessionStorage.getItem('user')
    if (authUser.value) {
      authUser.value = JSON.parse(authUser.value)
      photoUrl.value = authUser.value.photoUrl
    }
  }
})
const changeIcon = () => {
  fileInput.value.click()
}

const getAuth = () => {
  return onAuthStateChanged(auth, (user) => {
    return user
  })
}

const updateIcon = () => {
  const user = getAuth()
  if (!user) {
    signOut(auth)
    router.push('/login')
  }

  const file = fileInput.value.files[0]
  const filePath = `user/${file.name}`
  const fileRef = firebaseRef(storage, filePath)
  uploadBytes(fileRef, file).then((snapshot) => {
    console.log('upload', snapshot)
    getDownloadURL(fileRef).then((url) => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          updateProfile(user, {
            photoURL: url
          })
          photoUrl.value = url
          console.log(authUser.value)
          authUser.value.photoUrl = url
          sessionStorage.setItem('user', JSON.stringify(authUser.value))
        }
      })
    })
  })
  console.log(file)
}

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