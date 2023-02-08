<template>
  <v-app :theme="store.theme">
    <default-bar />
    <default-drawer />
    <default-view />
  </v-app>
</template>

<script lang="ts" setup>
import DefaultBar from './AppBar.vue'
import DefaultView from './View.vue'
import DefaultDrawer from './NavigationDrawer.vue'
import { useAppStore } from '@/store/app';

const store = useAppStore()
</script>
