<template>
  <v-main>
    <v-container>
      <CreateRoom />
      <v-row>
        <v-col v-for="(data, index) in rooms" :key="index" cols="4">
          <router-link :to="{ path: '/chat', query: { room_id: index } }">
            <v-avatar color="grey-lighten-2" size="128">
              <v-icon icon="mdi-account-circle" v-if="!data.thumbnailUrl" />
              <v-img :src="data.thumbnailUrl" alt="" cover v-if="data.thumbnailUrl" />
            </v-avatar>
          </router-link>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { db } from '@/firebase/firebase'
import { collection, getDocs, Timestamp } from "firebase/firestore";
import CreateRoom from '@/components/modal/CreateRoom.vue'

interface roomType {
  name: string,
  thumbnailUrl: string,
  created_at: Timestamp
}
onMounted(() => {
  getRooms()
})

const rooms = ref([] as roomType[])
const getRooms = async () => {
  rooms.value = []
  const snapshot = await getDocs(collection(db, 'rooms'));
  snapshot.forEach(doc => {
    rooms.value.push(doc.data() as roomType)
  })

}
</script>
