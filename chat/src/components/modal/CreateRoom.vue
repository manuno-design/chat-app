<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent width="1024">
      <template v-slot:activator="{ props }">
        <v-btn color="primary" v-bind="props">
          Create Room
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">New Room</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field label="RoomName*" v-model="name" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-file-input label="File input" v-model="file" accept="image/*"></v-file-input>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" variant="text" @click="dialog = false">
            Close
          </v-btn>
          <v-btn color="blue-darken-1" variant="text" @click="onSubmit">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { db, storage } from '@/firebase/firebase'
import { ref as firebaseRef, uploadBytes, getDownloadURL, } from '@firebase/storage'
import { addDoc, collection, Timestamp } from '@firebase/firestore';

const dialog = ref(false)
const name = ref('')
const file = ref()
const thumbnailUrl = ref("")

const onSubmit = async () => {
  console.log(file.value[0])
  if (file.value) {
    const filePath = `room/${file.value.name}`
    const fileRef = firebaseRef(storage, filePath)
    await uploadBytes(fileRef, file.value[0]).then((snapshot) => {
      console.log('upload', snapshot)
      getDownloadURL(fileRef).then((url) => {
        thumbnailUrl.value = url
        console.log(thumbnailUrl.value)
        addDoc(collection(db, 'rooms'), {
          name: name.value,
          thumbnailUrl: thumbnailUrl.value,
          created_at: Timestamp.now()
        })
      })
    })
  }
  dialog.value = false
}
</script>