<template>
  <table class="w-full p-8">
    <thead>
      <tr>
        <td v-for="header in tableHeaders" :key="header">{{ header }}</td>
      </tr>
    </thead>

    <tbody>
      <tr v-for="item in items" :key="item.name">
        <td class="text-[0.75rem] text-[var(--invoice-details-color)]">
          {{ item.name }}
        </td>
        <td>{{ item.quantity }}</td>
        <td>${{ item.price }}</td>
        <td>${{ item.total }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import type { Item } from "~/types/invoice";

defineProps<{ items: Item[] }>();
const tableHeaders: string[] = ["Item Name", "QTY.", "Price", "Total"];
</script>

<style scoped lang="scss">
thead::after {
  content: "";
  height: 1rem;
  display: table-row;
}
tbody td {
  font-weight: 700;
}
</style>
