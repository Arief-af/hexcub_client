<template>
  <input
    :id="inputId"
    :type="type"
    :readonly="formReadonly ? true : false"
    :placeholder="placeholder"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    :class="'placaholder:text-white pl-5 pr-[40px] placeholder:text-white read-only:bg-gray-200 w-full p-2 bg-primary border-0 text-white border-primary rounded-full focus:outline-none focus:ring-2 focus:ring-primary ring-primary focus:border-transparent transition duration-200 ease-in-out'"
  />
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  type: {
    type: String,
    default: "text",
  },
  placeholder: {
    type: String,
    default: "",
  },
  modelValue: {
    type: String,
    default: "",
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
