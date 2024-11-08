<template>
  <DashboardLayout>
    <section>
      <h4 class="text-xl font-bold text-primary">Kelola Materi!</h4>
      <div class="flex items-center justify-between">
        <Button class="bg-primary hover:bg-primary" @click="$router.push('/courses/create')">Tambah Materi</Button>
        <div class="flex gap-2 dark:bg-[#1D1D1D] rounded-full px-5 py-1 mb-5">
          <FormInput v-model="search" placeholder="Cari materi"></FormInput>
          <Button
            @click="fetchData()"
            v-model="search"
            class="mt-2 bg-primary dark:bg-primary rounded-full hover:bg-primary dark:hover:bg-primary"
          >
            <box-icon name="search-alt" class="fill-white z-50"></box-icon>
          </Button>
        </div>
      </div>
      <div class="w-full">
        <Table
          :sortable="true"
          :data="data"
          :headers="[
            'id',
            'Video',
            'Title',
            'Duration',
            'Materi',
            'Created_at',
            'Updated_at',
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
                      Apakah anda yakin ingin menghapus kelas {{ row.title }}?
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
              <Button
                @click="$router.push('/courses/' + row.id + '/edit')"
                class="py-2 px-2"
                >Edit</Button
              >
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
              <box-icon class="dark:fill-white" name="chevron-left"></box-icon>
            </template>
            <template #next-nav>
              <box-icon class="dark:fill-white" name="chevron-right"></box-icon>
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
import { useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import { useLoading } from "vue-loading-overlay";
import { useVideoStore } from "../../stores/videoStore";

const $loading = useLoading({});
const videoStore = useVideoStore();

const getFullUrl = (url) => {
  return import.meta.env.VITE_API_URI + "/" + url;
};

let search = ref("");
let pagination = ref([]);
const fetchData = async (page = 1) => {
  const loader = $loading.show({});
  try {
    const resp = await videoStore.getData(page, search.value);
    console.log(resp.data.data);
    pagination.value = resp.data.data;
    data.value = resp.data.data.data.map((item) => ({
      id: item.id,
      file: getFullUrl(item.file),
      title: item.title,
      duration: item.duration,
      materi: item.materi,
      created_at: item.created_at,
      updated_at: item.updated_at,
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
    const resp = await videoStore.delete(id);
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
