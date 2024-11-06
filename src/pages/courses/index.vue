<template>
  <DashboardLayout>
    <section>
      <h4 class="text-xl font-bold text-primary">Perkembangan Belajar Kamu!</h4>
      <div class="flex gap-5 mt-5 flex-wrap">
        <Progress
          class="md:w-[calc(50%-20px)] w-full"
          v-for="i in 2"
          title="Kelas 1"
          persentage="50"
        />
      </div>
    </section>

    <Section class="mt-10">
      <h4 class="text-xl font-bold text-primary mb-5">Semua Materi</h4>

      <div class="flex justify-end">
        <div class="flex gap-2  dark:bg-[#1D1D1D] rounded-full px-5 py-1 mb-5">
          <FormInput placeholder="Cari materi"></FormInput>
          <Button
            class="mt-2 bg-primary dark:bg-primary rounded-full hover:bg-primary dark:hover:bg-primary"
          >
            <box-icon name="search-alt" class="fill-white z-50"></box-icon>
          </Button>
        </div>
      </div>
      <!-- grid with to columns -->
      <!-- make grid between 2 columns -->

      <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Course
          v-for="i in 4"
          :key="i"
          class="md:w-full w-full"
          title="Kelas 1"
          duration="50"
        />
      </div>
    </Section>
  </DashboardLayout>
</template>

<script setup>
import DashboardLayout from "@/layouts/dashboard/index.vue";
import { Button } from "@/components/ui/button/index.js";
import Course from "@/components/course/index.vue";
import { useRouter } from "vue-router";
import { computed, ref } from "vue";
import Progress from "@/components/progress/index.vue";
const router = useRouter();
const goTo = (path) => {
  router.push({ path: path });
};
</script>

<style lang="scss" scoped></style>
