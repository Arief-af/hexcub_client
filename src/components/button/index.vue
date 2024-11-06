<template>
    <button
      :class="[outline ? outlineVariant : baseVariant, hover ? 'hover:bg-primary hover:text-white' : '']"
      class="px-[50px]"
    >
      <slot />
    </button>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const props = defineProps({
    outline: {
      type: Boolean,
      default: false,
    },
    hover: {
      type: Boolean,
      default: true,
    }
  });
  
  const baseVariant = ref('bg-primary transition-all text-white rounded-lg');
  const outlineVariant = ref('text-primary dark:bg-[#1D1D1D] transition-all bg-white rounded-full');
  
  </script>
  
  <style lang="scss" scoped></style>
  