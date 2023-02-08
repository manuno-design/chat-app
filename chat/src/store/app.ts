// Utilities
import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', () => {
  const drawer = ref(false)
  const theme = ref('light')
  const switchDrawer = () => {
    drawer.value = !drawer.value
  }

  const switchTheme = () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light' 
  }

  return { drawer, theme, switchDrawer, switchTheme}
})
