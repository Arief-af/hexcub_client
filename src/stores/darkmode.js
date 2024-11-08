import { set } from '@vueuse/core';
import { defineStore } from 'pinia'
// test 2
export const useDarkModeStore = defineStore('darkmode', {
  state: () => ({
    darkMode: false
  }),
  actions: {
    setDarkMode() {
      try {
        if (this.darkMode) {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      } catch (error) {
        throw error
      }
    },
    toggle() {
       try {
           this.darkMode = !this.darkMode
           document.documentElement.classList.toggle("dark", this.darkMode);
       } catch (error) {
         throw error
       }
    },
  },
  persist: true,
});