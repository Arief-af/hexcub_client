<template>
  <Layout>
    <section class="px-[40px] md:px-[69px]">
      <Hero id="halaman_utama" data-aos-offset="-200" data-aos="fade-up" data-aos-anchor-placement="center-center" />
      <div
        class="w-full h-full block md:flex gap-20 lg:gap-32 mt-20 justify-center items-stretch"
      >
        <Card data-aos="zoom-out-right" class="w-full md:w-[595px]" />
        <!-- Ensure width is specified, but allow height to stretch -->

        <div
          data-aos="fade-right"
          class="w-full md:w-max flex p-10 items-center lg:justify-center -mt-10 relative"
        >
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
              Belajar coding jadi petualangan seru bagi anak-anak! <br />
              Jelajahi platform interaktif kami!
            </div>
          </section>
        </div>
      </div>

      <Program id="program_kita" />

      <div
        id="faq"
        data-aos="fade-up"
        data-aos-anchor-placement="bottom-bottom"
        class="sidebar-bg flex justify-center items-center p-10 md:p-20 mt-20 dark:bg-[#1E2925] rounded-2xl overflow-hidden bg-[#FBF5F2]"
      >
        <section class="w-full">
          <h4
            class="dark:text-white text-center text-2xl font-bold text-primary"
          >
            FAQ
          </h4>
          <div class="w-full mt-5">
            <Accordion class="w-full dark:text-white" type="single" collapsible>
              <AccordionItem value="item-1" class="mt-4">
                <AccordionTrigger
                  >Apakah hexcub cocok untuk anak saya?</AccordionTrigger
                >
                <AccordionContent>
                  Iya, hexcub cocok untuk anak-anak yang ingin belajar coding atau tertarik dengan teknologi dan matematika.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2" class="mt-4">
                <AccordionTrigger
                  >Apakah saya perlu memiliki pengalaman sebelum menggunakan
                  hexcub?</AccordionTrigger
                >
                <AccordionContent>
                  Tidak, di hexcub kami tidak memerlukan pengalaman sebelumnya.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3" class="mt-4">
                <AccordionTrigger
                  >Apakah ada sesi tatap muka di hexcub?</AccordionTrigger
                >
                <AccordionContent>
                  Ya, ada! Kami menawarkan sesi tatap muka secara online melalui
                  platform Google Meet. Ini memungkinkan anak-anak untuk
                  mendapatkan bimbingan langsung dan menjawab pertanyaan mereka
                  dengan instruktur kami.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>
      </div>

      <div
        data-aos-offset="-300"
        id="contact"
        data-aos="fade-up"
        data-aos-anchor-placement="bottom-bottom"
        class="my-20 bg-primary rounded-lg p-10 md:p-20 text-white"
      >
        <h4 class="text-[22px] font-bold">Hubungi kami</h4>
        <form @submit.prevent="onSendMessage">
          <div class="block md:flex gap-5">
            <FormInput v-model="formData.email" placeholder="Email" class="w-full mt-5">
              <template #label>Email</template>
            </FormInput>
            <FormInput v-model="formData.name" placeholder="Nama Lengkap" class="w-full mt-5">
              <template #label>Nama Lengkap</template>
            </FormInput>
          </div>
          <div class="block md:flex gap-5">
            <FormInput v-model="formData.phone_number" placeholder="No Telp" class="w-full mt-5">
              <template #label>No Telp</template>
            </FormInput>
            <FormInput v-model="formData.subject" placeholder="Judul" class="w-full mt-5">
              <template #label>Judul</template>
            </FormInput>
          </div>
          <TextArea v-model="formData.message" placeholder="Pesan">
            <template #label>Pesan</template>
          </TextArea>
          <div class="flex justify-end">
            <Button type="submit" outline :hover="false" class="w-max py-3 mt-5"
              >Kirim</Button
            >
          </div>
        </form>
      </div>
    </section>
  </Layout>
</template>

<script setup>
import Aos from "aos";

Aos.init();
import Layout from "@/layouts/default/index.vue";
import Hero from "@/components/hero/index.vue";
import Card from "@/components/card/index.vue";
import Program from "@/components/program/index.vue";
import Button from "@/components/button/index.vue";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useAuthStore } from "../../stores/authStore";
import { useLoading } from "vue-loading-overlay";
import { ref } from "vue";
import { useNotificationStore } from "../../stores/notification";

let formData = ref({});
const notif = useNotificationStore();
const $loading = useLoading({});
const authStore = useAuthStore();
const onSendMessage = async () => {
  const loading = $loading.show();
  try {
    await authStore.sendMessage(formData.value);
    formData.value = {};
    notif.showNotification("Pesan terkirim", "success");
  } catch (error) {
    notif.showNotification("Pesan gagal terkirim", "error");
  } finally {
    loading.hide();
  }
};
</script>

<style lang="scss" scoped></style>
