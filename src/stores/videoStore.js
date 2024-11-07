import { defineStore } from 'pinia'
import axios from 'axios';
export const useVideoStore = defineStore('video', {
  actions: {
    async post(data) {
       try {
           const resp = await axios.post('/api/videos', data);
           return resp
       } catch (error) {
         throw error
       }
    },
    async getData(page=1, search="") {
       try {
           const resp = await axios.get('/api/videos?page='+page+'&search='+search);
           return resp
       } catch (error) {
         throw error
       }
    },
    async delete(id) {
       try {
           const resp = await axios.delete('/api/videos/'+id);
           return resp
       } catch (error) {
         throw error
       }
    },

    async show (id, data) {
       try {
           const resp = await axios.get('/api/videos/'+id);
           return resp
       } catch (error) {
         throw error
       }
    },

    async update(id, data) {
       try {
           const resp = await axios.post('/api/videos/'+id, data);
           return resp
       } catch (error) {
         throw error
       }
    },

    async getVideoUser(page=1) {
       try {
           const resp = await axios.get('/api/user-videos'+ "?page="+page);
           return resp
       } catch (error) {
         throw error
       }
    },

    async addVideoUser(id_video){
      try {
          const resp = await axios.post('/api/user-videos', id_video);
          return resp
      } catch (error) {
        throw error
      }
    }
  },
})