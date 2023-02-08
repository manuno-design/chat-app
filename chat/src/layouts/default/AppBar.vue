<template>
  <v-app-bar flat>
    <v-app-bar-nav-icon @click="store.switchDrawer" />
    <v-app-bar-title>
      チャット
    </v-app-bar-title>
    
    <template v-slot:append>
      <v-switch
        v-model="store.theme"
        true-value="dark"
        false-value="light"
        inset
        prepend-icon="mdi-weather-sunny"
        append-icon="mdi-weather-night"

      />
    </template>
  </v-app-bar>
</template>

<script lang="ts" setup>
import { useAppStore } from '@/store/app';
const store = useAppStore()
</script>
