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
import { db } from '@/firebase/firebase'
import { collection, getDocs } from "firebase/firestore";

interface messageType {
  user_id?: string,
  message: string
}

const body = ref('')
console.log(import.meta.env)
const messages = ref([] as messageType[])
const snapshot = await getDocs(collection(db, 'chats'));
snapshot.forEach(doc => {
  console.log(doc.data())
  messages.value.push(doc.data() as messageType)

})

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