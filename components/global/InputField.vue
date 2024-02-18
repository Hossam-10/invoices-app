<template>
  <div>
    <label :for="name" class="text-xs capitalize d-block mb-3" v-if="label">{{
      label
    }}</label>
    <Field
      :name="name"
      :rules="validation"
      v-slot="{ handleChange, field, errors }"
    >
      <input
        class="input input-bordered w-full !bg-[var(--input-bg)] text-[var(--primary-text-color)] font-bold focus:outline-none focus:border-[var(--primary-text-color)]"
        :class="[{ 'is-invalid': errors.length > 0 && !showErrorMessage },inputCustomClass]"
        :id="name"
        :type="type"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        @update:modelValue="handleChange"
        @blur="handleChange"
        v-bind="field"
      />
      <ErrorMessage
        v-if="showErrorMessage"
        :name="name"
        class="text-error text-xs mt-1"
      />
    </Field>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  name: {
    type: String,
    required: true,
  },
  id: {
    type: String,
  },
  validation: {
    type: String,
  },
  label: {
    type: String,
  },
  placeholder: {
    type: String,
  },
  type: {
    type: String,
    default: "text",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  showErrorMessage: {
    type: Boolean,
    default: true,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  inputCustomClass: {
    type: String,
    default: "",
  },
});
</script>

<style lang="scss" scoped>
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.text-error {
  color: #ec5757;
}
</style>
