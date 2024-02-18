<template>
  <div class="px-6">
    <AppButton
      class-content="d-block md:hidden border-none flex items-center mb-8"
      @click="$emit('closeInvoiceForm')"
    >
      <img
        class="rotate-180 mr-4"
        alt="go back button icon"
        :src="goBackIcon"
      />
      <span class="font-bold text-[var(--primary-text-color)]">Go back</span>
    </AppButton>

    <h1 v-if="!isEdit" class="group-header">New Invoice</h1>
    <h1 v-else class="font-bold mb-6 text-[var(--invoice-details-color)]">
      Edit <span class="text-[#7e88c3] text-[2rem]">#</span>{{ formValues!.id }}
    </h1>

    <ValidationForm
      v-slot="{ values }"
      @submit="onSubmit"
      :initialValues="initialValues"
    >
      <p class="group-header">Bill From</p>
      <InputField
        label="street address"
        name="senderAddress.street"
        validation="required"
      />
      <div class="grid grid-cols-2 md:grid-cols-3 gap-x-2 mt-6 mb-6">
        <InputField
          label="city"
          name="senderAddress.city"
          validation="required"
        />
        <InputField
          label="post code"
          name="senderAddress.postCode"
          validation="required"
        />
        <InputField
          label="country"
          name="senderAddress.country"
          validation="required"
        />
      </div>
      <p class="group-header">Bill To</p>
      <InputField
        class="mb-6"
        label="client's name"
        name="clientName"
        validation="required"
      />
      <InputField
        class="mb-6"
        label="client's email"
        name="clientEmail"
        validation="required|email"
      />
      <InputField
        class="mb-6"
        label="street address"
        name="clientAddress.street"
        validation="required"
      />
      <div class="grid grid-cols-2 md:grid-cols-3 gap-x-2 mb-6">
        <InputField
          label="city"
          name="clientAddress.city"
          validation="required"
        />
        <InputField
          label="post code"
          name="clientAddress.postCode"
          validation="required"
        />
        <InputField
          label="country"
          name="clientAddress.country"
          validation="required"
        />
      </div>

      <Field
        name="paymentDue"
        rules="required"
        v-slot="{ field, handleChange }"
      >
        <VDatePicker
          :isDark="mode === 'dark'"
          :modelValue="values.paymentDue"
          @update:modelValue="handleChange"
          @blur="handleChange"
        >
          <template #default="{ togglePopover }">
            <label class="text-xs d-block mb-3">Invoice Date</label>
            <div class="relative h-12" @click="togglePopover">
              <input
                class="input input-bordered w-full h-full rounded px-4 font-bold text-xs cursor-pointer !bg-[var(--input-bg)] text-[#888eb0] focus:outline-none focus:border-[#7c5dfa]"
                type="text"
                readonly
                label="Invoice Date"
                :name="field.name"
                :value="
                  values.paymentDue ? formatDate(values.paymentDue) : null
                "
              />
              <img
                class="absolute right-[5%] top-[15px] cursor-pointer"
                :src="calendarIcon"
                alt="date icon"
              />
            </div>
          </template>
        </VDatePicker>
        <ErrorMessage name="paymentDue" class="text-error text-xs mt-1" />
      </Field>

      <InputField
        class="my-6"
        label="project description"
        name="description"
        validation="required"
      />

      <ItemsList ref="itemsList" />

      <div
        class="flex items-center flex-col md:flex-row md:justify-between pb-8 gap-2"
      >
        <label
          class="base-button flex items-center justify-center bg-[var(--items-table-bg)] text-[var(--text-color)]"
          for="my-drawer"
          aria-label="close sidebar"
          role="button"
          @click="$emit('closeInvoiceForm')"
          >Discard</label
        >
        <div class="flex flex-col md:flex-row items-center">
          <AppButton
            classContent="action-button bg-[#373b53] text-[var(--secondary-text-color)] mb-2 md:mb-0"
            @click="onSubmit(values as Invoice, undefined, true)"
            >Save as Draft</AppButton
          >
          <AppButton
            classContent="action-button bg-[#7c5dfa] text-white md:ml-2"
            type="submit"
            >Save & Send</AppButton
          >
        </div>
      </div>
    </ValidationForm>
  </div>
</template>

<script setup lang="ts">
import calendarIcon from "~/assets/images/icon-calendar.svg";
import formatDate from "~/helpers/formatDate";
import { addInvoice, editInvoice } from "~/services/invoice.service";
import type { Invoice, Item } from "~/types/invoice";
import goBackIcon from "~/assets/images/icon-arrow-right.svg";

const props = defineProps({
  formValues: {
    type: Object as PropType<Invoice>,
    required: false,
  },
});
const emit = defineEmits(["closeInvoiceForm", "setInvoiceData"]);
const { $toast } = useNuxtApp();

const mode = useStatefulCookie("mode");
const itemsList = ref();

//handle edit invoice
const initialValues = reactive({
  id: props.formValues?.id || null,
  paymentDue: props.formValues?.paymentDue || "",
  description: props.formValues?.description || "",
  clientEmail: props.formValues?.clientEmail || "",
  clientName: props.formValues?.clientName,
  status: props.formValues?.status || "",
  senderAddress: {
    street: props.formValues?.senderAddress.street,
    city: props.formValues?.senderAddress.city,
    postCode: props.formValues?.senderAddress.postCode,
    country: props.formValues?.senderAddress.country,
  },
  clientAddress: {
    street: props.formValues?.clientAddress.street,
    city: props.formValues?.clientAddress.city,
    postCode: props.formValues?.clientAddress.postCode,
    country: props.formValues?.clientAddress.country,
  },
  items: props.formValues?.items || [{ total: 0 }],
  total: 0,
});
const isEdit = computed(() => !!props.formValues);

//handling add and update invoice
const onSubmit = (invoiceFormData: Invoice, _?: any, isDraft = false) => {
  const requestBody = { ...invoiceFormData };
  requestBody.items.forEach((item: Item, index) => {
    requestBody.total += Number(item.total);
    requestBody.items[index] = { ...item, price: Number(item.price) };
  });
  requestBody.status = isDraft ? "draft" : "pending";
  requestBody.createdAt = new Date();
  isEdit.value ? editInvoiceReq(requestBody) : addInvoiceReq(requestBody);
};

const addInvoiceReq = async (invoice: Invoice) => {
  try {
    const data = await useOfetch<Invoice>(addInvoice({ data: invoice }));
    $toast.success("Invoice is added successfully");
    emit("setInvoiceData", data);
  } catch {}
};

const editInvoiceReq = async (invoice: Invoice) => {
  try {
    await useOfetch<Invoice>(editInvoice({ data: invoice }));
    $toast.success("Invoice is edited successfully");
    //refresh edited invoice cached data and clear invoices cached data to be re-fetched again
    refreshNuxtData(`invoice${invoice.id}`);
    clearNuxtData("invoices");
    emit("closeInvoiceForm");
  } catch {}
};
</script>

<style lang="scss" scoped>
.group-header {
  @apply font-bold mb-6 text-[#7c5dfa];
}
.action-button {
  @apply base-button flex justify-center items-center w-32 md:w-auto;
}
</style>
