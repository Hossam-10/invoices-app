<template>
  <div>
    <InvoiceFilter
      class="mb-[2.25rem]"
      :numberOfInvoices="numOfInvoices"
      @setFilter="setInvoicesFilter"
      @setShowInvoiceForm="setShowInvoiceForm"
    />
    <div v-for="invoice in filteredInvoices" :key="invoice.id">
      <NuxtLink :to="`/invoice/${invoice.id}`">
        <InvoiceCard :invoice="invoice" />
      </NuxtLink>
    </div>

    <AppDrawer
      @setShowInvoiceForm="setShowInvoiceForm"
      v-slot="{ closeDrawer }"
    >
      <LazyInvoiceForm
        v-if="showInvoiceForm"
        @setInvoiceData="setInvoiceData($event, closeDrawer)"
        @closeInvoiceForm="closeInvoiceForm(closeDrawer)"
      />
    </AppDrawer>
  </div>
</template>

<script lang="ts" setup>
import { getAllInvoices } from "~/services/invoice.service";
import type { Invoice } from "~/types/invoice";
import favIcon from "~/assets/images/favicon-32x32.png";

useHead({
  link: [{ rel: "icon", href: favIcon }],
  title: "Home | Invoice App",
});

const invoicesFilterArr = ref<string[]>([]);
const showInvoiceForm = ref(false);

const { data } = await useFetchWithCache<Invoice[]>(getAllInvoices());
const invoices = computed(() => data.value?.data || []);
const numOfInvoices = computed(() => invoices.value.length);

//handle filter changes
const setInvoicesFilter = (filterArr: string[]) => {
  invoicesFilterArr.value = filterArr;
};
const filteredInvoices = computed(() => {
  if (!invoicesFilterArr.value.length) {
    return invoices.value;
  }
  return invoices.value.filter((invoice: Invoice) =>
    invoicesFilterArr.value.includes(invoice.status)
  );
});

const setShowInvoiceForm = (val: boolean) => {
  showInvoiceForm.value = val;
};
const closeInvoiceForm = (closeDrawerFunction: Function) => {
  setShowInvoiceForm(false);
  closeDrawerFunction();
};
const setInvoiceData = (invoice: Invoice, closeDrawerFunction: Function) => {
  data.value!.data.push(invoice);
  closeInvoiceForm(closeDrawerFunction);
};
</script>
