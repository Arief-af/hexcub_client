<template>
  <DashboardLayout>
    <section class="px-2">
      <h4 class="text-xl font-bold text-primary">Live Learning</h4>
      <form @submit.prevent="onSubmit">
        <div class="w-full block gap-3">
          <div class="w-full">
            <FormInput
              v-model="formData.title"
              :marginBottom="true"
              placeholder="Title"
              class="w-full mt-2"
            >
              <template #label>
                <span class="text-primary">Title*</span>
              </template>
            </FormInput>
          </div>
          <div class="w-full">
            <FormInput
              v-model="formData.date"
              :marginBottom="true"
              type="datetime-local"
              placeholder="Tanggal dan Waktu"
              class="w-full mt-2"
            >
              <template #label>
                <span class="text-primary">Tanggal dan Waktu*</span>
              </template>
            </FormInput>
          </div>
          <div class="w-full">
            <FormInput
              v-model="formData.instructor"
              :marginBottom="true"
              type="text"
              placeholder="Tanggal dan Waktu"
              class="w-full mt-2"
            >
              <template #label>
                <span class="text-primary">instructor*</span>
              </template>
            </FormInput>
          </div>
          <div class="w-full">
            <FormInput
              v-model="formData.url"
              :marginBottom="true"
              type="text"
              placeholder="Tanggal dan Waktu"
              class="w-full mt-2"
            >
              <template #label>
                <span class="text-primary">url*</span>
              </template>
            </FormInput>
          </div>
        </div>

        <div class="flex justify-end">
          <Button type="submit" class="w-max py-3 mt-5">Perbarui</Button>
        </div>
      </form>
    </section>
  </DashboardLayout>
</template>

<script setup>
import DashboardLayout from "@/layouts/dashboard/index.vue";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import Button from "@/components/button/index.vue";
import { useLoading } from "vue-loading-overlay";
import { useNotificationStore } from "../../stores/notification";
import { useMeetStore } from "../../stores/meets";

let formData = ref({});
const router = useRouter();

const $loading = useLoading({});
const notificationStore = useNotificationStore();
const meetsStore = useMeetStore();
let errors = ref({});

const fetchData = async () => {
  const loader = $loading.show({});
  try {
    const resp = await meetsStore.getData();
    formData.value = resp.data.data;
  } catch (error) {
    console.log(error);
  } finally {
    loader?.hide?.();
  }
};

const onSubmit = async () => {
  const loader = $loading.show({});
  try {
    const resp = await meetsStore.post(formData.value);
    errors.value = {};
    notificationStore.showNotification("Berhasil diupdate", "success");
    router.push("/courses/admin");
  } catch (error) {
    console.log(error);
    const errorData = error?.response?.data;
    errors.value = errorData?.data || {};
    notificationStore.showNotification(
      errorData?.message || "An error occurred",
      "error"
    );
  } finally {
    loader?.hide?.();
  }
};

onMounted(async () => {
  await fetchData();
});
</script>

<style lang="scss" scoped></style>
