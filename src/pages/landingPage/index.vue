<template>
  <Layout>
    <section class="px-[40px] md:px-[69px]">
      <Hero />
      <div class="w-full h-full block md:flex gap-20 lg:gap-32 mt-20 justify-center items-stretch">
        <Card class="w-full md:w-[595px]" />
        <!-- Ensure width is specified, but allow height to stretch -->

        <div class="w-full md:w-max flex p-10 items-center lg:justify-center -mt-10 relative">
          <section>
            <box-icon
              class="fill-primary hidden md:block w-14 h-14 absolute top-1/2 -translate-x-1/2 -translate-y-1/2 left-0"
              name="chevrons-right"
            ></box-icon>
            <h4 class="dark:text-white text-[22px] font-bold">
              Selamat Datang di
              <span class="text-primary underline underline-offset-4"
                >Hexcub</span
              >
            </h4>
            <div class="mt-5 dark:text-white">
              Belajar coding jadi petualangan seru bagi anak-anak! <br> Jelajahi
              platform interaktif kami!
            </div>
          </section>
        </div>
      </div>

      <Program />

      <div class="sidebar-bg flex justify-center items-center p-10 mt-20 dark:bg-[#1E2925] rounded-2xl overflow-hidden bg-[#FBF5F2]">
        <h4 class="dark:text-white text-2xl font-bold text-primary">
            FAQ
        </h4>
      </div>
    </section>
  </Layout>
</template>

<script setup>
import Layout from "@/layouts/default/index.vue";
import Hero from "@/components/hero/index.vue";
import Card from "@/components/card/index.vue";
import Program from "@/components/program/index.vue";
</script>

<style lang="scss" scoped></style>
