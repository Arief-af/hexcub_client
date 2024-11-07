<template>
  <div>
    <router-view />
    <Notification
      v-if="notificationStore.notification.show"
      :variant="notificationStore.notification.variant"
    >
      {{ notificationStore.notification.message }}
    </Notification>
  </div>
</template>

<script setup>
import { useNotificationStore } from "./stores/notification";
const notificationStore = useNotificationStore();
import Aos from 'aos';

Aos.init();
</script>
