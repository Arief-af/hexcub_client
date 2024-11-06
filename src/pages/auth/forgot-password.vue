<template>
  <AuthLayout>
    <section class="md:w-[70%] p-10 md:p-0">
      <img src="@/assets/images/logo.png" alt="logo" class="w-1/3" />
      <div class="text-2xl text-start mt-5 mb-5 font-semibold text-primary">
        Forgot Password
      </div>
      <div class="text-sm">
        Masukan email anda dan kami akan mengirimkan link reset password
      </div>
      <form @submit.prevent="onSubmit">
        <FormInput
          v-model="formData.email"
          :marginBottom="true"
          placeholder="email"
          class="w-full mt-5"
        >
          <template #label><span class="text-primary">email</span></template>
          <template #error
            ><span class="text-red-500">{{
              errors?.email?.[0]
            }}</span></template
          >
        </FormInput>
        <Button type="submit" class="w-full py-3 mt-2">Submit</Button>
      </form>
    </section>
  </AuthLayout>
</template>

<script setup>
import AuthLayout from "@/layouts/auth/index.vue";
import Button from "@/components/button/index.vue";
import { useRouter, useRoute } from "vue-router";
import { ref, onMounted } from "vue";

import { useLoading } from "vue-loading-overlay";
import { useAuthStore } from "../../stores/authStore";
import { useNotificationStore } from "../../stores/notification";

const notificationStore = useNotificationStore();
const $loading = useLoading({});
const authStore = useAuthStore();
const router = useRouter();
const route = useRoute();

const errors = ref({});
const formData = ref({
  email: '', // Default empty or you can initialize it with a value
});

const onSubmit = async () => {
  const loader = $loading.show({});
  try {
    const resp = await authStore.forgotPassword(formData.value);
    notificationStore.showNotification(resp?.data?.message, "success");
    router.push("/login");
  } catch (error) {
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
</script>
