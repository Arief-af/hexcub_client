<template>
  <div class="mb-4">
    <label :for="inputId" class="block text-sm font-medium text-white">
      <slot name="label"></slot>
    </label>
    <textarea
      :id="inputId"
      :placeholder="props.placeholder"
      :value="modelValue"
      :readonly="formReadonly ? true : false"
      @input="$emit('update:modelValue', $event.target.value)"
      class="read-only:bg-gray-200 dark:bg-[#1D1D1D] mt-2 w-full p-3 dark:bg-dark-primary dark:border-none dark:text-white bg-white text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#055F82] focus:border-transparent transition duration-200 ease-in-out h-32 resize-none"
    >
    </textarea>
    <div class="mt-1 text-sm text-red-500">
      <slot name="error"></slot>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  placeholder: {
    type: String,
    default: ''
  },
  modelValue: {
    type: String,
    default: ''
  },
  formReadonly: {
    type: Boolean,
    default: false
  }
});

const inputId = ref(`input-${Math.random().toString(36).substr(2, 9)}`);
</script>
