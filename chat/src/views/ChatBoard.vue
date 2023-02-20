<template>
  <v-app id="inspire">
    <v-main>
      <h1 style="text-align: center;">{{ room ? room.name : '' }}</h1>
      <v-container class="py-8 px-6" fluid>
        <v-row>
          <v-col v-for="card in cards" :key="card" cols="12">
            <v-card>

              <v-list lines="two">
                <v-list-subheader>{{ card }}</v-list-subheader>
                <template v-for="(data, index) in messages" :key="index">
                  <v-list-item>
                    <template v-slot:prepend>
                      <v-avatar color="grey-darken-1">
                        <v-img :src="data.photoURL" alt="" cover />
                      </v-avatar>
                    </template>
                    <v-list-item-subtitle>
                      {{ data.message }}
                    </v-list-item-subtitle>
                  </v-list-item>
                  <v-divider v-if="index !== 6" :key="`divider-${index}`" inset></v-divider>
                </template>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
      <v-textarea v-model="body" class="mx-2" label="メッセージを送信" auto-grow rows="3" prepend-icon="mdi-comment" />
      <v-btn class="me-4" type="submit" :disabled="inValid" @click="submit">
        submit
      </v-btn>

      <v-btn @click="clear">
        clear
      </v-btn>
    </v-main>
  </v-app>
</template>

<script lang='ts' setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router';
import { db } from '@/firebase/firebase'
import { getDoc, getDocs, addDoc, collection, doc, Timestamp, query, orderBy, onSnapshot } from "firebase/firestore";
import router from '@/router/index'

interface messageType {
  message: string,
  name: string,
  photoURL: string,
  createdAt: Timestamp
}

const body = ref('')
const route = useRoute()
const roomId = route.query.room_id
const messages = ref([] as messageType[])
const auth = ref()
const roomRef = doc(db, 'rooms', `${roomId}`);
const messagesRef = collection(roomRef, 'messages')

onMounted(() => {
  auth.value = sessionStorage.getItem('user')
  if (auth.value) {
    auth.value = JSON.parse(auth.value)
  }
  onSnapshot(query(messagesRef, orderBy('createdAt')), (doc) => {
    doc.docChanges().forEach(change => {
      messages.value.push(change.doc.data() as messageType)
    })
  })
})

const roomDoc = await getDoc(roomRef);
const room = roomDoc.data()
if (!roomDoc.data()) {
  console.log('test')
  await router.push('/')
}

//const snapshot = await getDocs(query(messagesRef, orderBy('createdAt')))
//snapshot.forEach(doc => {
//  messages.value.push(doc.data() as messageType)
//})

const inValid = computed(() => {
  if (!body.value) {
    return true
  }
  return false
})
const cards = ['Today']

const submit = () => {
  addDoc(messagesRef, {
    message: body.value,
    name: auth.value.displayName,
    photoURL: auth.value.photoUrl,
    createdAt: Timestamp.now()
  }).then(() => {
    body.value = ''
  }
  ).catch((error) => {
    console.log(error)
  })
}
const clear = () => {
  body.value = ''
}
</script>