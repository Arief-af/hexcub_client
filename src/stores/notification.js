import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useNotificationStore = defineStore('notification', () => {
  const notification = ref({ show: false, message: '', variant: 'warning' });

  const showNotification = (message, variant = 'info') => {
    notification.value = { show: true, message, variant };
    setTimeout(() => {
      notification.value.show = false;
    }, 3000);
  };

  return { notification, showNotification };
});
