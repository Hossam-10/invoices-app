<template>
  <div class="min-h-screen bg-[var(--primary-background)]">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
const mode = useStatefulCookie<string>('mode', 'dark')

useHead({
  htmlAttrs: {
    "data-mode": mode.value as string,
  },
});
</script>

<style lang="scss">
</style>
