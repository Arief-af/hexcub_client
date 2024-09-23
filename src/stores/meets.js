import { defineStore } from 'pinia'
import axios from 'axios';
export const useMeetStore = defineStore('meet', {
  actions: {
    async getData() {
       try {
           const resp = await axios.get('/api/meets');
           return resp
       } catch (error) {
         throw error
       }
    },
  },
})