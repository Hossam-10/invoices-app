<template>
  <div class="md:flex justify-between mb-4">
    <InputField
      class="mb-1 md:mb-0"
      label="item name"
      :name="`items[${itemIndex}].name`"
      validation="required"
      :showErrorMessage="false"
    />
    <div class="grid grid-cols-[25%_25%_.9fr_.9fr] gap-x-4">
      <InputField
        label="qty."
        :name="`items[${itemIndex}].quantity`"
        validation="required|integer"
        type="number"
        :showErrorMessage="false"
      />
      <InputField
        label="price"
        :name="`items[${itemIndex}].price`"
        validation="required|numeric"
        :showErrorMessage="false"
      />

      <div>
        <label class="text-xs capitalize d-block mb-3">Total</label>
        <Field
          :name="`items[${itemIndex}].total`"
          v-slot="{ handleChange, field }"
          :modelValue="itemTotalPrice"
        >
          <input
            class="input !p-0 w-full !bg-transparent border-none text-right font-bold text-xs text-[#888eb0] pointer-events-none"
            type="number"
            readonly
            @update:modelValue="handleChange"
            @blur="handleChange"
            v-bind="field"
          />
        </Field>
      </div>

      <AppButton
        v-if="itemIndex > 0 || numOfItems > 1"
        classContent="flex items-center justify-center border-0 background-none"
        @click="$emit('deleteItem', itemIndex)"
      >
        <img
          class="cursor-pointer mt-7"
          :src="deleteIcon"
          alt="delete item icon"
        />
      </AppButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import deleteIcon from "~/assets/images/icon-delete.svg";
import type { Item } from "~/types/invoice";

const props = defineProps<{
  itemIndex: number;
  numOfItems: number;
}>();
const emits = defineEmits(["deleteItem"]);

//Calculate total price of item
const formValues = useFormValues();
const itemTotalPrice = computed(() => {
  const itemData = (formValues.value.items?.[props.itemIndex] || {}) as Item;
  if (!itemData.quantity || !itemData.price) {
    return 0;
  }
  return (itemData.quantity * Number(itemData.price)).toFixed(2);
});
</script>
