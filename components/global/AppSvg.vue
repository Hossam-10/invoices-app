<template>
  <svg :width="width" :height="height" :xmlns="xmlns">
    <slot></slot>
  </svg>
</template>

<script setup lang="ts">
defineProps({
  width: {
    type: String,
    required: true,
  },
  height: {
    type: String,
    required: true,
  },
  xmlns: {
    type: String,
    default: "http://www.w3.org/2000/svg",
  },
});
</script>

<style scoped></style>
