<template>
  <v-app id="inspire">
    <v-main>
      <v-container class="py-8 px-6" fluid>
        <v-row>
          <v-col v-for="card in cards" :key="card" cols="12">
            <v-card>

              <v-list lines="two">
                <v-list-subheader>{{ card }}</v-list-subheader>
                <template v-for="(data, index) in messages" :key="index">
                  <v-list-item>
                    <template v-slot:prepend>
                      <v-avatar color="grey-darken-1"></v-avatar>
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
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router';
import { db } from '@/firebase/firebase'
import { getDoc, doc } from "firebase/firestore";
import router from '@/router/index'

interface messageType {
  room_id?: string,
  message: string
}

const body = ref('')
const route = useRoute()
const roomId = route.query.room_id
const messages = ref([] as messageType[])
const roomRef = doc(db, 'rooms', `${roomId}`);
const roomDoc = await getDoc(roomRef);
console.log(roomDoc)
if (!roomDoc.data()) {
  console.log('test')
  await router.push('/')
}

const inValid = computed(() => {
  if (!body.value) {
    return true
  }
  return false
})
const cards = ['Today']

const submit = () => {
  messages.value.unshift({
    message: body.value
  })
  body.value = ''
}
const clear = () => {
  body.value = ''
}
</script>