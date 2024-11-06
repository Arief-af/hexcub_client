<template>
  <AuthLayout>
    <section class="md:w-[70%] p-10 md:p-0">
      <img src="@/assets/images/logo.png" alt="logo" class="w-1/3" />
      <div class="text-2xl text-start mt-5 mb-5 font-semibold text-primary">
        Verifikasi Email
      </div>
      <form @submit.prevent="onSubmit">
        <FormInput
          formReadonly
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

        <div class="w-full flex gap-5">
          <section class="w-1/2">
            <FormInput
              v-model="formData.password"
              type="text"
              placeholder="Password"
              class="w-full"
            >
              <template #label
                ><span class="text-primary">Password</span></template
              >
              <template #error
                ><span class="text-red-500">{{
                  errors?.password?.[0]
                }}</span></template
              >
            </FormInput>
          </section>
          <section class="w-1/2">
            <FormInput
              v-model="formData.password_confirmation"
              type="text"
              placeholder="Konfirmasi Password"
              class="w-full"
            >
              <template #label
                ><span class="text-primary">Konfirmasi Password</span></template
              >
            </FormInput>
          </section>
        </div>
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
  email: "", // Default empty or you can initialize it with a value
  token: "", // Default empty or initialize if needed
  password: "", // Default empty or you can initialize it with a value
  password_confirmation: "",
});

// Extract 'email' and 'hash' from query parameters
onMounted(() => {
  formData.value.email = route.query.email || ""; // fallback to empty if not present
  formData.value.token = route.query.token || ""; // fallback to empty if not present
});

const onSubmit = async () => {
  const loader = $loading.show({});
  try {
    const resp = await authStore.resetPassword(formData.value);
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
