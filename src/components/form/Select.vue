<script setup lang="ts">
import { defineProps, defineEmits, ref, computed, watch } from "vue";
import { Check, ChevronsUpDown } from "lucide-vue-next";

import { cn } from "@/components/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    default: "Select Data",
  },
  open: {
    type: Boolean,
    default: false,
  },
  options: {
    type: Array,
    default: () => [
    ],
  },
});

const emit = defineEmits(["update:modelValue", "update:open"]);

const localOpen = ref(props.open);
const localValue = ref(props.modelValue);

// Sync internal `open` state with parent component
watch(
  () => props.open,
  (newValue) => {
    localOpen.value = newValue;
  }
);

// Sync internal `modelValue` with parent component
watch(
  () => props.modelValue,
  (newValue) => {
    localValue.value = newValue;
  }
);

// Emit changes for v-model:open and v-model
watch(localOpen, (newValue) => {
  emit("update:open", newValue);
});

watch(localValue, (newValue) => {
  emit("update:modelValue", newValue);
});

const selectedFrameworkLabel = computed(
  () =>
    props.options.find((framework) => framework.value === localValue.value)
      ?.label || props.placeholder
);
</script>

<template>
  <label class="block text-sm  mt-2 font-medium text-primary">
    <slot name="label"></slot>
  </label>
  <Popover v-model:open="localOpen">
    <PopoverTrigger as-child>
      <Button
        variant="outline"
        role="combobox"
        :aria-expanded="localOpen"
        class="w-full dark:text-white dark:bg-dark-primary border-0 justify-between py-5 rounded-lg mt-2"
      >
        <span
          :class="
            selectedFrameworkLabel === props.placeholder
              ? 'text-neutral-400'
              : ''
          "
          >{{ selectedFrameworkLabel }}</span
        >

        <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-full p-0">
      <Command v-model="localValue">
        <CommandInput :placeholder="props.placeholder" />
        <CommandEmpty>No Data found.</CommandEmpty>
        <CommandList>
          <CommandGroup>
            <CommandItem
              v-for="framework in options"
              :key="framework.value"
              :value="framework.value"
              @select="localOpen = false"
            >
              <Check
                :class="
                  cn(
                    'mr-2 h-4 w-4',
                    localValue === framework.value ? 'opacity-100' : 'opacity-0'
                  )
                "
              />
              {{ framework.label }}
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </PopoverContent>
  </Popover>
</template>
