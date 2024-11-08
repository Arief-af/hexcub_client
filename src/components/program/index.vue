<template>
  <div class="sidebar-bg overflow-hidden rounded-2xl py-20 mt-20">
    <h4 data-aos="fade-up" class="text-center text-primary text-[22px] font-bold">
      Program
      <span class="underline text-black underline-offset-4 dark:text-white">
        Kita</span
      >
    </h4>
    <div class="flex gap-10 mt-20 justify-center flex-wrap">
      <Card
        :content="true"
        v-for="(item, index) in data"
        data-aos="fade-up"
        :data-aos-duration="index == 0 ? 1000 : index == 1 ? 2000 : 3000"
        :title="item.title"
        :desc="item.desc"
        :key="item.title"
        class="w-[392px] h-max"
      />
    </div>
  </div>
</template>

<script setup>
import Card from "@/components/card/index.vue";
import { ref } from "vue";

const data = ref([
  {
    title: "Tutorial Video Online ",
    desc: "Yuk, tonton video seru di koleksi kami yang mengenalkan dasar-dasar coding dengan cara yang asyik dan interaktif !",
  },
  {
    title: "Google Meet Session",
    desc: "Yuk, ikuti sesi Google Meet seru kami untuk belajar coding langsung bareng mentor, tanya-jawab, dan tantangan coding secara real-time! Cocok untuk semua level.",
  },
  {
    title: "Puzzle Game",
    desc: "Mainkan puzzle seru yang melatih logika dan keterampilan coding dengan cara asyik dan interaktif!",
  },
]);
</script>

<style lang="scss" scoped></style>
