<template>
  <DashboardLayout>
    <section>
      <h4 class="text-xl font-bold text-primary">Kotak Masuk</h4>
      <div class="flex items-center justify-end">
        <div class="flex gap-2 dark:bg-[#1D1D1D] rounded-full px-5 py-1 mb-2">
          <FormInput v-model="search" placeholder="Cari Judul Pesan"></FormInput>
          <Button
            @click="fetchData()"
            v-model="search"
            class="mt-2 bg-primary dark:bg-primary rounded-full hover:bg-primary dark:hover:bg-primary"
          >
            <svg class="fill-white z-50" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z"/><path d="M11.412 8.586c.379.38.588.882.588 1.414h2a3.977 3.977 0 0 0-1.174-2.828c-1.514-1.512-4.139-1.512-5.652 0l1.412 1.416c.76-.758 2.07-.756 2.826-.002z"/></svg>
          </Button>
        </div>
      </div>
      <div class="w-full">
        <Table
          :sortable="true"
          :data="data"
          :headers="[
            'id',
            'Judul',
            'Nama Lengkap',
            'Email',
            'No Telp',
            'Pesan',
            'Created_at',
          ]"
          :action="true"
        >
          <template #cell-file="{ row }">
            <video
              :src="row.file"
              controls
              class="w-full mt-2 rounded-lg"
            ></video>
          </template>
          <template #action="{ row }">
            <div class="flex gap-2">
              <Dialog>
                <DialogTrigger as-child>
                  <Button @click.stop  class="py-2 px-2"
                    >Delete</Button
                  >
                </DialogTrigger>
                <DialogContent
                  class="w-max max-w-[300px] h-max flex items-center justify-center"
                >
                  <section>
                    <div class="text-primary my-5 text-md">
                      Apakah anda yakin ingin menghapus pesan ini? {{ row.subject }}?
                    </div>
                    <div class="flex gap-2 justify-start">
                      <DialogClose as-child>
                        <Button
                          type="button"
                          class="h-max py-2 w-full bg-red-800 hover:bg-red-900"
                          >Batal</Button
                        >
                      </DialogClose>
                      <DialogClose as-child>
                        <Button
                          @click="onDelete(row.id)"
                          class="h-max py-2 w-full"
                          >Ya</Button
                        >
                      </DialogClose>
                    </div>
                  </section>
                </DialogContent>
              </Dialog>
            </div>
          </template>
        </Table>
        <div class="flex justify-center">
          <TailwindPagination
            class="mx-auto mt-5 flex-wrap"
            :data="pagination"
            @pagination-change-page="fetchData"
            :item-classes="[
              'bg-secondary',
              'dark:bg-[#1D1D1D]',
              'dark:text-white',
              'dark:border-none',
            ]"
            :active-classes="[
              'bg-primary',
              'text-white',
              'dark:text-white',
              'border-secondary',
              'dark:border-none',
            ]"
          >
            <template #prev-nav>
              <svg class="dark:fill-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M13.293 6.293 7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z"/></svg>
            </template>
            <template #next-nav>
              <svg class="dark:fill-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"/></svg>
            </template>
          </TailwindPagination>
        </div>
      </div>
    </section>
  </DashboardLayout>
</template>

<script setup>
import DashboardLayout from "@/layouts/dashboard/index.vue";
import { Button } from "@/components/ui/button/index.js";
import { onMounted, ref } from "vue";
import { useLoading } from "vue-loading-overlay";
import { useAuthStore } from "@/stores/authStore";

const $loading = useLoading({});
const authStore = useAuthStore();

let search = ref("");
let pagination = ref([]);
const fetchData = async (page = 1) => {
  const loader = $loading.show({});
  try {
    const resp = await authStore.getMessage(page, search.value);
    console.log(resp.data.data);
    pagination.value = resp.data.data;
    data.value = resp.data.data.data.map((item) => ({
      id: item.id,
      subject: item.subject,
      name: item.name,
      email: item.email,
      phone_number: item.phone_number,
      message: item.message,
      created_at: item.created_at,
    }));
  } catch (error) {
    console.log(error);
  } finally {
    loader.hide();
  }
};

const notificationStore = useNotificationStore();

const onDelete = async (id) => {
  const loader = $loading.show({});
  try {
    const resp = await authStore.deleteMessage(id);
    notificationStore.showNotification(resp?.data?.message, "success");
    fetchData();
  } catch (error) {
    console.log(error);
  } finally {
    loader.hide();
  }
};

import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { useNotificationStore } from "../../stores/notification";

onMounted(() => {
  fetchData();
});
let data = ref([]);
</script>

<style lang="scss" scoped></style>
