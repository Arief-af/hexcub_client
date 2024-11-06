<template>
    <button
      :class="[outline ? outlineVariant : baseVariant, hover ? 'hover:bg-primary hover:text-white' : '']"
      class="px-[50px] rounded-lg"
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
  
  const baseVariant = ref('bg-primary transition-all text-white');
  const outlineVariant = ref('border text-primary transition-all border-[#0C3E7C] bg-[#F3F6F8]');
  
  </script>
  
  <style lang="scss" scoped></style>
  