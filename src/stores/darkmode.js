import { defineStore } from 'pinia'
export const useDarkModeStore = defineStore('darkmode', {
  state: () => ({
    darkMode: false
  }),
  actions: {
    toggle() {
       try {
           this.darkMode = !this.darkMode
           document.documentElement.classList.toggle("dark", this.darkMode);
       } catch (error) {
         throw error
       }
    },
  },
})