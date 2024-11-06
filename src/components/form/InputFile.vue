<template>
  <div :class="marginBottom ? 'mb-3' : ''">
    <label v-if="label" :for="inputId" class="block text-sm font-medium text-white">
      <slot name="label"></slot>
    </label>
    <div class="mt-2">
      <input
        :id="inputId"
        type="file"
        @change="onFileChange"
        class="w-full p-2 bg-white dark:bg-[#1D1D1D] text-gray-700 border dark:border-0 dark:text-white border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#055F82] focus:border-transparent transition duration-200 ease-in-out"
      />
    </div>
    <div v-if="error" class="my-3 text-sm text-red-500">
      <slot name="error"></slot>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  label: {
    type: Boolean,
    default: true,
  },
  error: {
    type: Boolean,
    default: false,
  },
  marginBottom: {
    type: Boolean,
    default: false,
  },
});

const inputId = ref(`input-${Math.random().toString(36).substr(2, 9)}`);

const emit = defineEmits(['update:modelValue']);

const onFileChange = (event) => {
  const file = event.target.files[0];
  emit('update:modelValue', file); 
};
</script>
