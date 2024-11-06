<template>
  <div :class="marginBottom ? 'mb-3' : ''">
    <label v-if="label" :for="inputId" class="block text-sm font-medium text-white">
      <slot name="label"></slot>
    </label>
    <div :class="telp ? 'flex mt-2' : 'mt-2'">
      <!-- Conditional Prefix +62 -->
      <span v-if="telp"
        class="inline-flex read-only:bg-gray-200 items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm dark:bg-[#1D1D1D] dark:border-gray-600">
        +62
      </span>
      <!-- Input field -->
      <input
        :id="inputId"
        :type="type"
        :readonly="formReadonly ? true : false"
        :placeholder="placeholder"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        :class="telp ? 'w-full p-2 read-only:bg-gray-200 bg-white dark:bg-[#1D1D1D] text-gray-700 border dark:border-0 dark:text-white border-gray-300 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-[#055F82] focus:border-transparent transition duration-200 ease-in-out'
                : 'read-only:bg-gray-200 w-full p-2 bg-white dark:bg-[#1D1D1D] text-gray-700 border dark:border-0 dark:text-white border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#055F82] focus:border-transparent transition duration-200 ease-in-out'"
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
  type: {
    type: String,
    default: 'text',
  },
  placeholder: {
    type: String,
    default: '',
  },
  modelValue: {
    type: String,
    default: '',
  },
  label: {
    type: Boolean,
    default: true,
  },
  error: {
    type: Boolean,
    default: true,
  },
  marginBottom: {
    type: Boolean,
    default: false,
  },
  formReadonly: {
    type: Boolean,
    default: false,
  },
  telp: {
    type: Boolean, // This determines whether to show the +62 or not
    default: false,
  },
});

const inputId = ref(`input-${Math.random().toString(36).substr(2, 9)}`);
</script>
