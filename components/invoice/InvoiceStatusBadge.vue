<template>
  <div>
    <div
      class="md:ml-8 text-xs flex items-center justify-center h-10 font-bold rounded-md min-w-[6.5rem]"
      :class="[invoiceStatusConfig.textColor, invoiceStatusConfig.badgeBg]"
    >
      <span
        class="inline-block min-w-2 min-h-2 mr-2 rounded-[50%]"
        :class="invoiceStatusConfig.dotBg"
      ></span>
      <p class="capitalize">{{ invoiceStatus }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  invoiceStatus: {
    type: String,
    required: true,
  },
});

const invoiceStatusConfig = computed(() => {
  switch (props.invoiceStatus) {
    case "paid":
      return {
        badgeBg: "bg-[rgba(51,214,159,.0571)]",
        textColor: "text-[#33d69f]",
        dotBg: "bg-[#33d69f]",
      };
    case "pending":
      return {
        badgeBg: "bg-[rgba(255,143,0,.0571)]",
        textColor: "text-[#ff8f00]",
        dotBg: "bg-[#ff8f00]",
      };
    default:
      return {
        badgeBg: "bg-[rgba(223,227,250,.0571)]",
        textColor: "text-[#ffffff]",
        dotBg: "bg-[#ffffff]",
      };
  }
});
</script>
