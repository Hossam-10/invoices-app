<template>
  <dialog id="dialog" class="modal">
    <div class="modal-box p-12 !bg-[var(--common-bg)]">
      <h3 class="font-bold text-2xl md:text-[2rem] text-[var(--total-color)] mb-2">{{ title }}</h3>
      <p class="text-[#888eb0] mb-4 text-sm">{{ content }}</p>
      <div>
        <form method="dialog" class="flex items-center justify-end">
          <slot></slot>
        </form>
      </div>
    </div>
  </dialog>
</template>

<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

const dialogElement = ref<HTMLDialogElement | null>(null);
if (process.client) {
  nextTick(() => {
    dialogElement.value = document.getElementById(
      "dialog"
    ) as HTMLDialogElement;
  });
}

const openDialog = () => {
  dialogElement.value!.showModal();
};

defineExpose({ openDialog });
</script>

<style scoped></style>
