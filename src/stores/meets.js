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
    async post(data) {
       try {
           const resp = await axios.post('/api/meets', data);
           return resp
       } catch (error) {
         throw error
       }
    },
  },
})