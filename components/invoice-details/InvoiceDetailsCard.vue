<template>
  <div class="app-card p-6 mt-4">
    <div class="flex flex-col md:flex-row md:justify-between mb-8">
      <div>
        <p class="font-bold text-[var(--primary-text-color)] mb-2">
          <span class="text-[#7e88c3]">#</span>
          {{ invoice.id }}
        </p>
        <p class="text-[var(--text-color)] mb-8 md:mb-0">
          {{ invoice.description }}
        </p>
      </div>
      <div class="text-[var(--text-color)] leading-[1.125rem] address">
        <p>{{ invoice.senderAddress.street }}</p>
        <p>{{ invoice.senderAddress.city }}</p>
        <p>{{ invoice.senderAddress.postCode }}</p>
        <p>{{ invoice.senderAddress.country }}</p>
      </div>
    </div>

    <div class="flex flex-wrap justify-between mb-10 text-[var(--text-color)]">
      <div class="">
        <div class="mb-8">
          <p class="mb-4">Invoice Date</p>
          <p
            class="text-[1rem] leading-6 font-bold text-[var(--invoice-details-color)]"
          >
            {{ formatDate(invoice.createdAt) }}
          </p>
        </div>
        <div class="mb-8">
          <p class="mb-4">Payment Due</p>
          <p
            class="text-[1rem] leading-6 font-bold text-[var(--invoice-details-color)]"
          >
            {{ formatDate(invoice.paymentDue) }}
          </p>
        </div>
      </div>

      <div class="mb-8">
        <div>
          <p class="mb-4">Bill To</p>
          <p
            class="text-[1rem] leading-6 font-bold text-[var(--invoice-details-color)] mb-3"
          >
            {{ invoice.clientName }}
          </p>
        </div>

        <div class="text-[var(--text-color)] leading-[1.125rem] address">
          <p>{{ invoice.clientAddress.street }}</p>
          <p>{{ invoice.clientAddress.city }}</p>
          <p>{{ invoice.clientAddress.postCode }}</p>
          <p>{{ invoice.clientAddress.country }}</p>
        </div>
      </div>

      <div>
        <p class="mb-4">Sent To</p>
        <p
          class="text-[1rem] leading-6 font-bold text-[var(--invoice-details-color)]"
        >
          {{ invoice.clientEmail }}
        </p>
      </div>
    </div>

    <div
      class="w-full rounded-t-[0.5rem] rounded-b-none bg-[var(--items-table-bg)]"
    >
      <ItemsTable class="hidden md:table" :items="invoice.items" />
      <ItemsDetails class="md:hidden" :items="invoice.items" />
    </div>

    <div
      class="py-8 px-6 flex items-center justify-between rounded-t-none rounded-b-lg bg-[var(--items-total-bg)] text-white"
    >
      <p class="hidden md:block">Amount Due</p>
      <p class="md:hidden">Grand Total</p>
      <p class="text-[1.25rem] font-bold">${{ itemsTotalPrice }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import formatDate from "~/helpers/formatDate";
import type { Invoice } from "~/types/invoice";

const props = defineProps<{ invoice: Invoice }>();

const itemsTotalPrice = computed(() => {
  let total = 0;
  props.invoice?.items.forEach((item) => {
    total += item.total;
  });
  return total;
});
</script>

<style scoped lang="scss">
.address p {
  margin-bottom: 0.25rem;
}
</style>
