<template>
  <section class="p-6 rounded-lg bg-white dark:bg-[#101010]">
    <div class="relative overflow-x-auto sm:rounded-lg">
      <table
        class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
      >
        <thead
          class="text-xs z-10 text-gray-700 uppercase bg-[#FBFBFB] dark:bg-[#1D1D1D] dark:text-gray-400"
        >
          <tr>
            <th
              v-for="(header, index) in headers"
              :key="index"
              scope="col"
              class="px-6 py-3"
            >
              {{ header }}
            </th>
            <th v-if="action"></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(row, rowIndex) in data"
            :key="rowIndex"
            class="bg-white dark:bg-[#101010]"
          >
            <!-- Loop through each cell in the row -->
            <td
              v-for="(cell, cellIndex) in row"
              :key="cellIndex"
              class="px-6 py-4"
            >
              <!-- Check if a scoped slot exists for this header index -->
              <slot :name="`cell-${cellIndex}`" :row="row" :cell="cell">
                {{ cell }} 
              </slot>
            </td>
            <th v-if="action"><slot name="action" :row="row"></slot></th>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  headers: {
    type: Array,
    required: true,
  },
  data: {
    type: Array,
    required: true,
  },
  action: {
    type: Boolean,
    default: false,
  },
});
</script>
