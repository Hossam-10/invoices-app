<template>
  <div class="pt-6 px-6">
    <div
      class="flex items-center justify-between pb-7 font-bold"
      v-for="item in items"
      :key="item.name"
    >
      <div>
        <p class="mb-3 text-[var(--invoice-details-color)]">{{ item.name }}</p>
        <p>{{ item.quantity }} x ${{ item.price }}</p>
      </div>
      <p class="text-[var(--invoice-details-color)]">${{ item.total }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Item } from "~/types/invoice";

defineProps<{ items: Item[] }>();
</script>
