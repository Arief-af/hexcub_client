<template>
  <div class="p-[29px] border border-primary rounded-[39px] w-full">
    <h6 class="text-primary">{{ title }}</h6>
    <div
      class="bg-[#FBF5F2] overflow-hidden w-full h-7 p-5 rounded-full mt-2 relative"
    >
      <!-- center absolute -->
      <div
        :style="{ width: computedWidth }"
        class="absolute left-2 h-[80%] top-1/2 -translate-y-1/2 flex items-center justify-center bg-primary rounded-full"
      >
        <span class="text-sm text-white">{{ persentage }}%</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, defineProps } from "vue";

const props = defineProps({
  persentage: {
    type: Number,
    default: 0,
  },
  title: {
    type: String,
    default: "Title",
  },
});

const computedWidth = computed(() => `calc(${props.persentage}% - 1rem)`);
</script>

<style lang="scss" scoped></style>
