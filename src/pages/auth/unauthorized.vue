<template>
  <AuthLayout>
    <section class="md:w-[70%] p-10 md:p-0 text-center">
        <div class="text-xl font-bold text-primary mb-2">Akses Ditolak</div>
        Anda Tidak Memiliki Akses Halaman Ini
        <Button @click="$router.go(-1)" class="w-full py-3 mt-4">Kembali</Button>
    </section>
  </AuthLayout>
</template>

<script setup>
import AuthLayout from "@/layouts/auth/index.vue";
import Button from "@/components/button/index.vue";
</script>

<style lang="scss" scoped></style>
