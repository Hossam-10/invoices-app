<template>
  <div class="flex justify-between items-center">
    <div>
      <h1 class="mb-2 md:mb-4">Invoices</h1>
      <p class="text-[var(--secondary-text-color)] font-medium hidden md:block">
        There are {{ numberOfInvoices }} total invoices
      </p>
      <p class="text-[var(--secondary-text-color)] font-medium md:hidden">
        {{ numberOfInvoices }} invoices
      </p>
    </div>
    <div class="flex items-center">
      <div class="flex items-center relative">
        <div
          class="flex items-center font-bold cursor-pointer"
          @click="setShowFilterMenu(!showFilterMenu)"
        >
          <p class="text-[var(--primary-text-color)] hidden md:block">
            Filter by status
          </p>
          <p class="text-[var(--primary-text-color)] md:hidden">Filter</p>
          <img
            class="ms-2"
            :class="{ 'scale-y-[-1]': showFilterMenu }"
            alt="toggle filter menu icon"
            :src="arrowDownIcon"
          />
        </div>

        <!--Filter Menu-->
        <ul
          v-show="showFilterMenu"
          class="menu w-48 h-32 rounded-box absolute top-[100%] right-[-1rem] mt-6 bg-[var(--filter-menu-bg)] filter-menu-container"
        >
          <li v-for="filter in filterOptions" :key="filter" class="!">
            <div class="form-control hover:!bg-transparent p-0">
              <label class="cursor-pointer label">
                <input
                  class="checkbox checkbox-sm checked:theme(colors.checkbox) [--chkbg:theme(colors.checkbox)] [--chkfg:white]"
                  type="checkbox"
                  :value="filter"
                  v-model="selectedFilters"
                />
                <span
                  class="label-text text-[var(--primary-text-color)] ms-3 capitalize font-bold"
                  >{{ filter }}</span
                >
              </label>
            </div>
          </li>
        </ul>
      </div>

      <label
        for="my-drawer"
        role="button"
        class="flex items-center w-[5.625rem] h-[2.75rem] md:w-[9.375rem] md:h-[3rem] text-xs ms-2 rounded-[1.5rem] bg-[#7c5dfa] text-white font-bold"
        @click="$emit('setShowInvoiceForm', true)"
      >
        <div
          class="flex justify-center items-center w-8 h-8 rounded-full bg-white mr-4 ml-2"
        >
          <img alt="add invoice icon" :src="addInvoiceIcon" />
        </div>
        <span class="hidden md:inline">New Invoice</span>
        <span class="md:hidden">New</span></label
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import arrowDownIcon from "~/assets/images/icon-arrow-down.svg";
import addInvoiceIcon from "~/assets/images/icon-plus.svg";

defineProps({
  numberOfInvoices: { type: Number, required: true },
});

const emit = defineEmits(["setFilter", "setShowInvoiceForm"]);

const showFilterMenu = ref(false);
const setShowFilterMenu = (val: boolean) => {
  showFilterMenu.value = val;
};
const filterOptions = ref(["draft", "pending", "paid"]);
const selectedFilters = ref<string[]>([]);

watch(selectedFilters, (val) => {
  emit("setFilter", val);
});
</script>

<style scoped lang="scss">
.filter-menu-container {
  box-shadow: 0 10px 20px var(--shadow-color);
}
</style>
