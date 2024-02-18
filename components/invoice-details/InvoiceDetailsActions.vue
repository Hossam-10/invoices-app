<template>
  <div class="flex w-full">
    <label
      for="my-drawer"
      role="button"
      class="base-button flex items-center bg-[var(--filter-menu-bg)] text-[var(--text-color)] mr-2"
      @click="$emit('editInvoice')"
      >Edit
    </label>
    <AppButton
      classContent="base-button bg-[#ec5757] text-white mr-2"
      @click="$emit('deleteInvoice')"
      >Delete</AppButton
    >
    <AppButton
      v-if="invoiceStatus === 'pending'"
      classContent="base-button bg-[#7c5dfa] text-white"
      @click="$emit('markAsPaid')"
    >
      Mark as Paid
    </AppButton>
  </div>
</template>

<script setup lang="ts">
defineProps({
  invoiceStatus: {
    type: String,
    default: "",
  },
});
defineEmits(["editInvoice", "deleteInvoice", "markAsPaid"]);
</script>
