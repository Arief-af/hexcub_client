<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    aria-modal="true"
    role="dialog"
  >
    <div
      :class="primary ? 'bg-primary' : 'bg-red-500'"
      class="max-h-[420px] h-full rounded-[45px] shadow-lg max-w-lg w-full p-10"
    >
      <main class="flex justify-center items-center h-full">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits, defineProps, watch } from "vue";

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: "Modal Title",
  },
  primary: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(["update:modelValue", "confirm"]);
const isOpen = ref(props.modelValue);

watch(
  () => props.modelValue,
  (newValue) => {
    isOpen.value = newValue;
  }
);

const close = () => {
  isOpen.value = false;
  emit("update:modelValue", false);
};

const confirm = () => {
  emit("confirm");
  close();
};
</script>
