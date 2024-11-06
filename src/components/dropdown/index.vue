<template>
  <div class="relative">
    <button
      @click="handleDropdownClick"
      class="flex items-center justify-between w-full py-2 text-primary font-semibold text-[16px] rounded "
    >
      {{ title }}
      <svg
        class="w-2.5 h-2.5 ms-2.5"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 10 6"
      >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="m1 1 4 4 4-4"
        />
      </svg>
    </button>

    <!-- Dropdown menu -->
    <div
      v-if="isDropdownOpen"
      class="absolute left-1/2 transform -translate-x-1/2 mt-2 z-10 font-normal bg-white divide-gray-100 rounded-lg shadow w-44 hover:dark:bg-[#262626] dark:bg-[#262626]"
    >
      <ul class="py-2 text-sm text-primary">
        <li v-for="item in items" :key="item.label">
          <a
            :href="item.link"
            class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >{{ item.label }}</a
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

// Props for the dropdown component
const props = defineProps({
  title: {
    type: String,
    default: "Dropdown",
  },
  items: {
    type: Array,
    default: () => [],
  },
  dropdownIndex: {
    type: Number,
    required: true,
  },
  activeDropdown: {
    type: Number,
    required: true,
  },
  setActiveDropdown: {
    type: Function,
    required: true,
  },
});

// Ref to control dropdown visibility
const isDropdownOpen = ref(false);

// Toggle dropdown visibility
const handleDropdownClick = () => {
  if (props.activeDropdown === props.dropdownIndex) {
    props.setActiveDropdown(null); // Close if already open
  } else {
    props.setActiveDropdown(props.dropdownIndex); // Open current dropdown
  }
};

// Watch for activeDropdown changes to open/close this dropdown
watch(
  () => props.activeDropdown,
  (newVal) => {
    isDropdownOpen.value = newVal === props.dropdownIndex;
  }
);
</script>

<style scoped></style>
