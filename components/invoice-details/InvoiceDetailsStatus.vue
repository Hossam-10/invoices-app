<template>
  <div class="app-card flex items-center justify-between p-8">
    <div
      class="w-full md:w-auto flex justify-between md:justify-start items-center"
    >
      <p class="text-[var(--secondary-text-color)]">Status</p>
      <InvoiceStatusBadge :invoice-status="invoice.status" />
    </div>
    <div class="hidden md:block">
      <InvoiceDetailsActions
        :invoiceStatus="invoice.status"
        @editInvoice="$emit('editInvoice')"
        @deleteInvoice="$emit('deleteInvoice')"
        @markAsPaid="$emit('markAsPaid')"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Invoice } from "~/types/invoice";

defineProps<{ invoice: Invoice }>();
defineEmits(["editInvoice", "deleteInvoice", "markAsPaid"]);
</script>
