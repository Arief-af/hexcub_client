<script setup>
import { cn } from '@/components/lib/utils';
import { AccordionItem, useForwardProps } from 'radix-vue';
import { computed } from 'vue';

const props = defineProps({
  disabled: { type: Boolean, required: false },
  value: { type: String, required: true },
  asChild: { type: Boolean, required: false },
  as: { type: null, required: false },
  class: { type: null, required: false },
});

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
  <AccordionItem v-bind="forwardedProps" :class="cn('bg-primary py-2 px-5 text-white dark:text-black rounded-lg', props.class)">
    <slot />
  </AccordionItem>
</template>
