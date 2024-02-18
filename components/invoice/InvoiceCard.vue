<template>
  <div class="invoice-card">
    <div
      class="flex items-center justify-between mb-[1.625rem] md:mb-0 md:mr-8"
    >
      <p class="font-bold text-[var(--primary-text-color)] md:mr-7">
        <span class="text-[#7e88c3]">#</span>
        {{ invoice.id }}
      </p>
      <p class="text-[var(--secondary-text-color)]">
        {{ invoice.clientName }}
      </p>
    </div>
    <div class="flex items-center justify-between w-full md:w-[60%]">
      <div class="md:flex md:items-center md:justify-between md:w-full">
        <p class="text-[.6875rem] mb-2 md:mb-0 text-[var(--text-color)]">
          {{ formatDate(invoice.createdAt) }}
        </p>

        <p class="text-base font-bold text-[var(--total-color)]">
          ${{ invoice.total }}
        </p>
      </div>
      <div class="flex items-center justify-end">
        <InvoiceStatusBadge :invoice-status="invoice.status" />
        <img
          class="hidden md:inline-block ml-4"
          :src="rightArrowIcon"
          alt="Arrow icon for invoice details"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Invoice } from "~/types/invoice";
import rightArrowIcon from "~/assets/images/icon-arrow-right.svg";
import formatDate from "~/helpers/formatDate";

const props = defineProps<{ invoice: Invoice }>();
</script>

<style scoped></style>
