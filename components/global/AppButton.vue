<template>
  <button
    :class="[classContent, { 'cursor-not-allowed': disabled }]"
    :type="type"
    :disabled="disabled || loading"
  >
    <span v-if="loading" class="loading loading-spinner loading-md"></span>
    <slot v-else></slot>
  </button>
</template>

<script setup lang="ts">
defineProps({
  classContent: {
    type: String,
    default: "",
  },
  type: {
    type: String as () => "button" | "submit" | "reset",
    default: "button",
  },
  loading: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});
</script>
