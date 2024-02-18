<template>
  <div class="drawer">
    <input
      id="my-drawer"
      type="checkbox"
      class="drawer-toggle"
      ref="drawerToggle"
    />
    <div class="drawer-content">
      <!-- Page content here
        <label for="my-drawer" class="btn btn-primary drawer-button"
          >Open drawer</label
        > -->
    </div>
    <div class="drawer-side">
      <label
        for="my-drawer"
        aria-label="close sidebar"
        class="drawer-overlay bg-transparent"
        @click="$emit('setShowInvoiceForm', false)"
      ></label>

      <div
        class="pt-[6.5rem] lg:pl-[6.4375rem] w-full md:max-w-[619px] lg:max-w-[calc(719px+6.4375rem)] h-screen overflow-y-auto bg-[var(--drawer-background)] app-drawer"
      >
        <slot :closeDrawer="closeDrawer"></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineEmits(["setShowInvoiceForm"]);

const drawerToggle = ref<HTMLInputElement | null>(null);
const closeDrawer = () => {
  drawerToggle.value!.checked = false
}
</script>

<style scoped lang="scss">
@media screen and (min-width: 768px) {
  .app-drawer {
    border-radius: 0 1.25rem 1.25rem 0;
  }
}
</style>
