<template>
  <div
    class="p-[19px] cursor-pointer border border-primary flex justify-between rounded-xl w-full"
  >
    <h6 class="dark:text-white">{{ title }}</h6>
    <h6 class="text-primary">{{ duration }} Menit</h6>
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    default: "Title",
  },
  duration: {
    type: String,
    default: "Duration",
  },
  id: {
    type: Number
  },
})
</script>

<style lang="scss" scoped></style>
