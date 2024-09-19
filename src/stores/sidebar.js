import { defineStore } from 'pinia'
export const useSidebarStore = defineStore('sidebar', {
  state: () => ({
    sidebar: true
  }),
  actions: {
    toggle() {
       try {
           this.sidebar = !this.sidebar
       } catch (error) {
         throw error
       }
    },
  },
})