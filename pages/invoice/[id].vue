<template>
  <div>
    <AppButton
      class-content="border-none flex items-center mb-8"
      @click="goBack"
    >
      <img
        class="rotate-180 mr-4"
        alt="go back button icon"
        :src="goBackIcon"
      />
      <span class="font-bold text-[var(--primary-text-color)]">Go back</span>
    </AppButton>

    <InvoiceDetailsStatus
      :invoice="invoice"
      @editInvoice="setShowInvoiceForm(true)"
      @deleteInvoice="openDeleteDialog"
      @markAsPaid="markInvoiceAsPaid"
    />

    <InvoiceDetailsCard :invoice="invoice" />

    <div
      class="w-full h-20 fixed bottom-0 right-0 left-0 flex md:hidden items-center justify-center bg-[var(--common-bg)]"
    >
      <InvoiceDetailsActions
        class="justify-center"
        :invoiceStatus="invoice.status"
        @editInvoice="setShowInvoiceForm(true)"
        @deleteInvoice="openDeleteDialog"
        @markAsPaid="markInvoiceAsPaid"
      />
    </div>

    <!--Edit invoice-->
    <AppDrawer
      @setShowInvoiceForm="setShowInvoiceForm"
      v-slot="{ closeDrawer }"
    >
      <LazyInvoiceForm
        v-if="showInvoiceForm"
        :formValues="invoice"
        @closeInvoiceForm="closeInvoiceForm(closeDrawer)"
      />
    </AppDrawer>

    <AppDialog ref="deleteDialog" v-bind="dialogProps">
      <AppButton
        classContent="base-button mr-4 bg-[#252945] text-white"
        type="submit"
        >Cancel</AppButton
      >
      <AppButton
        classContent="base-button bg-[#ec5757] text-white"
        type="submit"
        @click="deleteInvoiceReq"
        >Delete</AppButton
      >
    </AppDialog>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import type { Invoice } from "~/types/invoice";
import {
  getInvoice,
  deleteInvoice,
  editInvoice,
} from "~/services/invoice.service";
import goBackIcon from "~/assets/images/icon-arrow-right.svg";
import AppDialog from "~/components/global/AppDialog.vue";

const route = useRoute();
const router = useRouter();
const { $toast } = useNuxtApp();

const { data } = await useFetchWithCache<Invoice>(
  getInvoice({ id: route.params.id as string })
);
const invoice = computed(() => data.value?.data ?? ({} as Invoice));

useHead({
  title: invoice.value.id ? `Invoice #${invoice.value.id} | Invoice App` : "",
});

const goBack = () => {
  router.back();
};

//Handle edit form
const showInvoiceForm = ref(false);
const setShowInvoiceForm = (val: boolean) => {
  showInvoiceForm.value = val;
};
const closeInvoiceForm = (closeDrawerFunction: Function) => {
  setShowInvoiceForm(false);
  closeDrawerFunction();
};

//handle delete invoice and its dialog
const deleteDialog = ref<typeof AppDialog | null>(null);
const openDeleteDialog = () => {
  deleteDialog.value!.openDialog();
};
const dialogProps = computed(() => ({
  title: "Delete Invoice",
  content: `Are you sure you want to delete invoice ${invoice.value.id}? This action cannot be undone`,
}));
const deleteInvoiceReq = async () => {
  try {
    await useOfetch(deleteInvoice({ id: invoice.value.id }));
    $toast.success("Invoice is deleted successfully");
    clearNuxtData("invoices");
    router.push("/");
  } catch {}
};

//mark invoice as paid
const markInvoiceAsPaid = async () => {
  try {
    await useOfetch(
      editInvoice({ data: { ...invoice.value, status: "paid" } })
    );
    refreshNuxtData(`invoice${invoice.value.id}`);
    clearNuxtData("invoices");
    $toast.success("Invoice is marked as paid successfully");
  } catch {}
};
</script>
