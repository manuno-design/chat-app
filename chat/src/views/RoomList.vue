<template>
  <v-main>
    <v-container>
      <CreateRoom />
      <v-row>
        <v-col v-for="room in rooms" :key="room.id" cols="4">
          <router-link :to="{ path: '/chat', query: { room_id: room.id } }">
            <v-avatar color="grey-lighten-2" size="128">
              <v-icon icon="mdi-account-circle" v-if="!room.thumbnailUrl" />
              <v-img :src="room.thumbnailUrl" alt="" cover v-if="room.thumbnailUrl" />
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
  id: string,
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
    const data = { ...doc.data() }
    data.id = doc.id
    console.log(data.id)
    rooms.value.push(data as roomType)
  })

}
</script>
