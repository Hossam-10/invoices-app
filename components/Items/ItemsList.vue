<template>
  <div class="w-full">
    <p class="text-[1.125rem] text-[#777f98] font-bold mb-6">Item List</p>
    <FieldArray name="items" v-slot="{ fields, push, remove }">
      <div v-for="(field, index) in fields" :key="field.key">
        <ItemsListCard
          :itemIndex="index"
          :numOfItems="fields.length"
          @deleteItem="remove(index)"
        />
      </div>

      <AppButton
        classContent="w-full h-12 border-0 rounded-3xl flex justify-center items-center text-xs font-bold bg-[var(--add-item-bg)] text-[var(--text-color)] my-8"
        @click="push({ total: 0 } as Item)"
      >
        <svg width="11" height="11" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M6.313 10.023v-3.71h3.71v-2.58h-3.71V.023h-2.58v3.71H.023v2.58h3.71v3.71z"
            :fill="addItemIconColor"
            fill-rule="nonzero"
          />
        </svg>
        <span class="ml-1"> Add New Item</span>
      </AppButton>
    </FieldArray>
  </div>
</template>

<script setup lang="ts">
import type { Item } from "~/types/invoice";

const mode = useStatefulCookie("mode");
const addItemIconColor = computed(() =>
  mode.value === "dark" ? "#ffffff" : "#7e88c3"
);
</script>
